using System;
using System.IO;
using System.Text;

namespace Utility
{
    public class Logger
    {
        public static void Write(object logStr, int logType)
        {
            try
            {
                string log = string.Format("{0}{1}\r{2}\r\n", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss."), DateTime.Now.Millisecond.ToString("000"), logStr.ToString());
                string path = AppDomain.CurrentDomain.BaseDirectory + "\\log";
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                string fileName = string.Format("{0}\\log{1}.{2}.txt", path, logType, DateTime.Now.ToString("yyyyMMdd"));
                using (FileStream stream = new FileStream(fileName, FileMode.Append, FileAccess.Write))
                {
                    using (StreamWriter writer = new StreamWriter(stream, Encoding.Default))
                    {
                        writer.WriteLine(log);
                    }
                }
            }
            catch
            {

            }
        }
    }
}