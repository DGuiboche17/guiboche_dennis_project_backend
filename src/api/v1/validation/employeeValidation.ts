import Joi from "joi";

// employee operation schemas organized by request part
export const employeeSchemas = {
    // POST /employees - Create new employee
    create: {
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty",
            }),
            position: Joi.string().required().messages({
                "any.required": "Position is required",
                "string.empty": "Position cannot be empty",
            }),

            email: Joi.string().email().required().messages({
                "any.required": "email is required",
                "string.empty": "email cannot be empty",
                "string.email": "email must be a valid email address",
            }),
            branchId: Joi.number().required().min(0).messages({
                "number.min": "branch id must be a positive number",
                "any.required": "branch id cannot be empty",
            }),
        }),
    },

    // delete employee by id
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "employee ID is required",
                "string.empty": "employee ID cannot be empty",
            }),
        }),
    },

    // GET /employees - Get all employees
    getAll: {
        query: Joi.object({ 
            limit: Joi.number().optional().min(1).messages({
                "number.min": "Limit must be at least 1",
            }),
            offset: Joi.number().optional().min(0).messages({
                "number.min": "Offset cannot be negative",
            }),
        }), 
    },

    // GET /employees/:id - Get single employee by ID
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "employee ID is required",
                "string.empty": "employee ID cannot be empty",
            }),
        }),
    },

    // update employee by id
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "employee ID is required",
                "string.empty": "employee ID cannot be empty",
            }), 
        }),
        body: Joi.object({
            name: Joi.string().optional().messages({
                "string.empty": "Name cannot be empty",
            }),
            position: Joi.string().optional().messages({
                "string.empty": "Position cannot be empty",
            }),
            email: Joi.string().email().optional().messages({
                "string.empty": "email cannot be empty",
            }),
            branchId: Joi.number().optional().min(0).messages({
                "number.min": "branch id must be a positive number",
            }),
        }),
    },
    
};
