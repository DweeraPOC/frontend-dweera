import React from 'react'

export default function Counter({ count,HandleIncrement,HandleDecrement }) {
  return (
    <>
        <div className='flex justify-center items-center flex-row w-full'>
            <button type="button" className={`
                ${
                    count>1 
                    ? 'w-full text-white bg-[#65D01E] hover:bg-[#5cbf1a] focus:outline-none font-medium rounded-l-lg text-sm px-4 py-2 text-center'
                    : 'w-full text-white bg-[#65D01E]/20 focus:outline-none font-medium rounded-l-lg text-sm px-4 py-2 text-center cursor-not-allowed'
                }
            `}
                disabled={count<=1}
                onClick={HandleDecrement}
            >
                -1
            </button>
            <span className={`
                w-full bg-white focus:outline-none font-medium text-sm px-4 py-2 text-center
            `}>
                {
                    count
                }
            </span>
            <button type="button" className={`
                w-full text-white bg-[#65D01E] hover:bg-[#5cbf1a] focus:outline-none font-medium rounded-r-lg text-sm px-4 py-2 text-center
            `}
                onClick={HandleIncrement}
            >
                +1
            </button>
        </div>
    </>
  )
}
