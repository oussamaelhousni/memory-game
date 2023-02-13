import React from "react";

const Card = ({ card, hanldeChoice, flipped, disabled }) => {
    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img src={card.src} alt="front" className="front" />
                <img
                    src={"/img/cover.png"}
                    alt="back"
                    className="back"
                    onClick={() => {
                        if (!disabled) hanldeChoice(card);
                    }}
                />
            </div>
        </div>
    );
};

export default Card;
