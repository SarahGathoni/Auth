import React from 'react'
import Signup from './components/Signup'
import Nightmode from './components/NightmodeComponent';
import { useContext } from 'react';
import {ThemeContext} from './components/ThemeContextApi'





const App = () => {
  const theme = useContext(ThemeContext);
  const night = theme.state.nightMode;

  

  return (
    

    
        <div className={night ? "bg-black text-white" : "bg-white text-black"} >
      
        <Nightmode/>
        <Signup  />
      </div>
    
      
    
  )
}

export default App
