using System;
using System.Threading.Tasks;
using Orleans;

namespace GrainInterfaces.Persona
{
    public interface IPersonaFactoryGrain : IGrainWithGuidKey
    {
        Task<Guid> Create();   
    }

    public interface IPersonaGrain : IGrainWithGuidKey
    {
        Task<Persona> Get();

        Task ChangeName(string givenName, string familyName);

        Task ChangeDateOfBirth(DateTime dateOfBirth);
    }

    public class Persona
    {
        public Guid Id { get; set; }
        
        public string GivenName { get; set; }

        public string FamilyName { get; set; }

        public DateTime? DateOfBirth { get; set; }
    }
}
