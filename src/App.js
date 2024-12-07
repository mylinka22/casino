import './App.css';
import React, { useState, useEffect } from 'react';
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import { Route, Routes } from 'react-router-dom';
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
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
            {
                id: 1,
                name: 'TON gladiators',
                players: 10,
                money: "51000 MRAC",
                timeLeft: 120, // 2 минуты
                logo: '/l2.webp',
            },
            {
                id: 2,
                name: 'Nice Candles',
                players: 5,
                money: "11200 TVM",
                timeLeft: 300, // 5 минут
                logo: '/l3.webp',
            },
        ];
        const exampleArchiveRooms = [
            {
                id: 3,
                name: 'LohScore',
                players: 7,
                money: "9 MAJOR",
                timeLeft: 0,
                logo: '/l1.webp',
            },
            {
                id: 4,
                name: 'TON gladiators',
                players: 7,
                money: "200 BOLGUR",
                timeLeft: 0,
                logo: '/l2.webp',
            },
            {
                id: 5,
                name: 'TON gladiators',
                players: 7,
                money: "2000 MRAC",
                timeLeft: 0,
                logo: '/l1.webp',
            },
            {
                id: 6,
                name: 'Nice Candles',
                players: 5,
                money: "0.25 BTC",
                timeLeft: 0,
                logo: '/l3.webp',
            },
            {
                id: 7,
                name: 'Nice Candles',
                players: 5,
                money: "1.5 ETH",
                timeLeft: 0,
                logo: '/l3.webp',
            },
        ];

        setRooms(exampleRooms);
        setArchiveRooms(exampleArchiveRooms);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
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

    return (
        <div className="app">
            {loading ? (
                <div className="loading-screen">
                    <h2 className="loading">Loading...</h2>
                </div>
            ) : (
                <>
                    <div className="logo">
                        <img src="/logo.png" alt="Logo" />
                    </div>

                    <section className="rooms">
                        <p className="tagRooms">Топ комнаты</p>
                        {rooms.map((room) => (
                            <RoomCard key={room.id} room={room} formatTime={formatTime} />
                        ))}
                    </section>

                    <section className="archive">
                        <p className="tagRooms">Архив</p>
                        {archiveRooms.map((room) => (
                            <RoomCard key={room.id} room={room} formatTime={formatTime} />
                        ))}
                    </section>

                    <button className="pushable">
                        <span className="front">+СОЗДАТЬ РУМ</span>
                    </button>
                </>
            )}
        </div>
    );
};

const RoomCard = ({ room, formatTime }) => {
    return (
        <div className="room-card">
            <img src={room.logo} alt={room.name} className="room-logo" />
            <div className="room-info">
                <h3 className="room-name">{room.name}</h3>
                <div className="room-info2">
                    <p className="room-players">{room.players} </p><p className="grayLabel">игроки</p>
                </div>
            </div>
            <div>
                <p className="room-money">{room.money}</p>
                <p className="room-time">
                    {room.timeLeft > 0 ? formatTime(room.timeLeft) : 'Закрыто'}
                </p>
            </div>
        </div>
    );
};

export default App;
