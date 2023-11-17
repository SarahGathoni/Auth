import React, { useReducer } from 'react'
import { createContext } from 'react'

export const ThemeContext = createContext() 

const INIT_STATE = {nightMode:false};
const themeReducer = (state, action) =>{
    switch (action.type) {
        case "TOGGLE": 
          return {nightMode: !state.nightMode};
        default:
          return state;
    }
}

export const  ThemeProvider = (props) =>{
  const [state, dispatch] = useReducer(themeReducer, INIT_STATE)

  return(
    <ThemeContext.Provider value={{state, dispatch}}>
      {props.children}
    </ThemeContext.Provider>
  )
}



