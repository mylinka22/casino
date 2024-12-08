import React from 'react';
import RoomCard from '../RoomCard/RoomCard';
import './RoomList.css';

const RoomList = ({ title, rooms, formatTime }) => {
    return (
        <section className="room-list">
            <p className="room-list-title">{title}</p>
            {rooms.map((room) => (
                <RoomCard key={room.id} room={room} formatTime={formatTime} />
            ))}
        </section>
    );
};

export default RoomList;
