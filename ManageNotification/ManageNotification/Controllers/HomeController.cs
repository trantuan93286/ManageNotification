using ManageNotification.CoreFunction;
using ManageNotification.EntityModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Excel = Microsoft.Office.Interop.Excel;

namespace ManageNotification.Controllers
{
    public class HomeController : Controller
    {
        EFNotificationHistory EFNotificationHistory = new EFNotificationHistory();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult History()
        {

            return View();
        }

        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        public ActionResult LogOut()
        {

            Session.Abandon();
            Session.Clear();
            return RedirectToAction("Login", "Home");
        }

        public JsonResult SetToken(string token)
        {
            JsonResult jResult = new JsonResult();
            try
            {
                Session["Token"] = token;
                return Json(true, "application/json", Encoding.UTF8, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {


            }
            return jResult;
        }

        public JsonResult GetToken()
        {
            JsonResult jResult = new JsonResult();
            try
            {
                var token = Session["Token"];
                return Json(token, "application/json", Encoding.UTF8, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {


            }
            return jResult;
        }

        public JsonResult SendSMS(string NoiDung, List<String> Mobile)
        {
            JsonResult jResult = new JsonResult();
            try
            {
                foreach (var item in Mobile)
                {
                    EFNotificationHistory.SendSMS(NoiDung, item);
                }
            }
            catch (Exception)
            {


            }
            return jResult;
        }

        public JsonResult LoadAllHinhThucTruyenThong()
        {
            JsonResult jsonResult = new JsonResult();
            try
            {
                jsonResult = Json(new { code = "0", data = CoreVar.FillComboBoxFromEnum(typeof(CoreVar.HinhThucTruyenThong)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                jsonResult = Json(new { code = "1", message = CoreVar.sMessageError }, JsonRequestBehavior.AllowGet);
            }
            return jsonResult;
        }

        public JsonResult LoadAllDoiTuongTruyenThong()
        {
            JsonResult jsonResult = new JsonResult();
            try
            {
                jsonResult = Json(new { code = "0", data = CoreVar.FillComboBoxFromEnum(typeof(CoreVar.DoiTuongTruyenThong)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                jsonResult = Json(new { code = "1", message = CoreVar.sMessageError }, JsonRequestBehavior.AllowGet);
            }
            return jsonResult;
        }

        public JsonResult LoadAllHuyen(HuyenRequestEM request)
        {
            JsonResult jResult = new JsonResult();
            try
            {
                var data = EFNotificationHistory.LoadAllHuyen(request);
                jResult = Json(new { code = "0", data = data }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                jResult = Json(new { code = "1", message = CoreVar.sMessageError }, JsonRequestBehavior.AllowGet);
            }
            return jResult;
        }

        public JsonResult LoadAllXa(XaRequestEM request)
        {

            JsonResult jResult = new JsonResult();
            try
            {
                var data = EFNotificationHistory.LoadAllXa(request);
                jResult = Json(new { code = "0", data = data }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception)
            {
                jResult = Json(new { code = "1", message = CoreVar.sMessageError }, JsonRequestBehavior.AllowGet);
            }
            return jResult;
        }

        public JsonResult LoadAllChienDichTruyenThong(ChienDichTruyenThongRequestEM request)
        {

            JsonResult jResult = new JsonResult();
            try
            {
                var data = EFNotificationHistory.LoadAllChienDichTruyenThong(request);
                jResult = Json(new { code = "0", data = data }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception)
            {
                jResult = Json(new { code = "1", message = CoreVar.sMessageError }, JsonRequestBehavior.AllowGet);
            }
            return jResult;
        }


        public JsonResult AddNewChienDich(ChienDichTruyenThongEM insertObj)
        {

            JsonResult jResult = new JsonResult();
            try
            {
                var data = EFNotificationHistory.AddNewChienDich(insertObj);
                jResult = Json(new { code = "0", data = data, message = CoreVar.sMessageSuccess }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception)
            {
                jResult = Json(new { code = "1", message = CoreVar.sMessageError }, JsonRequestBehavior.AllowGet);
            }
            return jResult;
        }

        public JsonResult SendChienDich(string chienDichID, List<string> Mobile)
        {
            JsonResult jsonResult = new JsonResult();
            try
            {
                EFNotificationHistory.SendSMSChienDich(chienDichID, Mobile);
                jsonResult = Json(new { code = "0", data = Mobile, message = CoreVar.sMessageSuccess }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                jsonResult = Json(new { code = "1", data = Mobile, message = CoreVar.sMessageError }, JsonRequestBehavior.AllowGet);

            }
            return jsonResult;
        }

        public JsonResult GetChienDichInfo(string AutoID)
        {

            JsonResult jResult = new JsonResult();
            try
            {
                ChienDichTruyenThongRequestEM request = new ChienDichTruyenThongRequestEM();
                request.AutoID = AutoID;
                List<ChienDichTruyenThongEM> lstCDTT = new List<ChienDichTruyenThongEM>();
                lstCDTT = EFNotificationHistory.LoadAllChienDichTruyenThong(request);
                if (lstCDTT.Count > 0)
                {
                    jResult = Json(new { code = "0", data = lstCDTT[0], message = CoreVar.sMessageSuccess }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    jResult = Json(new { code = "1", message = CoreVar.sMessageError }, JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception)
            {
                jResult = Json(new { code = "1", message = CoreVar.sMessageError }, JsonRequestBehavior.AllowGet);
            }
            return jResult;
        }

        public JsonResult SaveFile(IEnumerable<HttpPostedFileBase> files)
        {
            JsonResult jsonResult = new JsonResult();
            var physicalPath = string.Empty;
            var fileName = string.Empty;
            var fileNameToSaveOnServer = string.Empty;
            var fileExtension = string.Empty;
            if (files != null)
            {
                foreach (var file in files)
                {
                    // Some browsers send file names with full path.
                    // We are only interested in the file name.
                    fileName = Path.GetFileName(file.FileName);
                    fileExtension = Path.GetExtension(file.FileName);
                    fileNameToSaveOnServer = fileName + "_" + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Year.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + fileExtension;
                    physicalPath = Path.Combine(Server.MapPath("~/App_Data"), fileNameToSaveOnServer);

                    // The files are not actually saved in this demo
                    file.SaveAs(physicalPath);

                }

                try
                {
                    List<ObjTem> Mobile = new List<ObjTem>();
                    //Create COM Objects. Create a COM object for everything that is referenced
                    Excel.Application xlApp = new Excel.Application();
                    Excel.Workbook xlWorkbook = xlApp.Workbooks.Open(physicalPath);
                    Excel._Worksheet xlWorksheet = xlWorkbook.Sheets[1];
                    Excel.Range xlRange = xlWorksheet.UsedRange;

                    int rowCount = xlRange.Rows.Count;
                    int colCount = xlRange.Columns.Count;

                    //iterate over the rows and columns and print to the console as it appears in the file
                    //excel is not zero based!!
                    for (int i = 1; i <= rowCount; i++)
                    {
                        for (int j = 1; j <= colCount; j++)
                        {

                            //write the value to the console
                            if (xlRange.Cells[i, j] != null && xlRange.Cells[i, j].Value2 != null && xlRange.Cells[i, j].Value2 != "")
                            {
                                var ddd = xlRange.Cells[i, j].Value2.ToString();
                                ObjTem obj = new ObjTem();
                                obj.Name = ddd;
                                obj.ID = ddd;
                                Mobile.Add(obj);
                            }
                        }
                    }

                    jsonResult = Json(new { code = "0", data = Mobile }, JsonRequestBehavior.AllowGet);

                    //cleanup
                    GC.Collect();
                    GC.WaitForPendingFinalizers();

                    //rule of thumb for releasing com objects:
                    //  never use two dots, all COM objects must be referenced and released individually
                    //  ex: [somthing].[something].[something] is bad

                    //release com objects to fully kill excel process from running in the background
                    Marshal.ReleaseComObject(xlRange);
                    Marshal.ReleaseComObject(xlWorksheet);

                    //close and release
                    xlWorkbook.Close();
                    Marshal.ReleaseComObject(xlWorkbook);

                    //quit and release
                    xlApp.Quit();
                    Marshal.ReleaseComObject(xlApp);

                }
                catch (Exception ex)
                {
                    jsonResult = Json(new { code = "1", message = CoreVar.sMessageError }, JsonRequestBehavior.AllowGet);

                }
            }
            else
            {
                jsonResult = Json(new { code = "1", message = CoreVar.sMessageError }, JsonRequestBehavior.AllowGet);
            }

            // Return an empty string to signify success
            return jsonResult;

        }
    }
}