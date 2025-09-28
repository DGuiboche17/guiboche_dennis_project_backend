// notes are for my own knowledge
// route will listen for this like a receptionist
import express from 'express';
import {
    createBranch,
    getAllBranches,
    getBranchById,
    updateBranch,
    deleteBranch,

} from "../controllers/branchesController";

const router = express.Router();

router.post('/', createBranch);
router.get('/', getAllBranches);
router.get('/:id', getBranchById);
router.put('/:id', updateBranch);
router.delete('/:id', deleteBranch);  