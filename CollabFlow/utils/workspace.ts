import { IWorkspace } from "../models/workspace"

export const getBasicWorkspaceDetails = (workspace: IWorkspace) => {

    const {_id, name, visibility} = workspace

    return {
        _id,
        name,
        visibility
    }

}