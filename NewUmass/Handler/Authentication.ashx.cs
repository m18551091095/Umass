using System;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using Newtonsoft.Json;
using NewUmass.Models;
using Utility;

namespace NewUmass.Handler
{
    /// <summary>
    /// Authentication 的摘要说明
    /// </summary>
    public class Authentication : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            string str_result = "";
            string str_doType = context.Request["doType"];
            switch (str_doType)
            {
                case "Index":
                    str_result = Index(context);
                    break;
            }
            context.Response.Write(str_result);
        }

        public string Index(HttpContext context)
        {
            string result = "";
            string sql;
            try
            {
                DataTable dt = new DataTable();
                dt.Columns.Add("id");
                dt.Columns.Add("Name");
                dt.Columns.Add("Data");
                var user = RequestSession.GetSessionUser();
                if (user != null)
                {
                    using (var db = new UdowsYunPublicEntities())
                    {
                        sql = "select * from Company_51sole where companyId=" + user.CompanyId;
                        int sole = db.Database.SqlQuery<Company_51sole>(sql).Count();
                        if (sole > 0)
                        {
                            DataRow dr = dt.NewRow();
                            dr["id"] = user.id;
                            dr["Name"] = "51Sole";
                            dr["Data"] = "是";
                            dt.Rows.Add(dr);
                        }
                        else
                        {
                            DataRow dr = dt.NewRow();
                            dr["id"] = user.id;
                            dr["Name"] = "51Sole";
                            dr["Data"] = "否";
                            dt.Rows.Add(dr);
                        }
                        sql = "select * from Company_99inf where companyId=" + user.CompanyId;
                        int inf = db.Database.SqlQuery<Company_99inf>(sql).Count();
                        if (inf > 0)
                        {
                            DataRow dr = dt.NewRow();
                            dr["id"] = user.id;
                            dr["Name"] = "久久信息";
                            dr["Data"] = "是";
                            dt.Rows.Add(dr);
                        }
                        else
                        {
                            DataRow dr = dt.NewRow();
                            dr["id"] = user.id;
                            dr["Name"] = "久久信息";
                            dr["Data"] = "否";
                            dt.Rows.Add(dr);
                        }
                        sql = "select * from Company_atobo where companyId=" + user.CompanyId;
                        int atobo = db.Database.SqlQuery<Company_atobo>(sql).Count();
                        if (atobo > 0)
                        {
                            DataRow dr = dt.NewRow();
                            dr["id"] = user.id;
                            dr["Name"] = "阿土伯";
                            dr["Data"] = "是";
                            dt.Rows.Add(dr);
                        }
                        else
                        {
                            DataRow dr = dt.NewRow();
                            dr["id"] = user.id;
                            dr["Name"] = "阿土伯";
                            dr["Data"] = "否";
                            dt.Rows.Add(dr);
                        }
                        sql = "select * from Company_b2b168 where companyNo=" + user.CompanyId;
                        int b2b = db.Database.SqlQuery<Company_b2b168>(sql).Count();
                        if (b2b > 0)
                        {
                            DataRow dr = dt.NewRow();
                            dr["id"] = user.id;
                            dr["Name"] = "八方资源";
                            dr["Data"] = "是";
                            dt.Rows.Add(dr);
                        }
                        else
                        {
                            DataRow dr = dt.NewRow();
                            dr["id"] = user.id;
                            dr["Name"] = "八方资源";
                            dr["Data"] = "否";
                            dt.Rows.Add(dr);
                        }
                        sql = "select * from Company_gtobal where companyNo=" + user.CompanyId;
                        int gtobal = db.Database.SqlQuery<Company_gtobal>(sql).Count();
                        if (gtobal > 0)
                        {
                            DataRow dr = dt.NewRow();
                            dr["id"] = user.id;
                            dr["Name"] = "际通宝";
                            dr["Data"] = "是";
                            dt.Rows.Add(dr);
                        }
                        else
                        {
                            DataRow dr = dt.NewRow();
                            dr["id"] = user.id;
                            dr["Name"] = "际通宝";
                            dr["Data"] = "否";
                            dt.Rows.Add(dr);
                        }
                        sql = "select * from Company_jqw where companyId=" + user.CompanyId;
                        int jqw = db.Database.SqlQuery<Company_jqw>(sql).Count();
                        if (jqw > 0)
                        {
                            DataRow dr = dt.NewRow();
                            dr["id"] = user.id;
                            dr["Name"] = "金泉网";
                            dr["Data"] = "是";
                            dt.Rows.Add(dr);
                        }
                        else
                        {
                            DataRow dr = dt.NewRow();
                            dr["id"] = user.id;
                            dr["Name"] = "金泉网";
                            dr["Data"] = "否";
                            dt.Rows.Add(dr);
                        }
                    }
                }
                result = "{\"code\":0,\"msg\":\"\",\"count\":6,\"data\":" + JsonConvert.SerializeObject(dt) + "}";
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
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