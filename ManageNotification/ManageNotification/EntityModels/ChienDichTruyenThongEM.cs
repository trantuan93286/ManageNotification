using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ManageNotification.EntityModels
{
    public class ChienDichTruyenThongEM
    {
        public decimal AutoID { get; set; }
        public string TEN_CHIEN_DICH { get; set; }
        public Nullable<int> HINH_THUC_TRUYEN_THONG { get; set; }
        public Nullable<int> KHU_VUC_ID { get; set; }
        public Nullable<int> PHAM_VI { get; set; }
        public Nullable<System.DateTime> NGAY_THUC_HIEN { get; set; }
        public Nullable<int> SO_LUONG { get; set; }
        public string NOI_DUNG { get; set; }
        public Nullable<int> DOI_TUONG { get; set; }
        public Nullable<int> TRANG_THAI { get; set; }
        public Nullable<int> SO_LUONG_THANH_CONG { get; set; }

        public Nullable<int> TINH_ID { get; set; }
        public Nullable<int> HUYEN_ID { get; set; }
        public Nullable<int> XA_ID { get; set; }

        public string KHU_VUC { get; set; }
        public string TEN_TRANG_THAI { get; set; }
        public string NGAY_THUC_HIEN_SHOW { get; set; }

        public  System.DateTime  GIO_THUC_HIEN { get; set; }
         
        public List<ObjTem> Mobile { get; set; }
    }
     
}