using System;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using NewUmass.Models;
using NewUmass.ServiceReference1;
using UInfoManager.Utility;
using Utility;

namespace NewUmass.Handler
{
    /// <summary>
    /// login 的摘要说明
    /// </summary>
    public class login : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string pagetype = context.Request["pageType"];
            switch (pagetype)
            {
                case "getUser":
                    {
                        //ApiSoapClient a = new ApiSoapClient();
                        //string imgList = a.GetCacheList(1);
                        string loginname = context.Request["loginname"];
                        string loginpsw = context.Request["loginpsw"];
                        try
                        {
                            using (var db = new UdowsYunPublicEntities())
                            {
                                var loginuser = db.User.Where(p => p.username == loginname).ToList();
                                if (loginuser.Count > 0)
                                {
                                    foreach (var val in loginuser)
                                    {
                                        if (loginpsw == val.password)
                                        {
                                            SessionUser user = new SessionUser();
                                            user.id = val.id;
                                            user.username = val.username;
                                            user.password = val.password;
                                            user.realName = val.realName;
                                            user.roleId = val.roleId;
                                            var intem = db.Company.Where(p => p.userId == val.id).ToList();
                                            foreach (var iem in intem)
                                            {
                                                user.CompanyId = iem.id;
                                            }
                                            RequestSession.AddSessionUser(user);
                                            context.Response.Write("");
                                        }
                                        else
                                        {
                                            context.Response.Write("用户密码错误！");
                                        }
                                    }
                                }
                                else
                                {
                                    context.Response.Write("用户不存在！");
                                }
                            }
                        }
                        catch (Exception ex)
                        {
                            LogHelper lh = new LogHelper();
                            lh.WriteLog(ex.Message.ToString());
                            context.Response.Write("数据库连接出错！");
                            throw;
                        }
                    }
                    break;
                case "LoginOut":
                    HttpContext rq = HttpContext.Current;
                    rq.Session["SESSION_USER"] = null;
                    context.Response.Write("{ \"result\": true,\"msg\": \"1\"}");
                    break;
            }
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