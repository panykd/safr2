using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Orleans;

namespace Api.Kestrel
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSingleton<IClusterClient>(services => {
                return new ClientBuilder()
                    .UseLocalhostClustering()
                    .Build();
            });
            services.AddHostedService<ClusterClientHostedService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(config => {
                config.AllowAnyOrigin();
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }

    public class ClusterClientHostedService : IHostedService
{
    private readonly IClusterClient client;

    public ClusterClientHostedService(IClusterClient client)
    {
        this.client = client;
    }

    public async Task StartAsync(CancellationToken cancellationToken) => await client.Connect();

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        await client?.Close();
        client?.Dispose();
    }
}
}
