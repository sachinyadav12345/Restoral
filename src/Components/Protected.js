import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected(props) {
    const RestoData = useSelector((state)=>state.RestoData.LoginStatus)

    const Component = props.component

    const navigate = useNavigate()
    useEffect(()=>{
        if(RestoData ==true){
            navigate('/login')
        }
    })
  return (
    <div>
      <Component/>
    </div>
  )
}

export default Protected
