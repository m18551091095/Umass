using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using Newtonsoft.Json;
using NewUmass.Models;
using NewUmass.ServiceReference1;
using Utility;

// ReSharper disable once IdentifierTypo
namespace NewUmass.Handler
{
    /// <summary>
    /// SourceMaterial 的摘要说明
    /// </summary>
    public class SourceMaterial : IHttpHandler, IReadOnlySessionState
    {
        //每页条数   
        int PageSize = 10;
        //页码 0也就是第一条 
        int pageNum = 0;
        public void ProcessRequest(HttpContext context)
        {
            string strResult = "";
            string strDoType = context.Request["doType"];
            if (!string.IsNullOrWhiteSpace(strDoType))
            {
                switch (strDoType)
                {
                    case "SourceMaterialList":
                        strResult = SourceMaterialList(context);
                        break;
                    case "SourceMaterialInfo":
                        strResult = SourceMaterialInfo(context);
                        break;
                    case "SelectMaterial":
                        strResult = SelectMaterial(context);
                        break;
                    case "AddMaterial":
                        strResult = AddMaterial(context);
                        break;
                    case "UpdateMaterial":
                        strResult = UpdateMaterial(context);
                        break;
                    case "AddSourceMaterial":
                        strResult = AddSourceMaterial(context);
                        break;
                    case "SelDownMaterial":
                        strResult = SelDownMaterial(context);
                        break;
                    case "SelDownType":
                        strResult = SelDownType(context);
                        break;
                    case "InsertInfo":
                        strResult = InsertInfo(context);
                        break;
                    case "SelInfoList":
                        strResult = SelInfoList(context);
                        break;
                    case "InseInfo":
                        strResult = InseInfo(context);
                        break;
                    case "SelInfoEdit":
                        strResult = SelInfoEdit(context);
                        break;
                    case "RankStatistics":
                        strResult = RankStatistics(context);
                        break;
                    case "DeleteMaterial":
                        strResult = DeleteMaterial(context);
                        break;
                    case "TaskManagement":
                        strResult = TaskManagement(context);
                        break;
                    case "UpdatePublishRule":
                        strResult = UpdatePublishRule(context);
                        break;
                    case "SelAllInfoList":
                        strResult = SelAllInfoList(context);
                        break;
                }
            }
            context.Response.Write(strResult);
        }

        public string SourceMaterialList(HttpContext context)
        {
            string result = "";
            try
            {
                DataTable dt = new DataTable();
                dt.Columns.Add("id");
                dt.Columns.Add("Title");
                dt.Columns.Add("MNum");
                dt.Columns.Add("Num");
                var user = RequestSession.GetSessionUser();
                pageNum = Convert.ToInt32(context.Request["limit"]);
                PageSize = Convert.ToInt32(context.Request["page"]);
                if (user != null)
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        List<Material> list = db.Material.Where(p => p.companyId == user.CompanyId && p.IsDelete == 0).OrderByDescending(p => p.id).Skip((PageSize - 1) * PageSize).Take(pageNum).ToList();
                        if (list.Any())
                        {
                            foreach (var val in list)
                            {
                                DataRow dr = dt.NewRow();
                                dr["id"] = val.id;
                                dr["Title"] = val.title;
                                dr["MNum"] = db.Info.Count(p => p.materialId == val.id);
                                dr["Num"] = db.MaterialInfo.Count(p => p.M_id == val.id);
                                dt.Rows.Add(dr);
                            }
                        }
                        result = "{\"code\":0,\"msg\":\"\",\"count\":" + db.Material.Count(p => p.companyId == user.CompanyId) + ",\"data\":" + JsonConvert.SerializeObject(dt) + "}";
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return result;
        }
        public string SourceMaterialInfo(HttpContext context)
        {
            string result = "";
            int id = Convert.ToInt32(context.Request["id"]);
            pageNum = Convert.ToInt32(context.Request["limit"]);
            PageSize = Convert.ToInt32(context.Request["page"]);
            try
            {
                DataTable dt = new DataTable();
                dt.Columns.Add("id");
                dt.Columns.Add("Start");
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        List<MaterialInfo> list = db.MaterialInfo.Where(p => p.M_id == id && p.IsDelete == 0).OrderByDescending(p => p.id).Skip((PageSize - 1) * pageNum).Take(pageNum).ToList();
                        if (list.Any())
                        {
                            foreach (var val in list)
                            {
                                DataRow dr = dt.NewRow();
                                dr["id"] = val.id;
                                dr["Start"] = val.Start == 0 ? "未审核" : "已通过";
                                dt.Rows.Add(dr);
                            }
                        }
                        result = "{\"code\":0,\"msg\":\"\",\"count\":" + db.MaterialInfo.Count(p => p.M_id == id) + ",\"data\":" + JsonConvert.SerializeObject(dt) + "}";
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return result;
        }
        public string SelectMaterial(HttpContext context)
        {
            string result = "";
            int id = 0;
            if (!string.IsNullOrWhiteSpace(context.Request["id"]))
            {
                id = Convert.ToInt32(context.Request["id"]);
            }

            try
            {
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        List<MaterialInfo> list = db.MaterialInfo.Where(p => p.id == id).ToList();
                        if (list.Any())
                        {
                            result = "{ \"result\": true,\"msg\": " + JsonConvert.SerializeObject(list) + "}";
                        }
                        else
                        {
                            result = "{ \"result\": false,\"msg\": \"\"}";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return result;
        }
        public string AddSourceMaterial(HttpContext context)
        {
            string strResult = "";
            string title = context.Request["Title"];
            try
            {
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        int? started = db.Company.Find(user.CompanyId)?.stateId;
                        if (started == null || started != 2)
                        {
                            return "{ \"result\": false,\"msg\": \"审核没有通过!\"}";
                        }
                        Material mi = new Material
                        {
                            companyId = user.CompanyId,
                            creatname = user.username,
                            IsDelete = 0,
                            title = title,
                            C__creattime = DateTimeHelper.ConvertDateTimeInt(DateTime.Now)
                        };
                        db.Material.Add(mi);
                        db.SaveChanges();
                        strResult = "{ \"result\": true,\"id\":" + mi.id + ",\"msg\":\"添加成功!\"}";
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return strResult;
        }
        public string AddMaterial(HttpContext context)
        {
            string strResult = "";
            string value = context.Request["contele"];
            int id = !string.IsNullOrWhiteSpace(context.Request["id"]) ? Convert.ToInt32(context.Request["id"]) : 0;
            try
            {
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        int? started = db.Company.Find(user.CompanyId)?.stateId;
                        if (started == null || started != 2)
                        {
                            return "{ \"result\": false,\"msg\": \"审核没有通过!\"}";
                        }
                        int num = db.MaterialInfo.Count(p => p.M_id == id);
                        if (num < 50)
                        {
                            MaterialInfo mi = new MaterialInfo
                            {
                                M_id = id,
                                Value = value,
                                IsDelete = 0,
                                Start = 1
                            };
                            db.MaterialInfo.Add(mi);
                            db.SaveChanges();
                            strResult = "{ \"result\": true,\"msg\":\"添加成功!\"}";
                        }
                        else
                        {
                            strResult = "{ \"result\": false,\"msg\":\"不可超过50条!\"}";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return strResult;
        }
        public string UpdateMaterial(HttpContext context)
        {
            string strResult;
            string value = context.Request["Value"];
            int id = !string.IsNullOrWhiteSpace(context.Request["id"]) ? Convert.ToInt32(context.Request["id"]) : 0;
            try
            {
                using (var db = new UdowsYunPublicEntities())
                {
                    MaterialInfo mi = db.MaterialInfo.Find(id);
                    if (mi != null) mi.Value = value;
                    db.SaveChanges();
                    strResult = "{ \"result\": true,\"msg\":\"修改成功!\"}";
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return strResult;
        }
        public string SelDownMaterial(HttpContext context)
        {
            string result = "";
            try
            {
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        List<Material> list = db.Material.Where(p => p.companyId == user.CompanyId && p.IsDelete == 0).ToList();
                        if (list.Any())
                        {
                            result = JsonConvert.SerializeObject(list);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return result;
        }
        public string SelDownType(HttpContext context)
        {
            string result = "";
            try
            {
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        List<InfoType> list = db.InfoType.ToList();
                        if (list.Any())
                        {
                            result = JsonConvert.SerializeObject(list);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return result;
        }
        public string InsertInfo(HttpContext context)
        {
            string strResult = "";
            int mid = Convert.ToInt32(context.Request["Mid"]);
            string infoNum = context.Request["InfoNum"];
            string infoTypeId = context.Request["InfoTypeId"];
            string precisewords = context.Request["precisewords"];
            string xushu = context.Request["xushu"];
            string key1 = context.Request["key1"];
            string key2 = context.Request["key2"];
            string key3 = context.Request["key3"];
            string key4 = context.Request["key4"];
            string key5 = context.Request["key5"];
            string strImgPath = context.Request["ImgPath"];
            try
            {
                var user = RequestSession.GetSessionUser();
                string html = "";
                string strs = "";
                string strTitle = "";
                string[] str = new string[] { };
                if (!string.IsNullOrWhiteSpace(precisewords))
                {
                    strs += precisewords + ",";
                }
                if (!string.IsNullOrWhiteSpace(xushu))
                {
                    strs += xushu + ",";
                }
                if (!string.IsNullOrWhiteSpace(key1))
                {
                    strs += key1 + ",";
                }
                if (!string.IsNullOrWhiteSpace(key2))
                {
                    strs += key2 + ",";
                }
                if (!string.IsNullOrWhiteSpace(key3))
                {
                    strs += key3 + ",";
                }
                if (!string.IsNullOrWhiteSpace(key4))
                {
                    strs += key4 + ",";
                }
                if (!string.IsNullOrWhiteSpace(key5))
                {
                    strs += key5 + ",";
                }
                if (!string.IsNullOrWhiteSpace(strs))
                {
                    strs = strs.Substring(0, strs.Length - 1);
                    str = strs.Split(',');
                }

                if (str.Length < 5)
                {
                    return "{ \"result\": false,\"msg\":\"精确词过少且不能重复!\"}";
                }
                string[] strImg = new string[] { };
                if (!string.IsNullOrWhiteSpace(strImgPath))
                {
                    strImg = strImgPath.Split(',');
                }
                if (user != null)
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        int? started = db.Company.Find(user.CompanyId)?.stateId;
                        if (started == null || started != 2)
                        {
                            return "{ \"result\": false,\"msg\": \"审核没有通过!\"}";
                        }
                        if (db.MaterialInfo.Count(p => p.M_id == mid && p.Start == 1) < 3)
                        {
                            return "{ \"result\": false,\"msg\":\"素材过少!\"}";
                        }
                        Info ic = new Info();
                        for (int i = 0; i < Convert.ToInt32(infoNum); i++)
                        {
                            for (int j = 0; j < 3; j++)
                            {
                                MaterialInfo list = db.MaterialInfo.Where(p => p.M_id == mid && p.Start == 1 && p.IsDelete == 0).OrderBy(_ => Guid.NewGuid()).First();
                                if (list != null)
                                {
                                    html += list.Value + "<br />";
                                }
                            }
                            for (int j = 0; j < 3; j++)
                            {
                                if (str.Length > 0)
                                {

                                }
                            }
                            int num = 1;
                            while (num < 4)
                            {
                                if (num == 3)
                                {
                                    string title = strTitle.Substring(0, strTitle.Length - 1);
                                    if (db.Info.Count(p => p.title == title) <= 0)
                                    {
                                        break;
                                    }
                                    else
                                    {
                                        num = 1;
                                        strTitle = "";
                                    }
                                }
                                else
                                {
                                    Random rnd = new Random();
                                    int index = rnd.Next(str.Length);
                                    if (!strTitle.Contains(str[index]))
                                    {
                                        strTitle += str[index] + "|";
                                        num++;
                                    }
                                    else
                                    {
                                        num = strTitle.Split('|').Length - 1;
                                    }
                                }
                            }
                            string imgPath = "";
                            if (strImg.Length > 0)
                            {
                                Random rd = new Random();
                                int ind = rd.Next(strImg.Length);
                                imgPath = strImg[ind];
                            }
                            ic.imgPath = imgPath;
                            ic.title = strTitle.Substring(0, strTitle.Length - 1);
                            ic.companyId = Convert.ToInt32(user.CompanyId);
                            ic.html = html;
                            ic.typeId = Convert.ToInt32(infoTypeId);
                            ic.materialId = mid;
                            ic.stateId = 2;
                            ic.createTime = DateTimeHelper.ConvertDateTimeInt(DateTime.Now);
                            db.Info.Add(ic);
                            db.SaveChanges();
                            strTitle = "";
                            html = "";
                        }
                        strResult = "{ \"result\": true,\"msg\":\"添加成功!\"}";
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return strResult;
        }
        public string SelInfoList(HttpContext context)
        {
            string result = "";
            try
            {
                var user = RequestSession.GetSessionUser();
                pageNum = Convert.ToInt32(context.Request["limit"]);
                PageSize = Convert.ToInt32(context.Request["page"]);
                if (user != null)
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        string sql = @"select * from (select row_number() over (order by id desc) as rn,* from (select a.id,'http://pic03.uz360.cn/UmassWebPageImage/'+b.imgPath as imgPath,c.name as b2bName,a.url,CONVERT(varchar(100), DATEADD(s,a.createTime, '1970-01-01 08:00:00'), 20) as createTime,b.title,'推送成功' as Start,a.b2bId,'' as b2bUrl from SuccessInfo a 
                          left join Info b
                          on a.infoId = b.id
                          left join B2B c
                          on a.b2bId = c.id
                          where a.companyId = " + user.CompanyId + ") t ) t where rn between (" + PageSize + "-1) * " + pageNum + " + 1 and " + PageSize + " * " + pageNum;
                        List<GetInfo> list = db.Database.SqlQuery<GetInfo>(sql).ToList();
                        if (list.Count > 0)
                        {
                            ApiSoapClient a = new ApiSoapClient();
                            foreach (var val in list)
                            {
                                if (val.url.IndexOf('|') > 0)
                                    val.url = val.url.Substring(0, val.url.IndexOf('|'));
                                if (val.b2bId == 2 || val.b2bId == 3 || val.b2bId == 5 || val.b2bId == 6 || val.b2bId == 8 || val.b2bId == 10)
                                    val.b2bUrl = a.GetLoginUrl(Convert.ToInt32(user.CompanyId), val.b2bId);
                            }
                            result = "{\"code\":0,\"msg\":\"\",\"count\":" + db.SuccessInfo.Count(p => p.companyId == user.CompanyId) + ",\"data\":" + JsonConvert.SerializeObject(list) + "}";
                        }
                        else
                        {
                            result = "{\"code\":0,\"msg\":\"\",\"count\":0,\"data\":\"\"}";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return result;
        }
        public string SelAllInfoList(HttpContext context)
        {
            string result = "";
            try
            {
                var user = RequestSession.GetSessionUser();
                pageNum = Convert.ToInt32(context.Request["limit"]);
                PageSize = Convert.ToInt32(context.Request["page"]);
                if (user != null)
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        string sql = @"select * from (select row_number() over (order by id desc) as rn,* from (select a.id,a.title,b.name,CONVERT(varchar(100), DATEADD(s,a.createTime, '1970-01-01 08:00:00'), 20) as createTime from Info a                                                 left join InfoState b
                                                 on a.stateId = b.id
                                                 where companyId = " + user.CompanyId + ") t ) t where rn between (" + PageSize + "-1) * " + pageNum + " + 1 and " + PageSize + " * " + pageNum;
                        List<GetAllInfo> list = db.Database.SqlQuery<GetAllInfo>(sql).ToList();
                        if (list.Count > 0)
                        {
                            result = "{\"code\":0,\"msg\":\"\",\"count\":" + db.Info.Count(p => p.companyId == user.CompanyId) + ",\"data\":" + JsonConvert.SerializeObject(list) + "}";
                        }
                        else
                        {
                            result = "{\"code\":0,\"msg\":\"\",\"count\":0,\"data\":\"\"}";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return result;
        }
        public string InseInfo(HttpContext context)
        {
            string strResult = "";
            string title = context.Request["Title"];
            string infoTypeId = context.Request["InfoTypeId"];
            string imagePath = context.Request["ImgPath"];
            string value = context.Request["contele"];
            int id = !string.IsNullOrWhiteSpace(context.Request["id"]) ? Convert.ToInt32(context.Request["id"]) : 0;
            try
            {
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        int? started = db.Company.Find(user.CompanyId)?.stateId;
                        if (started == null || started != 2)
                        {
                            return "{ \"result\": false,\"msg\": \"审核没有通过!\"}";
                        }
                        if (id == 0)
                        {
                            Info ic = new Info
                            {
                                imgPath = imagePath,
                                createTime = DateTimeHelper.ConvertDateTimeInt(DateTime.Now),
                                title = title,
                                typeId = Convert.ToInt32(infoTypeId),
                                html = value,
                                stateId = 2,
                                companyId = Convert.ToInt32(user.CompanyId)
                            };
                            db.Info.Add(ic);
                            db.SaveChanges();
                            strResult = "{ \"result\": true,\"msg\":\"添加成功!\"}";
                        }
                        else
                        {
                            Info ic = db.Info.Find(id);
                            if (ic != null)
                            {
                                ic.imgPath = imagePath;
                                ic.title = title;
                                ic.typeId = Convert.ToInt32(infoTypeId);
                                ic.html = value;
                            }

                            db.SaveChanges();
                            strResult = "{ \"result\": true,\"msg\":\"修改成功!\"}";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return strResult;
        }
        public string SelInfoEdit(HttpContext context)
        {
            string result = "";
            try
            {
                DataTable dt = new DataTable();
                dt.Columns.Add("id");
                dt.Columns.Add("imgPath");
                dt.Columns.Add("Title");
                dt.Columns.Add("Value");
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    int id = !string.IsNullOrWhiteSpace(context.Request["id"]) ? Convert.ToInt32(context.Request["id"]) : 0;
                    using (var db = new UdowsYunPublicEntities())
                    {
                        List<Info> list = db.Info.Where(p => p.id == id).ToList();
                        if (list.Any())
                        {
                            foreach (var val in list)
                            {
                                DataRow dr = dt.NewRow();
                                dr["id"] = val.id;
                                dr["imgPath"] = ConfigurationManager.AppSettings["ImgUmasWebSrc"] + val.imgPath;
                                dr["Value"] = val.html;
                                dr["Title"] = val.title;
                                dt.Rows.Add(dr);
                            }
                        }
                        result = JsonConvert.SerializeObject(dt);
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return result;
        }
        public string RankStatistics(HttpContext context)
        {
            string result = "";
            try
            {
                var user = RequestSession.GetSessionUser();
                pageNum = Convert.ToInt32(context.Request["limit"]);
                PageSize = Convert.ToInt32(context.Request["page"]);
                if (user != null)
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        string sql = @"select * from (select row_number() over (order by id) as rn,* from (  select a.id,a.keyword as name,b.name as urlname, a.ranking as paiming,'' as returnurl from KeywordRanking a
                          left join engines b
                          on a.engineid = b.id
                          where a.companyid = " + user.CompanyId + " and ranking <> '' and ranking is not null) t ) t where rn between (" + PageSize + "-1) * " + pageNum + " + 1 and " + PageSize + " * " + pageNum;
                        List<GetTail> list = db.Database.SqlQuery<GetTail>(sql).ToList();
                        if (list.Count > 0)
                        {
                            foreach (var item in list)
                            {
                                switch (item.urlname)
                                {
                                    case "百度":
                                        item.returnurl = "https://www.baidu.com/s?wd=" + item.name;
                                        break;
                                    case "百度移动":
                                        item.returnurl = "https://m.baidu.com/s?word=" + item.name;
                                        break;
                                    default:
                                        break;
                                }
                            }
                            result = "{\"code\":0,\"msg\":\"\",\"count\":" + db.KeywordRanking.Count(p => p.companyId == user.CompanyId && p.ranking != "" && p.ranking != null) + ",\"data\":" + JsonConvert.SerializeObject(list) + "}";
                        }
                        else
                        {
                            result = "{\"code\":0,\"msg\":\"\",\"count\":0,\"data\":\"\"}";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return result;
        }
        public string DeleteMaterial(HttpContext context)
        {
            string strReult = "";
            var user = RequestSession.GetSessionUser();
            if (user != null)
            {
                int id = !string.IsNullOrWhiteSpace(context.Request["id"]) ? Convert.ToInt32(context.Request["id"]) : 0;
                using (var db = new UdowsYunPublicEntities())
                {
                    //var Mater = from u in db.Material where u.id == id select u;
                    //db.Material.RemoveRange(Mater);
                    Material m = db.Material.Find(id);
                    m.IsDelete = 1;
                    m.DeleteTime = DateTimeHelper.ConvertDateTimeInt(DateTime.Now);
                    m.DeletePerson = user.CompanyId.ToString();
                    db.SaveChanges();
                    //var MaterInfo = from u in db.MaterialInfo where u.M_id == id select u;
                    //db.MaterialInfo.RemoveRange(MaterInfo);
                    List<MaterialInfo> list = db.MaterialInfo.Where(p => p.M_id == id).ToList();
                    if (list.Any())
                    {
                        foreach (var item in list)
                        {
                            MaterialInfo mi = db.MaterialInfo.Find(item.id);
                            mi.IsDelete = 1;
                            mi.DeleteTime = DateTimeHelper.ConvertDateTimeInt(DateTime.Now);
                            mi.DeletePerson = user.CompanyId.ToString();
                            db.SaveChanges();
                        }
                    }
                    strReult = "{ \"result\": true,\"msg\":\"删除成功!\"}";
                }
            }
            return strReult;
        }
        public string DeleteMaterialInfo(HttpContext context)
        {
            string strReult = "";
            var user = RequestSession.GetSessionUser();
            if (user != null)
            {
                int id = !string.IsNullOrWhiteSpace(context.Request["id"]) ? Convert.ToInt32(context.Request["id"]) : 0;
                using (var db = new UdowsYunPublicEntities())
                {
                    MaterialInfo mi = db.MaterialInfo.Find(id);
                    mi.IsDelete = 1;
                    mi.DeleteTime = DateTimeHelper.ConvertDateTimeInt(DateTime.Now);
                    mi.DeletePerson = user.CompanyId.ToString();
                    db.SaveChanges();
                    strReult = "{ \"result\": true,\"msg\":\"删除成功!\"}";
                }
            }
            return strReult;
        }
        public string TaskManagement(HttpContext context)
        {
            string result = "";
            try
            {
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        List<PublishRule> list = db.PublishRule.Where(p => p.companyId == user.CompanyId).ToList();
                        if (list.Any())
                        {
                            result = JsonConvert.SerializeObject(list);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return result;
        }
        public string UpdatePublishRule(HttpContext context)
        {
            string result = "";
            int intervalDay = !string.IsNullOrWhiteSpace(context.Request["intervalDay"]) ? Convert.ToInt32(context.Request["intervalDay"]) : 0;
            int publishCount = !string.IsNullOrWhiteSpace(context.Request["publishCount"]) ? Convert.ToInt32(context.Request["publishCount"]) : 0;
            try
            {
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        int? started = db.Company.Find(user.CompanyId)?.stateId;
                        if (started == null || started != 2)
                        {
                            return "{ \"result\": false,\"msg\": \"审核没有通过!\"}";
                        }
                        List<PublishRule> list = db.PublishRule.Where(p => p.companyId == user.CompanyId).ToList();
                        if (list.Any())
                        {
                            foreach (var item in list)
                            {
                                PublishRule pr = db.PublishRule.Find(item.id);
                                if (intervalDay != 0)
                                    pr.intervalDay = intervalDay;
                                if (publishCount != 0)
                                    pr.publishCount = publishCount;
                                db.SaveChanges();
                                result = "{ \"result\": true,\"msg\":\"修改成功!\"}";
                            }
                        }
                        else
                        {
                            PublishRule pr = new PublishRule();
                            if (intervalDay != 0)
                                pr.intervalDay = intervalDay;
                            if (publishCount != 0)
                                pr.publishCount = publishCount;
                            pr.companyId = Convert.ToInt32(user.CompanyId);
                            pr.startDate = DateTimeHelper.ConvertDateTimeInt(DateTime.Now);
                            db.PublishRule.Add(pr);
                            db.SaveChanges();
                            result = "{ \"result\": true,\"msg\":\"添加成功!\"}";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return result;
        }
        public class GetInfo
        {
            public int id { get; set; }
            public string imgPath { get; set; }
            public int b2bId { get; set; }
            public string b2bName { get; set; }
            public string url { get; set; }
            public string b2bUrl { get; set; }
            public string createTime { get; set; }
            public string title { get; set; }
            public string Start { get; set; }
        }
        public class GetAllInfo
        {
            public int id { get; set; }
            public string title { get; set; }
            public string name { get; set; }
            public string createTime { get; set; }
        }
        public class GetTail
        {
            public int id { get; set; }
            public string name { get; set; }
            public string urlname { get; set; }
            public string paiming { get; set; }
            public string returnurl { get; set; }
        }
        public bool IsReusable => false;
    }
}