interface Tasks {
    id: number
    title: string,
    description: string,
    status: boolean
}


let tasks: Tasks[] = []

const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
    tasks = JSON.parse(storedTasks);
}

export function getTask() {
    return tasks
}

export function addTask(newTask: Tasks) {
    let long = tasks.length
    tasks.push({...newTask, id: ++long})
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function updateStatus(id: number, newStatus: boolean) {
    tasks = tasks.map(task => task.id === id ? {...task, status: newStatus}: task)
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function updateTask(id: number, newTitle: string, newDescription: string) {
    tasks = tasks.map(task => task.id === id ? {...task, title: newTitle, description: newDescription}: task)
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function deleteTask(id:number) {
    tasks = tasks.filter(task => task.id !== id)
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
