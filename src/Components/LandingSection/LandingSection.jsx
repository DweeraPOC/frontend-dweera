import React from 'react';
import img_landing2 from "../../assets/images/hero.svg"; 
import { CheckIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

export default function LandingSection() {
    const { t } = useTranslation();

    return (
        <>
              <div className='w-full bg-[#86C55C]'>
                <div
                    style={{
                        backgroundImage: `linear-gradient(-45deg, rgba(101,208,30,0.2) 10%, rgba(0,0,0,0.4) 100%),url('${img_landing2}')`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                    className='w-full h-full object-cover object-center flex justify-center items-center'>
                        
                    <div className='flex flex-col max-w-6xl w-full h-full justify-center items-start px-8 py-12'>
                        <h1 className='text-start md:text-2xl text-xl font-bold md:w-3/4 break-words text-white'>
                            {t("headerLandingSection")}
                        </h1>
                        <ul className='mt-2 flex flex-col gap-1 justify-center items-start'>
                            {[
                                t('Easy search') + ' - ' + t('Simple rental process'), 
                                t('Trusted users') + ' - ' + t('Additional income'), 
                                t("Explore the city or escape into nature")
                            ]?.map((__, i) =>
                                <li
                                    className={'flex justify-start items-center gap-1 text-start font-medium text-sm break-words text-white'}
                                    key={__}
                                >
                                    <CheckIcon
                                        className='flex w-4 h-4 font-bold text-[#65d01e]'
                                    />
                                    <span className='flex text-sm'>{__}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
