import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatAnchor } from '@angular/material/button';
import { Iemployee } from '../model/Iemployee';
import { form, FormField, required } from '@angular/forms/signals';
import { EmployeeService } from '../../service/employee-service';
import { SnackbarService } from '../../service/snackbar-service';

@Component({
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatAnchor, FormField],
  selector: 'app-employee-form',
  styleUrl: './employee-form.scss',
  templateUrl: './employee-form.html',
})
export class EmployeeForm {
  employeeModel = signal<Iemployee>({
    empId: 0,
    empName: '',
    empLastName: '',
    empDept: 'DEVOPS',
    empSalry: '',
    empPhone: '',
    empAddress: '',
    isActive: true,
  });
  constructor() {
    this.patchEmployeeData();
  }
  getEditObj!: Iemployee;
  employeeForm = form(this.employeeModel, (v) => {
    required(v.empName, {
      message: `Name is required`,
    });
  });

  isInEditMode: boolean = false;
  _employeeService = inject(EmployeeService);
  _snackbarService = inject(SnackbarService);

  onAddEmployee(event: Event) {
    event.preventDefault();
    if (this.employeeForm().invalid()) {
      return;
    }
    let NEW_EMP: Iemployee = {
      ...this.employeeModel(),
      empId: Date.now(),
    };
    this._employeeService.addEmployee(NEW_EMP).subscribe({
      next: (data) => {
        this._snackbarService.openSnackbar(data.msg);
      },
      error: (err) => {
        this._snackbarService.openSnackbar(err);
      },
    });
  }

  patchEmployeeData() {
    this._employeeService.emitObj$.subscribe({
      next: (data) => {
        this.getEditObj = data;
        this.employeeModel.set({
          ...data,
        });
        this.isInEditMode = true;
      },
      error: (err) => {
        this._snackbarService.openSnackbar(err);
      },
    });
  }

  updateEmployee() {
    let UPDATED_OBJ: Iemployee = {
      ...this.employeeModel(),
      empId: this.getEditObj.empId,
    };

    if (this.employeeForm().invalid()) {
      return;
    }
    this._employeeService.updateEmployee(UPDATED_OBJ).subscribe({
      next: (data) => {
        this._snackbarService.openSnackbar(data.msg);
        this.isInEditMode = false;
        this.employeeModel.set({
          empId: 0,
          empName: '',
          empLastName: '',
          empDept: 'DEVOPS',
          empSalry: '',
          empPhone: '',
          empAddress: '',
          isActive: true,
        });
      },
      error: (err) => {
        this._snackbarService.openSnackbar(err);
      },
    });
  }
}
