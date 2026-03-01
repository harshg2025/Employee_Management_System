import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeFormComponent implements OnInit {
  form!: FormGroup;
  employeeId: number | null = null;
  title = 'Add Employee';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      department: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]],
      dateOfJoining: ['', Validators.required],
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.employeeId = +idParam;
      this.title = 'Edit Employee';
      this.loadEmployee(this.employeeId);
    }
  }

  loadEmployee(id: number): void {
    this.employeeService.getEmployee(id).subscribe((emp) => {
      this.form.patchValue({
        ...emp,
        dateOfJoining: emp.dateOfJoining.substring(0, 10),
      });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;
    const employee: Employee = {
      id: this.employeeId ?? 0,
      ...value,
      dateOfJoining: new Date(value.dateOfJoining).toISOString(),
    };

    const request$ = this.employeeId
      ? this.employeeService.updateEmployee(this.employeeId, employee)
      : this.employeeService.addEmployee(employee);

    request$.subscribe(() => this.router.navigate(['/employees']));
  }
}
