import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import DashBord from './pages/DashBord'
import Login from './pages/Login'
import Register from './pages/Register'
import Create from './pages/Create'
import Edit from './pages/Edit'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/dashboard' element={<DashBord/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/sign-up' element={<Register/>} />
          <Route path='/create' element={<Create/>} />
          <Route path='/edit' element={<Edit/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
