using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ManageNotification
{
    public class CoreVar
    {
        public static string sFormatDate = "dd/MM/yyyy";

        public static string sMessageError = "Có Lỗi Xảy Ra, Xin Vui Lòng Thử Lại.";
        public static string sMessageSuccess = "Thành Công.";
        public enum HinhThucTruyenThong
        {
            SMS = 1,           
            Put_Notification = 2,
            
        }

        public enum DoiTuongTruyenThong
        {
            Nguoi_Dan = 1,
            Can_Bo = 2,
        }


        public static List<ObjTem> FillComboBoxFromEnum(Type EnumObject, string sDefaultText = null, string sDefaultValue = null, bool isReplace = true)
        {
            List<ObjTem> objTemList = new List<ObjTem>();
            try
            {
                if ((sDefaultText != null) && (sDefaultValue != null))
                {
                    ObjTem objTemAll = new ObjTem();
                    objTemAll.ID = sDefaultValue;
                    objTemAll.Name = sDefaultText;
                    objTemList.Add(objTemAll);
                }
                foreach (object iEnumItem in Enum.GetValues(EnumObject))
                {
                    ObjTem objTem = new ObjTem();
                    objTem.ID = ((int)iEnumItem).ToString();
                    if (isReplace)
                    {
                        objTem.Name = iEnumItem.ToString().Replace("_", " ");
                    }
                    else
                    {
                        objTem.Name = iEnumItem.ToString();
                    }

                    objTemList.Add(objTem);
                }
            }
            catch (Exception ex)
            {
                //ErrorHandle.WriteError(ex.Message);
            }
            return objTemList;
        }
    }

    public class ObjTem
    {
        public string Name { get; set; }
        public string OtherName { get; set; }
        public string ID { get; set; }
        public ObjTem(string Name, string ID)
        {
            this.Name = Name;
            this.ID = ID;
        }
        public ObjTem()
        {

        }

    }
}