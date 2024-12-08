import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoomCard.css';

const RoomCard = ({ room, formatTime }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/room/${room.id}`);
    };

    return (
        <div className="room-card" onClick={handleCardClick}>
            <img src={room.logo} alt={room.name} className="room-logo" />
            <div className="room-info">
                <h3 className="room-name">{room.name}</h3>
                <p className="room-players">{room.players} игроки</p>
            </div>
            <div>
                <p className="room-money">{room.money}</p>
                <p className="room-time">{room.timeLeft > 0 ? formatTime(room.timeLeft) : 'Закрыто'}</p>
            </div>
        </div>
    );
};

export default RoomCard;
