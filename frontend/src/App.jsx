

import React from 'react'
import Cer_Res from './pages/Cer_Res'
import Cert_Issue from './components/Cert_Veri'
import Admin from './pages/Admin'
import { Routes,Route } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Nav from './components/Nav'
const App = () => {
  return (
    <>
        {/* <Admin/>
        <Cer_Res/> */}
         {/* <Cert_Issue/> */}
         <Nav/>
         <Routes>
             <Route path='/' element={<Home/>} />
             <Route path='/about' element={<About/> } />
             <Route path='/admin' element={<Admin/>} />
             <Route path='/verify' element={<Cer_Res/>} />
         </Routes>
        
    </>
  )
}

export default App