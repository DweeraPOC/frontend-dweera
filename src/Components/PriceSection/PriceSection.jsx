import { Tab } from '@headlessui/react'
import { t } from 'i18next';
import React from 'react'
import { useState } from 'react';

export default function PriceSection({ tabs,setTabs,panels,t=null}) {
    return (
        <>
            <Tab.Group>
                <Tab.List className={`border-b border-gray-100 flex justify-start items-center gap-10 text-sm font-medium mb-4`}>
                    {
                        tabs && tabs?.map((_t, i) =>
                            <Tab key={_t?.name} className={({ selected }) => `py-2 ${selected ? 'border-b-2 border-[#65D01E] text-[#65D01E]' : ' text-gray-400'} outline-none flex justify-center items-center flex-row`}>
                                {t(_t?.name)}
                            </Tab>
                        )
                    }
                </Tab.List>
                <Tab.Panels>
                    {
                        panels?.map((v) => 
                            <Tab.Panel key={v?.name}>
                                {v?.content}
                            </Tab.Panel>
                        )
                    }
                </Tab.Panels>
            </Tab.Group>
        </>
    )
}
