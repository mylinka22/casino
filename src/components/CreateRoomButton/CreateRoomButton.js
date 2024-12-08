import React from 'react';
import './CreateRoomButton.css';
import { useNavigate } from 'react-router-dom';

const CreateRoomButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/create-room');
    };

    return (
        <button className="pushable" onClick={handleClick}>
            <span className="front">+СОЗДАТЬ РУМ</span>
        </button>
    );
};

export default CreateRoomButton;
