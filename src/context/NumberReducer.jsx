import { 
    GET_NUMBERS,
    ADD_NUMBER,
    UPDATE_NUMBER,
    DELETE_NUMBER,
    SET_EDIT_NUMBER,
    SET_NUMBER
} from './types';

const NumberReducer = (state, action) => {
    const { payload, type } = action

    switch (type) {
        case GET_NUMBERS :
            return {
                ...state,
                listNumbers: [...payload]
            }
        case ADD_NUMBER :
            return {
                ...state,
                listNumbers: [payload, ...state.listNumbers]
            }
        case UPDATE_NUMBER :
            let updatedListNumber = state.listNumbers.map(number => number.id === payload.id ? payload : number )
            return {
                ...state,
                listNumbers: [...updatedListNumber]
            }
        case DELETE_NUMBER :
            let deletedListNumber = state.listNumbers.filter(number => (number.id !== payload) )
            return {
                ...state,
                listNumbers: [...deletedListNumber]
            }
        case SET_EDIT_NUMBER : {
            return {
                ...state,
                editNumber : payload
            }
        }
        case SET_NUMBER : {
            return {
                ...state,
                number : payload
            }
        }
        default :
            return state
    }
}

export default NumberReducer