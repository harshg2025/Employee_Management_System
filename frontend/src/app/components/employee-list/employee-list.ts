import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.error = null;
    this.cdr.detectChanges();

    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        console.log('Employees loaded:', data);
        this.employees = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load employees:', err);
        this.error = `Failed to load employees. Status: ${err.status} – ${err.message}`;
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  addEmployee(): void {
    this.router.navigate(['/add-employee']);
  }

  editEmployee(id: number): void {
    this.router.navigate(['/edit-employee', id]);
  }

  deleteEmployee(id: number): void {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => this.loadEmployees(),
      error: (err) => alert(`Delete failed: ${err.message}`),
    });
  }

  getDeptColor(dept: string): string {
    const map: Record<string, string> = {
      Engineering: '#6d28d9', IT: '#6d28d9',
      Security: '#ef4444',
      Research: '#3b82f6',
      Management: '#f59e0b', Executive: '#f59e0b',
      Logistics: '#10b981', Operations: '#10b981',
      Media: '#ec4899', Journalism: '#ec4899',
      Forensics: '#8b5cf6',
      Aviation: '#06b6d4',
      History: '#a3a3a3', Archaeology: '#a3a3a3',
      Investigation: '#f97316',
    };
    return map[dept] || '#8b5cf6';
  }

  getInitials(first: string, last: string): string {
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  }
}
