import React from "react";
import './App.css';

export default function Die(props){

    return(
        <div className={props.isHeld ? "dice held" : "dice"} onClick={props.HoldDiceId}>
            <h4 className="dice-num">{props.value}</h4>
        </div>
    )
}