import React, { useContext, useEffect } from 'react'
import NumberContext from '../context/NumberContext'

const FormNumber = () => {

    const {
        number, 
        editNumber, 
        addNumber,
        updateNumber,
        setNumberState,
        formValues,
        handleInputChange,
        resetForm,
        resetNumber
    } = useContext(NumberContext)

    
    useEffect(() => {
        setNumberState({
            ...number,
            ...formValues
        }, 'number')
         // eslint-disable-next-line
    }, [formValues])

    const onSubmit = e => {
        e.preventDefault()
        if (editNumber) {
            updateNumber()
        } else {
            addNumber()
        }
        setNumberState(false, 'editNumber')
        resetNumber()
        resetForm()
    }

    return (  
        <form 
            onSubmit={onSubmit}
        >
            <input 
                type="number"
                name="number"
                value={formValues.number}
                placeholder="Number"
                onChange={handleInputChange}
            />
            <button
                type="submit"
            >
            { editNumber ? "Edit" : " Add"}
            </button>
        </form>
    );
}
 
export default FormNumber;