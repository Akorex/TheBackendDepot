import mongoose from "mongoose"
import { getTypeAndDefaultValue } from "../utils/auth"


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


const Workspace = mongoose.model("Workspace", WorkspaceSchema)

export default Workspace