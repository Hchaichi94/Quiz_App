import React, { useState } from 'react';
import { Difficulty, fecthQuizQuestions } from './API';


const Total_Questions = 15
const App = () => {

  const [Loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState(([]))
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  console.log(fecthQuizQuestions(Total_Questions, Difficulty.EASY))
  const startTrivia = async () => { }



  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => { }

  const nextQuestion = async () => { }

  return <div className="App">

    <h1>React Quiz</h1>
    <button className="start" onClick={startTrivia}>start</button>
    <p>Loading questions ...</p>
    {/* <QuestionCard
      questionNr={number + 1}
      totalQuestions={Total_Questions}
      answers={questions[number].answers}
      question={questions[number].question}
      userAnswer={userAnswers ? userAnswers[number] : undefined}
      callback={checkAnswer}
    /> */}
    <button className="next" onClick={nextQuestion}>next</button>
  </div>

}

export default App;
