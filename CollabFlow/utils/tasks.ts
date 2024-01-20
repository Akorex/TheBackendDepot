import {ITask} from '../models/tasks'
import Workspace from '../models/workspace'
import User from '../models/auth'


export const confirmAccess = async (workspaceName: any, userId: any) => {
    // utility function to check if the workspace exists and user have access

    const workspace = await Workspace.findOne({
        name: workspaceName, 
        members: {$in: [userId]}
    })

    return !!workspace 

}

export const fetchUserId = async (email: string) => {
    const user = await User.findOne({email: email})

    if (user){
        return user._id
    }

    return null
}

export const getBasicTaskDetails = (task: ITask) => {
    const {name, status} = task

    return {
        name,
        status
    }
}
