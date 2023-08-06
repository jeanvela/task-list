import React, { useState } from 'react'
import { updateStatus } from '../data/data'
import { toast } from 'react-toastify'
import style from '../styles//CardTask.module.css'

interface Task {
    id: number
    title: string
    description: string
    status: boolean
    handleClickDelete: (event: React.FormEvent<HTMLButtonElement>, id: number) => void;
    handleClickUpdateTask: (event: React.FormEvent<HTMLButtonElement>, id: number, newTitle: string, newDescription: string) => void
}

const CardTask = ({ id, title, description, status, handleClickDelete, handleClickUpdateTask}: Task): JSX.Element => {
   
    const [taskStatus, setTaskStatus] = useState(status);
    const [isEditing, setIsEditing] = useState(false)
    const [editTask, setEditTask] = useState({
        title: title,
        description: description
    })

    const handleEditClick = () => {
        setIsEditing(!isEditing)
    }

    const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value} = event.currentTarget
        setEditTask({...editTask,[name]: value})
    }

    const handleClick = (event:React.FormEvent<HTMLButtonElement>, id: number, newStatus: boolean) => {
        try {
            event.preventDefault()
            updateStatus(id, newStatus)
            setTaskStatus(newStatus);
            toast.success('Estado cambiado con exito', {
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
        <div className={style.container}>
            {
                isEditing ? <>
                    <div className={style.contaiInfo}>
                        <input className={style.inputName} type="text" name='title' value={editTask.title} onChange={handleChange}/>
                        <textarea className={style.texDes} name="description" value={editTask.description} cols={30} rows={3} onChange={handleChange}></textarea>
                    </div>
                    <div className={style.btns}>
                        <button className={style.btnCancelar} onClick={handleEditClick}>Cancelar</button>
                        <button className={style.btnConfirmar} onClick={(event) => {handleClickUpdateTask(event, id, editTask.title, editTask.description), setIsEditing(!isEditing)}}>Confirmar</button>
                    </div>
                </> : <>
                    <div className={style.contaiInfo}>
                        <h3 className={style.h3}>{title}</h3>
                        <p className={style.p}>{description}</p>
                    </div>
                    <div className={style.contaiBtns}>
                        <button className={style.edit} onClick={handleEditClick}>📝</button>
                        {
                            taskStatus ? <button className={style.btnFalse} onClick={(event) => handleClick(event ,id, false)}>❌</button> :
                            <button className={style.btnTrue} onClick={(event) => handleClick(event, id, true)}>✔️</button>
                        }
                        <button className={style.btnDelete} onClick={(event) => handleClickDelete(event, id)}>🗑️</button>
                    </div>
                </>
            }
        </div>
    )
}
// ✅ //
export default CardTask