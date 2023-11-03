import React from 'react'
import { useParams } from 'react-router-dom'

const ViewPdf = () => {
    const {fileName}=useParams()
  return (
    <div>
    {fileName}  
    </div>
  )
}

export default ViewPdf
