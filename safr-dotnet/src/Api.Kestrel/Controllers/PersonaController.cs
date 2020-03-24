using System;
using System.Collections.Generic;
using System.Linq;
using Bogus;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using static Bogus.DataSets.Name;

namespace Api.Kestrel.Controllers
{
    [ApiController]
    [Route("persona")]
    public class PersonaController : ControllerBase
    {
        private readonly ILogger<PersonaController> _logger;

        public PersonaController(ILogger<PersonaController> logger)
        {
            _logger = logger;
        }

        public IActionResult Get()
        {
            var persona = PersonaFactory.Create();

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

    public class PersonaFactory
    {
        private static readonly Faker _faker = new Faker();

        public static Persona Create()
        {
            var givenName = _faker.Name.FirstName(Gender.Female);
            var familyName = _faker.Name.LastName();

            return new Persona
            {
                Id = Guid.NewGuid(),
                GivenName = givenName,
                FamilyName = familyName,
                Email = _faker.Internet.ExampleEmail(givenName, familyName)
            };
        }
    }
}
