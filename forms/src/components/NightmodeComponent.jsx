import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon} from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContextApi';


const Nightmode = () => {
  const theme = useContext(ThemeContext);
  const night = theme.state.nightMode;

  const handleClick = () =>{
    theme.dispatch({type: "TOGGLE"})
  }
  return (
    <>
    <div>
      <div className='divstyle'>
      <FontAwesomeIcon icon={faSun} />
      <FontAwesomeIcon icon={faMoon} className="pl-3" />

      
      <button onClick={handleClick}  className={`absolute bg-black h-[25px] w-[25px] rounded-full 
        
        ${night ? 'left-0' : 'right-0'}`}>
        
      </button>
      
    </div>
    </div>
    
    </>
    
  )
}

export default Nightmode
