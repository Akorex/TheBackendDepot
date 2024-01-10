import {ITask} from '../models/tasks'

export const getBasicTaskDetails = (task: ITask) => {
    const {name, status} = task

    return {
        name,
        status
    }
}