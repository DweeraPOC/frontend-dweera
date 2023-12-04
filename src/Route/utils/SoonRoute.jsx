import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Soon from '../../Containers/Soon/Soon'

export default function SoonRoute() {
  return (
    <>
        <Routes>
            <Route exact path='/' element={<Soon />} />
        </Routes>
    </>
  )
}
