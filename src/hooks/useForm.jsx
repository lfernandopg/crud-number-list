import { useState } from 'react';

const useForm = (initialState = {}) => {
    
    const [ values, setValues ] = useState(initialState);

    const resetForm = () => { setValues(initialState); }

    const handleInputChange = ({ target }) => {
        const { value } = target
        const property = target.name
        if (values.hasOwnProperty(property)) {
            setValues({
                ...values,
                [ property ] : value 
            });
        }
    }

    return [ values, setValues, handleInputChange, resetForm ];
}

export default useForm