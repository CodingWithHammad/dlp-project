import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { Map, ChevronRight, ChevronDown, Clock, Target, CheckCircle } from 'lucide-react'
import { generateRoadmap } from '../lib/gemini'
import { languages } from '../constant/index'

const Roadmap = () => {
  const { isSignedIn } = useAuth()
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [roadmapData, setRoadmapData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set())


  const handleLanguageClick = async (language: string) => {
    if (!isSignedIn) return
    
    setIsLoading(true)
    setSelectedLanguage(language)
    setExpandedPhases(new Set([0])) // Expand first phase by default
    
    try {
      const roadmap = await generateRoadmap(language)
      setRoadmapData(roadmap)
    } catch (error) {
      console.error('Error generating roadmap:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const togglePhaseExpansion = (phaseIndex: number) => {
    const newExpanded = new Set(expandedPhases)
    if (newExpanded.has(phaseIndex)) {
      newExpanded.delete(phaseIndex)
    } else {
      newExpanded.add(phaseIndex)
    }
    setExpandedPhases(newExpanded)
  }

  const handleBackToLanguages = () => {
    setSelectedLanguage(null)
    setRoadmapData(null)
    setExpandedPhases(new Set())
  }

  const getPhaseColor = (phaseIndex: number) => {
    const colors = [
      'from-green-400 to-blue-500',
      'from-blue-400 to-purple-500',
      'from-purple-400 to-pink-500',
      'from-pink-400 to-red-500'
    ]
    return colors[phaseIndex % colors.length]
  }

  const getPhaseIcon = (phaseIndex: number) => {
    if (phaseIndex === 0) return '🌱'
    if (phaseIndex === 1) return '🌿'
    if (phaseIndex === 2) return '🌳'
    return '🏆'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-8 rounded-full border border-purple-500/30 w-32 h-32 mx-auto flex items-center justify-center mb-8">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-400 border-t-transparent"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Generating Roadmap...</h2>
          <p className="text-gray-300">Our AI is creating a personalized learning path for {selectedLanguage}</p>
        </div>
      </div>
    )
  }

  if (selectedLanguage && roadmapData) {
    return (
      <div className="min-h-screen">
        <section className="container mx-auto px-6 py-20">
          {/* Header */}
          <div className="flex items-center mb-12">
            <button
              onClick={handleBackToLanguages}
              className="mr-6 p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-purple-400 transform rotate-180" />
            </button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {roadmapData.title}
              </h1>
              <p className="text-gray-300 mt-2">Your personalized learning journey</p>
            </div>
          </div>

          {/* Roadmap Timeline */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {roadmapData.phases?.map((phase: any, phaseIndex: number) => {
                const isExpanded = expandedPhases.has(phaseIndex)
                
                return (
                  <div key={phaseIndex} className="relative">
                    {/* Connecting Line */}
                    {phaseIndex < roadmapData.phases.length - 1 && (
                      <div className="absolute left-8 top-20 w-0.5 h-12 bg-gradient-to-b from-purple-500 to-pink-500"></div>
                    )}
                    
                    <div className="flex items-start">
                      {/* Phase Icon */}
                      <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r ${getPhaseColor(phaseIndex)} flex items-center justify-center text-2xl shadow-lg z-10`}>
                        {getPhaseIcon(phaseIndex)}
                      </div>
                      
                      {/* Phase Content */}
                      <div className="flex-grow ml-6">
                        <button
                          onClick={() => togglePhaseExpansion(phaseIndex)}
                          className="w-full text-left bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center mb-2">
                                <h3 className="text-2xl font-bold text-white mr-4">{phase.phase}</h3>
                                {phase.duration && (
                                  <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30 flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {phase.duration}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-300">
                                {phase.topics?.length || 0} topics to master in this phase
                              </p>
                            </div>
                            
                            <ChevronDown className={`w-6 h-6 text-purple-400 transition-transform group-hover:text-purple-300 ${isExpanded ? 'rotate-180' : ''}`} />
                          </div>
                        </button>
                        
                        {/* Phase Topics */}
                        {isExpanded && (
                          <div className="mt-4 space-y-4">
                            {phase.topics?.map((topic: any, topicIndex: number) => (
                              <div key={topicIndex} className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 p-6 rounded-xl border border-purple-500/10">
                                <div className="flex items-start">
                                  <div className="flex-shrink-0 mr-4 mt-1">
                                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                                      <Target className="w-4 h-4 text-purple-400" />
                                    </div>
                                  </div>
                                  
                                  <div className="flex-grow">
                                    <h4 className="text-lg font-semibold text-white mb-2">{topic.title}</h4>
                                    <p className="text-gray-300 mb-4">{topic.description}</p>
                                    
                                    {topic.subtopics && topic.subtopics.length > 0 && (
                                      <div>
                                        <h5 className="text-sm font-medium text-purple-300 mb-3">Key Concepts:</h5>
                                        <div className="grid md:grid-cols-2 gap-2">
                                          {topic.subtopics.map((subtopic: string, subtopicIndex: number) => (
                                            <div key={subtopicIndex} className="flex items-center">
                                              <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                                              <span className="text-sm text-gray-300">{subtopic}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Journey?</h3>
              <p className="text-gray-300 mb-6">
                Test your knowledge with our AI-generated quizzes and track your progress as you follow this roadmap.
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
              <Map className="w-12 h-12 text-purple-400" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Learning Roadmaps
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Get personalized, AI-generated learning roadmaps for any programming language. 
            Follow structured paths from beginner to expert level.
          </p>
          
          {!isSignedIn && (
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/30 max-w-md mx-auto">
              <p className="text-purple-300 mb-4">Sign in to access personalized roadmaps</p>
              <Link
                to="/sign-up"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center"
              >
                Get Started
                <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-white mb-2">Personalized Paths</h3>
            <p className="text-gray-300">AI-generated roadmaps tailored to your learning goals and current skill level</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-white mb-2">Structured Learning</h3>
            <p className="text-gray-300">Step-by-step progression from beginner concepts to advanced techniques</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">Real-time Updates</h3>
            <p className="text-gray-300">Roadmaps updated with the latest industry trends and best practices</p>
          </div>
        </div>

        {/* Programming Languages Grid */}
        <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-6">
          {languages.map((language) => (
            <button
              key={language.name}
              onClick={() => handleLanguageClick(language.name)}
              disabled={!isSignedIn}
              className={`group relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                !isSignedIn ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
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
              
              {isSignedIn && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 rounded-xl transition-all duration-300"></div>
              )}
              
              {!isSignedIn && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-purple-300 font-medium">Sign in required</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Call to Action */}
        {!isSignedIn && (
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Start Your Learning Journey</h3>
              <p className="text-gray-300 mb-6">
                Join thousands of developers who are advancing their careers with our AI-powered learning platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/sign-up"
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

export default Roadmap