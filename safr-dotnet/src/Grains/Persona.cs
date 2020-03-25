using System;
using System.Threading.Tasks;
using Bogus;
using GrainInterfaces.Persona;
using Orleans;
using Orleans.EventSourcing;
using static Bogus.DataSets.Name;

namespace Grains
{

    public interface IPersonaEvent {}

    public class PersonaDateOfBirthChangedEvent : IPersonaEvent
    {
        public DateTime DateOfBirth { get; set; }
    }

    public class PersonaNameChangedEvent : IPersonaEvent
    {
        public string GivenName { get; set; }
        public string FamilyName { get; set; }
    }

    public class PersonaState
    {
        public string GivenName { get; private set; }
        
        public string FamilyName { get; private set; }

        public DateTime? DateOfBirth { get; private set; }

        public void Apply(PersonaDateOfBirthChangedEvent evt)
        {
            DateOfBirth = evt.DateOfBirth;
        }

        public void Apply(PersonaNameChangedEvent evt)
        {
            GivenName = evt.GivenName;
            FamilyName = evt.FamilyName;
        }
    }

    public class PersonaGrain : JournaledGrain<PersonaState, IPersonaEvent>, IPersonaGrain
    {
        public async Task ChangeDateOfBirth(DateTime dateOfBirth)
        {
            RaiseEvent(new PersonaDateOfBirthChangedEvent(){DateOfBirth = dateOfBirth});

            await ConfirmEvents();
        }

        public async Task ChangeName(string givenName, string familyName)
        {
            RaiseEvent(new PersonaNameChangedEvent() {GivenName = givenName, FamilyName = familyName});

            await ConfirmEvents();
        }

        public async Task<Persona> Get()
        {
            await RefreshNow();

            var persona = new Persona
            {
                Id = this.GrainReference.GrainIdentity.PrimaryKey,
                GivenName = State.GivenName,
                FamilyName = State.FamilyName,
                DateOfBirth = State.DateOfBirth
            };

            return persona;
        }
    }

    public class PersonaFactoryGrain : Grain, IPersonaFactoryGrain
    {
        public async Task<Guid> Create()
        {
            // Create a new Persona
            var id = Guid.NewGuid();
            var personaGrain = GrainFactory.GetGrain<IPersonaGrain>(id);

            var faker = new Faker();
            var givenName = faker.Name.FirstName(Gender.Female);
            var familyName = faker.Name.LastName();

            var minAge = 18;
            var maxAge = 30;

            var dateOfBirth = faker.Date.Between(DateTime.UtcNow.AddYears(maxAge), DateTime.UtcNow.AddYears(minAge));


            await personaGrain.ChangeName(givenName, familyName);
            await personaGrain.ChangeDateOfBirth(dateOfBirth);

            return id;
        }
    }

    public class PersonaFactory
    {
        private static readonly Faker _faker = new Faker();

        public static Persona Create(Guid id)
        {
            var givenName = _faker.Name.FirstName(Gender.Female);
            var familyName = _faker.Name.LastName();

            return new Persona
            {
                Id = id,
                GivenName = givenName,
                FamilyName = familyName
            };
        }
    }
}
