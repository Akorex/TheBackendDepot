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

taskRouter.route('/').post(createTask).get()
taskRouter.route('/:id').get(getTask)

export default taskRouter