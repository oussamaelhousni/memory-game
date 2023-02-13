import "./App.css";
import { useState, useEffect } from "react";
import { cardImages } from "../constans";
import { shuffle } from "./utils";
import { Card } from "./components";
function App() {
    const [cards, setCards] = useState([]);
    const [turn, setTurn] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const startGame = () => {
        const cards = shuffle([...cardImages, ...cardImages]).map((card) => {
            return { ...card, id: `${Date.now()}${Math.random()}` };
        });
        setCards(cards);
        setTurn(0);
        setChoiceOne(null);
        setChoiceTwo(null);
    };

    const hanldeChoice = (card) => {
        choiceOne && choiceOne !== card
            ? setChoiceTwo(card)
            : setChoiceOne(card);
    };

    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurn((prevTurn) => prevTurn + 1);
        setDisabled(false);
    };

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceTwo.src === choiceOne.src) {
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true };
                        } else return card;
                    });
                });
                resetTurn();
            } else {
                setTimeout(() => {
                    resetTurn();
                }, 1000);
            }
        }
    }, [choiceOne, choiceTwo]);
    useEffect(() => {
        startGame();
    }, []);
    return (
        <div className="App">
            <h1>Magic Match</h1>
            <button onClick={startGame}>New Game</button>
            <div className="card-grid">
                {cards.map((card) => (
                    <Card
                        card={card}
                        key={card.id}
                        hanldeChoice={hanldeChoice}
                        flipped={
                            card === choiceOne ||
                            card === choiceTwo ||
                            card.matched
                        }
                        disabled={disabled}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
