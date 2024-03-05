/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import { createTasksRequest, getTasksRequest } from '../api/task';

const TaskContext = createContext();

export const useTask = () => {
    const context = useContext(TaskContext);

    if(!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }

    return context;
}

export function TaskProvider ({ children }){
    const [ tasks, setTasks ] = useState([]);

    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            setTasks(res.data);
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

    const createTasks = async (tasks) => {
        console.log('task');
        const res = await createTasksRequest(tasks)
        console.log(res);
    }

    return (
        <TaskContext.Provider value={{ 
            tasks, 
            createTasks,
            getTasks
            }}>
            { children }
        </TaskContext.Provider>
    )
}