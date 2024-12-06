import './App.css';
import React, { useState, useEffect } from 'react';
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import {Route, Routes} from 'react-router-dom'
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import './App.css'; // Импорт CSS

const App = () => {
    const [user, setUser] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [archiveRooms, setArchiveRooms] = useState([]);

    useEffect(() => {
        // Инициализация Telegram Web App SDK
        const tg = window.Telegram.WebApp;
        tg.ready();

        // Устанавливаем данные пользователя
        setUser(tg.initDataUnsafe?.user || { username: 'Guest' });

        // Пример данных
        const exampleRooms = [
            {
                id: 1,
                name: 'TON gladiators',
                players: 10,
                money: 500,
                timeLeft: 120, // в секундах
                logo: '/l2.webp',
            },
            {
                id: 2,
                name: 'Nice Candles',
                players: 5,
                money: 200,
                timeLeft: 300,
                logo: '/l3.webp',
            },
        ];
        const exampleArchiveRooms = [
            {
                id: 3,
                name: 'LohScore',
                players: 7,
                money: 400,
                timeLeft: 0,
                logo: '/l1.webp',
            },
            {
                id: 4,
                name: 'TON gladiators',
                players: 7,
                money: 500,
                timeLeft: 0,
                logo: '/l2.webp',
            },
            {
                id: 5,
                name: 'TON gladiators',
                players: 7,
                money: 600,
                timeLeft: 0,
                logo: '/l1.webp',
            },
        ];

        setRooms(exampleRooms);
        setArchiveRooms(exampleArchiveRooms);
    }, []);

    return (
        <div className="app">
            {/* Никнейм */}
            {/*<header className="header">*/}
            {/*    <h1>{user?.username || 'Гость'}</h1>*/}
            {/*</header>*/}

            {/* Логотип */}
            <div className="logo">
                <img src="/logo.png" alt="Logo" />
            </div>

            {/* Список комнат */}
            <section className="rooms">
                <p className="tagRooms">Топ комнаты</p>
                {rooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                ))}
            </section>

            {/* Архив */}
            <section className="archive">
                <p className="tagRooms">Архив</p>
                {archiveRooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                ))}
            </section>



            {/* Кнопка создать комнату */}
            <button className="create-room-button">+СОЗДАТЬ РУМ</button>
        </div>
    );
};

// Компонент комнаты
const RoomCard = ({ room }) => {
    return (
        <div className="room-card">
            <img src={room.logo} alt={room.name} className="room-logo" />
            <div className="room-info">
                <h3 className="room-name">{room.name}</h3>
                <p className="room-players">Игроков: {room.players}</p>
            </div>
            <div>
                <p className="room-money">Сумма: {room.money} ₽</p>
                <p className="room-time">
                    Время: {room.timeLeft > 0 ? `${room.timeLeft} сек.` : 'Закрыто'}
                </p>
            </div>
        </div>
    );
};

export default App;
