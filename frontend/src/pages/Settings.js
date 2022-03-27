import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';

const getStorageTheme = () => {
    let theme = 'light-theme';
    if (localStorage.getItem('theme')) {
      theme = localStorage.getItem('theme');
    }
    return theme;
  };


const Settings = () =>
{
    const [theme, setTheme] = useState(getStorageTheme());

    const toggleTheme = () => {
        if (theme === 'light-theme') {
        setTheme('dark-theme');
        } else {
        setTheme('light-theme');
        }

    };
    useEffect(() => { document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

    
    return(
      <div>
      <Navbar/>
        Settings page
        <button className="btn" onClick={toggleTheme}>
            toggle
          </button>
      </div>
    );
};
export default Settings;