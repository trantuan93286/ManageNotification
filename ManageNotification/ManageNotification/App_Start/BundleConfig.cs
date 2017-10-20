using System.Web;
using System.Web.Optimization;

namespace ManageNotification
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            //framework css
            bundles.Add(new StyleBundle("~/bundles/css").Include(
                     "~/Content/css/AdminLTE.css",
                      "~/Content/css/AdminLTE.min.css",
                       "~/Content/css/alt/AdminLTE-bootstrap-social.css",
                      "~/Content/css/alt/AdminLTE-fullcalendar.css",
                       "~/Content/css/AdminLTE-select2.css",
                      "~/Content/css/AdminLTE-without-plugins.css",
                      "~/Content/css/skins/skin-blue.css"));

            //framework js
            //bundles.Add(new StyleBundle("~/bundles/js").Include(
            //         //"~/Content/js/jquery-3.2.1.js",
            //         "~/Content/js/adminlte.js",
            //          "~/Content/js/demo.js",
            //           "~/Content/js/pages/dashboard.js",
            //          "~/Content/js/pages/dashboard2.js",
            //           "~/Content/js/plugins/bootstrap-slider.js",
            //          "~/Content/js/plugins/bootstrap3-wysihtml5.all.js",
            //          "~/Content/js/plugins/icheck.js"));
        }
    }
}
