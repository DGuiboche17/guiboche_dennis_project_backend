import { Employee } from "../models/employeesModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";


const COLLECTION = "Employees";

/**
 * Retrieves all Employees from Firestore
 * @returns Array of all Employees
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    try {
        const snapshot = await getDocuments(COLLECTION);
        const Employees: Employee[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date(),
                updatedAt: data.updatedAt?.toDate() || new Date(),
            } as Employee;
        });
        return Employees;
    } catch (error) {
        throw error;
    }
};

/**
 * Creates a new Employee in Firestore
 * @param EmployeeData - The data for the new Employee
 * @returns The created Employee with generated ID
 */
export const createEmployee = async (EmployeeData: {
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    branchId: number
}): Promise<Employee> => {
    try {
        const now = new Date();
        const newEmployeeData = {
            ...EmployeeData,
            createdAt: now,
            updatedAt: now,
        };

        const id = await createDocument<Employee>(COLLECTION, newEmployeeData);
        return { id, ...newEmployeeData } as Employee;
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves a single Employee by ID from Firestore
 * @param id - The ID of the Employee to retrieve
 * @returns The Employee if found
 * @throws Error if Employee not found
 */
export const getEmployeeById = async (id: string): Promise<Employee> => {
    try {
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Employee with ID ${id} not found`);
        }

        const data = doc.data();
        const Employee: Employee = {
            id: doc.id,
            ...data,
            createdAt: data?.createdAt?.toDate() || new Date(),
            updatedAt: data?.updatedAt?.toDate() || new Date(),
        } as Employee;

        return Employee;
    } catch (error) {
        throw error;
    }
};

/**
 * Updates an existing Employee in Firestore
 * @param id - The ID of the Employee to update
 * @param EmployeeData - The fields to update
 * @returns The updated Employee
 * @throws Error if Employee not found
 */
export const updateEmployee = async (
    id: string,
    EmployeeData: Pick<Employee, "name" | "position" | "department" | "email" | "phone" | "branchId">
): Promise<Employee> => {
    try {
        const updateData = {
            ...EmployeeData,
            updatedAt: new Date(),
        };

        await updateDocument<Employee>(COLLECTION, id, updateData);

        // Return the updated Employee
        const updatedEmployee = await getEmployeeById(id);
        return updatedEmployee;
    } catch (error) {
        throw error;
    }
};

/**
 * Deletes an Employee from Firestore
 * @param id - The ID of the Employee to delete
 * @throws Error if Employee not found
 */
export const deleteEmployee = async (id: string): Promise<void> => {
    try {
        // Check if Employee exists before deleting
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Employee with ID ${id} not found`);
        }

        await deleteDocument(COLLECTION, id);
    } catch (error) {
        throw error;
    }
};
