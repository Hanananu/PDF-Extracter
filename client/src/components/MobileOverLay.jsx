import React from 'react'
import NavLink from "./NavLink"

const MobileOverLay = ({pages}) => {
    return (
        <ul className="flex flex-col items-center py-4">
           {pages.map((title, index) => {
             return <li key={index}>{NavLink(title)}</li>;
           })}
         </ul>
 )
}

export default MobileOverLay
