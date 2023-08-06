import './App.css'
import Tasks from './components/Tasks'
import CreateTask from './components/CreateTask'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <main>
        {
          <Routes>
            <Route path='/' element={<CreateTask />} />
            <Route path='/Task-list' element={<Tasks/>} />
          </Routes>
        }
    </main>
  )
}

export default App
