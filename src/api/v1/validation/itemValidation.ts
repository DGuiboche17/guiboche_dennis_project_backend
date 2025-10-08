import Joi from "joi";

// employee and branches operation schemas organized by request part
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
            }),
            branchId: Joi.number().required().min(0).messages({
                "number.min": "branch id must be a positive number",
                "number.required": "branch id cannot be empty",
            }),
        }),
    },

    // GET /items/:id - Get single employee by ID
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "employee ID is required",
                "string.empty": "employee ID cannot be empty",
            }),
        }),
    },
};
