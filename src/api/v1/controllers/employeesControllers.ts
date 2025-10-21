import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/httpConstants";
import * as EmployeeService from "../services/employeeService";
import type { Employee } from "../models/employeesModel";
import { successResponse } from "../models/responseModel";

/**
 * Retrieves all Employees
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const getAllEmployees = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employees: Employee[] = await EmployeeService.getAllEmployees();
        res.status(HTTP_STATUS.OK).json(
            successResponse(employees, "Employees retrieved successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves a single Employee by ID
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const getEmployeeById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const employee: Employee = await EmployeeService.getEmployeeById(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(employee, "Employee retrieved successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Creates a new Employee
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Extract validated data from request body
        const { name, position, department, email, phone, branchId } = req.body;
        const EmployeeData = { name, position, department, email, phone, branchId };

        const newEmployee: Employee = await EmployeeService.createEmployee(EmployeeData);
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newEmployee, "Employee created successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Updates an existing Employee
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { name , position, department, email, phone, branchId} = req.body;

        // Create update data object with only the fields that can be updated
        const updateData = { name, position, department, email, phone, branchId };

        const updatedEmployee: Employee = await EmployeeService.updateEmployee(id, updateData);
        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedEmployee, "Employee updated successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Deletes an Employee
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        await EmployeeService.deleteEmployee(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(null, "Employee deleted successfully")
        );
    } catch (error) {
        next(error);
    }
};
