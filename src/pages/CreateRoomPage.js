import React, {useEffect, useState} from 'react';
import './CreateRoomPage.css';

const CreateRoomPage = () => {
    const [betAmount, setBetAmount] = useState(1000);
    const [betTimeout, setBetTimeout] = useState(5);
    const [selectedToken, setSelectedToken] = useState("Notcoin");

    useEffect(() => {
        const tg = window.Telegram.WebApp;
        tg.BackButton.show();
        tg.BackButton.onClick(() => {
            navigate(-1);
        });
        return () => {
            tg.BackButton.hide();
        };
    }, [navigate]);

    return (
        <div className="app">
            <div className="game">
                <div className="title">NEWROOM</div>

                <div className="section">
                    <h2>Select Token</h2>
                    <p>
                        To add a token, your wallet must have enough to make at least one
                        move
                    </p>
                    <div className="tokens">
                        <button
                            className={selectedToken === "Notcoin" ? "active" : ""}
                            onClick={() => setSelectedToken("Notcoin")}
                        >
                            Notcoin
                        </button>
                        <button
                            className={selectedToken === "Tether USD" ? "active" : ""}
                            onClick={() => setSelectedToken("Tether USD")}
                        >
                            Tether USD
                        </button>
                    </div>
                </div>

                <div className="section">
                    <h2>Bet Amount</h2>
                    <input
                        type="number"
                        value={betAmount}
                        onChange={(e) => setBetAmount(e.target.value)}
                    />
                </div>

                <div className="section">
                    <h2>Bet Timeout</h2>
                    <div className="timeouts">
                        <button
                            className={betTimeout === 5 ? "active" : ""}
                            onClick={() => setBetTimeout(5)}
                        >
                            5m
                        </button>
                        <button
                            className={betTimeout === 15 ? "active" : ""}
                            onClick={() => setBetTimeout(15)}
                        >
                            15m
                        </button>
                        <button
                            className={betTimeout === 60 ? "active" : ""}
                            onClick={() => setBetTimeout(60)}
                        >
                            60m
                        </button>
                    </div>
                </div>

                <button className="continue-button">CONTINUE</button>
            </div>
        </div>
    );
};

export default CreateRoomPage;
