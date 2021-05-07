import React, { useContext, useEffect} from 'react'
import NumberContext from '../context/NumberContext'

const ListNumber = () => {
    
    const { 
        listNumbers, 
        fetchNumbers, 
        setNumberState,  
        deleteNumber,
        handleValuesChange,
        resetForm,
        resetNumber
    } = useContext(NumberContext)

    useEffect(() => {
        fetchNumbers()
        // eslint-disable-next-line
    }, [])

    const onClickEdit = number => {
        setNumberState(number, 'number')
        handleValuesChange(number)
        setNumberState(true, 'editNumber')
    }

    const onClickDelete = id => {
        deleteNumber(id)
        setNumberState(false, 'editNumber')
        resetForm()
        resetNumber()
    }

    return (
        <ul>
            {listNumbers.map( number => (
                <li
                    key={number.id}
                >{number.number}
                    <i 
                        className="fas fa-edit"
                        style={{
                            marginLeft : "10px",
                            cursor : "pointer"
                        }}
                        onClick={() => onClickEdit(number)}
                    />
                    <i 
                        className="fas fa-trash-alt"
                        style={{
                            marginLeft : "10px",
                            cursor : "pointer"
                        }}
                        onClick={() => onClickDelete(number.id)}
                    />
                </li>
            ))}
        </ul>  
    );
}
 
export default ListNumber;