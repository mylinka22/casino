import React, { useState, useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import RoomList from './components/RoomList/RoomList';
import CreateRoomButton from './components/CreateRoomButton/CreateRoomButton';
import './App.css';

const App = () => {
    const [user, setUser] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [archiveRooms, setArchiveRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const tg = window.Telegram.WebApp;
        tg.ready();
        setUser(tg.initDataUnsafe?.user || { username: 'Guest' });

        const exampleRooms = [
            { id: 1, name: 'TON gladiators', players: 10, money: '51000 MRAC', timeLeft: 120, logo: '/l2.webp' },
            { id: 2, name: 'Nice Candles', players: 5, money: '11200 TVM', timeLeft: 300, logo: '/l3.webp' },
        ];
        const exampleArchiveRooms = [
            { id: 3, name: 'LohScore', players: 7, money: '9 MAJOR', timeLeft: 0, logo: '/l1.webp' },
            { id: 4, name: 'TON gladiators', players: 7, money: '200 BOLGUR', timeLeft: 0, logo: '/l2.webp' },
        ];

        setRooms(exampleRooms);
        setArchiveRooms(exampleArchiveRooms);
        setTimeout(() => setLoading(false), 2000);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setRooms((prevRooms) =>
                prevRooms.map((room) =>
                    room.timeLeft > 0 ? { ...room, timeLeft: room.timeLeft - 1 } : room
                )
            );
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} мин ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} сек`;
    };

    const handleRoomClick = (room) => {
        alert(`Room Info:\nName: ${room.name}\nPlayers: ${room.players}\nMoney: ${room.money}`);
    };

    return (
        <div className="app">
            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                    <div className="logo">
                        <img src="/logo.png" alt="Logo" />
                    </div>
                    <RoomList
                        title="Топ комнаты"
                        rooms={rooms}
                        formatTime={formatTime}
                        onRoomClick={handleRoomClick}
                    />
                    <RoomList
                        title="Архив"
                        rooms={archiveRooms}
                        formatTime={formatTime}
                        onRoomClick={handleRoomClick}
                    />
                    <CreateRoomButton />
                </>
            )}
        </div>
    );
};

export default App;
