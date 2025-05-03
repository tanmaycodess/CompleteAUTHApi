import { APIError } from "../utils/ApiError.js"

export const authorizedRoles = (...allowedRoles) => {
    return (req , res , next) => {
        if(!req.isAunthenticated()) return new APIError(401 , 'you are not authorized for this action').send(res);
        
        if(!allowedRoles.includes(req.user.roles[0])) return new APIError(404 , 'role not found').send(res);

        next();
    }
}

// example usage 

// router.get('/admin-only', authorizeRoles('admin'), adminDashboardController);
