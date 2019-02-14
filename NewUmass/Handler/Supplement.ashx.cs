using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.SessionState;
using Newtonsoft.Json;
using NewUmass.Models;
using UInfoManager.Utility;
using Utility;

namespace NewUmass.Handler
{
    /// <summary>
    /// Supplement 的摘要说明
    /// </summary>
    public class Supplement : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            string str_result = "";
            string str_doType = context.Request.Params["doType"];
            switch (str_doType)
            {
                case "Update":
                    str_result = Update(context);
                    break;
                case "Select":
                    str_result = Select(context);
                    break;
                case "SoleClassification":
                    str_result = SoleClassification(context);
                    break;
                case "SoleRegion":
                    str_result = SoleRegion(context);
                    break;
                case "InfoClassification":
                    str_result = InfoClassification(context);
                    break;
                case "InfoRegion":
                    str_result = InfoRegion(context);
                    break;
                case "AtoboClassification":
                    str_result = AtoboClassification(context);
                    break;
                case "AtoboRegion":
                    str_result = AtoboRegion(context);
                    break;
                case "b2bClassification":
                    str_result = b2bClassification(context);
                    break;
                case "b2bRegion":
                    str_result = b2bRegion(context);
                    break;
                case "GtobalClassification":
                    str_result = GtobalClassification(context);
                    break;
                case "GtobalRegion":
                    str_result = GtobalRegion(context);
                    break;
                case "JqwClassification":
                    str_result = JqwClassification(context);
                    break;
                case "JqwRegion":
                    str_result = JqwRegion(context);
                    break;
                case "UpdateSole":
                    str_result = UpdateSole(context);
                    break;
                case "UpdateInfo":
                    str_result = UpdateInfo(context);
                    break;
                case "UpdateAtobo":
                    str_result = UpdateAtobo(context);
                    break;
                case "UpdateB2b":
                    str_result = UpdateB2b(context);
                    break;
                case "UpdateGtobal":
                    str_result = UpdateGtobal(context);
                    break;
                case "UpdateJqw":
                    str_result = UpdateJqw(context);
                    break;
                case "SelectSole":
                    str_result = SelectSole(context);
                    break;
                case "SelectInfo":
                    str_result = SelectInfo(context);
                    break;
                case "SelectAtobo":
                    str_result = SelectAtobo(context);
                    break;
                case "SelectGtobal":
                    str_result = SelectGtobal(context);
                    break;
                case "SelectJqw":
                    str_result = SelectJqw(context);
                    break;
                case "Selectb2b":
                    str_result = Selectb2b(context);
                    break;
            }
            context.Response.Write(str_result);
        }

        public string Select(HttpContext context)
        {
            string strResult = "";
            try
            {
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        List<Company> n = db.Company.Where(p => p.userId == user.id).ToList();
                        if (n.Any())
                        {
                            foreach (var item in n)
                            {
                                item.licensePath = ConfigurationManager.AppSettings["ImgUmasWebSrc"] + user.CompanyId + "/" + item.licensePath;
                            }
                            strResult = JsonConvert.SerializeObject(n);
                        }
                    }
                }
                else
                {
                    strResult = "";
                }
            }
            catch (DbEntityValidationException e)
            {
                LogHelper lh = new LogHelper();
                lh.WriteLog(e.EntityValidationErrors.ToString());
                strResult = "";
            }
            return strResult;
        }
        public string Update(HttpContext context)
        {
            string strResult = "";
            string licenseCode = context.Request["licenseCode"];
            string companyType = context.Request["companyType"];
            string legalEntity = context.Request["legalEntity"];
            string regCapital = context.Request["regCapital"];
            string regDate = context.Request["regDate"];
            string validDate = context.Request["validDate"];
            string businessScope = context.Request["businessScope"];
            string regAuthority = context.Request["regAuthority"];
            string licensePath = context.Request["licensePath"];
            try
            {
                if (GetUser() == false)
                {
                    return "{ \"result\": false,\"msg\": \"个人资料必须填写完全!\"}";
                }
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        int? started = db.Company.Find(user.CompanyId)?.stateId;
                        if (started == 2)
                        {
                            return "{ \"result\": false,\"msg\": \"已审核通过，不可修改!\"}";
                        }
                        List<Company> n = db.Company.Where(p => p.userId == user.id).ToList();
                        if (n.Any())
                        {
                            foreach (var val in n)
                            {
                                var c = db.Company.Find(val.id);
                                c.licenseCode = licenseCode;
                                c.companyType = companyType;
                                c.legalEntity = legalEntity;
                                c.regCapital = regCapital;
                                c.regDate = regDate;
                                c.validDate = validDate;
                                c.businessScope = businessScope;
                                c.regAuthority = regAuthority;
                                c.licensePath = licensePath.Replace(ConfigurationManager.AppSettings["ImgUmasWebSrc"] + user.CompanyId + "/", "");
                                c.FastDefaultStringReplace<Company>();
                            }
                            db.SaveChanges();
                            strResult = "{ \"result\": true,\"msg\": \"修改成功!\"}";
                        }
                        else
                        {
                            strResult = "{ \"result\": false,\"msg\": \"请先补充公司资料!\"}";
                        }
                    }
                }
                else
                {
                    strResult = "{ \"result\": false,\"msg\": \"登录超时,请重新登录!\"}";
                }
            }
            catch (DbEntityValidationException e)
            {
                LogHelper lh = new LogHelper();
                lh.WriteLog(e.EntityValidationErrors.ToString());
                strResult = "{ \"result\": false,\"msg\": \"" + e.EntityValidationErrors + "\"}";
            }
            return strResult;
        }
        public string SoleClassification(HttpContext context)
        {
            string result = "";
            string id = context.Request["id"];
            string layer = context.Request["layer"];
            try
            {
                if (id != "-1")
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        string sql = @"select top 1000 id,code,name from Industry_51sole  where layer = 1";
                        if (!string.IsNullOrEmpty(id))
                        {
                            sql = "select top 1000 id,code,name from Industry_51sole  where parentCode = " + id + " and layer=" + layer;
                        }
                        List<Industry> i = db.Database.SqlQuery<Industry>(sql).ToList();
                        if (i.Any())
                        {
                            result = JsonConvert.SerializeObject(i);
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
        public string SoleRegion(HttpContext context)
        {
            string result = "";
            string id = context.Request["id"];
            string level = context.Request["level"];
            try
            {
                if (id != "-1")
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        string sql = @"select top 1000 id,code,name from Area_51sole  where parentCode = 2";
                        if (!string.IsNullOrEmpty(id))
                        {
                            sql = "	select top 1000 id,code,name from Area_51sole where parentCode = " + id;
                        }
                        List<Industry> i = db.Database.SqlQuery<Industry>(sql).ToList();
                        if (i.Any())
                        {
                            result = JsonConvert.SerializeObject(i);
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
        public string InfoClassification(HttpContext context)
        {
            string result = "";
            string id = context.Request["id"];
            try
            {
                if (id != "-1")
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        string sql = @"select id, modid as code,name from Industry_99inf  where layer = 1";
                        if (!string.IsNullOrEmpty(id))
                        {
                            sql = "	select id, code,name from Industry_99inf  where  modid = " + id;
                        }
                        List<Industry> i = db.Database.SqlQuery<Industry>(sql).ToList();
                        if (i.Any())
                        {
                            result = JsonConvert.SerializeObject(i);
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
        public string InfoRegion(HttpContext context)
        {
            string result = "";
            string id = context.Request["id"];
            try
            {
                if (id != "-1")
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        string sql = @"select id,code,name from Area_99inf where parentCode = 0";
                        if (!string.IsNullOrEmpty(id))
                        {
                            sql = "select id,code,name from Area_99inf where parentCode = " + id;
                        }
                        List<Industry> i = db.Database.SqlQuery<Industry>(sql).ToList();
                        if (i.Any())
                        {
                            result = JsonConvert.SerializeObject(i);
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
        public string AtoboClassification(HttpContext context)
        {
            string result = "";
            string id = context.Request["id"];
            try
            {
                if (id != "-1")
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        string sql = @"select id,id as code,name from Industry_atobo where parentIds = '0'";
                        if (!string.IsNullOrEmpty(id))
                        {
                            sql = "	exec Proc_GetAtoboIndustry " + id + "";
                        }
                        List<Industry> i = db.Database.SqlQuery<Industry>(sql).ToList();
                        if (i.Any())
                        {
                            result = JsonConvert.SerializeObject(i);
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
        public string AtoboRegion(HttpContext context)
        {
            string result = "";
            string id = context.Request["id"];
            try
            {
                if (id != "-1")
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        string sql = @"select id,id as code,name from Area_atobo where parentId = 0";
                        if (!string.IsNullOrEmpty(id))
                        {
                            sql = "select id,id as code,name from Area_atobo where parentId = " + id;
                        }
                        List<Industry> i = db.Database.SqlQuery<Industry>(sql).ToList();
                        if (i.Any())
                        {
                            result = JsonConvert.SerializeObject(i);
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
        public string b2bClassification(HttpContext context)
        {
            string result = "";
            string id = context.Request["id"];
            try
            {
                if (id != "-1")
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        string sql = @"select top 1000 id,code,name from Industry_b2b168 where code <=100";
                        if (!string.IsNullOrEmpty(id))
                        {
                            int starnum = Convert.ToInt32(id) * 1000;
                            int endnum = (Convert.ToInt32(id) + 1) * 1000;
                            sql = "select top 1000 id,code,name from Industry_b2b168 where code >= " + starnum + " and code < " + endnum;
                        }
                        List<BIndustry> i = db.Database.SqlQuery<BIndustry>(sql).ToList();
                        if (i.Any())
                        {
                            result = JsonConvert.SerializeObject(i);
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
        public string b2bRegion(HttpContext context)
        {
            string result = "";
            string id = context.Request["id"];
            string level = context.Request["level"];
            try
            {
                if (id != "-1")
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        string sql = @"select * from Area_b2b168 where code < 50";
                        if (!string.IsNullOrEmpty(id))
                        {
                            if (!string.IsNullOrEmpty(level))
                            {
                                if (level == "2")
                                {
                                    sql = "	select * from Area_b2b168 where code >= " + id + " * 50 and code< ( " + id + " + 1) * 50";
                                }
                                else
                                {
                                    sql = "	select * from Area_b2b168 where code >= " + id + " * 60 and code< ( " + id + "+ 1) * 60";
                                }
                            }
                        }
                        List<Industry> i = db.Database.SqlQuery<Industry>(sql).ToList();
                        if (i.Any())
                        {
                            result = JsonConvert.SerializeObject(i);
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
        public string GtobalClassification(HttpContext context)
        {
            string result = "";
            string id = context.Request["id"];
            try
            {
                using (var db = new UdowsYunPublicEntities())
                {
                    if (id != "-1")
                    {
                        string sql = @"select id,code,name from Industry_gtobal where parentCode = 0";
                        if (!string.IsNullOrEmpty(id))
                        {
                            sql = "select id,code,name from Industry_gtobal where parentCode = " + id;
                        }
                        List<Industry> i = db.Database.SqlQuery<Industry>(sql).ToList();
                        if (i.Any())
                        {
                            result = JsonConvert.SerializeObject(i);
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
        public string GtobalRegion(HttpContext context)
        {
            string result = "";
            string id = context.Request["id"];
            try
            {
                if (id != "-1")
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        string sql = @"select id,code,name from Area_gtobal where parentCode = 0";
                        if (!string.IsNullOrEmpty(id))
                        {
                            sql = "select id,code,name from Area_gtobal where parentCode = " + id;
                        }
                        List<Industry> i = db.Database.SqlQuery<Industry>(sql).ToList();
                        if (i.Any())
                        {
                            result = JsonConvert.SerializeObject(i);
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
        public string JqwClassification(HttpContext context)
        {
            string result = "";
            string id = context.Request["id"];
            try
            {
                if (id != "-1")
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        string sql = @"select id,code,name from Industry_jqw where layer = 0";
                        if (!string.IsNullOrEmpty(id))
                        {
                            sql = "select id,code,name from Industry_jqw where parentCode = " + id;
                        }
                        List<Industry> i = db.Database.SqlQuery<Industry>(sql).ToList();
                        if (i.Any())
                        {
                            result = JsonConvert.SerializeObject(i);
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
        public string JqwRegion(HttpContext context)
        {
            string result = "";
            string id = context.Request["id"];
            string level = context.Request["level"];
            try
            {
                if (id != "-1")
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        string sql = @"select * from Area_jqw where layer = 0";
                        if (!string.IsNullOrEmpty(id))
                        {
                            if (!string.IsNullOrEmpty(level))
                            {
                                if (level == "2")
                                {
                                    sql = "select * from Area_jqw where parentCode = " + id + " and layer =1";
                                }
                                else
                                {
                                    sql = "select * from Area_jqw where parentCode = " + id + " and layer =2";
                                }
                            }
                        }
                        List<Industry> i = db.Database.SqlQuery<Industry>(sql).ToList();
                        if (i.Any())
                        {
                            result = JsonConvert.SerializeObject(i);
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
        public string UpdateSole(HttpContext context)
        {
            string result = "";
            string companyType = context.Request["companyType"];
            string workingModel = context.Request["workingModel"];
            string bigIndustryId = context.Request["Classification1"];
            string midIndustryId = context.Request["Classification2"];
            string smallIndustryId = context.Request["Classification3"];
            string provinceId = context.Request["Region1"];
            string cityId = context.Request["Region2"];
            string countyId = context.Request["Region3"];
            try
            {
                if (GetUser() == false)
                {
                    return "{ \"result\": false,\"msg\": \"个人资料必须填写完全!\"}";
                }
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    if (user.CompanyId != null)
                    {
                        using (var db = new UdowsYunPublicEntities())
                        {
                            int? started = db.Company.Find(user.CompanyId)?.stateId;
                            if (started == null || started != 2)
                            {
                                return "{ \"result\": false,\"msg\": \"审核没有通过!\"}";
                            }
                            var list = db.Company_51sole.Where(p => p.companyId == user.CompanyId).ToList();
                            if (list.Any())
                            {
                                foreach (var val in list)
                                {
                                    Company_51sole c = db.Company_51sole.Find(val.id);
                                    c.companyType = companyType;
                                    c.workingModel = workingModel;
                                    c.bigIndustryId = string.IsNullOrEmpty(bigIndustryId) ? 0 : Convert.ToInt32(bigIndustryId);
                                    c.midIndustryId = string.IsNullOrEmpty(midIndustryId) ? 0 : Convert.ToInt32(midIndustryId);
                                    c.smallIndustryId = string.IsNullOrEmpty(smallIndustryId) ? 0 : Convert.ToInt32(smallIndustryId);
                                    c.provinceId = string.IsNullOrEmpty(provinceId) ? 0 : Convert.ToInt32(provinceId);
                                    c.cityId = string.IsNullOrEmpty(cityId) ? 0 : Convert.ToInt32(cityId);
                                    c.countyId = string.IsNullOrEmpty(countyId) ? 0 : Convert.ToInt32(countyId);
                                    db.SaveChanges();
                                    result = "{ \"result\": true,\"msg\": \"修改成功!\"}";
                                }
                            }
                            else
                            {
                                Regex rex = new Regex("[a-z0-9_]+");
                                string pass = CommonHelper.Str_char(8, false);
                                while (true)
                                {
                                    Match ma = rex.Match(pass);
                                    if (ma.Success)
                                    {
                                        break;
                                    }
                                }
                                Company_51sole solo = new Company_51sole
                                {
                                    companyId = Convert.ToInt32(user.CompanyId),
                                    username = "u" + DateTime.Now.ToString("yyyyMMddhhmmss"),
                                    password = pass,
                                    companyType = companyType,
                                    workingModel = workingModel,
                                    bigIndustryId = string.IsNullOrEmpty(bigIndustryId) ? 0 : Convert.ToInt32(bigIndustryId),
                                    midIndustryId = string.IsNullOrEmpty(midIndustryId) ? 0 : Convert.ToInt32(midIndustryId),
                                    smallIndustryId = string.IsNullOrEmpty(smallIndustryId) ? 0 : Convert.ToInt32(smallIndustryId),
                                    provinceId = string.IsNullOrEmpty(provinceId) ? 0 : Convert.ToInt32(provinceId),
                                    cityId = string.IsNullOrEmpty(cityId) ? 0 : Convert.ToInt32(cityId),
                                    countyId = string.IsNullOrEmpty(countyId) ? 0 : Convert.ToInt32(countyId),
                                    url = ""
                                };
                                db.Company_51sole.Add(solo);
                                db.SaveChanges();
                                result = "{ \"result\": true,\"msg\": \"添加成功!\"}";
                            }
                        }
                    }
                    else
                    {
                        result = "{ \"result\": false,\"msg\": \"请先补充公司资料!\"}";
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return result;
        }
        public string UpdateInfo(HttpContext context)
        {
            string result = "";
            string coTypeId = context.Request["coTypeId"];
            string coModeId = context.Request["coModeId"];
            string firstIndustryId = context.Request["Classification1"];
            string secondIndustryId = context.Request["Classification2"];
            string provinceId = context.Request["Region1"];
            string cityId = context.Request["Region2"];
            try
            {
                if (GetUser() == false)
                {
                    return "{ \"result\": false,\"msg\": \"个人资料必须填写完全!\"}";
                }
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    if (user.CompanyId != null)
                    {
                        using (var db = new UdowsYunPublicEntities())
                        {
                            int? started = db.Company.Find(user.CompanyId)?.stateId;
                            if (started == null || started != 2)
                            {
                                return "{ \"result\": false,\"msg\": \"审核没有通过!\"}";
                            }
                            var list = db.Company_99inf.Where(p => p.companyId == user.CompanyId).ToList();
                            if (list.Any())
                            {
                                foreach (var val in list)
                                {
                                    Company_99inf c = db.Company_99inf.Find(val.id);
                                    c.coTypeId = string.IsNullOrEmpty(coTypeId) ? 0 : Convert.ToInt32(coTypeId);
                                    c.coModeId = string.IsNullOrEmpty(coModeId) ? 0 : Convert.ToInt32(coModeId);
                                    c.firstIndustryId = string.IsNullOrEmpty(firstIndustryId) ? 0 : Convert.ToInt32(firstIndustryId);
                                    c.secondIndustryId = string.IsNullOrEmpty(secondIndustryId) ? 0 : Convert.ToInt32(secondIndustryId);
                                    c.provinceId = string.IsNullOrEmpty(provinceId) ? 0 : Convert.ToInt32(provinceId);
                                    c.cityId = string.IsNullOrEmpty(cityId) ? 0 : Convert.ToInt32(cityId);
                                    db.SaveChanges();
                                    result = "{ \"result\": true,\"msg\": \"修改成功!\"}";
                                }
                            }
                            else
                            {
                                Company_99inf inf = new Company_99inf
                                {
                                    userId = 0,
                                    companyId = Convert.ToInt32(user.CompanyId),
                                    username = "u" + DateTime.Now.ToString("yyyyMMddhhmmss"),
                                    password = CommonHelper.Str_char(8, false),
                                    coTypeId = string.IsNullOrEmpty(coTypeId) ? 0 : Convert.ToInt32(coTypeId),
                                    coModeId = string.IsNullOrEmpty(coModeId) ? 0 : Convert.ToInt32(coModeId),
                                    firstIndustryId = string.IsNullOrEmpty(firstIndustryId) ? 0 : Convert.ToInt32(firstIndustryId),
                                    secondIndustryId = string.IsNullOrEmpty(secondIndustryId) ? 0 : Convert.ToInt32(secondIndustryId),
                                    provinceId = string.IsNullOrEmpty(provinceId) ? 0 : Convert.ToInt32(provinceId),
                                    cityId = string.IsNullOrEmpty(cityId) ? 0 : Convert.ToInt32(cityId)
                                };
                                inf.FastDefaultStringReplace<Company_99inf>();
                                db.Company_99inf.Add(inf);
                                db.SaveChanges();
                                result = "{ \"result\": true,\"msg\": \"添加成功!\"}";
                            }
                        }
                    }
                    else
                    {
                        result = "{ \"result\": false,\"msg\": \"请先补充公司资料!\"}";
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return result;
        }
        public string UpdateAtobo(HttpContext context)
        {
            string result = "";
            string firstIndustryId = context.Request["Classification1"];
            string secondIndustryId = context.Request["Classification2"];
            string thirdIndustryId = context.Request["Classification3"];
            string provinceNo = context.Request["Region1"];
            string cityNo = context.Request["Region2"];
            string countyNo = context.Request["Region3"];
            try
            {
                if (GetUser() == false)
                {
                    return "{ \"result\": false,\"msg\": \"个人资料必须填写完全!\"}";
                }
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    if (user.CompanyId != null)
                    {
                        using (var db = new UdowsYunPublicEntities())
                        {
                            int? started = db.Company.Find(user.CompanyId)?.stateId;
                            if (started == null || started != 2)
                            {
                                return "{ \"result\": false,\"msg\": \"审核没有通过!\"}";
                            }
                            var list = db.Company_atobo.Where(p => p.companyId == user.CompanyId).ToList();
                            if (list.Any())
                            {
                                foreach (var val in list)
                                {
                                    Company_atobo c = db.Company_atobo.Find(val.id);
                                    c.firstIndustryId = string.IsNullOrEmpty(firstIndustryId) ? 0 : Convert.ToInt32(firstIndustryId);
                                    c.secondIndustryId = string.IsNullOrEmpty(secondIndustryId) ? 0 : Convert.ToInt32(secondIndustryId);
                                    c.thirdIndustryId = string.IsNullOrEmpty(thirdIndustryId) ? 0 : Convert.ToInt32(thirdIndustryId);
                                    c.provinceNo = string.IsNullOrEmpty(provinceNo) ? 0 : Convert.ToInt32(provinceNo);
                                    c.cityNo = string.IsNullOrEmpty(cityNo) ? 0 : Convert.ToInt32(cityNo);
                                    c.countyNo = string.IsNullOrEmpty(countyNo) ? 0 : Convert.ToInt32(countyNo);
                                    db.SaveChanges();
                                    result = "{ \"result\": true,\"msg\": \"修改成功!\"}";
                                }
                            }
                            else
                            {
                                Company_atobo atobo = new Company_atobo
                                {
                                    companyId = Convert.ToInt32(user.CompanyId),
                                    username = "u" + DateTime.Now.ToString("yyyyMMddhhmmss"),
                                    password = CommonHelper.Str_char(8, false),
                                    firstIndustryId = string.IsNullOrEmpty(firstIndustryId) ? 0 : Convert.ToInt32(firstIndustryId),
                                    secondIndustryId = string.IsNullOrEmpty(secondIndustryId) ? 0 : Convert.ToInt32(secondIndustryId),
                                    thirdIndustryId = string.IsNullOrEmpty(thirdIndustryId) ? 0 : Convert.ToInt32(thirdIndustryId),
                                    provinceNo = string.IsNullOrEmpty(provinceNo) ? 0 : Convert.ToInt32(provinceNo),
                                    cityNo = string.IsNullOrEmpty(cityNo) ? 0 : Convert.ToInt32(cityNo),
                                    countyNo = string.IsNullOrEmpty(countyNo) ? 0 : Convert.ToInt32(countyNo)
                                };
                                atobo.FastDefaultStringReplace<Company_atobo>();
                                db.Company_atobo.Add(atobo);
                                db.SaveChanges();
                                result = "{ \"result\": true,\"msg\": \"修改成功!\"}";
                            }
                        }
                    }
                    else
                    {
                        result = "{ \"result\": false,\"msg\": \"请先补充公司资料!\"}";
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return result;
        }
        public string UpdateB2b(HttpContext context)
        {
            string result = "";
            string firstIndustryId = context.Request["Classification1"];
            string secondIndustryId = context.Request["Classification2"];
            string thirdIndustryId = context.Request["Classification3"];
            string provinceId = context.Request["Region1"];
            string cityId = context.Request["Region2"];
            string countyId = context.Request["Region3"];
            string modelId = context.Request["modelId"];
            string peopleId = context.Request["peopleId"];
            string studyNumId = context.Request["studyNumId"];
            string regFundsId = context.Request["regFundsId"];
            string salesAmountId = context.Request["salesAmountId"];
            string exportAmountId = context.Request["exportAmountId"];
            string propertyId = context.Request["propertyId"];
            try
            {
                if (GetUser() == false)
                {
                    return "{ \"result\": false,\"msg\": \"个人资料必须填写完全!\"}";
                }
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    if (user.CompanyId != null)
                    {
                        using (var db = new UdowsYunPublicEntities())
                        {
                            int? started = db.Company.Find(user.CompanyId)?.stateId;
                            if (started == null || started != 2)
                            {
                                return "{ \"result\": false,\"msg\": \"审核没有通过!\"}";
                            }
                            var list = db.Company_b2b168.Where(p => p.companyNo == user.CompanyId).ToList();
                            if (list.Any())
                            {
                                foreach (var val in list)
                                {
                                    Company_b2b168 c = db.Company_b2b168.Find(val.id);
                                    c.firstIndustryId = string.IsNullOrEmpty(firstIndustryId) ? 0 : Convert.ToInt32(firstIndustryId);
                                    c.secondIndustryId = string.IsNullOrEmpty(secondIndustryId) ? 0 : Convert.ToInt32(secondIndustryId);
                                    c.thirdIndustryId = string.IsNullOrEmpty(thirdIndustryId) ? 0 : Convert.ToInt32(thirdIndustryId);
                                    c.provinceId = string.IsNullOrEmpty(provinceId) ? 0 : Convert.ToInt32(provinceId);
                                    c.cityId = string.IsNullOrEmpty(cityId) ? 0 : Convert.ToInt32(cityId);
                                    c.countyId = string.IsNullOrEmpty(countyId) ? 0 : Convert.ToInt32(countyId);
                                    c.modelId = string.IsNullOrEmpty(modelId) ? 0 : Convert.ToInt32(modelId);
                                    c.peopleId = string.IsNullOrEmpty(peopleId) ? 0 : Convert.ToInt32(peopleId);
                                    c.studyNumId = string.IsNullOrEmpty(studyNumId) ? 0 : Convert.ToInt32(studyNumId);
                                    c.regFundsId = string.IsNullOrEmpty(regFundsId) ? 0 : Convert.ToInt32(regFundsId);
                                    c.salesAmountId = string.IsNullOrEmpty(salesAmountId) ? 0 : Convert.ToInt32(salesAmountId);
                                    c.exportAmountId = string.IsNullOrEmpty(exportAmountId) ? 0 : Convert.ToInt32(exportAmountId);
                                    c.propertyId = string.IsNullOrEmpty(propertyId) ? 0 : Convert.ToInt32(propertyId);
                                    db.SaveChanges();
                                    result = "{ \"result\": true,\"msg\": \"修改成功!\"}";
                                }
                            }
                            else
                            {
                                Company_b2b168 b2b = new Company_b2b168
                                {
                                    companyNo = Convert.ToInt32(user.CompanyId),
                                    username = "u" + DateTime.Now.ToString("yyyyMMddhhmmss"),
                                    password = CommonHelper.Str_char(8, false),
                                    firstIndustryId = string.IsNullOrEmpty(firstIndustryId) ? 0 : Convert.ToInt32(firstIndustryId),
                                    secondIndustryId = string.IsNullOrEmpty(secondIndustryId) ? 0 : Convert.ToInt32(secondIndustryId),
                                    thirdIndustryId = string.IsNullOrEmpty(thirdIndustryId) ? 0 : Convert.ToInt32(thirdIndustryId),
                                    provinceId = string.IsNullOrEmpty(provinceId) ? 0 : Convert.ToInt32(provinceId),
                                    cityId = string.IsNullOrEmpty(cityId) ? 0 : Convert.ToInt32(cityId),
                                    countyId = string.IsNullOrEmpty(countyId) ? 0 : Convert.ToInt32(countyId),
                                    modelId = string.IsNullOrEmpty(modelId) ? 0 : Convert.ToInt32(modelId),
                                    peopleId = string.IsNullOrEmpty(peopleId) ? 0 : Convert.ToInt32(peopleId),
                                    studyNumId = string.IsNullOrEmpty(studyNumId) ? 0 : Convert.ToInt32(studyNumId),
                                    regFundsId = string.IsNullOrEmpty(regFundsId) ? 0 : Convert.ToInt32(regFundsId),
                                    salesAmountId = string.IsNullOrEmpty(salesAmountId) ? 0 : Convert.ToInt32(salesAmountId),
                                    exportAmountId = string.IsNullOrEmpty(exportAmountId) ? 0 : Convert.ToInt32(exportAmountId),
                                    propertyId = string.IsNullOrEmpty(propertyId) ? 0 : Convert.ToInt32(propertyId)
                                };
                                b2b.FastDefaultStringReplace<Company_b2b168>();
                                db.Company_b2b168.Add(b2b);
                                db.SaveChanges();
                                result = "{ \"result\": true,\"msg\": \"添加成功!\"}";
                            }
                        }
                    }
                    else
                    {
                        result = "{ \"result\": false,\"msg\": \"请先补充公司资料!\"}";
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return result;
        }
        public string UpdateGtobal(HttpContext context)
        {
            string result = "";
            string corporation = context.Request["corporation"];
            string modeId = context.Request["modeId"];
            string firstIndustryId = context.Request["Classification1"];
            string secondIndustryId = context.Request["Classification2"];
            string thirdIndustryId = context.Request["Classification3"];
            string fourthIndustryId = context.Request["Classification4"];
            string fifthIndustryId = context.Request["Classification5"];
            string provinceNo = context.Request["Region1"];
            string cityNo = context.Request["Region2"];
            try
            {
                if (GetUser() == false)
                {
                    return "{ \"result\": false,\"msg\": \"个人资料必须填写完全!\"}";
                }
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    if (user.CompanyId != null)
                    {
                        using (var db = new UdowsYunPublicEntities())
                        {
                            int? started = db.Company.Find(user.CompanyId)?.stateId;
                            if (started == null || started != 2)
                            {
                                return "{ \"result\": false,\"msg\": \"审核没有通过!\"}";
                            }
                            var list = db.Company_gtobal.Where(p => p.companyNo == user.CompanyId).ToList();
                            if (list.Any())
                            {
                                foreach (var val in list)
                                {
                                    Company_gtobal c = db.Company_gtobal.Find(val.id);
                                    c.firstIndustryId = string.IsNullOrEmpty(firstIndustryId) ? 0 : Convert.ToInt32(firstIndustryId);
                                    c.secondIndustryId = string.IsNullOrEmpty(secondIndustryId) ? 0 : Convert.ToInt32(secondIndustryId);
                                    c.thirdIndustryId = string.IsNullOrEmpty(thirdIndustryId) ? 0 : Convert.ToInt32(thirdIndustryId);
                                    c.fourthIndustryId = string.IsNullOrEmpty(fourthIndustryId) ? 0 : Convert.ToInt32(fourthIndustryId);
                                    c.fifthIndustryId = string.IsNullOrEmpty(fifthIndustryId) ? 0 : Convert.ToInt32(fifthIndustryId);
                                    c.provinceId = string.IsNullOrEmpty(provinceNo) ? 0 : Convert.ToInt32(provinceNo);
                                    c.cityId = string.IsNullOrEmpty(cityNo) ? 0 : Convert.ToInt32(cityNo);
                                    c.modeId = string.IsNullOrEmpty(modeId) ? 0 : Convert.ToInt32(modeId);
                                    c.corporation = corporation;
                                    db.SaveChanges();
                                    result = "{ \"result\": true,\"msg\": \"修改成功!\"}";
                                }
                            }
                            else
                            {
                                Company_gtobal atobo = new Company_gtobal
                                {
                                    companyNo = Convert.ToInt32(user.CompanyId),
                                    username = "u" + DateTime.Now.ToString("yyyyMMddhhmmss"),
                                    password = CommonHelper.Str_char(8, false),
                                    firstIndustryId = string.IsNullOrEmpty(firstIndustryId) ? 0 : Convert.ToInt32(firstIndustryId),
                                    secondIndustryId = string.IsNullOrEmpty(secondIndustryId) ? 0 : Convert.ToInt32(secondIndustryId),
                                    thirdIndustryId = string.IsNullOrEmpty(thirdIndustryId) ? 0 : Convert.ToInt32(thirdIndustryId),
                                    fourthIndustryId = string.IsNullOrEmpty(fourthIndustryId) ? 0 : Convert.ToInt32(fourthIndustryId),
                                    fifthIndustryId = string.IsNullOrEmpty(fifthIndustryId) ? 0 : Convert.ToInt32(fifthIndustryId),
                                    provinceId = string.IsNullOrEmpty(provinceNo) ? 0 : Convert.ToInt32(provinceNo),
                                    cityId = string.IsNullOrEmpty(cityNo) ? 0 : Convert.ToInt32(cityNo),
                                    modeId = string.IsNullOrEmpty(modeId) ? 0 : Convert.ToInt32(modeId),
                                    corporation = corporation
                                };
                                atobo.FastDefaultStringReplace<Company_gtobal>();
                                db.Company_gtobal.Add(atobo);
                                db.SaveChanges();
                                result = "{ \"result\": true,\"msg\": \"添加成功!\"}";
                            }
                        }
                    }
                    else
                    {
                        result = "{ \"result\": false,\"msg\": \"请先补充公司资料!\"}";
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return result;
        }
        public string UpdateJqw(HttpContext context)
        {
            string result = "";
            string companyTypeId = context.Request["companyTypeId"];
            string businessModelId = context.Request["businessModelId"];
            string businessRoleId = context.Request["businessRoleId"];
            string firstIndustryId = context.Request["Classification1"];
            string secondIndustryId = context.Request["Classification2"];
            string thirdIndustryId = context.Request["Classification3"];
            string provinceNo = context.Request["Region1"];
            string cityNo = context.Request["Region2"];
            string countyId = context.Request["Region3"];
            try
            {
                if (GetUser() == false)
                {
                    return "{ \"result\": false,\"msg\": \"个人资料必须填写完全!\"}";
                }
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    if (user.CompanyId != null)
                    {
                        using (var db = new UdowsYunPublicEntities())
                        {
                            int? started = db.Company.Find(user.CompanyId)?.stateId;
                            if (started == null || started != 2)
                            {
                                return "{ \"result\": false,\"msg\": \"审核没有通过!\"}";
                            }
                            var list = db.Company_jqw.Where(p => p.companyId == user.CompanyId).ToList();
                            if (list.Any())
                            {
                                foreach (var val in list)
                                {
                                    Company_jqw c = db.Company_jqw.Find(val.id);
                                    c.firstIndustryId = string.IsNullOrEmpty(firstIndustryId) ? 0 : Convert.ToInt32(firstIndustryId);
                                    c.secondIndustryId = string.IsNullOrEmpty(secondIndustryId) ? 0 : Convert.ToInt32(secondIndustryId);
                                    c.thirdIndustryId = string.IsNullOrEmpty(thirdIndustryId) ? 0 : Convert.ToInt32(thirdIndustryId);
                                    c.provinceId = string.IsNullOrEmpty(provinceNo) ? 0 : Convert.ToInt32(provinceNo);
                                    c.cityId = string.IsNullOrEmpty(cityNo) ? 0 : Convert.ToInt32(cityNo);
                                    c.countyId = string.IsNullOrEmpty(countyId) ? 0 : Convert.ToInt32(countyId);
                                    c.companyTypeId = string.IsNullOrEmpty(companyTypeId) ? 0 : Convert.ToInt32(companyTypeId);
                                    c.businessModelId = string.IsNullOrEmpty(businessModelId) ? 0 : Convert.ToInt32(businessModelId);
                                    c.businessRoleId = string.IsNullOrEmpty(businessRoleId) ? 0 : Convert.ToInt32(businessRoleId);
                                    db.SaveChanges();
                                    result = "{ \"result\": true,\"msg\": \"修改成功!\"}";
                                }
                            }
                            else
                            {
                                string strEmail = db.Company.Find(user.CompanyId).email;
                                Company_jqw jqw = new Company_jqw
                                {
                                    companyId = Convert.ToInt32(user.CompanyId),
                                    username = strEmail,
                                    password = CommonHelper.Str_char(8, false),
                                    firstIndustryId = string.IsNullOrEmpty(firstIndustryId) ? 0 : Convert.ToInt32(firstIndustryId),
                                    secondIndustryId = string.IsNullOrEmpty(secondIndustryId) ? 0 : Convert.ToInt32(secondIndustryId),
                                    thirdIndustryId = string.IsNullOrEmpty(thirdIndustryId) ? 0 : Convert.ToInt32(thirdIndustryId),
                                    provinceId = string.IsNullOrEmpty(provinceNo) ? 0 : Convert.ToInt32(provinceNo),
                                    cityId = string.IsNullOrEmpty(cityNo) ? 0 : Convert.ToInt32(cityNo),
                                    countyId = string.IsNullOrEmpty(countyId) ? 0 : Convert.ToInt32(countyId),
                                    companyTypeId = string.IsNullOrEmpty(companyTypeId) ? 0 : Convert.ToInt32(companyTypeId),
                                    businessModelId = string.IsNullOrEmpty(businessModelId) ? 0 : Convert.ToInt32(businessModelId),
                                    businessRoleId = string.IsNullOrEmpty(businessRoleId) ? 0 : Convert.ToInt32(businessRoleId)
                                };
                                jqw.FastDefaultStringReplace<Company_jqw>();
                                db.Company_jqw.Add(jqw);
                                db.SaveChanges();
                                result = "{ \"result\": true,\"msg\": \"添加成功!\"}";
                            }
                        }
                    }
                    else
                    {
                        result = "{ \"result\": false,\"msg\": \"请先补充公司资料!\"}";
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return result;
        }
        public string SelectSole(HttpContext context)
        {
            string result = "";
            try
            {
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    if (user.CompanyId != null)
                    {
                        using (var db = new UdowsYunPublicEntities())
                        {
                            List<Company_51sole> sole = db.Company_51sole.Where(p => p.companyId == user.CompanyId).ToList();
                            if (sole.Count > 0)
                            {
                                result = "{ \"result\": true,\"msg\":" + JsonConvert.SerializeObject(sole) + "}";
                            }
                        }
                    }
                    else
                    {
                        result = "{ \"result\": false,\"msg\": \"请先补充公司资料!\"}";
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return result;
        }
        public string SelectInfo(HttpContext context)
        {
            string result = "";
            try
            {
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    if (user.CompanyId != null)
                    {
                        using (var db = new UdowsYunPublicEntities())
                        {
                            List<Company_99inf> sole = db.Company_99inf.Where(p => p.companyId == user.CompanyId).ToList();
                            if (sole.Count > 0)
                            {
                                result = "{ \"result\": true,\"msg\":" + JsonConvert.SerializeObject(sole) + "}";
                            }
                        }
                    }
                    else
                    {
                        result = "{ \"result\": false,\"msg\": \"请先补充公司资料!\"}";
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return result;
        }
        public string SelectAtobo(HttpContext context)
        {
            string result = "";
            try
            {
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    if (user.CompanyId != null)
                    {
                        using (var db = new UdowsYunPublicEntities())
                        {
                            List<Company_atobo> sole = db.Company_atobo.Where(p => p.companyId == user.CompanyId).ToList();
                            if (sole.Count > 0)
                            {
                                result = "{ \"result\": true,\"msg\":" + JsonConvert.SerializeObject(sole) + "}";
                            }
                        }
                    }
                    else
                    {
                        result = "{ \"result\": false,\"msg\": \"请先补充公司资料!\"}";
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return result;
        }
        public string SelectGtobal(HttpContext context)
        {
            string result = "";
            try
            {
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    if (user.CompanyId != null)
                    {
                        using (var db = new UdowsYunPublicEntities())
                        {
                            List<Company_gtobal> sole = db.Company_gtobal.Where(p => p.companyNo == user.CompanyId).ToList();
                            if (sole.Count > 0)
                            {
                                result = "{ \"result\": true,\"msg\":" + JsonConvert.SerializeObject(sole) + "}";
                            }
                        }
                    }
                    else
                    {
                        result = "{ \"result\": false,\"msg\": \"请先补充公司资料!\"}";
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return result;
        }
        public string SelectJqw(HttpContext context)
        {
            string result = "";
            try
            {
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    if (user.CompanyId != null)
                    {
                        using (var db = new UdowsYunPublicEntities())
                        {
                            List<Company_jqw> sole = db.Company_jqw.Where(p => p.companyId == user.CompanyId).ToList();
                            if (sole.Count > 0)
                            {
                                result = "{ \"result\": true,\"msg\":" + JsonConvert.SerializeObject(sole) + "}";
                            }
                        }
                    }
                    else
                    {
                        result = "{ \"result\": false,\"msg\": \"请先补充公司资料!\"}";
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return result;
        }
        public string Selectb2b(HttpContext context)
        {
            string result = "";
            try
            {
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    if (user.CompanyId != null)
                    {
                        using (var db = new UdowsYunPublicEntities())
                        {
                            List<Company_b2b168> sole = db.Company_b2b168.Where(p => p.companyNo == user.CompanyId).ToList();
                            if (sole.Count > 0)
                            {
                                result = "{ \"result\": true,\"msg\":" + JsonConvert.SerializeObject(sole) + "}";
                            }
                        }
                    }
                    else
                    {
                        result = "{ \"result\": false,\"msg\": \"请先补充公司资料!\"}";
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return result;
        }
        public bool GetUser()
        {
            bool strReult = true;
            try
            {
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        List<Company> n = db.Company.Where(p => p.userId == user.id).ToList();
                        if (n.Any())
                        {
                            foreach (var val in n)
                            {
                                if (string.IsNullOrWhiteSpace(val.realName)) { strReult = false; }
                                if (string.IsNullOrWhiteSpace(val.mobile)) { strReult = false; }
                                if (string.IsNullOrWhiteSpace(val.phone)) { strReult = false; }
                                if (string.IsNullOrWhiteSpace(val.sex)) { strReult = false; }
                                if (string.IsNullOrWhiteSpace(val.post)) { strReult = false; }
                                if (string.IsNullOrWhiteSpace(val.qq)) { strReult = false; }
                                if (string.IsNullOrWhiteSpace(val.email)) { strReult = false; }
                                if (string.IsNullOrWhiteSpace(val.address)) { strReult = false; }
                                if (string.IsNullOrWhiteSpace(val.zip)) { strReult = false; }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                strReult = false;
            }
            return strReult;
        }
        public class Industry
        {
            public int id { get; set; }
            public int code { get; set; }
            public string name { get; set; }
        }

        public class BIndustry
        {
            public int id { get; set; }
            public long code { get; set; }
            public string name { get; set; }
        }
        public bool IsReusable => false;
    }
}