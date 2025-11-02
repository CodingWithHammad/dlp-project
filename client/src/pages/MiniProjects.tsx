import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { Link } from 'react-router-dom'
import { Code, Copy, CheckCircle, Eye, ArrowLeft } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Project } from '@/types/index'
import { projects } from '../constant/index'

const MiniProjects = () => {
  const { user } = useAuthStore()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'javascript' | 'preview'>('html')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)


  const copyToClipboard = async (code: string, type: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(`${selectedProject?.id}-${type}`)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const generatePreviewHTML = (project: Project) => {
    return `
      <html>
        <head>
          <style>${project.css}</style>
        </head>
        <body>
          ${project.html.replace(/<script.*<\/script>/s, '')}
          <script>${project.javascript}</script>
        </body>
      </html>
    `
  }

  if (selectedProject) {
    return (
      <div className="min-h-screen">
        <section className="container mx-auto px-6 py-20">
          {/* Header */}
          <div className="flex items-center mb-12">
            <button
              onClick={() => setSelectedProject(null)}
              className="mr-6 p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-purple-400" />
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {selectedProject.title}
                </h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(selectedProject.difficulty)}`}>
                  {selectedProject.difficulty}
                </span>
              </div>
              <p className="text-gray-300">{selectedProject.description}</p>
              <div className="flex items-center gap-2 mt-2">
                {selectedProject.technologies.map((tech) => (
                  <span key={tech} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-purple-500/20 bg-black/20">
              {(['html', 'css', 'javascript', 'preview'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-medium transition-colors capitalize ${activeTab === tab
                    ? 'bg-purple-500/20 text-purple-300 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-purple-300 hover:bg-purple-500/10'
                    }`}
                >
                  {tab === 'javascript' ? 'JS' : tab}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="relative">
              {activeTab === 'preview' ? (
                <div className="p-6">
                  <div className="bg-white rounded-lg overflow-hidden" style={{ height: '500px' }}>
                    <iframe
                      srcDoc={generatePreviewHTML(selectedProject)}
                      className="w-full h-full border-0"
                      title="Project Preview"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => copyToClipboard(selectedProject[activeTab], activeTab)}
                    className="absolute top-4 right-4 z-10 flex items-center space-x-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-3 py-2 rounded-lg transition-colors"
                  >
                    {copiedCode === `${selectedProject.id}-${activeTab}` ? (
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

                  <SyntaxHighlighter
                    language={activeTab === 'javascript' ? 'javascript' : activeTab}
                    customStyle={{
                      margin: 0,
                      padding: '2rem',
                      background: 'transparent',
                      fontSize: '0.9rem',
                      lineHeight: '1.5'
                    }}
                  >
                    {selectedProject[activeTab]}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => copyToClipboard(
                `${selectedProject.html}\n\n/* CSS */\n${selectedProject.css}\n\n/* JavaScript */\n${selectedProject.javascript}`,
                'all'
              )}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <Copy className="mr-2 w-5 h-5" />
              Copy All Code
            </button>

            <button
              onClick={() => setSelectedProject(null)}
              className="border border-purple-500/50 text-purple-300 px-8 py-3 rounded-lg font-semibold hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300"
            >
              Back to Projects
            </button>
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
              <Code className="w-12 h-12 text-purple-400" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Mini Projects
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Explore beginner-friendly projects with complete source code. Each project includes
            HTML, CSS, and JavaScript with live preview and copy-to-clipboard functionality.
          </p>

          {!user && (
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/30 max-w-md mx-auto">
              <p className="text-purple-300 mb-4">Sign in to access mini projects</p>
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
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
            <div className="text-3xl mb-3">💻</div>
            <h3 className="text-lg font-bold text-white mb-2">Complete Code</h3>
            <p className="text-gray-300 text-sm">Full HTML, CSS, and JavaScript source code</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
            <div className="text-3xl mb-3">👁️</div>
            <h3 className="text-lg font-bold text-white mb-2">Live Preview</h3>
            <p className="text-gray-300 text-sm">See projects running in real-time</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="text-lg font-bold text-white mb-2">Easy Copy</h3>
            <p className="text-gray-300 text-sm">One-click copy to clipboard functionality</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20 text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-bold text-white mb-2">Beginner Friendly</h3>
            <p className="text-gray-300 text-sm">Perfect for learning and practice</p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => user && setSelectedProject(project)}
              disabled={!user}
              className={`group bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 overflow-hidden transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-left ${!user ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-purple-400/40'
                }`}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </span>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-purple-400 text-sm font-medium">
                  <Eye className="w-4 h-4 mr-2" />
                  View Project
                </div>
              </div>

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
              <h3 className="text-2xl font-bold text-white mb-4">Start Building Today</h3>
              <p className="text-gray-300 mb-6">
                Access all mini projects with complete source code and start building your portfolio.
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

export default MiniProjects