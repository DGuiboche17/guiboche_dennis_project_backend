import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";

// Create a new employee
export const createEmployee = (req: Request, res: Response): void => {
  const {
    name,
    position,
    department,
    email,
    phone,
    branchId
  } = req.body;

  if (!name || !position || !department || !email || !phone || branchId === undefined) {
    res.status(400).json({ message: 'Missing required fields.' });
    return;
  }

    const newEmployee = employeeService.createEmployee({
    name,
    position,
    department,
    email,
    phone,
    branchId
  });

  res.status(201).json({
    message: 'Employee created successfully.',
    data: newEmployee
  });
};

// Get all employees
export const getAllEmployees = (_req: Request, res: Response): void => {
  const employees = employeeService.getAllEmployees();
    res.status(200).json({
    message: 'Employees retrieved successfully.',
    data: employees
  });
}

// Get an employee by ID
export const getEmployeeById = (req: Request, res: Response): void => {
    const id = req.params.id;
    const employee = employeeService.getEmployeeById(Number(id));

    if (!employee) {
        res.status(404).json({ message: 'Employee not found.' });
        return;
    }
    res.status(200).json({
        message: 'Employee retrieved successfully.',
        data: employee
    });
}

// Update an employee
export const updateEmployee = (req: Request, res: Response): void => {
    const id = req.params.id; 
    const employee = employeeService.updateEmployee(Number(id), req.body);
    if (!employee) {
        res.status(404).json({ message: 'Employee not found.' });
        return;
    }
    res.status(200).json({
        message: 'Employee updated successfully.',
        data: employee
    });
}

// Delete an employee
export const deleteEmployee = (req: Request, res: Response): void => {
    const id = req.params.id;
    const successfulDeletion = employeeService.deleteEmployee(Number(id));
    if (!successfulDeletion) {
        res.status(404).json({ message: 'Employee not found.' });
        return;
    }
    res.status(200).json({ message: 'Employee deleted successfully.' });
}   

// Get all employees by branch ID
export const getEmployeesByBranch = (req: Request, res: Response): void => {
  const branchId = Number(req.params.branchId);

  if (!branchId) {
    res.status(400).json({ message: 'Missing or invalid branch ID.' });
    return;
  }

  const employees = employeeService.getEmployeesByBranch(branchId);
  res.status(200).json({
    message: 'Employees retrieved by branch ID.',
    data: employees
  });
};

// Get all employees by department
export const getEmployeesByDepartment = (req: Request, res: Response): void => {
  const department = req.params.department;

  if (!department) {
    res.status(400).json({ message: 'Missing department parameter.' });
    return;
  }

  const employees = employeeService.getEmployeesByDepartment(department);
  res.status(200).json({
    message: 'Employees retrieved by department.',
    data: employees
  });
};

