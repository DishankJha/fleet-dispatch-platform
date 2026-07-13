import AppError from "../errors/AppError.js";

export function authorize(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    "You are not authorized to access this resource",
                    403
                )
            );
        }

        next();
    };
}