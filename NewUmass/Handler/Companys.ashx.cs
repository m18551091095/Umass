using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.SessionState;
using Newtonsoft.Json;
using NewUmass.Models;
using UInfoManager.Utility;
using Utility;
namespace NewUmass.Handler
{
    /// <summary>
    /// Company 的摘要说明
    /// </summary>
    public class Companys : IHttpHandler, IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            string str_result = "";
            string str_doType = context.Request["doType"];
            if (!string.IsNullOrWhiteSpace(str_doType))
            {
                switch (str_doType)
                {
                    case "Update":
                        str_result = Update(context);
                        break;
                    case "Select":
                        str_result = Select(context);
                        break;
                }
            }
            context.Response.Write(str_result);
        }

        public string Update(HttpContext context)
        {
            string strResult = "";
            string companyName = context.Request["companyName"];
            string shortName = context.Request["shortName"];
            string domain = context.Request["domain"];
            string companyAddress = context.Request["companyAddress"];
            string mainProducts = context.Request["mainProducts"];
            string mainBrands = context.Request["mainBrands"];
            string keywords = context.Request["keywords"];
            string companyDesc = context.Request["companyDesc"];
            string companyPhone = context.Request["companyPhone"];
            string companyEmail = context.Request["companyEmail"];
            string companyFax = context.Request["companyFax"];
            try
            {
                if (companyAddress.Length < 7)
                {
                   return "{ \"result\": false,\"msg\": \"公司地址长度不正确!\"}";
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
                        var n = db.Company.Where(p => p.userId == user.id).ToList();
                        if (!n.Any())
                        {
                            Company c = new Company
                            {
                                //用户ID
                                userId = user.id,
                                //公司名称
                                companyName = companyName,
                                //公司简称
                                shortName = shortName,
                                //域名
                                domain = domain,
                                //公司地址
                                companyAddress = companyAddress,
                                //主营产品
                                mainProducts = mainProducts,
                                //主要品牌
                                mainBrands = mainBrands,
                                //关键词
                                keywords = keywords,
                                //公司介绍
                                companyDesc = companyDesc,
                                //公司手机号
                                companyPhone = companyPhone,
                                //公司Email
                                companyEmail = companyEmail,
                                //公司传真
                                companyFax = companyFax,
                                //审核状态
                                stateId = 1,
                            };
                            c.FastDefaultStringReplace<Company>();
                            db.Company.Add(c);
                            db.SaveChanges();
                            strResult = "{ \"result\": true,\"msg\": \"修改成功!\"}";
                        }
                        else
                        {
                            foreach (var item in n)
                            {
                                //用户ID
                                item.userId = user.id;
                                //公司名称
                                item.companyName = companyName;
                                //公司简称
                                item.shortName = shortName;
                                //域名
                                item.domain = domain;
                                //公司地址
                                item.companyAddress = companyAddress;
                                //主营产品
                                item.mainProducts = mainProducts;
                                //主要品牌
                                item.mainBrands = mainBrands;
                                //关键词
                                item.keywords = keywords;
                                //公司介绍
                                item.companyDesc = companyDesc;
                                //公司手机号
                                item.companyPhone = companyPhone;
                                //公司Email
                                item.companyEmail = companyEmail;
                                //公司传真
                                item.companyFax = companyFax;
                                db.SaveChanges();
                                strResult = "{ \"result\": true,\"msg\": \"修改成功!\"}";
                            }
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

        public static string PostUrl(string[] urls)
        {
            string strResult = "";
            try
            {
                string formUrl = " http://data.zz.baidu.com/urls?site=https://www.uz360.cn&token=E3yHWWQWIby8ihCY";

                string formData = "";

                foreach (string url in urls)
                {
                    formData += url + "\n";
                }

                byte[] postData = System.Text.Encoding.UTF8.GetBytes(formData);

                // 设置提交的相关参数 
                var request = WebRequest.Create(formUrl) as HttpWebRequest;
                System.Text.Encoding unused = System.Text.Encoding.UTF8;
                if (request != null)
                {
                    request.Method = "POST";
                    request.KeepAlive = false;
                    request.AllowAutoRedirect = true;
                    request.ContentType = "text/plain";
                    request.UserAgent = "curl/7.12.1";
                    request.ContentLength = postData.Length;
                    // 提交请求数据 
                    var outputStream = request.GetRequestStream();
                    outputStream.Write(postData, 0, postData.Length);
                    outputStream.Close();
                    Stream responseStream = null;
                    string srcString;
                    if (request.GetResponse() is HttpWebResponse response) responseStream = response.GetResponseStream();
                    var reader = new StreamReader(responseStream ?? throw new InvalidOperationException(), System.Text.Encoding.GetEncoding("UTF-8"));
                    srcString = reader.ReadToEnd();
                    string result = srcString; //返回值赋值
                    reader.Close();

                    strResult = result;
                }
            }
            catch (Exception ex)
            {
                strResult = ex.Message;
            }
            return strResult;
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