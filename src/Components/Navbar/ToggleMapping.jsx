import React from 'react'
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import MapIcon from '@mui/icons-material/Map';
import { useDispatch, useSelector } from 'react-redux';
import { SET_LISTBY } from '../../Redux/Actions/actions';

export default function ToggleMapping() {
    const listBy = useSelector(state => state.OffersReducer.listBy);
    const dispatch = useDispatch();
    const HandleChange = (e) => {
        const name = e.currentTarget.name;
        dispatch(SET_LISTBY(name))
    }
  return (
    <>
        <div className='hidden md:flex justify-center items-center text-gray-500 bg-gray-100 rounded-md overflow-hidden'>
            <button
                name='grid'
                type='button'
                className={`flex justify-center items-center px-2 py-2 hover:bg-gray-200 w-full
                    ${listBy==="grid" ? 'bg-gray-200 text-gray-900' : ''}
                `}
                onClick={HandleChange}
            >
                <ViewModuleIcon />
            </button>
            <button
                name='map'
                type='button'
                className={`flex justify-center items-center px-2 py-2 hover:bg-gray-200 w-full
                    ${listBy==="map" ? 'bg-gray-200 text-gray-900' : ''}
                `}
                onClick={HandleChange}
            >
                <MapIcon />
            </button>
        </div>
        {/** Mobile version */}
        <div className='flex md:hidden justify-center items-center text-gray-500 bg-gray-100 rounded-md overflow-hidden'>
            {
                (listBy!=="map")
                ? (
                    <button
                        name='map'
                        type='button'
                        className={`flex justify-center items-center px-2 py-2 hover:bg-gray-200 w-full bg-gray-200 text-gray-900`}
                        onClick={HandleChange}
                    >
                        <MapIcon />
                    </button>
                )
                : (
                    <button
                        name='grid'
                        type='button'
                        className={`flex justify-center items-center px-2 py-2 hover:bg-gray-200 w-full bg-gray-200 text-gray-900`}
                        onClick={HandleChange}
                    >
                        <ViewModuleIcon />
                    </button>
                )
            }
        </div>
    </>
  )
}
