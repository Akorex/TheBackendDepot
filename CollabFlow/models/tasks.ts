import mongoose from "mongoose";
import { Model, Document } from "mongoose";
import { TimeStamps, getTypeAndDefaultValue } from "../utils/auth";

export interface ITask extends Document, TimeStamps{
    name: string
    description: string
    workspaceId: Object
    assignerId: Object
    assigneeId: Object
    status: string
}


const TaskSchema = new mongoose.Schema({
    name: {
        type: String, 
        maxlength: 20,
        required: [true, "Name of Task is required"]
    }, 

    description: getTypeAndDefaultValue(String, null),

    workspaceId: {
        type: mongoose.Types.ObjectId,
        ref: "Workspace"
    },

    assignerId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }, 

    assigneeId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },

    status: {
        type: String,
        enum: ['To do', 'Doing', 'Done'],
        default: 'To do'
    }

}, {timestamps: true})

const Tasks: Model <ITask> = mongoose.model<ITask>("Tasks", TaskSchema)

export default Tasks