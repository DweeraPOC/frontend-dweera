import React from 'react'
import ErrorDisplayer from '../ErrorDisplayer/ErrorDisplayer'
import OtpInput from './OtpInput'
import { useState } from 'react'
import { useAuth } from '../../Middlewares/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VerificationOtp({email}) {
  const [otp, setOtp] = useState(new Array(4)?.fill(""));
  const [err,setErr] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const handleChange = (e,element, index) => {
    //if(["Backspace","Delete"]?.includes(e?.key)) return element?.previousSibling?.focus()
    if (isNaN(element.value)) return false; 
    setOtp([...otp?.map((d, idx) => (idx === index ? element.value : d))]);
    if (element?.nextSibling) return element?.nextSibling?.focus()
  };

  const handleVerify = async () => {
    if(otp.join('').length<4) return setErr("Please fill all field")
    try {
      await axios({
        method: "POST",
        url: `${process.env.REACT_APP_MAIN_URL}/otp/Check`,
        headers: {
          "x-access-token": auth?.user.token,
        },
        data: {
          otp : otp?.join(''),
        },
      })
        .then((res) => {
          if (res.status === 200) {
            auth.Login({
              token: res.data.token,
              role: "user",
            });
            navigate(0,{replace : true});
          }
        })
        .catch((err) => {
          //console.log(err);
          setErr(err.response.data.message);
        });
    } catch (err) {
      //console.log(err);
    }
  }

    const handleResend = async () => {
      try {
        await axios({
          method: "POST",
          url: `${process.env.REACT_APP_MAIN_URL}/otp/reSend`,
          headers: {
            "x-access-token": auth?.user.token,
          }
        })
          .then((res) => {
            if (res.status === 200) {
              auth.Login({
                token: res.data.token,
                role: "user",
              });
              setErr(null)
            }
          })
          .catch((err) => {
            //console.log(err);
            setErr(err.response.data.message);
          });
      } catch (err) {
        //console.log(err);
      }
  }
  return (
    <>
      <div className='flex flex-col justify-center items-center w-full lg:w-3/6 mt-12 relative px-2 py-8 gap-4 md:mx-2  mx-6 rounded-md bg-neutral-200/20 overflow-hidden border border-gray-200 shadow-sm'>
        <div className='text-center flex-col flex justify-center items-center gap-2'>
          <p className='text-3xl mb-4 text-[#65D01E] font-semibold break-words'>Email Verification</p>
          <p className='text-sm mb-4 font-semibold break-words'>We have sent a code to your email {email || null}</p>
        </div>
        <div className='flex flex-col relative'>
          <OtpInput
            className={`md:w-16 md:h-16 w-12 h-12 flex flex-row items-center justify-center text-center px-2 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#65D01E]`}
            otp={otp}
            onChange={handleChange}
          />
          {err && <ErrorDisplayer error={err} /> }
        </div>
        <div className="flex flex-col space-y-5">
          <div className='w-full'>
            <button type='button' onClick={handleVerify} className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-[#65D01E] border-none text-white text-sm shadow-sm">
              Verify Account
            </button>
          </div>

          <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
            <p>Didn't recieve code?</p> 
            <button 
              className="flex  flex-row items-center text-[#65D01E]" 
              type='button'
              onClick={handleResend}
            >
              Resend
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
