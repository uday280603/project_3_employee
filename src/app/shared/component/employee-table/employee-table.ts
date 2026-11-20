import { Component, inject, signal } from '@angular/core';
import { EmployeeService } from '../../service/employee-service';
import { Iemployee } from '../model/Iemployee';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirm } from '../get-confirm/get-confirm';
import { SnackbarService } from '../../service/snackbar-service';
@Component({
  imports: [MatButtonModule],
  selector: 'app-employee-table',
  styleUrl: './employee-table.scss',
  templateUrl: './employee-table.html',
})
export class EmployeeTable {
  constructor(
    private _matDialog: MatDialog,
    private _snackbar: SnackbarService,
  ) {
    this.getAll();
  }

  _employeeService = inject(EmployeeService);
  employeeData = signal<Iemployee[]>([]);
  employees = this._employeeService.employees;

  getAll() {
    this._employeeService.fetchAll().subscribe({
      next: (data) => {
        this.employeeData.set(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onEditEmployee(emp: Iemployee) {
    this._employeeService.emitEditFun(emp);
  }

  onRemoveEmployee(removeId: number) {
    let config = new MatDialogConfig();
    config.disableClose = true;
    config.width ='450px';
    config.data = `Are you sure to remove the employee with id ${removeId}...?`;
    let _matRef = this._matDialog.open(GetConfirm, config);
    _matRef.afterClosed().subscribe((res) => {
      if (res) {
        this._employeeService.removeEmployee(removeId).subscribe({
          next: (data) => {
            this._snackbar.openSnackbar(data.msg);
          },
          error: (err) => {
            this._snackbar.openSnackbar(err);
          },
        });
      }
    });
  }
}
