import Joi from "joi";

// branch operation schemas organized by request part
export const branchesSchemas = {

    // create branch schema
    create: {
        body: Joi.object({ 
            name: Joi.string().required().messages({
                "any.required": "Branch name is required",
                "string.empty": "Branch name cannot be empty",  
            }),
            address: Joi.string().required().messages({
                "any.required": "Address is required",
                "string.empty": "Address cannot be empty",  
            }),
            phone: Joi.string().required().messages({
                "any.required": "Phone number is required",
                "string.empty": "Phone number cannot be empty",  
            }),
        }),
    },
    // get branch by id schema
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Branch ID is required",
                "string.empty": "Branch ID cannot be empty",
            }),
        }),
    },
    // get all branches schema
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

    // update branch schema
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Branch ID is required",
                "string.empty": "Branch ID cannot be empty",
            }),
        }),
        body: Joi.object({  
            name: Joi.string().optional().messages({
                "string.empty": "Branch name cannot be empty",  
            }),
            address: Joi.string().optional().messages({
                "string.empty": "Address cannot be empty",  
            }),
            phone: Joi.string().optional().messages({
                "string.empty": "Phone number cannot be empty",  
            }),
        }),
    },
    // delete branch schema
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Branch ID is required",    
                "string.empty": "Branch ID cannot be empty",
            }),
        }),
    },
}; 