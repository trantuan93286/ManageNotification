using ManageNotification.EntityFramework;
using ManageNotification.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ManageNotification.CoreFunction
{
    public class EFNotificationHistory
    {
        NotificationEntities _context = new NotificationEntities();

        public List<HuyenEM> LoadAllHuyen(HuyenRequestEM request)
        {
            List<HuyenEM> lstHuyen = null;
            try
            {
                lstHuyen = (from x in _context.Huyens
                            where string.IsNullOrEmpty(request.TINH_ID) || x.TINH_ID.Value.ToString() == request.TINH_ID
                            select new HuyenEM
                            {
                                AutoID = x.AutoID,
                                HUYEN_ID = x.HUYEN_ID,
                                TINH_ID = x.TINH_ID,
                                TENHUYEN = x.TENHUYEN
                            }).ToList();
            }
            catch (Exception ex)
            {

            }
            return lstHuyen;
        }

        public List<XaEM> LoadAllXa(XaRequestEM request)
        {
            List<XaEM> lstXa = null;
            try
            {
                lstXa = (from x in _context.Xas
                         where string.IsNullOrEmpty(request.HUYEN_ID) || x.HUYEN_ID.Value.ToString() == request.HUYEN_ID
                         select new XaEM
                         {
                             AutoID = x.AutoID,
                             HUYEN_ID = x.HUYEN_ID,
                             TENXA = x.TENXA,
                             XA_ID = x.XA_ID,
                         }).ToList();
            }
            catch (Exception)
            {

            }
            return lstXa;
        }

        public List<ChienDichTruyenThongEM> LoadAllChienDichTruyenThong(ChienDichTruyenThongRequestEM objRequest)
        {
            List<ChienDichTruyenThongEM> lstCDTT = new List<ChienDichTruyenThongEM>();
            try
            {
                if (objRequest.TU_NGAY != null)
                {
                    objRequest.TU_NGAY = objRequest.TU_NGAY.Value.Date;
                }

                if (objRequest.DEN_NGAY != null)
                {
                    objRequest.DEN_NGAY = objRequest.DEN_NGAY.Value.Date.AddDays(1);
                }
                lstCDTT = (from x in _context.ChienDichTruyenThongs
                           where (string.IsNullOrEmpty(objRequest.AutoID) || x.AutoID.ToString() == objRequest.AutoID)
                           && (string.IsNullOrEmpty(objRequest.HINH_THUC_TRUYEN_THONG) || x.HINH_THUC_TRUYEN_THONG.Value.ToString() == objRequest.HINH_THUC_TRUYEN_THONG)
                           && (string.IsNullOrEmpty(objRequest.DOI_TUONG) || x.DOI_TUONG.Value.ToString() == objRequest.DOI_TUONG)
                           && (string.IsNullOrEmpty(objRequest.TINH_ID) || x.TINH_ID.Value.ToString() == objRequest.TINH_ID)
                           && (string.IsNullOrEmpty(objRequest.HUYEN_ID) || x.HUYEN_ID.Value.ToString() == objRequest.HUYEN_ID)
                            && (string.IsNullOrEmpty(objRequest.XA_ID) || x.HUYEN_ID.Value.ToString() == objRequest.XA_ID)
                           && (objRequest.TU_NGAY == null|| objRequest.TU_NGAY  <= x.NGAY_THUC_HIEN)
                           && (objRequest.DEN_NGAY == null || x.NGAY_THUC_HIEN <= objRequest.DEN_NGAY )
                           select new ChienDichTruyenThongEM
                           {
                               AutoID = x.AutoID,
                               TEN_CHIEN_DICH = x.TEN_CHIEN_DICH,
                               HINH_THUC_TRUYEN_THONG = x.HINH_THUC_TRUYEN_THONG,
                               KHU_VUC_ID = x.KHU_VUC_ID,
                               PHAM_VI = x.PHAM_VI,
                               NGAY_THUC_HIEN = x.NGAY_THUC_HIEN,
                               SO_LUONG = x.SO_LUONG,
                               DOI_TUONG = x.DOI_TUONG,
                               NOI_DUNG = x.NOI_DUNG,
                               TRANG_THAI = x.TRANG_THAI,
                               SO_LUONG_THANH_CONG = x.SO_LUONG_THANH_CONG, 
                               TINH_ID = x.TINH_ID,
                               HUYEN_ID = x.HUYEN_ID,
                               XA_ID = x.XA_ID,
                           }).ToList();

                foreach (var item in lstCDTT)
                {
                    item.NGAY_THUC_HIEN_SHOW = item.NGAY_THUC_HIEN.Value.ToString(CoreVar.sFormatDate + " HH:mm");
                    item.GIO_THUC_HIEN = item.NGAY_THUC_HIEN.Value;
                    if (item.PHAM_VI == 2)
                    {
                        item.KHU_VUC = _context.Tinhs.FirstOrDefault(x => x.TINH_ID == item.KHU_VUC_ID).TENTINH;
                    }
                   else if (item.PHAM_VI == 3)
                    {
                        item.KHU_VUC = _context.Huyens.FirstOrDefault(x => x.HUYEN_ID == item.KHU_VUC_ID).TENHUYEN;
                        
                    }
                    else if (item.PHAM_VI == 4)
                    {
                        var xaOBJ = _context.Xas.FirstOrDefault(x => x.XA_ID == item.KHU_VUC_ID);
                        if (xaOBJ != null)
                        {
                            item.KHU_VUC = xaOBJ.TENXA;                            
                        }                       
                    }
                    else
                    {
                        item.KHU_VUC = "Không Xác Định";
                    }

                    if (item.TRANG_THAI == 1)
                    {
                        item.TEN_TRANG_THAI = "Đã Được Gửi";
                    }
                    else
                    {
                        item.TEN_TRANG_THAI = "Chưa Được Gửi";
                    }
                }
            }
            catch (Exception)
            {
                
            }
             
            return lstCDTT;
        }

        public bool AddNewChienDich(ChienDichTruyenThongEM insertObj)
        {
            var bRet = false;
            try
            {
                if (string.IsNullOrWhiteSpace(insertObj.NOI_DUNG) == false)
                {
                    ChienDichTruyenThong newCD = new ChienDichTruyenThong();
                    insertObj.NGAY_THUC_HIEN = new DateTime(insertObj.NGAY_THUC_HIEN.Value.Year, insertObj.NGAY_THUC_HIEN.Value.Month, insertObj.NGAY_THUC_HIEN.Value.Day, insertObj.GIO_THUC_HIEN.Hour, insertObj.GIO_THUC_HIEN.Minute, insertObj.GIO_THUC_HIEN.Second);
                    newCD.TEN_CHIEN_DICH = insertObj.TEN_CHIEN_DICH;
                    newCD.HINH_THUC_TRUYEN_THONG = insertObj.HINH_THUC_TRUYEN_THONG;
                    newCD.KHU_VUC_ID = insertObj.KHU_VUC_ID;
                    newCD.PHAM_VI = insertObj.PHAM_VI;
                    newCD.NGAY_THUC_HIEN = insertObj.NGAY_THUC_HIEN;
                    newCD.SO_LUONG = insertObj.SO_LUONG;
                    newCD.NOI_DUNG = insertObj.NOI_DUNG;
                    newCD.DOI_TUONG = insertObj.DOI_TUONG;
                    newCD.TRANG_THAI = insertObj.TRANG_THAI;
                    newCD.SO_LUONG_THANH_CONG = insertObj.SO_LUONG_THANH_CONG;
                    newCD.TINH_ID = insertObj.TINH_ID;
                    newCD.HUYEN_ID = insertObj.HUYEN_ID;
                    newCD.XA_ID = insertObj.XA_ID;
                    _context.ChienDichTruyenThongs.Add(newCD);

                    if (_context.SaveChanges() > 0)
                    {
                        bRet = true;
                        if (insertObj.NGAY_THUC_HIEN <= DateTime.Now)
                        {
                            foreach (var item in insertObj.Mobile)
                            {
                                SendSMS(insertObj.NOI_DUNG, item.ID, newCD.AutoID.ToString());
                            }

                        }
                    }
                }

            }
            catch (Exception ex)
            {

            }
            return bRet;
        }

        public void SendSMS(string NoiDung, string Mobile, string chienDichAutoID = "")
        {
            try
            {
                SendSMSService.BulkSmsServiceClient sendSMS = new SendSMSService.BulkSmsServiceClient();
                if (string.IsNullOrEmpty(Mobile) == false)
                {
                    sendSMS.Send(NoiDung, Mobile, "Ecds", "Ecds@123");
                    if (string.IsNullOrEmpty(chienDichAutoID) == false)
                    {
                        var chiendich = _context.ChienDichTruyenThongs.FirstOrDefault(x => x.AutoID.ToString() == chienDichAutoID);
                        chiendich.SO_LUONG_THANH_CONG += 1;
                        chiendich.TRANG_THAI = 1;
                        _context.SaveChanges();
                    }

                }

            }
            catch (Exception)
            {

            }

        }

        public void SendSMSChienDich(string chienDichAutoID , List<string> Mobile )
        {
            try
            {
                var chiendich = _context.ChienDichTruyenThongs.FirstOrDefault(x => x.AutoID.ToString() == chienDichAutoID);
                if (chiendich != null)
                {
                    foreach (var item in Mobile)
                    {
                        SendSMS(chiendich.NOI_DUNG, item, chienDichAutoID);
                    }
                    
                }
                 
            }
            catch (Exception)
            {

            }

        }

    }
}