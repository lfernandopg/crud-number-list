import React, { useReducer } from 'react'
import NumberContext from './NumberContext'
import NumberReducer from './NumberReducer'
import useForm from '../hooks/useForm'
import { v4 as uuid } from 'uuid';

import { 
    ADD_NUMBER,
    UPDATE_NUMBER,
    DELETE_NUMBER,
    SET
} from './types';

const NumberState = props => {

    const initialNumber ={
        id : '',
        value : ''
    }

    const initialState = {
        listNumbers : [],
        number : initialNumber,
        editNumber : false
    }

    const [ state, dispatch ] = useReducer(NumberReducer, initialState)

    const [ values, handleValuesChange, handleInputChange, resetForm ] = useForm({
        value : ''
    }) 

    const fetchNumbers = () => {
        let listNumbers = JSON.parse(localStorage.getItem('listNumbers'));
        if (listNumbers) {
            dispatch({
                type : SET,
                payload : {
                    property : 'listNumbers',
                    value : listNumbers
                }
            })
        }
    }

    const fetchNumber = id => {
        let listNumbers = JSON.parse(localStorage.getItem('listNumbers'));
        if (listNumbers) {
            const [ number ] = listNumbers.filter(number => (number.id === id) )
            dispatch({
                type : SET,
                payload : {
                    property : 'number',
                    value : number
                }
            })
        }
    }

    const addNumber = () => {
        let listNumbers = state.listNumbers;
        let number = {
            ...state.number, 
            id : uuid()
        }
        localStorage.setItem('listNumbers', JSON.stringify([
            ...listNumbers,
            number 
        ]));
        dispatch({
            type : ADD_NUMBER,
            payload : number
        })
    }

    const updateNumber = (updatedNumber = null) => {
        if (!updatedNumber) {
            updatedNumber = state.number
        } 
        const listNumbers = state.listNumbers.map(number => (number.id === updatedNumber.id ? updatedNumber : number) )
        localStorage.setItem('listNumbers', JSON.stringify([...listNumbers]));
        dispatch({
            type : UPDATE_NUMBER,
            payload : updatedNumber
        })
    }

    const deleteNumber = id => {
        const listNumbers = state.listNumbers.filter(number => (number.id !== id) )
        localStorage.setItem('listNumbers', JSON.stringify([...listNumbers]));
        dispatch({
            type : DELETE_NUMBER,
            payload : id
        })
    }

    const setNumberState = (value, property = null) => {
        dispatch({
            type : SET,
            payload : {
                value,
                property
            }
        })
    }

    const resetNumber = () => {
        setNumberState(initialNumber, 'number')
    }

    return (        
        <NumberContext.Provider
            value={{
                listNumbers : state.listNumbers,
                number : state.number,
                editNumber : state.editNumber,
                fetchNumbers,
                fetchNumber,
                addNumber,
                updateNumber,
                deleteNumber,
                setNumberState,
                resetNumber,
                values,
                handleValuesChange,
                handleInputChange,
                resetForm,
            }}
        >
            {props.children}
        </NumberContext.Provider>  
    );
}
 
export default NumberState;