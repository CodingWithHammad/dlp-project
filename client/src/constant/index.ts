import type { Project } from "@/types/index"
import { Award, BookOpen, Brain, CheckCircle, ChefHatIcon, Home, Library, Mail, Map, Target, Trophy, User, Users } from "lucide-react"

export const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: User },
    { path: '/contact', label: 'Contact', icon: Mail },
    { path: '/courses', label: 'Courses', icon: BookOpen },
    { path: '/roadmap', label: 'Roadmap', icon: Map },
    { path: '/score', label: 'Scores', icon: Trophy },
    { path: '/chatbot', label: 'Chatbot', icon: ChefHatIcon },
    { path: '/library', label: 'Library', icon: Library },
    { path: '/voice-agent', label: 'Voice Agent', icon: Library },
]

export const workflowSteps = [
    {
        step: 1,
        title: 'Choose Your Language',
        description: 'Select from 10 popular programming languages',
        icon: Target
    },
    {
        step: 2,
        title: 'Take AI-Generated Quiz',
        description: 'Answer 10 unique questions powered by AI',
        icon: Brain
    },
    {
        step: 3,
        title: 'Review & Learn',
        description: 'Get detailed explanations and track your progress',
        icon: CheckCircle
    }
]

export const faqs = [
    {
        question: 'How are the quiz questions generated?',
        answer: 'Our platform uses Google\'s Gemini AI to generate unique, challenging questions for each programming language, ensuring a fresh experience every time.'
    },
    {
        question: 'Can I retake quizzes?',
        answer: 'Yes! You can take quizzes as many times as you want. Each attempt generates new questions, so you\'ll always have fresh challenges.'
    },
    {
        question: 'What programming languages are supported?',
        answer: 'We support 10 popular languages: JavaScript, Python, Java, C++, C#, Go, Rust, PHP, Swift, and Kotlin.'
    },
    {
        question: 'How are learning roadmaps created?',
        answer: 'Our AI analyzes current industry standards and best practices to create personalized, step-by-step learning paths for each programming language.'
    },
    {
        question: 'Is the platform free to use?',
        answer: 'Yes! All core features including quizzes, roadmaps, and progress tracking are completely free.'
    }
]


export const features = [
    {
        icon: Brain,
        title: 'AI-Powered Learning',
        description: 'Harness the power of Google\'s Gemini AI to generate unique, challenging questions and comprehensive learning roadmaps tailored to your skill level.'
    },
    {
        icon: Target,
        title: 'Personalized Experience',
        description: 'Every learning journey is unique. Our platform adapts to your progress and provides personalized recommendations for improvement.'
    },
    {
        icon: Users,
        title: 'Community Driven',
        description: 'Join thousands of learners worldwide. Compare scores, share achievements, and learn from the global programming community.'
    },
    {
        icon: Award,
        title: 'Progress Tracking',
        description: 'Monitor your improvement over time with detailed analytics, score history, and comprehensive performance insights.'
    }
]

export const stats = [
    { number: '10+', label: 'Programming Languages' },
    { number: '1000+', label: 'AI-Generated Questions' },
    { number: '50+', label: 'Learning Paths' },
    { number: '95%', label: 'Success Rate' }
]

export const languages = [
    {
        name: 'JavaScript',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        description: 'The language of the web',
        color: 'from-yellow-400 to-orange-500'
    },
    {
        name: 'Python',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        description: 'Simple and powerful',
        color: 'from-blue-400 to-green-500'
    },
    {
        name: 'Java',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
        description: 'Write once, run anywhere',
        color: 'from-red-500 to-orange-600'
    },
    {
        name: 'C++',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
        description: 'System programming powerhouse',
        color: 'from-blue-600 to-purple-600'
    },
    {
        name: 'C#',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
        description: 'Microsoft\'s versatile language',
        color: 'from-purple-500 to-indigo-600'
    },
    {
        name: 'Go',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
        description: 'Fast and efficient',
        color: 'from-cyan-400 to-blue-500'
    },
    {
        name: 'Rust',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg',
        description: 'Safe systems programming',
        color: 'from-orange-500 to-red-600'
    },
    {
        name: 'PHP',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
        description: 'Web development classic',
        color: 'from-indigo-500 to-purple-600'
    },
    {
        name: 'Swift',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
        description: 'Apple\'s modern language',
        color: 'from-orange-400 to-red-500'
    },
    {
        name: 'Kotlin',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
        description: 'Modern Android development',
        color: 'from-purple-400 to-pink-500'
    }
]


export const projects: Project[] = [
    {
        id: 'todo-list',
        title: 'Todo List App',
        description: 'A simple todo list application with add, delete, and mark complete functionality.',
        thumbnail: 'https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&w=400',
        difficulty: 'Beginner',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo List</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>My Todo List</h1>
        <div class="input-container">
            <input type="text" id="todoInput" placeholder="Add a new task...">
            <button id="addBtn">Add</button>
        </div>
        <ul id="todoList"></ul>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
        css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 400px;
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 1.5rem;
}

.input-container {
    display: flex;
    margin-bottom: 1.5rem;
}

#todoInput {
    flex: 1;
    padding: 0.75rem;
    border: 2px solid #ddd;
    border-radius: 5px 0 0 5px;
    font-size: 1rem;
    outline: none;
}

#todoInput:focus {
    border-color: #667eea;
}

#addBtn {
    padding: 0.75rem 1.5rem;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s;
}

#addBtn:hover {
    background: #5a6fd8;
}

#todoList {
    list-style: none;
}

.todo-item {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    background: #f8f9fa;
    border-radius: 5px;
    transition: all 0.3s;
}

.todo-item:hover {
    transform: translateX(5px);
}

.todo-item.completed {
    opacity: 0.6;
    text-decoration: line-through;
}

.todo-text {
    flex: 1;
    margin-left: 0.5rem;
}

.delete-btn {
    background: #e74c3c;
    color: white;
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 3px;
    cursor: pointer;
    font-size: 0.8rem;
}

.delete-btn:hover {
    background: #c0392b;
}

input[type="checkbox"] {
    transform: scale(1.2);
    cursor: pointer;
}`,
        javascript: `class TodoApp {
    constructor() {
        this.todos = [];
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        
        this.init();
    }
    
    init() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });
        
        this.loadTodos();
        this.render();
    }
    
    addTodo() {
        const text = this.todoInput.value.trim();
        if (text === '') return;
        
        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        
        this.todos.push(todo);
        this.todoInput.value = '';
        this.saveTodos();
        this.render();
    }
    
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        this.render();
    }
    
    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }
    
    render() {
        this.todoList.innerHTML = '';
        
        this.todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = \`todo-item \${todo.completed ? 'completed' : ''}\`;
            
            li.innerHTML = \`
                <input type="checkbox" \${todo.completed ? 'checked' : ''} 
                       onchange="app.toggleTodo(\${todo.id})">
                <span class="todo-text">\${todo.text}</span>
                <button class="delete-btn" onclick="app.deleteTodo(\${todo.id})">Delete</button>
            \`;
            
            this.todoList.appendChild(li);
        });
    }
    
    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    
    loadTodos() {
        const saved = localStorage.getItem('todos');
        if (saved) {
            this.todos = JSON.parse(saved);
        }
    }
}

// Initialize the app
const app = new TodoApp();`
    },
    {
        id: 'calculator',
        title: 'Calculator',
        description: 'A functional calculator with basic arithmetic operations and a clean interface.',
        thumbnail: 'https://images.pexels.com/photos/6238/black-and-white-office-vintage-technology.jpg?auto=compress&cs=tinysrgb&w=400',
        difficulty: 'Beginner',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="calculator">
        <div class="display">
            <input type="text" id="result" readonly>
        </div>
        <div class="buttons">
            <button class="btn clear" onclick="clearDisplay()">C</button>
            <button class="btn clear" onclick="deleteLast()">⌫</button>
            <button class="btn operator" onclick="appendToDisplay('/')">/</button>
            <button class="btn operator" onclick="appendToDisplay('*')">×</button>
            
            <button class="btn number" onclick="appendToDisplay('7')">7</button>
            <button class="btn number" onclick="appendToDisplay('8')">8</button>
            <button class="btn number" onclick="appendToDisplay('9')">9</button>
            <button class="btn operator" onclick="appendToDisplay('-')">-</button>
            
            <button class="btn number" onclick="appendToDisplay('4')">4</button>
            <button class="btn number" onclick="appendToDisplay('5')">5</button>
            <button class="btn number" onclick="appendToDisplay('6')">6</button>
            <button class="btn operator" onclick="appendToDisplay('+')">+</button>
            
            <button class="btn number" onclick="appendToDisplay('1')">1</button>
            <button class="btn number" onclick="appendToDisplay('2')">2</button>
            <button class="btn number" onclick="appendToDisplay('3')">3</button>
            <button class="btn equals" onclick="calculate()" rowspan="2">=</button>
            
            <button class="btn number zero" onclick="appendToDisplay('0')">0</button>
            <button class="btn number" onclick="appendToDisplay('.')">.</button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
        css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.calculator {
    background: #2c3e50;
    padding: 1.5rem;
    border-radius: 15px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
    width: 300px;
}

.display {
    margin-bottom: 1rem;
}

#result {
    width: 100%;
    height: 60px;
    background: #34495e;
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 1.8rem;
    text-align: right;
    padding: 0 1rem;
    outline: none;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
}

.btn {
    height: 60px;
    border: none;
    border-radius: 8px;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    outline: none;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.btn:active {
    transform: translateY(0);
}

.number {
    background: #95a5a6;
    color: #2c3e50;
}

.number:hover {
    background: #bdc3c7;
}

.operator {
    background: #e67e22;
    color: white;
}

.operator:hover {
    background: #f39c12;
}

.equals {
    background: #27ae60;
    color: white;
    grid-row: span 2;
}

.equals:hover {
    background: #2ecc71;
}

.clear {
    background: #e74c3c;
    color: white;
}

.clear:hover {
    background: #c0392b;
}

.zero {
    grid-column: span 2;
}`,
        javascript: `let display = document.getElementById('result');
let currentInput = '';
let operator = '';
let previousInput = '';

function appendToDisplay(value) {
    if (display.value === '0' && value !== '.') {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = '';
    currentInput = '';
    operator = '';
    previousInput = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Replace × with * for evaluation
        let expression = display.value.replace(/×/g, '*');
        
        // Evaluate the expression
        let result = eval(expression);
        
        // Handle division by zero
        if (!isFinite(result)) {
            display.value = 'Error';
            return;
        }
        
        // Round to avoid floating point precision issues
        result = Math.round(result * 100000000) / 100000000;
        
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    } else if (key === '+' || key === '-') {
        appendToDisplay(key);
    } else if (key === '*') {
        appendToDisplay('×');
    } else if (key === '/') {
        event.preventDefault(); // Prevent browser search
        appendToDisplay('/');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});`
    },
    {
        id: 'form-validation',
        title: 'Form Validation',
        description: 'A contact form with real-time validation and user-friendly error messages.',
        thumbnail: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
        difficulty: 'Intermediate',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <form id="contactForm" class="form">
            <h2>Contact Us</h2>
            
            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" required>
                <span class="error-message" id="nameError"></span>
            </div>
            
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" required>
                <span class="error-message" id="emailError"></span>
            </div>
            
            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" required>
                <span class="error-message" id="phoneError"></span>
            </div>
            
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
                <span class="error-message" id="messageError"></span>
            </div>
            
            <button type="submit" id="submitBtn">Send Message</button>
            
            <div id="successMessage" class="success-message">
                Thank you! Your message has been sent successfully.
            </div>
        </form>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
        css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.container {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
}

.form h2 {
    text-align: center;
    color: #333;
    margin-bottom: 2rem;
    font-size: 2rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    color: #555;
    font-weight: bold;
}

input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    transition: border-color 0.3s;
    outline: none;
}

input:focus, textarea:focus {
    border-color: #667eea;
}

input.valid {
    border-color: #27ae60;
}

input.invalid, textarea.invalid {
    border-color: #e74c3c;
}

.error-message {
    display: block;
    color: #e74c3c;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    min-height: 1.2rem;
}

button {
    width: 100%;
    padding: 1rem;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;
}

button:hover {
    background: #5a6fd8;
}

button:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
}

.success-message {
    display: none;
    background: #d4edda;
    color: #155724;
    padding: 1rem;
    border-radius: 5px;
    margin-top: 1rem;
    text-align: center;
    border: 1px solid #c3e6cb;
}

.success-message.show {
    display: block;
}

textarea {
    resize: vertical;
    min-height: 100px;
}`,
        javascript: `class FormValidator {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.fields = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            phone: document.getElementById('phone'),
            message: document.getElementById('message')
        };
        this.errors = {
            name: document.getElementById('nameError'),
            email: document.getElementById('emailError'),
            phone: document.getElementById('phoneError'),
            message: document.getElementById('messageError')
        };
        this.submitBtn = document.getElementById('submitBtn');
        this.successMessage = document.getElementById('successMessage');
        
        this.init();
    }
    
    init() {
        // Add event listeners for real-time validation
        Object.keys(this.fields).forEach(field => {
            this.fields[field].addEventListener('blur', () => this.validateField(field));
            this.fields[field].addEventListener('input', () => this.clearError(field));
        });
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    validateField(fieldName) {
        const field = this.fields[fieldName];
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Name can only contain letters and spaces';
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
                
            case 'phone':
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
                break;
                
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
        }
        
        this.showError(fieldName, isValid, errorMessage);
        return isValid;
    }
    
    showError(fieldName, isValid, errorMessage) {
        const field = this.fields[fieldName];
        const errorElement = this.errors[fieldName];
        
        if (isValid) {
            field.classList.remove('invalid');
            field.classList.add('valid');
            errorElement.textContent = '';
        } else {
            field.classList.remove('valid');
            field.classList.add('invalid');
            errorElement.textContent = errorMessage;
        }
    }
    
    clearError(fieldName) {
        const field = this.fields[fieldName];
        const errorElement = this.errors[fieldName];
        
        field.classList.remove('invalid', 'valid');
        errorElement.textContent = '';
    }
    
    validateForm() {
        let isFormValid = true;
        
        Object.keys(this.fields).forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });
        
        return isFormValid;
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            this.submitBtn.disabled = true;
            this.submitBtn.textContent = 'Sending...';
            
            // Simulate form submission
            setTimeout(() => {
                this.showSuccess();
                this.resetForm();
            }, 2000);
        }
    }
    
    showSuccess() {
        this.successMessage.classList.add('show');
        setTimeout(() => {
            this.successMessage.classList.remove('show');
        }, 5000);
    }
    
    resetForm() {
        this.form.reset();
        Object.keys(this.fields).forEach(field => {
            this.clearError(field);
        });
        this.submitBtn.disabled = false;
        this.submitBtn.textContent = 'Send Message';
    }
}

// Initialize the form validator
const validator = new FormValidator();`
    },
    {
        id: 'random-generator',
        title: 'Random Number Generator',
        description: 'Generate random numbers within specified ranges with customizable options.',
        thumbnail: 'https://images.pexels.com/photos/269630/pexels-photo-269630.jpeg?auto=compress&cs=tinysrgb&w=400',
        difficulty: 'Beginner',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Random Number Generator</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Random Number Generator</h1>
        
        <div class="controls">
            <div class="input-group">
                <label for="minValue">Minimum Value:</label>
                <input type="number" id="minValue" value="1">
            </div>
            
            <div class="input-group">
                <label for="maxValue">Maximum Value:</label>
                <input type="number" id="maxValue" value="100">
            </div>
            
            <div class="input-group">
                <label for="count">How many numbers:</label>
                <input type="number" id="count" value="1" min="1" max="100">
            </div>
            
            <div class="checkbox-group">
                <label>
                    <input type="checkbox" id="allowDuplicates" checked>
                    Allow duplicates
                </label>
            </div>
        </div>
        
        <button id="generateBtn" class="generate-btn">Generate Random Numbers</button>
        
        <div id="result" class="result"></div>
        
        <div class="history">
            <h3>History</h3>
            <button id="clearHistory" class="clear-btn">Clear History</button>
            <div id="historyList" class="history-list"></div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
        css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.container {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 2rem;
    font-size: 2rem;
}

.controls {
    margin-bottom: 2rem;
}

.input-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    color: #555;
    font-weight: bold;
}

input[type="number"] {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s;
}

input[type="number"]:focus {
    border-color: #667eea;
}

.checkbox-group {
    margin-top: 1rem;
}

.checkbox-group label {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.checkbox-group input[type="checkbox"] {
    margin-right: 0.5rem;
    transform: scale(1.2);
}

.generate-btn {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    margin-bottom: 2rem;
}

.generate-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.generate-btn:active {
    transform: translateY(0);
}

.result {
    background: #f8f9fa;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    margin-bottom: 2rem;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.result.has-numbers {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-color: #667eea;
}

.number-badge {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0.25rem;
    backdrop-filter: blur(10px);
}

.history {
    border-top: 2px solid #e9ecef;
    padding-top: 1.5rem;
}

.history h3 {
    color: #333;
    margin-bottom: 1rem;
    display: inline-block;
}

.clear-btn {
    float: right;
    background: #e74c3c;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
}

.clear-btn:hover {
    background: #c0392b;
}

.history-list {
    max-height: 200px;
    overflow-y: auto;
    clear: both;
    margin-top: 1rem;
}

.history-item {
    background: #f8f9fa;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    border-radius: 5px;
    border-left: 4px solid #667eea;
    font-size: 0.9rem;
}

.history-item .timestamp {
    color: #666;
    font-size: 0.8rem;
    float: right;
}

.empty-message {
    color: #666;
    font-style: italic;
    text-align: center;
    padding: 2rem;
}`,
        javascript: `class RandomNumberGenerator {
    constructor() {
        this.minValue = document.getElementById('minValue');
        this.maxValue = document.getElementById('maxValue');
        this.count = document.getElementById('count');
        this.allowDuplicates = document.getElementById('allowDuplicates');
        this.generateBtn = document.getElementById('generateBtn');
        this.result = document.getElementById('result');
        this.historyList = document.getElementById('historyList');
        this.clearHistory = document.getElementById('clearHistory');
        
        this.history = this.loadHistory();
        this.init();
    }
    
    init() {
        this.generateBtn.addEventListener('click', () => this.generateNumbers());
        this.clearHistory.addEventListener('click', () => this.clearHistoryData());
        
        // Add input validation
        this.minValue.addEventListener('change', () => this.validateInputs());
        this.maxValue.addEventListener('change', () => this.validateInputs());
        this.count.addEventListener('change', () => this.validateInputs());
        
        this.displayHistory();
        this.showEmptyResult();
    }
    
    validateInputs() {
        const min = parseInt(this.minValue.value);
        const max = parseInt(this.maxValue.value);
        const count = parseInt(this.count.value);
        
        if (min >= max) {
            this.maxValue.value = min + 1;
        }
        
        if (!this.allowDuplicates.checked) {
            const range = max - min + 1;
            if (count > range) {
                this.count.value = range;
            }
        }
    }
    
    generateNumbers() {
        this.validateInputs();
        
        const min = parseInt(this.minValue.value);
        const max = parseInt(this.maxValue.value);
        const count = parseInt(this.count.value);
        const allowDuplicates = this.allowDuplicates.checked;
        
        let numbers = [];
        
        if (allowDuplicates) {
            for (let i = 0; i < count; i++) {
                numbers.push(this.getRandomNumber(min, max));
            }
        } else {
            const availableNumbers = [];
            for (let i = min; i <= max; i++) {
                availableNumbers.push(i);
            }
            
            for (let i = 0; i < count && availableNumbers.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * availableNumbers.length);
                numbers.push(availableNumbers.splice(randomIndex, 1)[0]);
            }
        }
        
        this.displayResult(numbers);
        this.addToHistory(numbers, min, max, allowDuplicates);
    }
    
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    displayResult(numbers) {
        this.result.innerHTML = '';
        this.result.classList.add('has-numbers');
        
        numbers.forEach(number => {
            const badge = document.createElement('span');
            badge.className = 'number-badge';
            badge.textContent = number;
            this.result.appendChild(badge);
        });
    }
    
    showEmptyResult() {
        this.result.innerHTML = '<div class="empty-message">Click "Generate" to create random numbers</div>';
        this.result.classList.remove('has-numbers');
    }
    
    addToHistory(numbers, min, max, allowDuplicates) {
        const historyItem = {
            numbers: numbers,
            range: \`\${min} - \${max}\`,
            allowDuplicates: allowDuplicates,
            timestamp: new Date().toLocaleString()
        };
        
        this.history.unshift(historyItem);
        
        // Keep only last 10 items
        if (this.history.length > 10) {
            this.history = this.history.slice(0, 10);
        }
        
        this.saveHistory();
        this.displayHistory();
    }
    
    displayHistory() {
        this.historyList.innerHTML = '';
        
        if (this.history.length === 0) {
            this.historyList.innerHTML = '<div class="empty-message">No history yet</div>';
            return;
        }
        
        this.history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            historyItem.innerHTML = \`
                <div>
                    <strong>Numbers:</strong> \${item.numbers.join(', ')}
                    <span class="timestamp">\${item.timestamp}</span>
                </div>
                <div style="margin-top: 0.25rem; font-size: 0.8rem; color: #666;">
                    Range: \${item.range} | Duplicates: \${item.allowDuplicates ? 'Yes' : 'No'}
                </div>
            \`;
            
            this.historyList.appendChild(historyItem);
        });
    }
    
    clearHistoryData() {
        this.history = [];
        this.saveHistory();
        this.displayHistory();
    }
    
    saveHistory() {
        localStorage.setItem('randomNumberHistory', JSON.stringify(this.history));
    }
    
    loadHistory() {
        const saved = localStorage.getItem('randomNumberHistory');
        return saved ? JSON.parse(saved) : [];
    }
}

// Initialize the generator
const generator = new RandomNumberGenerator();`
    }
]
