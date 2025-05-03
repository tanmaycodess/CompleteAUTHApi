import passport from "passport";
import { User } from "../models/user.models.js";
import { APIError } from "../utils/ApiError.js"
import { APIResponse } from "../utils/ApiResponse.js";

// export const loginController = async (req , res ) => {
//     try {  
//         const {email, password} = req.body

//         const user = await User.findOne({email}).select('+password');
//         if(!user) return new APIError(404 , 'no user by this email exists').send(res);

//         const matchPass = await user.comparePasswords(password)

//         if(!matchPass) return new APIError(404 ,'pass or email doesnot match').send(res);

//         user.password = undefined

//         return new APIResponse(200 , user , 'user logged in successfully').send(res);

//     } catch(e) {
//         return new APIError(500 , ['there was error login in' , e.message]).send(res);
//     }
// }

export const loginController = async (req , res , next) => {
    passport.authenticate('local' , (err, user, info) => {
        if(err) return next(err)

        if (!user) {
            return res.status(401).json({ message: info?.message || 'Invalid credentials' });
        }

        req.logIn(user, (err) => {
            if (err) return next(err);
      
            const sanitizedUser = { ...user.toObject(), password: undefined };
      
            return res.status(200).json({
                message: 'Login successful',
                user: sanitizedUser
            });
        });
    })(req, res, next);
}

export const logoutController = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return new APIError(401, 'You are not logged in').send(res);
    }
  
    req.logout(err => {
      if (err) return next(err);
  
      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        return new APIResponse(200, null, 'Logout successful').send(res);
      });
    });
  };