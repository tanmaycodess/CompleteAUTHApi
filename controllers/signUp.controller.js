import { User } from "../models/user.models.js";
import { APIError } from "../utils/ApiError.js"
import { APIResponse } from "../utils/ApiResponse.js";

export const signUpController = async (req, res) => {
    try{
        const data = req.body

        const existinguser = await User.findOne({email: data.email})
        if(existinguser) return new APIError(400, 'user already exists').send(res);

        const response = await User.create(data)

        return new APIResponse(200 , response , 'signUp successfull').send(res);

    } catch (e) {
        return new APIError(500 , ['there was an error singing up' , e.message ]).send(res);
    }
}