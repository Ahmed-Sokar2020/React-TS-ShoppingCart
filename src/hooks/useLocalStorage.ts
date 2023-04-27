import { useState, useEffect } from 'react';


export function useLocalStorage<T>(key:string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        //Check if there are Items in LocalStorage
        if(jsonValue !== null) return JSON.parse(jsonValue);
        // Check if the Initial Value is a function or not
        if(typeof initialValue === 'function') {
            return (initialValue as ()=> T) ; 
        } else {
            return initialValue;
        }

    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    },[key, value])

    return [value, setValue] as [typeof value, typeof setValue]
}