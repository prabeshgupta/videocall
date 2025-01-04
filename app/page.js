"use client"
import React, { useState } from 'react'
import Link from 'next/link'

const HomePage = () => {
  const [roomId, setRoomId] = useState('')
  return (
    <div className='h-screen flex justify-center flex-col items-center bg-blue-950'>
      <h1 className='text-[27px] mb-4 md:text-[35px] lg:text-[50px] text-center leading-[4rem] text-white font-bold'>Welcome to <span className="text-yellow-400">Video Call App</span></h1>
      <input type="text" className="px-8 py-3 w-1/3 outline-none rounded-lg text-gray-600" placeholder="Enter Room ID" onChange={(e) => setRoomId(e.target.value)} value={roomId} />
      <Link href={`/room/${roomId}`}>
        <button type='submit' className='px-8 py-3 mt-4 cursor-pointer text-white bg-red-600 rounded-lg font-bold text-xl'>Join</button>
      </Link>
    </div>
  )
}

export default HomePage