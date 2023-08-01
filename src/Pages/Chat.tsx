import React from 'react'
import Chat from '../Components/Chat/Chat'

interface chat{
  role:string
}
const Chats:React.FC<chat> = ({role}) => {
  return (
    <div>
      <Chat role={role}/>
    </div>
  )
}

export default Chats