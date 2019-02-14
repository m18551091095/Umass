using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using Newtonsoft.Json;
using NewUmass.Models;
using NewUmass.ServiceReference1;
using UInfoManager.Utility;
using Utility;

namespace NewUmass.Handler
{
    /// <summary>
    /// UploadHandler 的摘要说明
    /// </summary>
    public class UploadHandler : IHttpHandler, IReadOnlySessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            string strResult = string.Empty;
            string doType = context.Request["doType"];
            if (!string.IsNullOrWhiteSpace(doType))
            {
                switch (doType)
                {
                    case "UpdateImage":
                        strResult = UpdateImage(context);
                        break;

                    case "UpSwiper":
                        strResult = UpSwiper(context);
                        break;
                    case "Uploads":
                        strResult = Uploads(context);
                        break;
                    case "ImageRequest":
                        strResult = ImageRequest(context);
                        break;
                }
            }
            context.Response.Write(strResult);
        }

        public string UpdateImage(HttpContext context)
        {
            var user = RequestSession.GetSessionUser();
            string result = "";
            try
            {
                var tag = context.Request["images"];
                if (user != null)
                {
                    string goodspath = ConfigurationManager.AppSettings["ImgUmasMapSrc"] + user.CompanyId + "\\";
                    string Webpath = ConfigurationManager.AppSettings["ImgUmasWebSrc"] + user.CompanyId + "/";
                    if (!string.IsNullOrEmpty(tag))
                    {
                        string path = Base64ToImage("data:image/jpeg;base64," + tag).Replace("\\", "/");
                        user = RequestSession.GetSessionUser();
                        if (user != null)
                        {
                            using (var db = new UdowsYunPublicEntities())
                            {
                                var id = db.Company.Where(p => p.userId == user.id).ToList();
                                foreach (var vals in id)
                                {
                                    ApiSoapClient a = new ApiSoapClient();
                                    string json = a.UploadLicense(vals.id, ImgaeFoByte(path));
                                    ImgTag it = JsonConvert.DeserializeObject<ImgTag>(json);
                                    if (it != null)
                                    {
                                        if (it.result == 1)
                                        {
                                            result = "{ \"code\": 0,\"msg\": \"\",\"data\": {\"src\": \"" + Webpath + it.name + "\"}}";
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else
                    {
                        result = "{ \"code\": 1,\"msg\": \"\",\"data\": {\"src\": \"\"}}";
                    }
                }
            }
            catch (Exception ex)
            {
                LogHelper lh = new LogHelper();
                lh.WriteLog(ex.Message);
                throw;
            }
            return result;
        }


        public string UpSwiper(HttpContext context)
        {
            string result = string.Empty;
            string imglist = "";
            try
            {
                List<object> list;

                list = JsonConvert.DeserializeObject<List<object>>(context.Request["params"]);
                if (list != null)
                {
                    foreach (var item in list)
                    {
                        var tag = JsonConvert.DeserializeObject<SwiperTag>(item.ToString().Replace("\r", "").Replace("\n", "").Replace("\\", ""));
                        string imgsrc = Base64ToImage(tag.ImgUrl).Replace("\\", "/");
                        imglist += "{\"img\": \" <img id='" + tag.id + "' src= '" + imgsrc + "' />\"},";
                    }
                    result = "{ \"code\": 0,\"msg\": \"\",\"data\":[" + imglist.Substring(0, imglist.Length - 1) + "] }";
                }
            }
            catch (Exception ex)
            {
                LogHelper lh = new LogHelper();
                lh.WriteLog(ex.Message);
                throw;
            }
            return result;
        }

        public string Uploads(HttpContext context)
        {
            string end = "{\"code\": 1,\"msg\": \"服务器故障\",\"url\": \"\"}"; //返回的json

            var file = context.Request.Files[0]; //获取选中文件
            if (file != null)
            {
                Stream stream = file.InputStream;    //将文件转为流

                Image img = Image.FromStream(stream);//将流中的图片转换为Image图片对象
                Random random = new Random((int)DateTime.Now.Ticks);

                //文件保存位置及命名，精确到毫秒并附带一组随机数，防止文件重名，数据库保存路径为此变量
                string extname = file.FileName.Substring(file.FileName.LastIndexOf('.'), (file.FileName.Length - file.FileName.LastIndexOf('.')));
                string tempName = Guid.NewGuid().ToString().Substring(0, 6) + random + extname;

                //路径映射为绝对路径
                string path = ConfigurationManager.AppSettings["ImgMapSrc"] + "/" + tempName;
                try
                {
                    img.Save(path, ImageFormat.Jpeg);//图片保存，JPEG格式图片较小

                    //保存成功后的json
                    end = "{\"code\": 0,\"msg\": \"成功\",\"url\": \"" + ConfigurationManager.AppSettings["ImgWebSrc"] + tempName + "\"}";
                }
                catch
                {
                    // ignored
                }
            }

            return end;

        }

        public string Base64ToImage(string base64String)
        {
            var imgPath = string.Empty;
            var path = string.Empty;
            var user = RequestSession.GetSessionUser();
            if (user != null)
            {
                string goodspath = ConfigurationManager.AppSettings["ImgUmasMapSrc"] + user.CompanyId;
                if (!Directory.Exists(goodspath))
                {
                    Directory.CreateDirectory(goodspath);
                }
                if (!string.IsNullOrEmpty(base64String))
                {
                    var splitBase = base64String.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                    path = goodspath + "\\" + DateTime.Now.ToString("yyyyMMddHHmmssfff") + ".png";
                    File.WriteAllBytes(path, Convert.FromBase64String(splitBase[1].ToString()));
                    imgPath += path + ";";
                }
                else { imgPath = ";"; }
            }
            return path.TrimEnd(';');
        }
        public string UmassBase64ToImage(string base64String)
        {
            var imgPath = string.Empty;
            var path = string.Empty;
            var user = RequestSession.GetSessionUser();
            if (user != null)
            {
                string goodspath = ConfigurationManager.AppSettings["ImgUmasMapSrc"] + user.CompanyId;
                if (!Directory.Exists(goodspath))
                {
                    Directory.CreateDirectory(goodspath);
                }
                if (!string.IsNullOrEmpty(base64String))
                {
                    var splitBase = base64String.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                    path = goodspath + "\\" + DateTime.Now.ToString("yyyyMMddHHmmssfff") + ".png";
                    File.WriteAllBytes(path, Convert.FromBase64String(splitBase[1].ToString()));
                    imgPath += path + ";";
                }
                else { imgPath = ";"; }
            }
            return path.TrimEnd(';');
        }
        public string ImageRequest(HttpContext context)
        {
            string strResult = "";
            string img = "";
            List<object> list = new List<object>();
            var user = RequestSession.GetSessionUser();
            if (user != null)
            {
                string goodspath = ConfigurationManager.AppSettings["ImgUmasMapSrc"] + user.CompanyId;
                if (!Directory.Exists(goodspath))
                {
                    Directory.CreateDirectory(goodspath);
                }
                list = JsonConvert.DeserializeObject<List<object>>(context.Request["images"]);
                for (int i = 0; i < list.Count; i++)
                {
                    var postedFile = list[i].ToString();
                    string imgpoth = Uploads(postedFile);
                    ApiSoapClient a = new ApiSoapClient();
                    string json = a.UploadInfoImg(Convert.ToInt32(user.CompanyId), ImgaeFoByte(imgpoth));
                    ImgTag it = JsonConvert.DeserializeObject<ImgTag>(json);
                    if (it != null)
                    {
                        if(it.result==1)
                        {
                            img += it.name + ",";
                        }
                    }
                }
                strResult = img.Substring(0, img.Length - 1);
            }
            else
            {
                strResult = "";
            }
            return strResult;
        }

        public string Uploads(string imgUrl)
        {
            string result = string.Empty;
            try
            {

                if (!string.IsNullOrEmpty(imgUrl))
                {
                    string path = UmassBase64ToImage(imgUrl).Replace("\\", "/");
                    result = path;
                }
            }
            catch (Exception ex)
            {
                LogHelper lh = new LogHelper();
                lh.WriteLog(ex.Message);
                throw;
            }
            return result;
        }

        public class ImgTag
        {
            public int result { get; set; }
            public string name { get; set; }
            public string msg { get; set; }
        }

        public class SwiperTag
        {
            public string id { get; set; }
            public string ImgUrl { get; set; }
        }

        public byte[] ImgaeFoByte(string imgurl)
        {
            byte[] buffter;
            using (FileStream fs = new FileStream(imgurl, FileMode.Open))
            {
                fs.Position = 0L;
                buffter = new byte[fs.Length];
                fs.Read(buffter, 0, Convert.ToInt32(fs.Length));
                fs.Flush();
            }
            return buffter;
        }
        /// <summary>
        /// 文件转Base64码
        /// </summary>
        /// <param name="fileLocation"></param>
        /// <returns></returns>
        public string ImgToBase64String(string fileLocation)
        {
            MemoryStream ms = new MemoryStream();
            try
            {
                Bitmap bmp = new Bitmap(fileLocation);
                bmp.Save(ms, ImageFormat.Jpeg);
                byte[] arr = new byte[ms.Length];
                ms.Position = 0;
                ms.Read(arr, 0, (int)ms.Length);
                return Convert.ToBase64String(arr);
            }
            catch (Exception)
            {
                return "";
            }
            finally
            {
                ms.Close();
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