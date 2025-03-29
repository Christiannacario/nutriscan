import React from 'react'
import Login from './Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Homepage from './Homepage';
import Landingpage from './Landingpage';



const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landingpage />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/home' element={<Homepage />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App