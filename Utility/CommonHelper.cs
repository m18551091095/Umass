using System;
using System.Text;
using System.Text.RegularExpressions;

namespace Utility
{
    public class CommonHelper
    {
        /// <summary>
        /// 去除新闻文本中的html标签
        /// </summary>
        /// <param name="Content"></param>
        /// <returns></returns>
        public static string ReplaceHtml(string Content)
        {
            Regex regex = new Regex(@"<(.|\n)+?>");
            Content = (Content == null ? "" : regex.Replace(Content, ""));
            return Content;
        }

        public static long ToTimeStamp(string dt)
        {
            DateTime timeNeed = DateTime.Parse(dt);
            System.DateTime startTime = TimeZone.CurrentTimeZone.ToLocalTime(new System.DateTime(1970, 1, 1)); // 当地时区
            long timeStamp = (long)(timeNeed - startTime).TotalSeconds; // 相差秒数
            return timeStamp;
        }

        public static string Str_char(int Length, bool Sleep)
        {
            if (Sleep) System.Threading.Thread.Sleep(3);
            string AllCode = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
            string[] CodeArray = AllCode.Split(',');
            string result = "";
            int n = CodeArray.Length;
            System.Random random = new Random(~unchecked((int)DateTime.Now.Ticks));
            for (int i = 0; i < Length; i++)
            {
                int rnd = random.Next(0, n);
                result += CodeArray[rnd];
            }
            return result;
        }
    }
}