import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { Link } from 'react-router-dom'
import { BookOpen, Copy, CheckCircle, ExternalLink, ArrowLeft } from 'lucide-react'
import { generateLibraryNotes } from '../lib/gemini'
import { languages } from '../constant/index'

const Library = () => {
  const { user } = useAuthStore()
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [notesData, setNotesData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const handleLanguageClick = async (language: string) => {
    if (!user) return

    setIsLoading(true)
    setSelectedLanguage(language)

    try {
      const notes = await generateLibraryNotes(language)
      setNotesData(notes)
    } catch (error) {
      console.error('Error generating notes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToLanguages = () => {
    setSelectedLanguage(null)
    setNotesData(null)
  }

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  const getYouTubeSearchUrl = (language: string) => {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(language + ' programming tutorial')}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-8 rounded-full border border-purple-500/30 w-32 h-32 mx-auto flex items-center justify-center mb-8">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-400 border-t-transparent"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Generating Notes...</h2>
          <p className="text-gray-300">Our AI is creating comprehensive notes for your {selectedLanguage}</p>
        </div>
      </div>
    )
  }

  if (selectedLanguage && notesData) {
    return (
      <div className="min-h-screen">
        <section className="container mx-auto px-6 py-20">
          {/* Header */}
          <div className="flex items-center mb-12">
            <button
              onClick={handleBackToLanguages}
              className="mr-6 p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-purple-400" />
            </button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {selectedLanguage} Notes
              </h1>
              <p className="text-gray-300 mt-2">Comprehensive programming guide</p>
            </div>
          </div>

          {/* Notes Content */}
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Theory Section */}
            {notesData.theory && (
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <BookOpen className="w-6 h-6 mr-3 text-purple-400" />
                  Theory & Concepts
                </h2>
                <div className="prose prose-invert max-w-none">
                  <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {notesData.theory}
                  </div>
                </div>
              </div>
            )}

            {/* Code Examples */}
            {notesData.codeExamples && notesData.codeExamples.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Copy className="w-6 h-6 mr-3 text-purple-400" />
                  Code Examples
                </h2>

                {notesData.codeExamples.map((example: any, index: number) => (
                  <div key={index} className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 overflow-hidden">
                    <div className="p-6 border-b border-purple-500/20">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-white">{example.title}</h3>
                        <button
                          onClick={() => copyToClipboard(example.code, `code-${index}`)}
                          className="flex items-center space-x-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-3 py-2 rounded-lg transition-colors"
                        >
                          {copiedCode === `code-${index}` ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-sm">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span className="text-sm">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      {example.description && (
                        <p className="text-gray-300 mt-2">{example.description}</p>
                      )}
                    </div>

                    <div className="bg-black/40 p-6">
                      <pre className="overflow-x-auto">
                        <code className="text-green-400 text-sm whitespace-pre">
                          {example.code}
                        </code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* YouTube Learning Resources */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <ExternalLink className="w-6 h-6 mr-3 text-purple-400" />
                Additional Learning Resources
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href={getYouTubeSearchUrl(selectedLanguage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 p-4 rounded-lg transition-colors group"
                >
                  <div className="flex items-center">
                    <div className="bg-red-500 p-2 rounded-lg mr-3">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold group-hover:text-red-300 transition-colors">
                        YouTube Tutorials
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Watch {selectedLanguage} programming tutorials
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(selectedLanguage + ' programming documentation')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 p-4 rounded-lg transition-colors group"
                >
                  <div className="flex items-center">
                    <div className="bg-blue-500 p-2 rounded-lg mr-3">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold group-hover:text-blue-300 transition-colors">
                        Official Documentation
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Read the official {selectedLanguage} docs
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Practice?</h3>
              <p className="text-gray-300 mb-6">
                Test your knowledge with our AI-generated quizzes and track your progress.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/courses"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                >
                  Take {selectedLanguage} Quiz
                </Link>
                <button
                  onClick={handleBackToLanguages}
                  className="border border-purple-500/50 text-purple-300 px-8 py-3 rounded-lg font-semibold hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300"
                >
                  Explore Other Languages
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-full border border-purple-500/30">
              <BookOpen className="w-12 h-12 text-purple-400" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Programming Library
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Access comprehensive AI-generated notes, theory explanations, and code examples
            for popular programming languages.
          </p>

          {!user && (
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/30 max-w-md mx-auto">
              <p className="text-purple-300 mb-4">Sign in to access the programming library</p>
              <Link
                to="/register"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-white mb-2">Comprehensive Theory</h3>
            <p className="text-gray-300">Detailed explanations of programming concepts and principles</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-xl font-bold text-white mb-2">Code Examples</h3>
            <p className="text-gray-300">Practical code samples with copy-to-clipboard functionality</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
            <div className="text-4xl mb-4">🎥</div>
            <h3 className="text-xl font-bold text-white mb-2">Learning Resources</h3>
            <p className="text-gray-300">Curated YouTube tutorials and official documentation links</p>
          </div>
        </div>

        {/* Programming Languages Grid */}
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
                      const target = e.target as HTMLImageElement
                      target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a855f7'%3E%3Cpath d='M12 2L2 7V17L12 22L22 17V7L12 2M12 4.44L19.55 8.5L12 12.56L4.45 8.5L12 4.44M4 10.37L11 14.15V20.85L4 17.07V10.37M20 10.37V17.07L13 20.85V14.15L20 10.37Z'/%3E%3C/svg%3E`
                    }}
                  />
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                  {language.name}
                </h3>
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

        {/* Call to Action */}
        {!user && (
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Unlock Your Learning Potential</h3>
              <p className="text-gray-300 mb-6">
                Join thousands of developers who are advancing their skills with our comprehensive programming library.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                >
                  Create Free Account
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

export default Library