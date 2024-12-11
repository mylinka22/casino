import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateRoomPage.css';

const CreateRoomPage = () => {
    const [betAmount, setBetAmount] = useState(1000);
    const [betTimeout, setBetTimeout] = useState(5);
    const [selectedToken, setSelectedToken] = useState("Notcoin");

    const navigate = useNavigate();

    useEffect(() => {
        const tg = window.Telegram.WebApp;
        tg.ready();
    }, []);

    const handleConnectWallet = () => {
        const tg = window.Telegram.WebApp;

        if (tg.readyToPay) {
            const user = tg.initDataUnsafe.user;

            const payload = JSON.stringify({
                user_id: user.id,
                username: user.username || "unknown",
                first_name: user.first_name,
                last_name: user.last_name || "",
            });

            tg.openInvoice({
                payload,
                currency: "TON",
                prices: [{ label: "Bet Payment", amount: betAmount * 1000000000 }],
            }).then((response) => {
                if (response.status === "ok") {
                    alert("Wallet connected!");
                } else {
                    console.error("Wallet connection failed:", response.error);
                }
            }).catch((error) => {
                console.error("Error while connecting wallet:", error);
            });
        } else {
            alert("TON Wallet is not available in this environment. Please use the mobile Telegram app.");
        }
    };

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
        <div className="game">
            <div className="logo">
                <img src="/board.png" alt="Logo" />
                <div className="text-overlay text-overlay-create-room-page">NEWROOM</div>
            </div>

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

            <button onClick={handleConnectWallet} className="connect-wallet-button">
                Connect Wallet
            </button>

        </div>
    );
};

export default CreateRoomPage;
