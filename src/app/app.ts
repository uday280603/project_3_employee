import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeDashboard } from './shared/component/employee-dashboard/employee-dashboard';

@Component({
  imports: [EmployeeDashboard],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('project_3_employee');
}
