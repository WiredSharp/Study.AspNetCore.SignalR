using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace WebApplication.Vanilla
{
    public class Startup
    {
        private const string CorsPolicy = "CorsPolicy";

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddSignalR();
            //services.AddCors(options => options.AddPolicy(CorsPolicy, b => b.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader()));
            services.AddCors(options => options.AddPolicy(CorsPolicy, b => b.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            //else
            //{
            //    app.UseExceptionHandler("/Error");
            //}
            app.UseCors(CorsPolicy);
            app.UseStaticFiles();
            app.UseSignalR(routes => routes.MapHub<SimpleChatHub>("/chat"));
            app.UseMvc();
            //app.UseMvcWithDefaultRoute();
        }
    }
}
