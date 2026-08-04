import { useTheme } from 'next-themes';
import React from 'react'
import { useRegisterActions, type Action } from 'kbar';

const useThemeSwitching = () => {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');  
    }

    const themeActions: Action[] = [
        
    ]
  return (
    <div>useThemeSwitching</div>
  )
}

export default useThemeSwitching