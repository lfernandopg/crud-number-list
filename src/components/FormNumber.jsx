import React, { useContext } from 'react'
import NumberContext from '../context/NumberContext'

const FormNumber = () => {

    const { 
        editNumber, 
        addNumber,
        updateNumber,
        values, 
        handleInputChange, 
        resetForm, 
        setNumberState
    } = useContext(NumberContext)

    const onSubmit = e => {
        e.preventDefault()
        if (editNumber) {
            updateNumber()
        } else {
            addNumber()
        }
        setNumberState(false, 'editNumber')
        resetForm()
    }

    return (  
        <form 
            onSubmit={onSubmit}
        >
            <input 
                type="number"
                name="number"
                value={values.number}
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