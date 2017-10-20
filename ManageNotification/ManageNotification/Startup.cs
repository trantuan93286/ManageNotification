using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ManageNotification.Startup))]
namespace ManageNotification
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
