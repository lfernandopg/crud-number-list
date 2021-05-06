import React, { useReducer } from 'react'
import NumberContext from './NumberContext'
import NumberReducer from './NumberReducer'
import { v4 as uuid } from 'uuid';
import useForm from '../hooks/useForm';

import { 
    ADD_NUMBER,
    UPDATE_NUMBER,
    DELETE_NUMBER,
    SET
} from './types';


const NumberState = props => {

    const initialState = {
        listNumbers : [],
        number : {
            id : '',
            number : ''
        },
        editNumber : false
    }

    const [ state, dispatch ] = useReducer(NumberReducer, initialState)

    const [ values, setValues, handleInputChange, resetForm ] = useForm({
        number : ''
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
            const [ number ] = state.listNumbers.filter(number => (number.id === id) )
            dispatch({
                type : SET,
                payload : {
                    property : 'number',
                    value : number
                }
            })
            for (const [key, value] of Object.entries(number)) {
                if (values.hasOwnProperty(key)) {
                    setValues({
                        [ key ] : value
                    })
                }
            }
        }
    }

    const addNumber = () => {
        let listNumbers = JSON.parse(localStorage.getItem('listNumbers'));
        if (!listNumbers) {
            listNumbers = [];
        }
        let number = {
            ...values, 
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

    const updateNumber = (id, updatedNumber = null) => {
        if (!updatedNumber) {
            updatedNumber = {
                ...state.number,
                ...values
            }
        }
        let listNumbers = JSON.parse(localStorage.getItem('listNumbers'));
        listNumbers = state.listNumbers.map(number => (number.id === updatedNumber.id ? updatedNumber : number) )
        localStorage.setItem('listNumbers', JSON.stringify([...listNumbers]));
        dispatch({
            type : UPDATE_NUMBER,
            payload : updatedNumber
        })
    }

    const deleteNumber = id => {
        let listNumbers = JSON.parse(localStorage.getItem('listNumbers'));
        listNumbers = state.listNumbers.filter(number => (number.id !== id) )
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
                handleInputChange,
                resetForm,
                values,
            }}
        >
            {props.children}
        </NumberContext.Provider>  
    );
}
 
export default NumberState;