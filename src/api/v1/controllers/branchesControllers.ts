import { Request, Response } from 'express';
import { branches, Branch } from '../../../data/branches';

// create a new branch
export const createBranch = (req: Request, res: Response): void => {
    const { name, address, phone } = req.body;
    if (!name || !address || !phone) {
        res.status(400).json({ message: 'Missing required fields.' });
        return;
    }
    const newBranch: Branch = {
        id: branches.length > 0 ? branches[branches.length - 1].id + 1 : 1,
        name,
        address,
        phone
    };
    branches.push(newBranch);
    res.status(201).json({
        message: 'Branch created successfully.',
        data: newBranch
    });
    
};

// get all branches
export const getAllBranches = (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Branches retrieved successfully.', data: branches });
};

// get a branch by ID
export const getBranchById = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    const branch = branches.find(branch => branch.id === id);
    if (!branch) {
        res.status(404).json({ message: 'Branch not found.' });
        return;
    }   
    res.status(200).json({ message: 'Branch retrieved successfully.', data: branch });
};

// update a branch
export const updateBranch = (req: Request, res: Response): void => {
    const id = Number(req.params.id);   
    const { name, address, phone } = req.body;
    const branch = branches.find(branch => branch.id === id);
    if (!branch) {
        res.status(404).json({ message: 'Branch not found.' });
        return;
    }    
    if (name) branch.name = name;
    if (address) branch.address = address;
    if (phone) branch.phone = phone;    
    res.status(200).json({ message: 'Branch updated successfully.', data: branch });
};

// delete a branch  
export const deleteBranch = (req: Request, res: Response): void => {
    const id = Number(req.params.id);
    const index = branches.findIndex(branch => branch.id === id);   
    if (index === -1) {
        res.status(404).json({ message: 'Branch not found.' });
        return;
    }
    branches.splice(index, 1);
    res.status(200).json({ message: 'Branch deleted successfully.' });
}   

