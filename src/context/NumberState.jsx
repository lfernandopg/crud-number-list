import React, { useReducer } from 'react'
import NumberContext from './NumberContext'
import NumberReducer from './NumberReducer'
import { v4 as uuid } from 'uuid';

import { 
    GET_NUMBERS,
    ADD_NUMBER,
    UPDATE_NUMBER,
    DELETE_NUMBER,
    SET_EDIT_NUMBER,
    SET_NUMBER
} from './types';

const NumberState = props => {

    const initialNumber = {
        id : null,
        number : 0
    }

    const initialState = {
        listNumbers : [],
        number : initialNumber,
        editNumber : false
    }

    const [ state, dispatch ] = useReducer(NumberReducer, initialState)

    const getNumbers = () => {
        let listNumbers = JSON.parse(localStorage.getItem('listNumbers'));
        if (listNumbers) {
            dispatch({
                type : GET_NUMBERS,
                payload : listNumbers
            })
        }
    }

    const getNumber = id => {
        let listNumbers = JSON.parse(localStorage.getItem('listNumbers'));
        if (listNumbers) {
            const [ number ] = state.listNumbers.filter(number => (number.id === id) )
            dispatch({
                type : SET_NUMBER,
                payload : number
            })
        }
    }

    const addNumber = () => {
        let listNumbers = JSON.parse(localStorage.getItem('listNumbers'));
        if (!listNumbers) {
            listNumbers = [];
        }
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

    const updateNumber = id => {
        let listNumbers = JSON.parse(localStorage.getItem('listNumbers'));
        listNumbers = state.listNumbers.map(number => (number.id === state.number.id ? state.number : number) )
        localStorage.setItem('listNumbers', JSON.stringify([...listNumbers]));
        dispatch({
            type : UPDATE_NUMBER,
            payload : state.number
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

    const setNumber = number => {
        dispatch({
            type : SET_NUMBER,
            payload : number
        })
    }

    const setEditNumber = editNumber => {
        dispatch({
            type : SET_EDIT_NUMBER,
            payload : editNumber
        })
    }

    const inputChangeNumber = ({ target }) => {
        let property = target.name;
        let value = target.value;
        if (state.number.hasOwnProperty(property)) {
            dispatch({
                type : SET_NUMBER,
                payload : {
                    ...state.number,
                    [ property ] : value 
                }
            })
        }
    }

    const resetNumber = () => {
        dispatch({
            type : SET_NUMBER,
            payload : initialNumber
        })
    }

    return (        
        <NumberContext.Provider
            value={{
                listNumbers : state.listNumbers,
                number : state.number,
                editNumber : state.editNumber,
                getNumbers,
                getNumber,
                addNumber,
                updateNumber,
                deleteNumber,
                setNumber,
                setEditNumber,
                inputChangeNumber,
                resetNumber
            }}
        >
            {props.children}
        </NumberContext.Provider>  
    );
}
 
export default NumberState;