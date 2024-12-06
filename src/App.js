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
                name: 'Комната 1',
                players: 10,
                money: 500,
                timeLeft: 120, // в секундах
                logo: 'https://via.placeholder.com/50',
            },
            {
                id: 2,
                name: 'Комната 2',
                players: 5,
                money: 200,
                timeLeft: 300,
                logo: 'https://via.placeholder.com/50',
            },
        ];
        const exampleArchiveRooms = [
            {
                id: 3,
                name: 'Комната 3',
                players: 7,
                money: 400,
                timeLeft: 0,
                logo: 'https://via.placeholder.com/50',
            },
        ];

        setRooms(exampleRooms);
        setArchiveRooms(exampleArchiveRooms);
    }, []);

    return (
        <div className="app">
            {/* Никнейм */}
            <header className="header">
                <h1>Добро пожаловать, {user?.username || 'Гость'}</h1>
            </header>

            {/* Логотип */}
            <div className="logo">
                <img src="https://via.placeholder.com/100" alt="Logo" />
            </div>

            {/* Список комнат */}
            <section className="rooms">
                <h2>Топ комнаты</h2>
                {rooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                ))}
            </section>

            {/* Архив */}
            <section className="archive">
                <h2>Архив</h2>
                {archiveRooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                ))}
            </section>

            {/* Кнопка создать комнату */}
            <button className="create-room-button">Создать комнату</button>
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
                <p className="room-money">Сумма: {room.money} ₽</p>
                <p className="room-time">
                    Время: {room.timeLeft > 0 ? `${room.timeLeft} сек.` : 'Закрыто'}
                </p>
            </div>
        </div>
    );
};

export default App;
