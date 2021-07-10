import React, { useState } from 'react';
import { Difficulty, fecthQuizQuestions, QuestionState } from './API';
import QuestionCard from './components/QuestionCard';


const Total_Questions = 15

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string
}

const App = () => {

  const [Loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>(([]))
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  //console.log(questions)
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fecthQuizQuestions(Total_Questions, Difficulty.EASY);
    console.log(newQuestions)
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }



  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value
      const correct = questions[number].correct_answer === answer
      if (correct) setScore(prev => prev + 1)
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = async () => {
    const nextQ = number + 1
    if (nextQ === Total_Questions) {
      setGameOver(true)
    } else setNumber(nextQ)
  }

  return <div className="App">

    <h1>React Quiz</h1>
    {gameOver || userAnswers.length === Total_Questions ? <button className="start" onClick={startTrivia}>Start</button> : null}
    {!gameOver ? <p className="score">Score: </p> : null}
    {Loading && <p>Loading questions ...</p>}
    {!Loading && !gameOver && (
      <QuestionCard
        questionNr={number + 1}
        totalQuestions={Total_Questions}
        answers={questions[number].answers}
        question={questions[number].question}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      />)}
    {!gameOver && !Loading && userAnswers.length === number + 1
      && number !== Total_Questions - 1 ? (
      <button className="next" onClick={nextQuestion}>Next Question</button>
    ) : null}


  </div>

}

export default App;
