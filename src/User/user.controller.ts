import { UserControllerContract } from "./user.types";
import { userService } from "./user.service";
import { TokenExpiredError, verify } from "jsonwebtoken";
import { env } from "../config/env";

export const UserController: UserControllerContract = {
    login: async (req, res) => {
        let body = req.body
        if (!body) {
            res.status(422).json("Body is required.")
            return
        }
        if (!body.email){
            res.status(422).json('email is required.')
            return
        }
        if (!body.password){
            res.status(422).json('password is required.')
            return
        }
        const user = await userService.login(body.email, body.password)

        if (user === 'INVALID_CREDENTIALS'){ 
            res.status(404).json("User not found")
            return
        } else {
            res.status(200).json(user)
            return
        }
        
    },
    register: async(req, res) => {
        let body = req.body
        if (!body) {
            res.status(422).json("Body is required.")
            return
        }
        if (!body.firstName){
            res.status(422).json('firstName is required.')
            return
        }
        if (!body.secondName){
            res.status(422).json('secondName is required.')
            return
        }
        if (!body.email){
            res.status(422).json('email is required.')
            return
        }
        if (!body.password){
            res.status(422).json('password is required.')
            return
        }
        const JWTOrAlready = await userService.register(body)
        if (JWTOrAlready == 'USER_EXISTS'){
            res.status(404).json('User with this email is already registered')
            return
        } else{
            res.status(201).json(JWTOrAlready)
            return
        }
    },
    me: async(req, res) => {
        const Authorization = req.headers.authorization
        if (!Authorization) {
            res.status(401).json({message: "authorization is required"})
            return
        }
        const [type, token] = Authorization.split(" ")
        console.log(type, token)
        if (type != "Bearer" || !token) {
            res.status(401).json({message: "wrong format autharization"})
            return
        }
        try {
            const payload = verify(token, env.JWT_SECRET_KEY)
            if (typeof payload == "string") {
                res.status(401).json({message: "Token wrong format"})
                return
            }
            const user = await userService.me(+payload.userId)
            if (!user) {
                res.status(404).json({message: "User not found"})
                return
            }
            res.status(200).json(user)
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                res.status(401).json({message: "You need to reload your token. It expired"})
                return
            }
            res.status(500).json({message: "Internal server error"})
        }
    }
}