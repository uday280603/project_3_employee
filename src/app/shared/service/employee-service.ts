import { Service, signal } from '@angular/core';
import { Iemployee } from '../component/model/Iemployee';
import { Observable, of, Subject } from 'rxjs';
import { Ires } from '../component/model/Ires';

@Service()
export class EmployeeService {
  employeeData: Iemployee[] = [
    {
      empId: 1,
      empName: 'Rahul',
      empLastName: 'Sharma',
      empDept: 'FRONT-END DEV',
      empSalry: '45000',
      empPhone: '9876543210',
      empAddress: 'Pune, Maharashtra',
      isActive: true,
    },
    {
      empId: 2,
      empName: 'Amit',
      empLastName: 'Verma',
      empDept: 'BACK-END DEV',
      empSalry: '55000',
      empPhone: '8765432109',
      empAddress: 'Mumbai, Maharashtra',
      isActive: false,
    },
    {
      empId: 3,
      empName: 'Ronak',
      empLastName: 'Indrawar',
      empDept: 'FULL-STACK DEV',
      empSalry: '65000',
      empPhone: '9988776655',
      empAddress: 'Pune, Maharashtra',
      isActive: true,
    },
  ];
  employees = signal<Iemployee[]>(this.employeeData);
  emitObj$ = new Subject<Iemployee>();
  emitEditObject = this.emitObj$.asObservable();

  fetchAll(): Observable<Iemployee[]> {
    return of(this.employeeData);
  }

  addEmployee(emp: Iemployee): Observable<Ires<Iemployee>> {
    this.employeeData.unshift(emp);
    this.employees.set([...this.employeeData]);
    return of({
      msg: `The new employee with id ${emp.empId} is hired successfully..!`,
      data: emp,
    });
  }

  emitEditFun(emp: Iemployee) {
    this.emitObj$.next(emp);
  }

  updateEmployee(updatedObj: Iemployee): Observable<Ires<Iemployee>> {
    let GETINDEX = this.employeeData.findIndex((e) => e.empId === updatedObj.empId);
    this.employeeData[GETINDEX] = updatedObj;
    this.employees.update((dataArr) =>
      dataArr.map((emp) => (emp.empId === updatedObj.empId ? updatedObj : emp)),
    );
    return of({
      msg: `The employee with id ${updatedObj.empId} is updated succesfully..!`,
      data: updatedObj,
    });
  }

  removeEmployee(removeId: number) {
    let GETINDEX = this.employeeData.findIndex((e) => e.empId === removeId);
    let removeObj = this.employeeData.splice(GETINDEX, 1);
    this.employees.set([...this.employeeData]);
    return of({
      msg: `Employee with remove id ${removeId} is removed successfully..!`,
      data: removeObj,
    });
  }
}
