using EmployeeManagement.API.DTOs;

namespace EmployeeManagement.API.Interfaces;

public interface IEmployeeService
{
    Task<IEnumerable<EmployeeDto>> GetAllAsync();
    Task<EmployeeDto?> GetByIdAsync(int id);
    Task<EmployeeDto> CreateAsync(EmployeeDto dto);
    Task<EmployeeDto?> UpdateAsync(int id, EmployeeDto dto);
    Task<bool> DeleteAsync(int id);
}

