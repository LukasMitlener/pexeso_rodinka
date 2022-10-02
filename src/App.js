import { useState, useEffect } from "react"
import './App.css'
import SingleCard from "./components/SingleCard"

const cardImages = [
  { "src": "../assets/babicka.jpg", matched: false },
  { "src": "../assets/deda.jpg", matched: false },
  { "src": "../assets/jonasek.jpg", matched: false },
  { "src": "../assets/pajaluky.jpg", matched: false },
  { "src": "../assets/zuzka1.jpg", matched: false },
  { "src": "../assets/zuzka2.jpg", matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setdisabled] = useState(false)

  ////////////// shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }
  //////////// handle choice
  const handleChoice = (card) => {
    console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare two selected cards (funkce v useEffect se spůstí na začátku 
  // a vždy když zavoláme choiceOne a choiceTwo)
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setdisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setdisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  }, [])
  

  return (
    <div className="App">
      <h1>Pexeso - rodinka :-) </h1>
      <button onClick={shuffleCards}>Nová hra</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched }
          disabled={disabled}
          />
        ))}
      </div>
      <p>Pokusy: {turns}</p>
    </div>
  );
}

export default App