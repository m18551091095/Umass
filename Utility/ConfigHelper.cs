//=====================================================================================
// All Rights Reserved , Copyright © Learun 2013
//=====================================================================================

using System.Configuration;
using System.Web;

namespace Utility
{
    /// <summary>
    ///  Config 公共帮助类
    /// 版本：2.0
    /// <author>
    ///		<name>LiuDong</name>
    ///		<date>2013.09.27</date>
    /// </author>
    /// </summary>
    public class ConfigHelper
    {
        /// <summary>
        /// 根据Key取Value值
        /// </summary>
        /// <param name="key"></param>
        public static string GetValue(string key)
        {
            return ConfigurationManager.AppSettings[key].Trim();
        }

        /// <summary>
        /// 根据Key修改Value
        /// </summary>
        /// <param name="key">要修改的Key</param>
        /// <param name="value">要修改为的值</param>
        public static void SetValue(string key, string value)
        {
            System.Xml.XmlDocument xDoc = new System.Xml.XmlDocument();
            xDoc.Load(HttpContext.Current.Server.MapPath("/XmlConfig/Config.xml"));
            System.Xml.XmlNode xNode;
            System.Xml.XmlElement xElem1;
            System.Xml.XmlElement xElem2;
            xNode = xDoc.SelectSingleNode("//appSettings");

            if (xNode != null)
            {
                xElem1 = (System.Xml.XmlElement) xNode.SelectSingleNode("//add[@key='" + key + "']");
                if (xElem1 != null) xElem1.SetAttribute("value", value);
                else
                {
                    xElem2 = xDoc.CreateElement("add");
                    xElem2.SetAttribute("key", key);
                    xElem2.SetAttribute("value", value);
                    xNode.AppendChild(xElem2);
                }
            }

            xDoc.Save(HttpContext.Current.Server.MapPath("/XmlConfig/Config.xml"));
        }
    }
}
