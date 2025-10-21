import { Branch } from "../models/branchesModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION = "branches";

/**
 * Retrieves all branches from Firestore
 * @returns Array of all branches
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    try {
        const snapshot = await getDocuments(COLLECTION);
        const branches: Branch[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date(),
                updatedAt: data.updatedAt?.toDate() || new Date(),
            } as Branch;
        });
        return branches;
    } catch (error) {
        throw error;
    }
};

/**
 * Creates a new Branch in Firestore
 * @param BranchData - The data for the new Branch
 * @returns The created Branch with generated ID
 */
export const createBranch = async (BranchData: {
    name: string;
    location: string;
    phone: string;
}): Promise<Branch> => {
    try {
        const now = new Date();
        const newBranchData = {
            ...BranchData,
            createdAt: now,
            updatedAt: now,
        };

        const id = await createDocument<Branch>(COLLECTION, newBranchData);
        return { id, ...newBranchData } as Branch;
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves a single Branch by ID from Firestore
 * @param id - The ID of the Branch to retrieve
 * @returns The Branch if found
 * @throws Error if Branch not found
 */
export const getBranchById = async (id: string): Promise<Branch> => {
    try {
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Branch with ID ${id} not found`);
        }

        const data = doc.data();
        const branch: Branch = {
            ...data,
            createdAt: data?.createdAt?.toDate() || new Date(),
            updatedAt: data?.updatedAt?.toDate() || new Date(),
        } as Branch;

        return branch;
    } catch (error) {
        throw error;
    }
};

/**
 * Updates an existing Branch in Firestore
 * @param id - The ID of the Branch to update
 * @param BranchData - The fields to update
 * @returns The updated Branch
 * @throws Error if Branch not found
 */
export const updateBranch = async (
    id: string,
    branchData: Pick<Branch, "name" | "location" | "phone">
): Promise<Branch> => {
    try {
        const updateData = {
            ...branchData,
            updatedAt: new Date(),
        };

        await updateDocument<Branch>(COLLECTION, id, updateData);

        // Return the updated Branch
        const updatedBranch = await getBranchById(id);
        return updatedBranch;
    } catch (error) {
        throw error;
    }
};

/**
 * Deletes an Branch from Firestore
 * @param id - The ID of the Branch to delete
 * @throws Error if Branch not found
 */
export const deleteBranch = async (id: string): Promise<void> => {
    try {
        // Check if Branch exists before deleting
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Branch with ID ${id} not found`);
        }

        await deleteDocument(COLLECTION, id);
    } catch (error) {
        throw error;
    }
};
