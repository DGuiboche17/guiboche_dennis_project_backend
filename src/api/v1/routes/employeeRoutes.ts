import express from 'express';
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,

} from "../controllers/employeesControllers";
import { validateRequest } from '../middleware/validate';
import { employeeSchemas } from '../validation/employeeValidation';

const router = express.Router();

router.post('/', 
  validateRequest(employeeSchemas.create),
  createEmployee);
router.get('/', 
  validateRequest(employeeSchemas.getAll),
  getAllEmployees);
router.get('/:id', 
  validateRequest(employeeSchemas.getById),
  getEmployeeById);
router.put('/:id', 
  validateRequest(employeeSchemas.update),
  updateEmployee);
router.delete('/:id', 
  validateRequest(employeeSchemas.delete),
  deleteEmployee);

export default router;
