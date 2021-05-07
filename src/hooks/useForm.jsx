import { useState } from 'react';

const useForm = (initialState = {}) => {
    
    const [ values, setValues ] = useState(initialState);

    const resetForm = () => { 
        setValues(initialState); 
    }
    
    const setProperty = (property, value) => {
        if (values.hasOwnProperty(property)) {
            setValues({
                ...values,
                [ property ] : value 
            });
        }
    }
        
    const handleInputChange = ({ target }) => {
        const { name, value } = target;
        setProperty(name, value)
    }

    const handleValuesChange = (newValues) => {
        Object.entries(newValues).forEach(([property, value]) => {
            setProperty(property, value)
        });
    }

   return [ values, handleValuesChange, handleInputChange, resetForm ];
}

export default useForm