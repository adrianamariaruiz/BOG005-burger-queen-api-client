import React from 'react'

const CardListOrder = ({ pr }) => {

    return (
        <>

            <div className='name'>
                <p>{pr.name}</p>
            </div>
            <div className='price'>
                <p>${pr.price}</p>
            </div>

        </>
    )
}

export default CardListOrder