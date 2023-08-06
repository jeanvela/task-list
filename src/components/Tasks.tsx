import CardTask from "./CardTask"
import { getTask, deleteTask, updateTask } from "../data/data"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import style from '../styles/Tasks.module.css'

interface Tasks {
    id: number
    title: string,
    description: string,
    status: boolean,
}

const Tasks = (): JSX.Element => {

    const [allTask, setAllTask] = useState<Tasks[]>([])

    useEffect(() => {
       setAllTask(getTask())
    },[allTask])

    const handleClickDelete = (event: React.FormEvent<HTMLButtonElement>, id: number) => {
        try {
            event.preventDefault()
            deleteTask(id)
            setAllTask(prevTask => prevTask.filter(task => task.id !== id))
            toast.success('Tarea eliminada', {
                position: 'top-center',
                autoClose: 3000,
                pauseOnHover: false,
                closeOnClick: false,
                theme: 'light',
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickUpdateTask = (event: React.FormEvent<HTMLButtonElement>, id: number, newTitle: string, newDescription: string) => {
        try {
            event.preventDefault()
            updateTask(id, newTitle, newDescription)
            setAllTask(getTask())
            toast.success('Tarea Editada', {
                position: 'top-center',
                autoClose: 3000,
                pauseOnHover: false,
                closeOnClick: false,
                theme: 'light',
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className={style.sectionTask}>
            <div>
                <Link to='/'>
                    <button className={style.btnVol}>Volver</button>
                </Link>
            </div>
            {
                allTask?.length === 0 ? <h1 className={style.h1}>No hay tareas</h1> : <div className={style.container}>
                    <h1 className={style.h1}>Tus tareas</h1>
                    <div className={style.contaiTask}>
                        {
                            allTask?.map((task, i) => {
                                return (
                                    <CardTask
                                        key={i}
                                        id={task.id}
                                        title={task.title}
                                        description={task.description}
                                        status={task.status}
                                        handleClickDelete={handleClickDelete}
                                        handleClickUpdateTask={handleClickUpdateTask}
                                        
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            }
        </section>
    )
}

export default Tasks