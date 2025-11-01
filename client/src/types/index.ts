export interface Project {
  id: string
  title: string
  description: string
  thumbnail: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  technologies: string[]
  html: string
  css: string
  javascript: string

}

export interface QuizScore {
  id?: string
  user_id: string
  user_email: string
  programming_language: string
  score: number
  total_questions: number
  completed_at: string
  quiz_data: any
}