import React from 'react'
import { useState } from 'react'

export default function ReadMore({ children , limit }) {
    const [readMoreUp,setReadMoreUp] = useState(false);

    const Toggle = () => {
        setReadMoreUp(!readMoreUp);
    }
  return (
    <>
        {
            (children?.length >= limit)
            ? (
                
                readMoreUp 
                ? children
                : children.substring(0 , limit)
                (<span 
                    className='bg-transparent text-[#65D01E] cursor-pointer'
                    onClick={Toggle}
                >
                    {
                        readMoreUp ? ' less' : '...more'
                    }
                </span>)
            )
            : (
                children
            )
        }
    </>
  )
}
