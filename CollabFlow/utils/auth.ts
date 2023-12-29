interface ISchemaDefault{
    type:
    | StringConstructor
    | NumberConstructor
    | DateConstructor
    | BooleanConstructor
    | StringConstructor[]

    default: null | string | number | Date | boolean
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