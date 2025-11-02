// import { useState, useEffect } from 'react'
// import { useAuthStore } from '@/store/authStore'
// import { Trophy, Calendar, Target, TrendingUp, Filter, Search } from 'lucide-react'

// const Score = () => {
//   const { user } = useAuthStore()
//   const [scores, setScores] = useState<any[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [filterLanguage, setFilterLanguage] = useState('all')
//   const [searchTerm, setSearchTerm] = useState('')

//   // useEffect(() => {
//   //   if (user) {
//   //     fetchScores()
//   //   }
//   // }, [user])

//   // const fetchScores = async () => {
//   //   try {
//   //     const { data, error } = await supabase
//   //       .from('quiz_scores')
//   //       .select('*')
//   //       .order('completed_at', { ascending: false })

//   //     if (error) {
//   //       console.error('Error fetching scores:', error)
//   //     } else {
//   //       setScores(data || [])
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching scores:', error)
//   //   } finally {
//   //     setIsLoading(false)
//   //   }
//   // }

//   const getUniqueLanguages = () => {
//     const languages = [...new Set(scores.map(score => score.programming_language))]
//     return languages.sort()
//   }

//   const filteredScores = scores.filter(score => {
//     const matchesLanguage = filterLanguage === 'all' || score.programming_language === filterLanguage
//     const matchesSearch = score.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       score.programming_language.toLowerCase().includes(searchTerm.toLowerCase())
//     return matchesLanguage && matchesSearch
//   })

//   const getScoreColor = (score: number, total: number) => {
//     const percentage = (score / total) * 100
//     if (percentage >= 80) return 'text-green-400'
//     if (percentage >= 60) return 'text-yellow-400'
//     return 'text-red-400'
//   }

//   const getScoreBadge = (score: number, total: number) => {
//     const percentage = (score / total) * 100
//     if (percentage >= 90) return { label: 'Excellent', color: 'bg-green-500/20 text-green-400 border-green-500/30' }
//     if (percentage >= 80) return { label: 'Great', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' }
//     if (percentage >= 60) return { label: 'Good', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' }
//     return { label: 'Needs Work', color: 'bg-red-500/20 text-red-400 border-red-500/30' }
//   }

//   // Calculate statistics
//   const userScores = scores.filter(score => score.user_id === user?.id)
//   const totalQuizzes = userScores.length
//   const averageScore = totalQuizzes > 0
//     ? userScores.reduce((acc, score) => acc + (score.score / score.total_questions * 100), 0) / totalQuizzes
//     : 0
//   const bestScore = totalQuizzes > 0
//     ? Math.max(...userScores.map(score => (score.score / score.total_questions * 100)))
//     : 0
//   const languageCount = new Set(userScores.map(score => score.programming_language)).size

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center max-w-md mx-auto p-8">
//           <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-8 rounded-full border border-purple-500/30 w-32 h-32 mx-auto flex items-center justify-center mb-8">
//             <Trophy className="w-16 h-16 text-purple-400" />
//           </div>
//           <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//             Sign In Required
//           </h1>
//           <p className="text-gray-300 mb-6">
//             Please sign in to view quiz scores and track your learning progress.
//           </p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen">
//       <section className="container mx-auto px-6 py-20">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="flex justify-center mb-8">
//             <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-full border border-purple-500/30">
//               <Trophy className="w-12 h-12 text-purple-400" />
//             </div>
//           </div>

//           <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
//             Quiz Scores
//           </h1>

//           <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
//             Track your learning progress and compare your performance across different programming languages.
//           </p>
//         </div>

//         {/* Personal Statistics */}
//         <div className="grid md:grid-cols-4 gap-6 mb-12">
//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//             <Target className="w-8 h-8 text-purple-400 mx-auto mb-3" />
//             <div className="text-2xl font-bold text-white">{totalQuizzes}</div>
//             <div className="text-gray-300">Total Quizzes</div>
//           </div>

//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//             <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
//             <div className="text-2xl font-bold text-white">{Math.round(averageScore)}%</div>
//             <div className="text-gray-300">Average Score</div>
//           </div>

//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//             <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-3" />
//             <div className="text-2xl font-bold text-white">{Math.round(bestScore)}%</div>
//             <div className="text-gray-300">Best Score</div>
//           </div>

//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
//             <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-3" />
//             <div className="text-2xl font-bold text-white">{languageCount}</div>
//             <div className="text-gray-300">Languages</div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="flex flex-col md:flex-row gap-4 mb-8">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by email or language..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 bg-black/20 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
//             />
//           </div>

//           <div className="relative">
//             <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <select
//               value={filterLanguage}
//               onChange={(e) => setFilterLanguage(e.target.value)}
//               className="pl-10 pr-8 py-3 bg-black/20 border border-purple-500/30 rounded-lg text-white focus:border-purple-400 focus:outline-none transition-colors appearance-none cursor-pointer"
//             >
//               <option value="all">All Languages</option>
//               {getUniqueLanguages().map(language => (
//                 <option key={language} value={language}>{language}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Loading State */}
//         {isLoading && (
//           <div className="text-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-400 border-t-transparent mx-auto mb-4"></div>
//             <p className="text-gray-300">Loading scores...</p>
//           </div>
//         )}

//         {/* Scores Table */}
//         {!isLoading && (
//           <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 overflow-hidden">
//             {filteredScores.length === 0 ? (
//               <div className="text-center py-20">
//                 <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold text-white mb-2">No Scores Found</h3>
//                 <p className="text-gray-300">
//                   {scores.length === 0
//                     ? "Take your first quiz to see your scores here!"
//                     : "No scores match your current filters."
//                   }
//                 </p>
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-black/20 border-b border-purple-500/20">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">User</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">Language</th>
//                       <th className="px-6 py-4 text-center text-sm font-semibold text-purple-300">Score</th>
//                       <th className="px-6 py-4 text-center text-sm font-semibold text-purple-300">Performance</th>
//                       <th className="px-6 py-4 text-center text-sm font-semibold text-purple-300">Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredScores.map((score, index) => {
//                       const badge = getScoreBadge(score.score, score.total_questions)
//                       const percentage = Math.round((score.score / score.total_questions) * 100)
//                       const isCurrentUser = score.user_id === user?.id

//                       return (
//                         <tr
//                           key={score.id || index}
//                           className={`border-b border-purple-500/10 hover:bg-purple-500/5 transition-colors ${isCurrentUser ? 'bg-purple-500/10' : ''
//                             }`}
//                         >
//                           <td className="px-6 py-4">
//                             <div className="flex items-center">
//                               <div className={`w-2 h-2 rounded-full mr-3 ${isCurrentUser ? 'bg-purple-400' : 'bg-gray-400'}`}></div>
//                               <span className={`font-medium ${isCurrentUser ? 'text-purple-300' : 'text-gray-300'}`}>
//                                 {isCurrentUser ? 'You' : score.user_email.split('@')[0]}
//                               </span>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <span className="text-white font-medium">{score.programming_language}</span>
//                           </td>
//                           <td className="px-6 py-4 text-center">
//                             <div className="flex flex-col items-center">
//                               <span className={`text-2xl font-bold ${getScoreColor(score.score, score.total_questions)}`}>
//                                 {score.score}/{score.total_questions}
//                               </span>
//                               <span className="text-sm text-gray-400">{percentage}%</span>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 text-center">
//                             <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
//                               {badge.label}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 text-center text-gray-400 text-sm">
//                             {new Date(score.completed_at).toLocaleDateString()}
//                           </td>
//                         </tr>
//                       )
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Call to Action */}
//         {!isLoading && filteredScores.length > 0 && (
//           <div className="text-center mt-12">
//             <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20 max-w-2xl mx-auto">
//               <h3 className="text-2xl font-bold text-white mb-4">Keep Learning!</h3>
//               <p className="text-gray-300 mb-6">
//                 Challenge yourself with more quizzes and improve your programming skills across different languages.
//               </p>
//               <a
//                 href="/courses"
//                 className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center"
//               >
//                 Take Another Quiz
//                 <Target className="ml-2 w-5 h-5" />
//               </a>
//             </div>
//           </div>
//         )}
//       </section>
//     </div>
//   )
// }

// export default Score