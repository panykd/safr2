using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Orleans.Hosting;

namespace Silo
{
    class Program
    {
        static async Task Main(string[] args)
        {
            await new HostBuilder()
                .ConfigureLogging(logging => {
                    logging.AddConsole();
                })
                .ConfigureServices(services => {
                })
                .UseOrleans(silo => {
                    silo.UseLocalhostClustering();
                })
            .RunConsoleAsync();
        }
    }
}
