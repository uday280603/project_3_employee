import { Component } from '@angular/core';
import { EmployeeForm } from '../employee-form/employee-form';
import { EmployeeTable } from '../employee-table/employee-table';

@Component({
  imports: [EmployeeForm, EmployeeTable],
  selector: 'app-employee-dashboard',
  styleUrl: './employee-dashboard.scss',
  templateUrl: './employee-dashboard.html',
})
export class EmployeeDashboard {}
