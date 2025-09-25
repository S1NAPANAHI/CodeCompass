import React from 'react';
import { Link } from 'react-router-dom';
import { PersonalInfo, Project, Skill } from '../data/portfolio';

interface HomeProps {
  data: {
    personal: PersonalInfo;
    projects: Project[];
    skills: Skill[];
    stats: any;
  };
}

const Home: React.FC<HomeProps> = ({ data }) => {
  const featuredProjects = data.projects.filter(p => p.featured).slice(0, 3);
  const topSkills = data.skills
    .filter(s => s.level === 'expert' || s.level === 'advanced')
    .slice(0, 8);

  return (
    <div className="portfolio-home">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <img
              src={data.personal.avatar}
              alt={data.personal.name}
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-lg"
            />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              {data.personal.name}
            </h1>
            <p className="text-xl sm:text-2xl text-blue-600 dark:text-blue-400 font-medium mb-6">
              {data.personal.title}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              {data.personal.tagline}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/portfolio/projects"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
            >
              View My Work 🚀
            </Link>
            <Link
              to="/portfolio/contact"
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700 transition-colors inline-flex items-center justify-center"
            >
              Get In Touch 💬
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {data.stats.projectsCompleted}+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {data.stats.yearsExperience}+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Years</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {data.stats.technologiesUsed}+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Technologies</div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                About Me 🚀
              </h2>
              <div className="prose prose-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p className="mb-4">
                  {data.personal.bio}
                </p>
                <p className="mb-6">
                  Based in <strong>{data.personal.location}</strong>, I'm passionate about creating 
                  exceptional digital experiences and helping other developers grow through education and 
                  open-source contributions.
                </p>
              </div>
              <Link
                to="/portfolio/about"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Learn more about my journey →
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {data.personal.interests.slice(0, 6).map((interest, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center"
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {interest}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects 💻
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A selection of my recent work and contributions
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <Link
                key={project.id}
                to={`/portfolio/projects/${project.id}`}
                className="group block"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-200 group-hover:border-blue-300 dark:group-hover:border-blue-600">
                  <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}>
                        {project.status === 'completed' ? '✅ Completed' :
                         project.status === 'in-progress' ? '🚧 In Progress' :
                         '📅 Planning'}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                          +{project.techStack.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                        View Details →
                      </span>
                      {project.liveUrl && (
                        <span className="text-gray-500 dark:text-gray-400">
                          🌐 Live Demo
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/portfolio/projects"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View All Projects 🗂
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Skills 🛠️
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Technologies and tools I work with
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {topSkills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="text-2xl mb-2">{skill.icon}</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  {skill.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {skill.years} years
                </div>
                <div className={`text-xs font-medium mt-1 ${
                  skill.level === 'expert' ? 'text-green-600 dark:text-green-400' :
                  skill.level === 'advanced' ? 'text-blue-600 dark:text-blue-400' :
                  skill.level === 'intermediate' ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-gray-500 dark:text-gray-400'
                }`}>
                  {skill.level}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/portfolio/skills"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              View All Skills →
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Let's Work Together! 🤝
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            I'm currently {data.availability?.status.toLowerCase() || 'open to new opportunities'}. 
            Let's discuss how we can bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/portfolio/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Contact Me 📧
            </Link>
            <a
              href={data.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              View GitHub 📚
            </a>
          </div>
        </div>
      </section>

      {/* Current Focus */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Current Focus 🎯
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.currentFocus?.map((focus, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {focus}
                </div>
              </div>
            )) || []}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;