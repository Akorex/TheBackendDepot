import mongoose from "mongoose"
import {Model, Document} from "mongoose"
import { TimeStamps, getTypeAndDefaultValue } from "../utils/auth"

export interface IWorkspace extends Document, TimeStamps{
    name: string
    description: string | null
    visibility: string | null
    members: Object
    createdBy: Object
    status: string
}



const WorkspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20,
        unique: true
    },

    description: getTypeAndDefaultValue(String, null),

    status: {
        ...getTypeAndDefaultValue(String, 'new'),
        enum: ['new', 'active', 'closed']
    },

    visibility: {
        type: String,
        enum: ['public', 'private', 'read-only']
    },

    members: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }],

    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {timestamps: true})


const Workspace: Model <IWorkspace>= mongoose.model<IWorkspace>("Workspace", WorkspaceSchema)

export default Workspace