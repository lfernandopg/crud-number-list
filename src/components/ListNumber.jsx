import React, { useContext, useEffect} from 'react'
import NumberContext from '../context/NumberContext'

const ListNumber = () => {
    
    const { 
        listNumbers, 
        getNumbers, 
        setEditNumber, 
        getNumber, 
        deleteNumber 
    } = useContext(NumberContext)

    useEffect(() => {
        getNumbers()
    }, [])

    const onClickEdit = id => {
        getNumber(id)
        setEditNumber(true)
    }

    const onClickDelete = id => {
        deleteNumber(id)
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
                        onClick={() => onClickEdit(number.id)}
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