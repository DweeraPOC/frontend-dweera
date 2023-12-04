import React from 'react'

export default function Pagination({ offerPerList,totalOffers,paginate,currentList}) {
    const listNumbers = [];
    if(totalOffers>0){
        for(var i = 1 ; i <= Math.ceil((totalOffers / offerPerList )); i++){
            listNumbers.push(i);
        }
    }
    const hidden = totalOffers===0 ? 'hidden' : '';
  return (
    <>
        <nav className={`flex justify-center items-center ${hidden}`}>
            <ul className="inline-flex -space-x-px">
                        <li>
                            <button
                                disabled={currentList===1 ? true : false}
                                type='button'
                                className={
                                    (currentList===1)
                                    ? `px-3 py-2 ml-0 leading-tight text-gray-300 bg-white border border-gray-300 
                                        rounded-l-lg hover:bg-gray-100 hover:text-gray-300 cursor-not-allowed`
                                    : `px-3 py-2 ml-0 leading-tight text-[#65D01E] bg-white border border-gray-300 
                                        rounded-l-lg hover:bg-gray-100 hover:text-[#65D01E]`
                                }
                                aria-current="page"
                                onClick={() => paginate(currentList-1)}
                            >
                                Previous
                            </button>
                        </li>
                {
                    (listNumbers && listNumbers?.map(number => 
                        <li
                            key={number}
                        >
                            <button
                                type='button' 
                                className={
                                    (currentList===number) 
                                    ? `px-3 py-2 leading-tight bg-[#65D01E] text-white border border-[#65D01E]
                                     hover:bg-[#5BBF18] hover:text-white`
                                    : `px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300
                                     hover:bg-gray-100 hover:text-gray-700`
                                }
                                onClick={
                                    () => paginate(number)
                                }
                            >
                                {number}
                            </button>
                        </li>    
                    ))
                }
                        <li>
                            <button
                                disabled={currentList===listNumbers[listNumbers.length-1]}
                                type='button'
                                className={
                                    (currentList===listNumbers[listNumbers.length-1])
                                    ? `px-3 py-2 ml-0 leading-tight text-gray-300 bg-white border border-gray-300 
                                    rounded-r-lg hover:bg-gray-100 hover:text-gray-300 cursor-not-allowed`
                                    : `px-3 py-2 ml-0 leading-tight text-[#65D01E] bg-white border border-gray-300 
                                    rounded-r-lg hover:bg-gray-100 hover:text-[#65D01E]`
                                }
                                onClick={() => paginate(currentList+1)}
                            >
                                Next
                            </button>
                        </li>
            </ul>
        </nav>
    </>
  )
}
