import mongoose from "mongoose";
import { getTypeAndDefaultValue } from "../utils/auth";


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

const Tasks = mongoose.model("Tasks", TaskSchema)

export default Tasks