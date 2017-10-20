using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ManageNotification.EntityModels
{
    public class ChienDichTruyenThongRequestEM
    { 
        public string AutoID { get; set; }
        public string HINH_THUC_TRUYEN_THONG { get; set; }
        public string PHAM_VI { get; set; }
        public string KHU_VUC_ID { get; set; } 
        public Nullable<System.DateTime> TU_NGAY { get; set; }
        public Nullable<System.DateTime> DEN_NGAY { get; set; }
        public string TINH_ID { get; set; }
        public string HUYEN_ID { get; set; }
        public string XA_ID { get; set; }
        public string DOI_TUONG { get; set; }
    }
}