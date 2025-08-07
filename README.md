# CodeCompass 🧭

## Vision

CodeCompass helps beginners learn full-stack development by reverse-engineering sites they admire.

Our mission is to bridge the gap between inspiration and implementation, empowering aspiring developers to understand how their favorite websites work by providing tools to analyze, break down, and learn from real-world web applications.

## Core Features

### 🔍 **Site Analysis**
- Extract and analyze the structure of any website
- Identify key components, layouts, and design patterns
- Generate interactive breakdowns of HTML structure and CSS styles

### 🎨 **Design Deconstruction**
- Visual component identification and isolation
- Color palette extraction and analysis
- Typography and spacing analysis
- Responsive design pattern recognition

### 🛠️ **Code Generation**
- Generate React components based on analyzed designs
- Create TypeScript interfaces for data structures
- Provide Tailwind CSS classes for styling recreation
- Export clean, production-ready code snippets

### 📚 **Learning Modules**
- Step-by-step tutorials for recreating analyzed components
- Interactive coding challenges based on real websites
- Best practices and modern development patterns
- Progress tracking and skill assessment

### 🔗 **GitHub Integration**
- Save analyzed sites to your GitHub repositories
- Version control for your learning projects
- Share discoveries with the community
- Collaborate on reverse-engineering projects

## Tech Stack Overview

### Frontend
- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe JavaScript for better development experience
- **Tailwind CSS 4** - Utility-first CSS framework for rapid styling
- **Vite** - Fast build tool and development server
- **Octokit** - GitHub API integration

### Backend
- **Node.js** - JavaScript runtime environment
- **Express 5** - Web application framework
- **TypeScript** - Type-safe server-side development
- **CORS** - Cross-origin resource sharing middleware
- **dotenv** - Environment variable management

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **Nodemon** - Development server auto-restart

## Local Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git for version control

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/codecompass.git
   cd codecompass
   ```

2. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit `http://localhost:5173` to see the application

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the backend directory:
   ```env
   PORT=3001
   GITHUB_TOKEN=your_github_personal_access_token
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   node index.js
   ```

5. **Verify the server**
   Visit `http://localhost:3001` to confirm the server is running

### Full Stack Development

To run both frontend and backend simultaneously:

1. **Terminal 1 - Backend**
   ```bash
   cd backend
   npm run dev
   ```

2. **Terminal 2 - Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` and will proxy API requests to the backend at `http://localhost:3001`.

## Planned Roadmap

### Phase 1: Core Foundation ✅
- [x] Basic project structure
- [x] React + TypeScript frontend setup
- [x] Express backend with GitHub integration
- [x] Initial UI components (Navbar, Hero)

### Phase 2: Analysis Engine (Q1 2025)
- [ ] Website scraping and analysis tools
- [ ] Component detection algorithms
- [ ] CSS extraction and parsing
- [ ] Basic visual breakdown features

### Phase 3: Code Generation (Q2 2025)
- [ ] React component code generation
- [ ] TypeScript interface generation
- [ ] Tailwind CSS class mapping
- [ ] Export functionality for generated code

### Phase 4: Learning Platform (Q3 2025)
- [ ] Interactive tutorials and challenges
- [ ] Progress tracking system
- [ ] Community features and sharing
- [ ] Advanced analysis tools

### Phase 5: Advanced Features (Q4 2025)
- [ ] AI-powered design suggestions
- [ ] Advanced responsive analysis
- [ ] Performance optimization insights
- [ ] Browser extension for instant analysis

## Contributing Guidelines

We welcome contributions from developers of all skill levels! Here's how you can help:

### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a new branch** for your feature or bug fix
4. **Make your changes** following our coding standards
5. **Test your changes** thoroughly
6. **Submit a pull request** with a clear description

### Development Standards

- **Code Style**: Follow the existing ESLint configuration
- **TypeScript**: Use proper typing throughout the codebase
- **Components**: Keep React components focused and reusable
- **Commits**: Write clear, descriptive commit messages
- **Testing**: Add tests for new features (coming soon)

### Areas for Contribution

- 🐛 **Bug Fixes**: Help identify and fix issues
- ✨ **New Features**: Implement items from our roadmap
- 📝 **Documentation**: Improve README, add code comments
- 🎨 **UI/UX**: Enhance the user interface and experience
- 🔧 **DevOps**: Improve build processes and deployment
- 🧪 **Testing**: Add unit and integration tests

### Reporting Issues

If you find a bug or have a feature request:

1. **Check existing issues** to avoid duplicates
2. **Use issue templates** when available
3. **Provide clear reproduction steps** for bugs
4. **Include relevant screenshots** for UI issues

### Code of Conduct

- Be respectful and inclusive
- Help maintain a welcoming environment
- Focus on constructive feedback
- Celebrate diverse perspectives and contributions

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 **Email**: support@codecompass.dev
- 💬 **Discord**: Join our community server
- 🐛 **Issues**: Create an issue on GitHub
- 📖 **Docs**: Check our documentation site

---

**Happy coding and reverse engineering! 🚀**

*CodeCompass - Where inspiration meets implementation*
