import Room from '@/app/components/Room'
import React from 'react'

const RoomPage = async ({ params }) => {
    const roomID = (await params).roomid
    return (
        <div><Room roomID={roomID} /></div>
    )
}

export default RoomPage