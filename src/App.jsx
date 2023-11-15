import React, { useEffect, useState } from "react";
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"
import './App.css';
import Die from "./Die";

export default function App() {

  const [dices,setDices] = useState(allNewDice())
  const [tenzies,setTenzies] = useState(false)

  useEffect(()=>{
    const allHeld = dices.every(dice => dice.isHeld)
    const firstValue = dices[0].value
    const allSameValue = dices.every(dice => dice.value === firstValue)

    if(allHeld && allSameValue){
      setTenzies(true)
      console.log("you have the game!")
      alert("you won the game !")
    }
  } , [dices])

  // function random(max){
  //   const num = Math.floor(Math.random() * max+1)
  //   console.log(num)
  //   return num
  // }

  function allNewDice(){
    const newDice = []
    for(let i=0; i < 10; i++){
      const num = Math.floor(Math.random() * 6)
      newDice.push({
        value: num,
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
  }

  function rollDice(){
    if(!tenzies){
      setDices(oldDices => oldDices.map(dice=>{
        return dice.isHeld ? dice:{
          value: Math.floor(Math.random() * 6),
          isHeld: false,
          id: nanoid()
        }
      }))
    } else{
      setTenzies(false)
      setDices(allNewDice())
    }
  }

  function holdDice(id){
    console.log(id)
    setDices(oldDices => oldDices.map(dice =>{
      return dice.id === id ? {...dice, isHeld: !dice.isHeld}:dice
    }))
  }

  const diceElements = dices.map(dice => 
    <Die value = {dice.value} key = {dice.id} isHeld = {dice.isHeld} HoldDiceId = {()=>{holdDice(dice.id)}}/>
    )

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="title">
        <h1>Tenzies</h1>
        <p>Roll until all dice are same. Click each die to freeze it at its current value between rolls.</p>
      </div>

      <div className="dice-elements">
      {/* <Die value={random(6)}/>
      <Die value={random(6)}/>
      <Die value={random(6)}/>
      <Die value={random(6)}/>
      <Die value={random(6)}/>
      <Die value={random(6)}/>
      <Die value={random(6)}/>
      <Die value={random(6)}/>
      <Die value={random(6)}/>
      <Die value={random(6)}/> */}
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game":"Roll"}</button>
    </main>
  )
}
