import React, { useContext } from 'react'
import NumberContext from '../context/NumberContext'

const FormNumber = () => {

    const { 
        editNumber, 
        number, 
        addNumber,
        updateNumber, 
        inputChangeNumber, 
        setEditNumber,
        resetNumber, 
    } = useContext(NumberContext)

    const onSubmit = e => {
        e.preventDefault()
        if (editNumber) {
            updateNumber(number.id)
        } else {
            addNumber()
        }
        setEditNumber(false)
        resetNumber()
    }

    return (  
        <form 
            onSubmit={onSubmit}
        >
            <input 
                type="number"
                name="number"
                value={number.number}
                placeholder="Number"
                onChange={inputChangeNumber}
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