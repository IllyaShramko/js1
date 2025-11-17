import { Request, Response } from "express";
import { Prisma } from "../generated/prisma";

export type User = Prisma.UserGetPayload<{}>
export type UserWithoutPassword = Omit<User, 'password'>

export type registerForm = {
    email: string,
    password: string,
    firstName: string,
    secondName: string,
    avatar?: string
}
export interface UserControllerContract {
    login: (req: Request<object, string, {email: string, password: string}>, res: Response<string>) => void,
    register: (req: Request<object, string, registerForm>, res: Response<string>) => void
    me: (req: Request<object, string>, res: Response<string | object>) => void
}
export interface UserRepositoryContract {
    login: (email: string, password: string) => Promise<User | null>;
    register: (body: registerForm) => Promise<string | number>;
    findByIdWithoutPassword: (id: number) => Promise<UserWithoutPassword | string | null>;

}
export interface UserServiceContract {
    login: (email: string, password: string) => Promise<string>;
    register: (body: registerForm) => Promise<string>;
    me: (id: number) => Promise<UserWithoutPassword | string | null | undefined > 
}