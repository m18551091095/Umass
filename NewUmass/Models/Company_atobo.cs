//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace NewUmass.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Company_atobo
    {
        public int id { get; set; }
        public int companyId { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public int cityId { get; set; }
        public int addressId { get; set; }
        public int licenseStateId { get; set; }
        public string licenseStateDetail { get; set; }
        public int dateStateId { get; set; }
        public string dateStateDetail { get; set; }
        public int provinceNo { get; set; }
        public int cityNo { get; set; }
        public int countyNo { get; set; }
        public int firstIndustryId { get; set; }
        public int secondIndustryId { get; set; }
        public int thirdIndustryId { get; set; }
        public string url { get; set; }
    }
}
