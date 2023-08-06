import { createContext,useState, useEffect } from "react";

export const TaskContext = createContext(null)

export const TaskProvider = ({children}: any) => {
    const [taskItems, setTaskItems] = useState(() => {
        try {
            const TaskInLocalStorage = localStorage.getItem('taskList')
            return TaskInLocalStorage ? JSON.parse(TaskInLocalStorage) : []
        } catch (error) {
            console.log(error)
            return[]
        }
    })

    useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(taskItems))
    },[taskItems])

    const addTask = (title: string, description: string) => {
        return title + description
    }
}