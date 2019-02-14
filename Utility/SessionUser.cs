//=====================================================================================
// All Rights Reserved , Copyright © Learun 2013
//=====================================================================================

using System.Collections.Generic;

namespace Utility
{
    /// <summary>
    /// 存 Session对象
    /// </summary>
    public class SessionUser
    {
        /// <summary>
        /// 编号
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 登陆账户
        /// </summary>
        public string username { get; set; }
        /// <summary>
        /// 登陆密码
        /// </summary>
        public string password { get; set; }
        /// <summary>
        /// 真实姓名
        /// </summary>
        public string realName { get; set; }

        /// <summary>
        /// 权限
        /// </summary>
        public int? roleId { get; set; }

        /// <summary>
        /// 公司id
        /// </summary>
        public int? CompanyId { get; set; }
    }
}
