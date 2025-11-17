import { UserServiceContract } from './user.types'
import { UserRepository } from './user.repository'
import { sign, verify } from 'jsonwebtoken'
import { env } from '../config/env'
import { compare } from 'bcryptjs'


export const userService: UserServiceContract = {
    async login(email, password){
        const user = await UserRepository.login(email, password)
        if (!user){
            return "INVALID_CREDENTIALS"
        }
        const isPasswordValid = await compare(password, user.password)
        if (!isPasswordValid) {
            return "INVALID_PASSWORD"
        }
        return sign({userId: user.id}, env.JWT_SECRET_KEY, {expiresIn: '7d'})
    },
    async register(body){
        const user = await UserRepository.register(body)
        if (typeof user === "number"){
            return sign({userId: user}, env.JWT_SECRET_KEY, {expiresIn: '7d'})
        }
        return user
    },
    async me(id){
        const user = await UserRepository.findByIdWithoutPassword(+id)
        return user
    }
}