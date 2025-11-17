import { UserRepositoryContract } from './user.types'
import { PrismaClient as PC } from '../generated/prisma'
import { compare, hash } from 'bcryptjs'
const client = new PC() 

export const UserRepository: UserRepositoryContract = {
    async login(email, password) {
        try {
            const user = await client.user.findUnique({where: {email: email}})
            if (!user) {
                return null
            }
            return user
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async register(body) {
        try {
            const {email, password, firstName, secondName, avatar} = body
            const hashedPassword = await hash(password, 10)
            let isRegistered = await client.user.findUnique({where: {email: email}})
            if (!isRegistered){
                const user = await client.user.create({
                    data: {
                        firstName: firstName,
                        secondName: secondName,
                        email: email,
                        avatar: avatar,
                        password: hashedPassword
                    },
                })
                return user.id
            } else{
                return 'USER_EXISTS'
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async findByIdWithoutPassword(id) {
        try {
            return await client.user.findUnique({
                where: {id: id}, 
                omit: {password: true}
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    },
}