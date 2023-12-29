import {hashSync, genSaltSync, compareSync} from 'bcryptjs'

interface ISchemaDefault{
    type:
    | StringConstructor
    | NumberConstructor
    | DateConstructor
    | BooleanConstructor
    | StringConstructor[]

    default: null | string | number | Date | boolean
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