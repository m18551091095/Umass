//=====================================================================================
// All Rights Reserved , Copyright © Learun 2013
//=====================================================================================

using System;
using System.IO;
using System.Net;
using System.Web;

namespace Utility
{
    /// <summary>
    /// Session 帮助类
    /// </summary>
    public class RequestSession
    {
        private static string SESSION_USER = "SESSION_USER";
        public static void AddSessionUser(SessionUser user)
        {
            HttpContext rq = HttpContext.Current;
            rq.Session[SESSION_USER] = user;
            rq.Session.Timeout = 120;
        }
        public static SessionUser GetSessionUser()
        {
            HttpContext rq = HttpContext.Current;
            return (SessionUser)rq.Session[SESSION_USER];
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
    }
}
