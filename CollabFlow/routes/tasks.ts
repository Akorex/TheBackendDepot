import { Router } from "express"
import {
    createTask,
    getTask,
    getAllTasks, 
    assignTask,
    updateTaskStatus,
    deleteTask
} from '../controllers/tasks'

const taskRouter = Router()

taskRouter.route('/').post(createTask).get(getAllTasks)
taskRouter.route('/:id').get(getTask).delete(deleteTask).patch(updateTaskStatus)

export default taskRouter