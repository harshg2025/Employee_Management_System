using EmployeeManagement.API.DTOs;
using EmployeeManagement.API.Interfaces;
using EmployeeManagement.API.Models;

namespace EmployeeManagement.API.Services;

public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _repository;

    public EmployeeService(IEmployeeRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<EmployeeDto>> GetAllAsync()
    {
        var employees = await _repository.GetAllAsync();
        return employees.Select(MapToDto);
    }

    public async Task<EmployeeDto?> GetByIdAsync(int id)
    {
        var employee = await _repository.GetByIdAsync(id);
        return employee is null ? null : MapToDto(employee);
    }

    public async Task<EmployeeDto> CreateAsync(EmployeeDto dto)
    {
        var employee = MapToEntity(dto);
        employee.Id = 0;

        await _repository.AddAsync(employee);
        await _repository.SaveChangesAsync();

        return MapToDto(employee);
    }

    public async Task<EmployeeDto?> UpdateAsync(int id, EmployeeDto dto)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing is null) return null;

        existing.FirstName = dto.FirstName;
        existing.LastName = dto.LastName;
        existing.Email = dto.Email;
        existing.Phone = dto.Phone;
        existing.Department = dto.Department;
        existing.Salary = dto.Salary;
        existing.DateOfJoining = dto.DateOfJoining;

        await _repository.UpdateAsync(existing);
        await _repository.SaveChangesAsync();

        return MapToDto(existing);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing is null) return false;

        await _repository.DeleteAsync(existing);
        return await _repository.SaveChangesAsync();
    }

    private static EmployeeDto MapToDto(Employee employee) =>
        new()
        {
            Id = employee.Id,
            FirstName = employee.FirstName,
            LastName = employee.LastName,
            Email = employee.Email,
            Phone = employee.Phone,
            Department = employee.Department,
            Salary = employee.Salary,
            DateOfJoining = employee.DateOfJoining
        };

    private static Employee MapToEntity(EmployeeDto dto) =>
        new()
        {
            Id = dto.Id,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            Phone = dto.Phone,
            Department = dto.Department,
            Salary = dto.Salary,
            DateOfJoining = dto.DateOfJoining
        };
}

