import { Zap, Code } from 'lucide-react'
import { features, stats } from '../constant/index'

const About = () => {

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-full border border-purple-500/30">
              <Code className="w-12 h-12 text-purple-400" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            About LearnAI
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Revolutionizing programming education through artificial intelligence,
            personalized learning experiences, and adaptive content generation.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Our Mission
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                We believe that learning programming should be accessible, engaging, and tailored to each individual's pace and style.
                Our mission is to democratize coding education by leveraging cutting-edge AI technology to create personalized learning experiences.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Through our platform, we aim to bridge the gap between theoretical knowledge and practical application,
                helping developers of all levels master new programming languages and advance their careers.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-2xl border border-purple-500/20">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-xl mb-6">
                <Zap className="w-12 h-12 text-purple-400 mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold text-white text-center mb-4">Powered by Innovation</h3>
              <p className="text-gray-300 text-center">
                Utilizing Google's Gemini AI to deliver the most advanced and adaptive learning platform for programmers worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            What Makes Us Different
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group">
                <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
                  <Icon className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
                <p className="text-gray-300 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Platform Statistics
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map(({ number, label }, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    {number}
                  </div>
                  <div className="text-gray-300 font-medium">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            The Future of Learning
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            We envision a world where anyone can master programming through personalized, AI-driven education.
            Our platform represents the next evolution in coding education, combining the best of human expertise with artificial intelligence.
          </p>
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-xl border border-purple-500/20">
            <p className="text-lg text-gray-300 italic">
              "Learning to code shouldn't be a one-size-fits-all experience. Every developer's journey is unique,
              and our AI ensures that each learning path is as individual as the person taking it."
            </p>
            <div className="mt-4 text-purple-400 font-semibold">- LearnAI Team</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About