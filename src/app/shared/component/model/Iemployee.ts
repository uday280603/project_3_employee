

export interface Iemployee{
    empId : number,
    empName : string,
    empLastName : string,
    empDept : 'DEVOPS' | 'FRONT-END DEV' | 'BACK-END DEV' | 'FULL-STACK DEV',
    empSalry : string,
    empPhone : string,
    empAddress : string
    isActive : boolean
}