import { useState } from 'react'
import { toast } from 'react-toastify'
import { addTask } from '../data/data'
import { Link } from 'react-router-dom'
import style from '../styles/CreateTask.module.css'

interface AddTask {
    id: number,
    title: string,
    description: string,
    status: boolean
}

const CreateTask = (): JSX.Element => {
    const [newTask, setNewTask] = useState<AddTask>({
        id: 1,
        title: "",
        description: "",
        status: false
    })

    const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const { name, value } = event.currentTarget
        setNewTask({...newTask,[name]:value})
    }
 
    const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
        try {
            event.preventDefault()
            addTask(newTask)
            setNewTask({
                id: newTask.id++,
                title: "",
                description: "",
                status: false
            })
            toast.success('Tarea creada', {
                position: 'top-center',
                autoClose: 3000,
                pauseOnHover: false,
                closeOnClick: false,
                theme: 'light',
            })
        } catch (error) {
            toast.error('Algo salio mal', {
                position: 'top-center',
                autoClose: 3000,
                pauseOnHover: false,
                closeOnClick: false,
                theme: 'light',
            })
            console.log(error)
        }
    }

    return (
        <section className={style.sectionCreateTask}>
            <div className={style.div_h1}>
                <h1 className={style.h1}>Crea tu tarea</h1>
            </div>
            <div className={style.container}>
                <form className={style.form}>
                    <div className={style.contaiName}>
                        <label className={style.labelName}>Nombre</label>
                        <input className={style.inputName} type="text" name='title' value={newTask.title} onChange={handleChange}/>
                    </div>
                    <div className={style.contaiDescription}>
                        <label className={style.labelDescription}>Descripcion</label>
                        <textarea className={style.texDescription} name="description" value={newTask.description} onChange={handleChange} id="" cols={25} rows={5}></textarea>
                    </div>
                    <div>
                        <button className={style.btnAdd} onClick={handleClick}>Añadir</button>
                    </div>
                </form>
            </div>
            <div className={style.contaBtn}>
                <Link to='/Task-list'>
                    <button className={style.btn}>Tareas</button>
                </Link>
            </div>
        </section>
    )
}

export default CreateTask