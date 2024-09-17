import { useState } from 'react'
import { Route,Routes,useLocation } from 'react-router-dom'
import './App.css'
import SignIn from './components/SignIn/SignIn'
import Navbar from './components/Navbar/Navbar'
import { useModal } from './context/modal-context'
import SignUp from './components/SignUp/SignUp'
import Me from './pages/me/Me'
import Modal from './components/Modal/Modal'
function App() {

  const {isSignInModalOpen,isSignUpSuccessfull,isSignUpModalOpen} = useModal()

  const location = useLocation()
  
  return (
    <>

      <Routes>
        <Route path='/todos' element={<Me/>}/>
      </Routes>
      

      {location.pathname !== '/todos' && (
        <>
          <Navbar/>
          {isSignInModalOpen ? <SignIn/> : <SignUp/>}
        </>
      )}

    {
      isSignUpSuccessfull && <Modal/>
    }
    
    </>
  )
}

export default App
