# CodeCompass Platform 🧭

**Navigate your way to full-stack mastery through an integrated development platform**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-👉%20Try%20Now-blue?style=for-the-badge)](https://codecompass.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/S1NAPANAHI/CodeCompass?style=flat-square)](https://github.com/S1NAPANAHI/CodeCompass/stargazers)

## 🌟 What is CodeCompass?

CodeCompass is a **unified development platform** that combines three powerful tools to accelerate your journey as a full-stack developer:

### 🔍 **CodeCompass** - Site Analysis Tool
Reverse-engineer websites and extract design patterns, components, and code structure.
- Extract and analyze website structure
- Identify key components and design patterns  
- Generate React components from designs
- Interactive tutorials and learning modules
- GitHub integration for project management

### 📚 **Interview Prep** - React & Next.js Preparation Hub
Master technical interviews with comprehensive preparation tools.
- **150+ Interview Questions** with spaced repetition
- **Top 20 Most Common Questions** with detailed explanations
- **Coding Challenges** with progressive difficulty
- **4-Week Study Roadmap** with structured learning
- **Analytics Dashboard** for progress tracking
- **Smart Flashcard System** with AI-powered review scheduling

### 💼 **Portfolio** - Professional Showcase
Dynamic portfolio showcasing your projects and skills.
- **Project Showcase** with live demos and GitHub integration
- **Interactive Skills Matrix** with proficiency levels
- **Professional Timeline** of your development journey
- **Contact Integration** with form and social links
- **Achievement Gallery** for certifications and awards

## ✨ Key Features

### 🚀 **Unified Experience**
- **Single Sign-On**: One account across all tools
- **Shared Progress**: Cross-platform learning analytics
- **Consistent Design**: Unified dark/light theme system
- **Real-time Sync**: Progress syncs across devices

### 🎯 **Learning Pathways**
1. **Analyze** websites with CodeCompass to understand patterns
2. **Prepare** for interviews with comprehensive practice
3. **Showcase** your skills through your professional portfolio
4. **Track** progress across all learning activities

### 🛠️ **Modern Tech Stack**
- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Node.js + Express
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (Frontend) + Railway (Backend)
- **Architecture**: Monorepo with shared packages

## 🚀 Quick Start

### 🌐 **Try Online** (Recommended)
**[👉 Launch CodeCompass Platform](https://codecompass.dev)**

No setup required! Create an account to unlock all features.

### 💻 **Local Development**

```bash
# Clone the repository
git clone https://github.com/S1NAPANAHI/CodeCompass.git
cd CodeCompass

# Install dependencies for all packages
npm run setup:dev

# Start the development servers
npm run dev

# Or run individual apps
npm run dev:codecompass    # Site analysis tool
npm run dev:portfolio      # Portfolio showcase  
npm run dev:interview-prep # Interview preparation
```

### 🗄️ **Database Setup**

1. **Create Supabase Project**: [supabase.com](https://supabase.com)
2. **Run Migrations**: Execute SQL files in `packages/database/migrations/`
3. **Update Config**: Add your Supabase credentials to environment variables
4. **Seed Data**: `npm run seed:db`

## 📁 Project Structure

```
CodeCompass/
├── apps/
│   ├── codecompass/         # 🔍 Site analysis application
│   ├── portfolio/           # 💼 Portfolio showcase
│   └── interview-prep/      # 📚 Interview preparation platform
├── packages/
│   ├── ui/                  # 🎨 Shared UI components
│   ├── utils/               # 🛠️ Shared utilities & helpers
│   └── database/            # 🗄️ Supabase schema & migrations
├── src/                     # 🏠 Main application shell
│   ├── components/          # Shared layout components
│   ├── pages/               # Main platform pages
│   └── lib/                 # Platform configuration
├── backend/                 # 🔙 Express API server
└── frontend/                # ⚡ Original Vite frontend (to be migrated)
```

## 🎯 How to Use Each Tool

### 🔍 **CodeCompass - Site Analysis**
1. **Enter URL** of any website you want to analyze
2. **Extract Components** - Get React component structure  
3. **Analyze Design** - Color palettes, typography, layouts
4. **Generate Code** - Export TypeScript/React components
5. **Save Projects** - Version control with GitHub integration

### 📚 **Interview Prep - Study Strategy**

**🔥 24-Hour Crash Course**
- **Phase 1 (8h)**: Top 20 Questions + React Fundamentals + Hooks
- **Phase 2 (4h)**: Coding Challenges + Next.js Basics  
- **Phase 3 (4h)**: Spaced Repetition Review + Mock Interviews

**📅 4-Week Complete Prep**
- **Week 1-2**: React mastery with analytics-driven focus
- **Week 3**: Next.js and JavaScript fundamentals
- **Week 4**: System design and comprehensive review

### 💼 **Portfolio - Professional Showcase**
1. **Project Gallery** - Showcase your best work with live demos
2. **Skills Matrix** - Interactive visualization of your technical skills
3. **Professional Story** - About section with your development journey
4. **Contact Integration** - Multiple ways for employers to reach you
5. **GitHub Integration** - Live repository stats and contributions

## 🎨 Unified Design System

### 🌓 **Theming**
- **Auto-detection**: Matches system preference
- **Manual Toggle**: Switch between light/dark modes
- **Consistent Colors**: Shared palette across all apps
- **Accessibility**: WCAG 2.1 AA compliant

### 🎨 **Components**
- **Design Tokens**: Consistent spacing, colors, typography
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Screen reader and keyboard navigation support
- **Animation**: Smooth transitions and micro-interactions

## 📊 Analytics & Progress Tracking

### 📈 **Cross-Platform Metrics**
- **Learning Streaks**: Daily study activity across all tools
- **Skill Progress**: Track improvement in different areas
- **Time Analytics**: Understand your learning patterns
- **Achievement System**: Unlock badges and milestones

### 🎯 **Personalized Insights**
- **Weakness Detection**: AI identifies areas needing focus
- **Study Recommendations**: Personalized learning paths
- **Interview Readiness**: Assessment of your preparation level
- **Progress Reports**: Weekly/monthly learning summaries

## 🚀 Deployment

### 🌐 **Production Deployment**

**Frontend (Vercel)**
```bash
# Deploy main platform
vercel --prod

# Deploy individual apps
cd apps/codecompass && vercel --prod
cd apps/portfolio && vercel --prod  
cd apps/interview-prep && vercel --prod
```

**Backend (Railway)**
```bash
cd backend
railway deploy
```

### 🔧 **Environment Configuration**

```bash
# Platform
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=your_backend_url

# Backend
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GITHUB_TOKEN=your_github_token
PORT=3001
```

## 🛣️ Roadmap

### 🔜 **Phase 1 (Q1 2025)** - Core Platform
- [x] ✅ Unified project structure
- [x] ✅ Shared component system  
- [x] ✅ Cross-app navigation
- [ ] 🚧 Interview prep React migration
- [ ] 🚧 Portfolio dynamic content
- [ ] 🚧 Enhanced site analysis

### 🚀 **Phase 2 (Q2 2025)** - Advanced Features  
- [ ] 📱 Mobile applications (React Native)
- [ ] 🤖 AI-powered code generation
- [ ] 👥 Collaborative features
- [ ] 🎥 Video tutorial integration
- [ ] 📊 Advanced analytics dashboard

### 🌟 **Phase 3 (Q3 2025)** - Platform Expansion
- [ ] 🏢 Company-specific interview prep
- [ ] 🎓 Learning path certifications
- [ ] 🌍 Multi-language support
- [ ] 🔗 Third-party integrations
- [ ] 📈 Marketplace for templates

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 **Ways to Contribute**
- **Add Interview Questions** - Share questions from your experiences
- **Improve Site Analysis** - Enhance component detection algorithms
- **Create Portfolio Templates** - Design new portfolio layouts
- **Fix Bugs** - Help us squash issues
- **Write Documentation** - Improve guides and tutorials
- **Add Features** - Implement items from our roadmap

### 🛠️ **Development Workflow**
```bash
# Fork and clone
git clone https://github.com/yourusername/CodeCompass.git

# Create feature branch
git checkout -b feature/your-feature-name

# Set up development environment
npm run setup:dev

# Make changes and test
npm run dev
npm run test
npm run lint

# Commit and push
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name

# Create Pull Request
```

## 📞 Support & Community

### 🆘 **Get Help**
- **🐛 Issues**: [GitHub Issues](https://github.com/S1NAPANAHI/CodeCompass/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/S1NAPANAHI/CodeCompass/discussions)  
- **📧 Email**: [hello@codecompass.dev](mailto:hello@codecompass.dev)
- **🐦 Twitter**: [@CodeCompassDev](https://twitter.com/CodeCompassDev)

### 💝 **Support the Project**
- ⭐ **Star this repository** if it helped you!
- 🔗 **Share** with fellow developers
- 💖 **Sponsor** to support ongoing development
- 📝 **Write a review** about your experience

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Supabase Team** - For the incredible backend platform
- **Next.js Team** - For pushing React development forward  
- **Open Source Community** - For inspiration and continuous learning
- **All Contributors** - Thank you for making this platform better!

---

<div align="center">

**⭐ Star this repository if it helped accelerate your development journey!**

*Built with ❤️ for the developer community*

**Ready to master full-stack development? [Start your journey now!](https://codecompass.dev) 🚀**

</div>