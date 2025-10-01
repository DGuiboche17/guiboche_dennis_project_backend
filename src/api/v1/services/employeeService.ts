//  Service layer for managing employees.
//  Provides functions that will create read, update and delete employees

import { Employee, employees, } from "../../../data/employees";

// Get all employees
export const getAllEmployees = (): Employee[] => {
    return employees;
}

// Get an employee by ID
export const getEmployeeById = (id: number): Employee | undefined => {
    return employees.find(emp => emp.id === id);
}       

// Create a new employee
export const createEmployee = (data: {
    name: string;
    position: string;
    department: string; 
    email: string;
    phone: string;
    branchId: number;
}): Employee => {
    const newEmployee: Employee = {
        id: employees.length > 0 ? employees[employees.length - 1].id + 1 : 1,
        /// ... will copy the contents of data into newEmployee
        ...data
    };
    employees.push(newEmployee);
    return newEmployee;
}
// array isnt further used, its saved in memory only.

// Update an existing employee
export const updateEmployee = (id: number, data: {
    name?: string;
    position?: string;
    department?: string;   
    email?: string;
    phone?: string;
    branchId?: number;    
} ): Employee | undefined => {
    const employee = employees.find(emp => emp.id === id);
    if (!employee) {
        return undefined;
    }
    Object.assign(employee, data);
    return employee;
}

// Delete an employee
export const deleteEmployee = (id: number): boolean => {
    const index = employees.findIndex(emp => emp.id === id);
    if (index === -1) {
        return false;
    }
    // splice will remove the item at the index position
    employees.splice(index, 1);
    return true;
}

// get employees by branch ID
export const getEmployeesByBranch = (branchId: number): Employee[] => {
  return employees.filter(emp => emp.branchId === branchId);
};

// get employees by department
export const getEmployeesByDepartment = (department: string): Employee[] => {
  return employees.filter(emp =>
    emp.department.toLowerCase() === department.toLowerCase()
  );
};
