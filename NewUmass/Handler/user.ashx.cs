using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.ServiceModel.PeerResolvers;
using System.Web;
using System.Web.SessionState;
using Newtonsoft.Json;
using NewUmass.Models;
using UInfoManager.Utility;
using Utility;

namespace NewUmass.Handler
{
    /// <summary>
    /// user 的摘要说明
    /// </summary>
    public class user : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            string str_result = "";
            string str_doType = context.Request.Params["doType"];
            switch (str_doType)
            {
                case "Register":
                    str_result = Register(context);
                    break;
                case "Update":
                    str_result = Update(context);
                    break;
                case "Select":
                    str_result = Select(context);
                    break;
                case "index":
                    str_result = Index(context);
                    break; ;
            }
            context.Response.Write(str_result);
        }
        public  string Index(HttpContext context)
        {
            string result = "";
            var user =  RequestSession.GetSessionUser();
            if(user ==null)
            {
                result = "{ \"result\": false,\"msg\": \"2!\"}";
            }
            return result;
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
                        string newsLabel = "";
                        var n = db.Company.Where(p => p.userId == user.id).ToList();
                        if (n.Any())
                        {
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
            string realName = context.Request["realName"];
            string post = context.Request["post"];
            string sex = string.IsNullOrWhiteSpace(context.Request["Sexs"]) ? "男" : context.Request["Sexs"];
            string mobile = context.Request["mobile"];
            string phone = context.Request["phone"];
            string qq = context.Request["qq"];
            string email = context.Request["email"];
            string address = context.Request["address"];
            string zip = context.Request["zip"];
            try
            {
                if (address.Length < 7)
                {
                    return "{ \"result\": false,\"msg\": \"地址长度不正确!\"}";
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
                        string newsLabel = "";
                        List<Company> n = db.Company.Where(p => p.userId == user.id).ToList();
                        if (n.Any())
                        {
                            foreach (var val in n)
                            {
                                var c = db.Company.Find(val.id);
                                c.realName = realName.Trim().Replace(" ", "");
                                c.post = post.Trim().Replace(" ", "");
                                c.sex = sex.Trim().Replace(" ", "");
                                c.mobile = mobile.Trim().Replace(" ", "");
                                c.phone = phone.Trim().Replace(" ", "");
                                c.qq = qq.Trim().Replace(" ", "");
                                c.email = email.Trim().Replace(" ", "");
                                c.address = address.Trim().Replace(" ", "");
                                c.zip = zip.Trim().Replace(" ", "");
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
        public string Register(HttpContext context)
        {
            string result = "";
            string username = context.Request["username"];
            string password = context.Request["password"];
            try
            {
                using (var db = new UdowsYunPublicEntities())
                {
                    int num = db.User.Count(p => p.username == username);
                    if (num > 0)
                    {
                        result = "{ \"result\": false,\"msg\": \"当前账号已存在!\"}";
                    } 
                    else
                    {
                        User u = new User();
                        u.username = username;
                        u.password = password;
                        u.createTime = DateTimeHelper.ConvertDateTimeInt(DateTime.Now);
                        u.roleId = 3;
                        u.realName = "";
                        db.User.Add(u);
                        db.SaveChanges();
                        result = "{ \"result\": true,\"msg\": \"注册成功!\"}";
                    }
                }
            }
            catch (DbEntityValidationException e)
            {
                LogHelper lh = new LogHelper();
                lh.WriteLog(e.EntityValidationErrors.ToString());
                result = "{ \"result\": false,\"msg\": \"" + e.EntityValidationErrors + "\"}";
            }
            return result;
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}