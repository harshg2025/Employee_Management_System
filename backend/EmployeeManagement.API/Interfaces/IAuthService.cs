namespace EmployeeManagement.API.Interfaces;

public interface IAuthService
{
    Task<string?> AuthenticateAsync(string username, string password);
}

