import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/httpConstants";
import * as BranchesService from "../services/branchesService";
import { Branch } from "../models/branchesModel";
import { successResponse } from "../models/responseModel";

/**
 * Retrieves all branches
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const getAllBranches = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branches: Branch[] = await BranchesService.getAllBranches();
        res.status(HTTP_STATUS.OK).json(
            successResponse(branches, "Branches retrieved successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves a single branch by ID
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const getBranchById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = req.params.id
        const branch = await BranchesService.getBranchById(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(branch, "Branches retrieved successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Creates a new branch
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const createBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Extract validated data from request body
        const { name, address, phone } = req.body;
        const branchData = { name, address, phone };

        const newBranch: Branch = await BranchesService.createBranch(branchData);
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newBranch, "Branches created successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Updates an existing branch
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const updateBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = req.params.id
        const { name, address, phone } = req.body;

        // Create update data object with only the fields that can be updated
        const updateData = { name, address, phone };

        const updatedBranch = await BranchesService.updateBranch(id, updateData);
        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedBranch, "Branches updated successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Deletes an branch
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const deleteBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = req.params.id
        await BranchesService.deleteBranch(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(null, "Branches deleted successfully")
        );
    } catch (error) {
        next(error);
    }
};
