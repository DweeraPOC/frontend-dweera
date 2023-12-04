import React from 'react'
import { Helmet } from 'react-helmet'
import { NavLink } from 'react-router-dom'

export default function NotFound({ redirectPath }) {
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>{`Dweera | 404`}</title>
        <meta name="description" content={`Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing`} />
        <meta name="keywords" content="Découvrez notre nouvelle - plateforme - dweera - pour - la location de vélos - 🚲 et - location de trottinettes électriques - ⚡. Laissez-vous séduire par une - expérience de mobilité urbaine - unique et - écologique - green vehicle sharing" />
      </Helmet>
        <section className="bg-gray-50 overflow-hidden w-full h-screen">
            <div className="relative">
                <div className="relative text-center py-12 md:py-24 px-3 2xl:pt-36 2xl:pb-60 bg-white rounded-7xl z-20">
                    <div className="relative z-40">
                        <span className="block mb-9 uppercase tracking-widest text-xs text-gray-300">Can&apos;t find</span>
                        <h2 className="mb-6 font-medium font-heading text-8xl md:text-10xl xl:text-smxl leading-tight">404</h2>
                        <p className="max-w-md mb-14 xl:mb-24 mx-auto font-heading font-medium text-2xl leading-10">Wooops. We can&rsquo;t find that page or something has gone wrong.</p>
                        <NavLink 
                            className="inline-flex items-center pb-2 font-bold tracking-tight text-xl leading-6 text-[#65D01E] hover:text-[#5BBF18] border-b border-[#65D01E] hover:border-[#5BBF18] hover:no-underline"
                            to={redirectPath}
                        >
                            <svg width="16" height="13" viewbox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.8 1L15 7H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M11 12L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                            <span className="ml-3">Back to home</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
