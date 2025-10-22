// notes are for my own knowledge
// route will listen for this like a receptionist
import express from 'express';
import {
    createBranch,
    getAllBranches,
    getBranchById,
    updateBranch,
    deleteBranch,

} from "../controllers/branchesControllers";
import { validateRequest } from '../middleware/validate';
import { branchesSchemas } from '../validation/branchesValidation';

const router = express.Router();

router.post('/',
    validateRequest(branchesSchemas.create), 
    createBranch);
router.get('/',
    validateRequest(branchesSchemas.getAll),
    getAllBranches);
router.get('/:id', 
    validateRequest(branchesSchemas.getById),
    getBranchById);
router.put('/:id',
    validateRequest(branchesSchemas.update),
    updateBranch);
router.delete('/:id',
    validateRequest(branchesSchemas.delete),
    deleteBranch);  

export default router;