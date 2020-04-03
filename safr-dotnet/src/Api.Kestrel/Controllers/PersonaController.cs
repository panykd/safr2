using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GrainInterfaces.Persona;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Orleans;

namespace Api.Kestrel.Controllers
{
    [ApiController]
    [Route("persona")]
    public class PersonaController : ControllerBase
    {
        private readonly ILogger<PersonaController> _logger;
        private readonly IClusterClient _clusterClient;

        public PersonaController(ILogger<PersonaController> logger, IClusterClient clusterClient)
        {
            _logger = logger;
            _clusterClient = clusterClient;
        }

        [HttpPost]
        public async Task<IActionResult> Create()
        {
            var personaFactoryGrain = _clusterClient.GetGrain<IPersonaFactoryGrain>(Guid.Empty);

            var personaId = await personaFactoryGrain.Create();

            return Created(Url.Action(nameof(Get), new {id = personaId}), new {id = personaId});
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var personaGrain = _clusterClient.GetGrain<IPersonaGrain>(id);

            var persona = await personaGrain.Get();

            return Ok(persona);
        }
    }

    public class Persona
    {
        public Guid Id { get; set; }
        public string GivenName { get; set; }
        public string FamilyName { get; set; }
        
        public string Email { get; set; }
    }
}
