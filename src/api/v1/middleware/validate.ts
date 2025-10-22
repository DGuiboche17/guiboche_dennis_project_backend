import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { MiddlewareFunction } from "../types/express";
import { HTTP_STATUS } from "../constants/httpConstants";

interface RequestSchemas {
    body?: ObjectSchema;
    params?: ObjectSchema;
    query?: ObjectSchema;
}

interface ValidationOptions {
    stripBody?: boolean;
    stripQuery?: boolean;
    stripParams?: boolean;
}

/**
 * Creates an Express middleware function that validates different parts of the request
 * against separate Joi schemas and strips unknown fields appropriately.
 *
 * @param schemas - Object containing separate schemas for body, params, and query
 * @param options - Validation options for stripping behavior
 * @returns Express middleware function that performs the validation
 */
export const validateRequest = (
    schemas: RequestSchemas,
    options: ValidationOptions = {}
): MiddlewareFunction => {
    // stripParams - Usually don't strip params as they're route-defined
    const defaultOptions = {
        stripBody: true,
        stripQuery: true,
        stripParams: false,
        ...options,
    };

    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors: string[] = [];

            /**
             * Validates a specific part of the request against a Joi schema
             * @param schema - Joi schema to validate against
             * @param data - The request data to validate
             * @param partName - Name of the request part for error prefixing
             * @param shouldStrip - Whether to strip unknown fields from the validated data
             * @returns The original data if validation fails or stripping is disabled, otherwise the stripped/validated data
             */
            const validatePart = (
                schema: ObjectSchema,
                data: any,
                partName: string,
                shouldStrip: boolean
            ) => {
                const { error, value } = schema.validate(data, {
                    abortEarly: false,
                    stripUnknown: shouldStrip,
                });

                if (error) {
                    errors.push(
                        ...error.details.map(
                            (detail) => `${partName}: ${detail.message}`
                        )
                    );
                } else if (shouldStrip) {
                    return value;
                }
                return data;
            };

            // Validate each request part if schema is provided
            if (schemas.body) {
                req.body = validatePart(
                    schemas.body,
                    req.body,
                    "Body",
                    defaultOptions.stripBody
                );
            }

                if (schemas.params) {
        const validatedParams = validatePart(
            schemas.params,
            req.params,
            "Params",
            defaultOptions.stripParams
        );
        if (defaultOptions.stripParams) {
            // Only replace params if stripping is enabled
            Object.keys(req.params).forEach(key => delete req.params[key]);
            Object.assign(req.params, validatedParams);
        }
        // else leave req.params as is (since no stripping or transformation done)
    }


            // Just to remind myself
            // Body is an aspect of an http request that is sent by a client to the server; this can have data like json, files, etc.
            // params are when you start to look for specific things like maybe the ID of an item
            // query is when you start getting down to filtering for example, it starts off with ? and then specifics follow 
            // like if the item the client wants has certain characters in it, or maybe a set number of characters like 10 (like SQL queries)


            if (schemas.query) {
                const validatedQuery = validatePart(
                    schemas.query,
                    req.query,
                    "Query",
                    defaultOptions.stripQuery
                );
                Object.keys(req.query).forEach(key => delete req.query[key]);
                Object.assign(req.query, validatedQuery);
            }

            // If there are any validation errors, return them
            if (errors.length > 0) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json({
                    error: `Validation error: ${errors.join(", ")}`,
                });
            }

            next();
        } catch (error: unknown) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                error: (error as Error).message,
            });
        }
    };
};
