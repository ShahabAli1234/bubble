import React, { useState, useEffect } from 'react';
import '../App.css';

export default function Content() {
    const [bubble, setBubble] = useState([]);
    const [hit, setHit] = useState(0);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(20);
    const [hiScore, setHiScore] = useState(0); 
    useEffect(() => {
        const timer = setTimeout(() => {
            if (time > 0) {
                setTime((prevTime) => prevTime - 1);
            }
        }, 1000);

        return () => clearTimeout(timer); 
    }, [time]);

    useEffect(() => {
        if (time === 0) {
            let bottom = document.querySelector('.bottom');
            let over = document.querySelector('.over');
            bottom.style.display = 'none';
            over.style.display = 'flex';
            if (score > hiScore) {
                setHiScore(score);
            }
        }
    }, [time, score, hiScore]);

    function randHit() {
        let rand = Math.floor(Math.random() * 10);
        setHit(rand);
    }

    useEffect(() => {
        const createBubble = () => {
            let rand = Math.floor(Math.random() * 10);
            setBubble((prevBubble) => [
                ...prevBubble, 
                rand            
            ]);
            randHit();
        };

        for (let i = 0; i < 39; i++) {
            createBubble(); 
        }
    }, []);

    function getNum(e) {
        const theNum = e.target.innerText;
        if (hit == theNum) {
            randHit();
            setScore(score + 1);
            setBubble([]); 

           
            const bubblesArray = [];
            for (let i = 0; i < 78; i++) {
                bubblesArray.push(Math.floor(Math.random() * 10));
            }
            setBubble(bubblesArray);
        }
    }

    function restartGame() {
        setBubble([]); 
        setScore(0);   
        setTime(20);   
        const bubblesArray = [];
        for (let i = 0; i < 78; i++) {
            bubblesArray.push(Math.floor(Math.random() * 10));
        }
        setBubble(bubblesArray);
        randHit();    

        let bottom = document.querySelector('.bottom');
        let over = document.querySelector('.over');
        bottom.style.display = 'flex';
        over.style.display = 'none'; 
    }

    return (
        <div className="main">
            <div className="box">
                <div className="top">
                    <div className="time">
                        <h2>Time</h2>
                        <h3>{time}</h3>
                    </div>
                    <div className="hit">
                        <h2>Hit</h2>
                        <h3>{hit}</h3>
                    </div>
                    <h2 className="appName">Bubble Game</h2>
                    <div className="score">
                        <h2>Score</h2>
                        <h3>{score}</h3>
                    </div>
                    <div className="hiScore">
                        <h2>Hi-score</h2>
                        <h3>{hiScore}</h3>
                    </div>
                </div>
                <div className="over">
                    <h1>GAME OVER</h1>
                    <h2>Score : {score}</h2>
                    <h2>Hi-Score : {hiScore}</h2> 
                    <button className='restart' onClick={restartGame}>Restart</button>
                </div>
                <div className="bottom">
                    <div className="bubbles">
                        {bubble.map((bubbles, index) => (
                            <h4 key={index} className="bubble" onClick={getNum}>
                                {bubbles}
                            </h4>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
