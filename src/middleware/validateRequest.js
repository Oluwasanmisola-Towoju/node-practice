export const validaterequest = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            // First format error
            const formatted = result.error.format();

            // Then flatten the errors
            const flatErrors = Object.values(formatted)
                .flat()
                // Filter out the errors for any booleans
                .filter(Boolean)
                // Map out the error messages for the specific ones
                .map((err) => err._errors)
                // Flatten the error messages again
                .flat();
            
            console.log(flatErrors);

            return res
            .status(400)
            .json({
                message: flatErrors
                // return the joint message as a response
                .join(", ")
            });
        }

        next();
    };
};