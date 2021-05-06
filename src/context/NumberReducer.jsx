import { 
    ADD_NUMBER,
    UPDATE_NUMBER,
    DELETE_NUMBER,
    SET
} from './types';

const isObject = input => {
    return null !== input && 
      typeof input === 'object' &&
      Object.getPrototypeOf(input).isPrototypeOf(Object);
}

const isArray = input => {
    return Array.isArray(input)
}

const NumberReducer = (state, action) => {
    const { payload, type } = action

    switch (type) {
        case ADD_NUMBER :
            return {
                ...state,
                listNumbers: [payload, ...state.listNumbers]
            }
        case UPDATE_NUMBER :
            return {
                ...state,
                listNumbers: state.listNumbers.map(number => number.id === payload.id ? payload : number )
            }
        case DELETE_NUMBER :
            return {
                ...state,
                listNumbers: state.listNumbers.filter(number => (number.id !== payload) )
            }
        case SET :
            const { property, value } = payload
            if (!property) {
                return {
                    ...state,
                    ...value
                }
            }
            if (isArray(value)) {
                return {
                    ...state,
                    [property] : [...value]
                }
            }
            if (isObject(value)) {
                return {
                    ...state,
                    [property] : {
                        ...value
                    }
                }
            }
            return {
                ...state,
                [property] : value
            }
        default :
            return state
    }
}

export default NumberReducer