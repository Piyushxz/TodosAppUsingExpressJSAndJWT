import { useState } from 'react'

import './App.css'
import SignIn from './components/SignIn/SignIn'
import Navbar from './components/Navbar/Navbar'
import { useModal } from './context/modal-context'
import SignUp from './components/SignUp/SignUp'
function App() {

  const {isSignInModalOpen,isSignUpModalOpen} = useModal()

  

  return (
    <>
      <Navbar/>
      {isSignInModalOpen ? <SignIn/> : <SignUp/>}
    </>
  )
}

export default App
