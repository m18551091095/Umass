using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace Udows.Manager.Themes.Scripts.UpdateLoadJS
{
    /// <summary>
    /// DeleteUpLoad 的摘要说明
    /// </summary>
    public class DeleteUpLoad : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string strFilePath = context.Request["FilePath"];
            try
            {
                if (!string.IsNullOrEmpty(strFilePath))
                {
                    if (File.Exists(HttpContext.Current.Server.MapPath(strFilePath)))
                    {
                        File.Delete(HttpContext.Current.Server.MapPath(strFilePath));
                    }
                }
                context.Response.Write("OK");
            }
#pragma warning disable CS0168 // 声明了变量“ex”，但从未使用过
            catch (Exception ex)
#pragma warning restore CS0168 // 声明了变量“ex”，但从未使用过
            {
                context.Response.Write("False");
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