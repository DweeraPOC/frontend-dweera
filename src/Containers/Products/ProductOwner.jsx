import { EyeIcon, StarIcon } from '@heroicons/react/24/solid';
import React from 'react'
import { useDispatch } from 'react-redux';
import { SHOW_MODALBOX } from '../../Redux/Actions/actions';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Middlewares/AuthContext';
import default_picture from "../../assets/images/default_profile_picture.png"

export default function ProductOwner(props) {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const auth = useAuth();
    const user = props.user;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const HandleView = () => {
        auth?.user.token ? dispatch(SHOW_MODALBOX(true,user)) : navigate("/login");
    }
  return (
    <>
        <div /*className='rounded-l-full rounded-r-xl px-1 py-1 bg-[#F6FFF0]'*/>
        <div className='flex flex-row justify-between gap-2'>
            <span className='block w-10 h-10 overflow-hidden rounded-full border-2 border-[#65D01E]'>
                <img 
                    src={
                    user?.profile_photo 
                    ? `${process.env.REACT_APP_MAIN_URL}/images/users/${user?.profile_photo}`
                    : `${default_picture}`
                }
                    className='w-full h-full object-cover object-center'
                />
            </span>
            <p className="flex flex-col items-start justify-evenly">
                <span className='flex justify-center items-center gap-2 font-medium'>
                    <span>
                        {user?.first_name || ""}&nbsp; 
                        {user?.last_name || ""}
                    </span>
                    <button
                        onClick={HandleView}
                    >
                        <EyeIcon 
                            className='block w-4 h-4 text-gray-300'
                        />
                    </button>
                </span>
                {/*
                    <span className='flex flex-row'>
                    {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                            key={rating}
                            className={classNames(
                            Math.floor(user?.Rating || 1) > rating ? ' text-[#65D01E]' : 'text-gray-200',
                            'h-4 w-4 flex-shrink-0'
                        )}
                            aria-hidden="true"
                        />
                    ))}
                    </span>
                */}
            </p>
        </div>
        </div>
    </>
  )
}
