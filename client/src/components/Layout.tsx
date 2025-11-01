import { Outlet, Link, useLocation } from 'react-router-dom'
import { UserButton, useAuth } from '@clerk/clerk-react'
import { Code, Menu } from 'lucide-react'
import { navItems } from '../constant/index'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const Layout = () => {
  const location = useLocation()
  const { isSignedIn } = useAuth()



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* HEADER */}
      <header className="bg-black/20 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <Code className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                LearnAI
              </span>
            </Link>

            {/* Desktop Navbar */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${location.pathname === path
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'text-gray-300 hover:text-purple-300 hover:bg-purple-500/10'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu (Sheet) */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2 text-gray-300 hover:text-purple-300">
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-slate-900 text-white">
                  <SheetHeader>
                    <SheetTitle className="flex items-center space-x-2">
                      <Code className="w-6 h-6 text-purple-400" />
                      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        LearnAI
                      </span>
                    </SheetTitle>
                  </SheetHeader>

                  <nav className="mt-6 flex flex-col space-y-4">
                    {navItems.map(({ path, label, icon: Icon }) => (
                      <Link
                        key={path}
                        to={path}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${location.pathname === path
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'text-gray-300 hover:text-purple-300 hover:bg-purple-500/10'
                          }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                      </Link>
                    ))}
                  </nav>

                  {/* Auth Buttons inside Sheet */}
                  <div className="mt-6">
                    {isSignedIn ? (
                      <UserButton afterSignOutUrl="/" />
                    ) : (
                      <div className="flex flex-col space-y-3">
                        <Link
                          to="/sign-in"
                          className="text-gray-300 hover:text-purple-300 transition-colors"
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/sign-up"
                          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Right Side Buttons (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/sign-in"
                    className="text-gray-300 hover:text-purple-300 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/sign-up"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main>
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-black/40 border-t border-purple-500/20 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Code className="w-6 h-6 text-purple-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  LearnAI
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Master programming languages with AI-powered quizzes and personalized learning roadmaps.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.slice(0, 3).map(({ path, label }) => (
                  <li key={path}>
                    <Link to={path} className="text-gray-400 hover:text-purple-300 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Learning</h3>
              <ul className="space-y-2">
                {navItems.slice(3).map(({ path, label }) => (
                  <li key={path}>
                    <Link to={path} className="text-gray-400 hover:text-purple-300 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-purple-500/20 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 LearnAI. All rights reserved. Powered by AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
