import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { Link } from 'react-router-dom'
import { Play, Award, Clock, ChevronRight } from 'lucide-react'
import { generateQuiz } from '../lib/gemini'
import Quiz from '../components/Quiz'
import { languages } from '../constant/index'

const Courses = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [quizData, setQuizData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuthStore()

  const handleLanguageClick = async (language: string) => {
    if (!user) return

    setIsLoading(true)
    setSelectedLanguage(language)

    try {
      const quiz = await generateQuiz(language)
      setQuizData(quiz)
    } catch (error) {
      console.error('Error generating quiz:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuizComplete = () => {
    setSelectedLanguage(null)
    setQuizData(null)
  }

  if (selectedLanguage && quizData && !isLoading) {
    return (
      <Quiz
        language={selectedLanguage}
        quizData={quizData}
        onComplete={handleQuizComplete}
      />
    )
  }

  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-full border border-purple-500/30">
              <Play className="w-12 h-12 text-purple-400" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            AI-Powered Courses
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Challenge yourself with dynamically generated quizzes for 10 popular programming languages.
            Each quiz is unique and tailored to test your knowledge comprehensively.
          </p>

          {!user && (
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/30 max-w-md mx-auto">
              <p className="text-purple-300 mb-4">Ready to start learning?</p>
              <Link
                to="/register"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center"
              >
                Sign Up Now
                <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Course Statistics */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
            <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">10 Questions</h3>
            <p className="text-gray-300">Per quiz session</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
            <Clock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">~15 Minutes</h3>
            <p className="text-gray-300">Average completion time</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
            <Play className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Unlimited</h3>
            <p className="text-gray-300">Retakes with new questions</p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-8 rounded-full border border-purple-500/30 w-32 h-32 mx-auto flex items-center justify-center mb-8">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-400 border-t-transparent"></div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Generating Quiz...</h2>
            <p className="text-gray-300">Our AI is creating unique questions for {selectedLanguage}</p>
          </div>
        )}

        {/* Programming Languages Grid */}
        {!isLoading && (
          <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-6">
            {languages.map((language) => (
              <button
                key={language.name}
                onClick={() => handleLanguageClick(language.name)}
                disabled={!user}
                className={`group relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${!user ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
              >
                <div className="text-center">
                  <div className="bg-white/10 w-16 h-16 rounded-lg p-3 mx-auto mb-4 group-hover:bg-white/20 transition-colors">
                    <img
                      src={language.logo}
                      alt={language.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        // Fallback for broken images
                        const target = e.target as HTMLImageElement
                        target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a855f7'%3E%3Cpath d='M12 2L2 7V17L12 22L22 17V7L12 2M12 4.44L19.55 8.5L12 12.56L4.45 8.5L12 4.44M4 10.37L11 14.15V20.85L4 17.07V10.37M20 10.37V17.07L13 20.85V14.15L20 10.37Z'/%3E%3C/svg%3E`
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {language.name}
                  </h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {language.description}
                  </p>
                </div>

                {user && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 rounded-xl transition-all duration-300"></div>
                )}

                {!user && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-purple-300 font-medium">Sign in required</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {!user && !isLoading && (
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Test Your Skills?</h3>
              <p className="text-gray-300 mb-6">
                Sign up now to access unlimited AI-generated quizzes, track your progress, and compete with developers worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                >
                  Start Learning Free
                </Link>
                <Link
                  to="/about"
                  className="border border-purple-500/50 text-purple-300 px-8 py-3 rounded-lg font-semibold hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default Courses