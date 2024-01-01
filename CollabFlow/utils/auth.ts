import {hashSync, genSaltSync, compareSync} from 'bcryptjs'
import {IUser} from "../models/auth"
import {JwtPayload, sign, verify} from "jsonwebtoken"
import {jwt_secret, jwt_lifetime} from "../config/config"

interface ISchemaDefault{
    type:
    | StringConstructor
    | NumberConstructor
    | DateConstructor
    | BooleanConstructor
    | StringConstructor[]

    default: null | string | number | Date | boolean
}

export interface IJWToken {
    token: string,
    expiresAt: number
}

export interface TimeStamps {
    createdAt: Date;
    updatedAt: Date;
  }

export interface AuthResponseData {
    user: IBasicUser,
    jwt: IJWToken
}

export interface IBasicUser extends TimeStamps {
    _id: string
    firstName: string
    lastName: string
    email: string
    about: string,
}


export const generateHashedValue = (value: string) => {
    const salt = genSaltSync(10)
    return hashSync(value, salt)
}

export const checkValidity = (value: string, otherValue: string) => {
    return compareSync(value, otherValue)
}

export const getTypeAndDefaultValue = (type:
    | StringConstructor
    | NumberConstructor
    | DateConstructor
    | BooleanConstructor
    | StringConstructor[],
    defaultValue: null | string | number | Date | boolean): ISchemaDefault => {
        return {
            type, 
            default: defaultValue
        }
}


export const getBasicUserDetails = (user: IUser) =>  {
    const {
        _id,
        firstName,
        lastName,
        email,
        about, 
        createdAt,
        updatedAt} = user

    return {
        _id,
        firstName,
        lastName,
        email,
        about,
        createdAt,
        updatedAt
    }
}

export const createAccessToken = (id: any) => {

    const token: string = sign({id}, jwt_secret, {expiresIn: jwt_lifetime})
    const expiresAt: number = (verify(token, jwt_secret) as JwtPayload).exp || Date.now()

    return {token, expiresAt}
}

export const isTokenValid = (token: string) => {
    return verify(token, jwt_secret)
}