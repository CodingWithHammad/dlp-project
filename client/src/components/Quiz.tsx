import React, { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy, Clock } from 'lucide-react'
import { supabase, QuizScore } from '../lib/supabase'

interface QuizProps {
  language: string
  quizData: any
  onComplete: () => void
}

const Quiz: React.FC<QuizProps> = ({ language, quizData, onComplete }) => {
  const { user } = useAuth()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(900) // 15 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(false)

  const questions = quizData?.questions || []
  const totalQuestions = questions.length

  useEffect(() => {
    if (quizStarted && timeRemaining > 0 && !showResults) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0) {
      handleFinishQuiz()
    }
  }, [quizStarted, timeRemaining, showResults])

  const handleStartQuiz = () => {
    setQuizStarted(true)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleFinishQuiz()
    }
  }

  const handleFinishQuiz = async () => {
    setShowResults(true)
    
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index]?.correctAnswer ? 1 : 0)
    }, 0)

    // Save quiz results to database
    if (user) {
      try {
        const quizScore: QuizScore = {
          user_id: user.id,
          user_email: user.primaryEmailAddress?.emailAddress || '',
          programming_language: language,
          score,
          total_questions: totalQuestions,
          completed_at: new Date().toISOString(),
          quiz_data: {
            questions: questions.map((q: any, index: number) => ({
              ...q,
              userAnswer: selectedAnswers[index],
              isCorrect: selectedAnswers[index] === q.correctAnswer
            }))
          }
        }

        const { error } = await supabase
          .from('quiz_scores')
          .insert([quizScore])

        if (error) {
          console.error('Error saving quiz score:', error)
        }
      } catch (error) {
        console.error('Error saving quiz score:', error)
      }
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getScoreColor = () => {
    const percentage = (selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index]?.correctAnswer ? 1 : 0)
    }, 0) / totalQuestions) * 100

    if (percentage >= 80) return 'text-green-400'
    if (percentage >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center p-8">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-8 rounded-full border border-purple-500/30 w-32 h-32 mx-auto flex items-center justify-center mb-8">
            <Trophy className="w-16 h-16 text-purple-400" />
          </div>
          
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {language} Quiz Ready!
          </h1>
          
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20 mb-8">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{totalQuestions}</div>
                <div className="text-gray-300">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">15</div>
                <div className="text-gray-300">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10</div>
                <div className="text-gray-300">Points Max</div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6">
              You'll have 15 minutes to complete {totalQuestions} questions about {language}. 
              Each question has 4 options with only one correct answer. Good luck!
            </p>
          </div>
          
          <button
            onClick={handleStartQuiz}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center justify-center mx-auto"
          >
            Start Quiz
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  if (showResults) {
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index]?.correctAnswer ? 1 : 0)
    }, 0)

    return (
      <div className="min-h-screen container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
              {score}/{totalQuestions}
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Quiz Complete!
            </h1>
            <p className="text-xl text-gray-300">
              You scored {Math.round((score / totalQuestions) * 100)}% on the {language} quiz
            </p>
          </div>

          {/* Detailed Review */}
          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Detailed Review</h2>
            
            {questions.map((question: any, index: number) => {
              const userAnswer = selectedAnswers[index]
              const isCorrect = userAnswer === question.correctAnswer
              
              return (
                <div key={index} className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex-1 mr-4">
                      {index + 1}. {question.question}
                    </h3>
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                    )}
                  </div>
                  
                  <div className="grid gap-2 mb-4">
                    {question.options.map((option: string, optionIndex: number) => {
                      let bgColor = 'bg-black/20'
                      let textColor = 'text-gray-300'
                      
                      if (optionIndex === question.correctAnswer) {
                        bgColor = 'bg-green-500/20 border border-green-500/40'
                        textColor = 'text-green-300'
                      } else if (optionIndex === userAnswer && !isCorrect) {
                        bgColor = 'bg-red-500/20 border border-red-500/40'
                        textColor = 'text-red-300'
                      }
                      
                      return (
                        <div key={optionIndex} className={`p-3 rounded-lg ${bgColor} ${textColor}`}>
                          {String.fromCharCode(65 + optionIndex)}. {option}
                          {optionIndex === question.correctAnswer && (
                            <span className="ml-2 text-sm font-medium">(Correct)</span>
                          )}
                          {optionIndex === userAnswer && optionIndex !== question.correctAnswer && (
                            <span className="ml-2 text-sm font-medium">(Your answer)</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  
                  {question.explanation && (
                    <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-300 mb-2">Explanation:</h4>
                      <p className="text-gray-300">{question.explanation}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onComplete}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <RotateCcw className="mr-2 w-5 h-5" />
              Take Another Quiz
            </button>
            
            <button
              onClick={() => window.location.href = '/score'}
              className="border border-purple-500/50 text-purple-300 px-8 py-3 rounded-lg font-semibold hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300"
            >
              View All Scores
            </button>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  return (
    <div className="min-h-screen container mx-auto px-6 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Quiz Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {language} Quiz
            </h1>
            <p className="text-gray-300">
              Question {currentQuestion + 1} of {totalQuestions}
            </p>
          </div>
          
          <div className="flex items-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-lg border border-purple-500/30">
            <Clock className="w-5 h-5 text-purple-400 mr-2" />
            <span className="text-white font-mono font-bold">
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-black/20 rounded-full h-2 mb-8 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question */}
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-8">
            {question?.question}
          </h2>

          {/* Answer Options */}
          <div className="grid gap-4 mb-8">
            {question?.options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`p-4 rounded-lg text-left transition-all duration-300 border ${
                  selectedAnswers[currentQuestion] === index
                    ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                    : 'bg-black/20 border-purple-500/20 text-gray-300 hover:bg-purple-500/10 hover:border-purple-500/40'
                }`}
              >
                <span className="font-medium mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">
              {selectedAnswers[currentQuestion] !== undefined 
                ? 'Answer selected' 
                : 'Please select an answer'
              }
            </div>
            
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center"
            >
              {currentQuestion === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz