import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../data/portfolio';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../../packages/ui/src/Card';
import { Button } from '../../../../packages/ui/src/Button';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique categories and statuses
  const categories = ['all', ...new Set(projects.map(p => p.category))];
  const statuses = ['all', ...new Set(projects.map(p => p.status))];

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
      const matchesSearch = !searchQuery || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [projects, selectedCategory, selectedStatus, searchQuery]);

  // Sort: featured first, then by status
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    if (a.status !== b.status) {
      const statusOrder = { 'in-progress': 0, 'completed': 1, 'planning': 2 };
      return statusOrder[a.status] - statusOrder[b.status];
    }
    return 0;
  });

  const getStatusBadge = (status: string) => {
    const badges = {
      'completed': { class: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', icon: '✅', text: 'Completed' },
      'in-progress': { class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', icon: '🚧', text: 'In Progress' },
      'planning': { class: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200', icon: '📅', text: 'Planning' }
    };
    return badges[status as keyof typeof badges] || badges.planning;
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'fullstack': '🌐',
      'frontend': '🎨',
      'backend': '🔧',
      'mobile': '📱',
      'tool': '🛠️'
    };
    return icons[category as keyof typeof icons] || '💻';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          💻 My Projects
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          A collection of my development projects, from web applications to creative tools.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects by name, description, or technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute left-3 top-3.5 text-gray-400">
            🔍
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Statuses' : status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            Showing {sortedProjects.length} of {projects.length} projects
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {sortedProjects.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {sortedProjects.map((project) => {
            const statusBadge = getStatusBadge(project.status);
            const categoryIcon = getCategoryIcon(project.category);
            
            return (
              <Card key={project.id} className="group hover:shadow-xl transition-all duration-300">
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                      ⭐ Featured
                    </div>
                  )}
                  
                  {/* Status badge */}
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${statusBadge.class}`}>
                    {statusBadge.icon} {statusBadge.text}
                  </div>
                </div>
                
                <div className="p-6">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {categoryIcon} {project.title}
                      </CardTitle>
                    </div>
                    <CardDescription>
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Tech Stack */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 4).map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                            +{project.techStack.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Project Links */}
                    <div className="flex space-x-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button variant="default" className="w-full" size="sm">
                            🌐 Live Demo
                          </Button>
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={project.liveUrl ? "flex-1" : "w-full"}
                      >
                        <Button variant="outline" className="w-full" size="sm">
                          📚 GitHub
                        </Button>
                      </a>
                    </div>
                    
                    {/* View Details */}
                    <div className="mt-4">
                      <Link to={`/portfolio/projects/${project.id}`}>
                        <Button variant="ghost" className="w-full text-blue-600 dark:text-blue-400">
                          View Details →
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* No Results */
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search terms or filters.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Project Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card padding="sm" className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            {projects.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Projects</div>
        </Card>
        
        <Card padding="sm" className="text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
            {projects.filter(p => p.status === 'completed').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
        </Card>
        
        <Card padding="sm" className="text-center">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
            {projects.filter(p => p.status === 'in-progress').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
        </Card>
        
        <Card padding="sm" className="text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
            {new Set(projects.flatMap(p => p.techStack)).size}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
        </Card>
      </div>

      {/* Technology Cloud */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>🛠️ Technologies Used Across Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(projects.flatMap(p => p.techStack)))
                .sort()
                .map((tech, index) => {
                  const count = projects.filter(p => p.techStack.includes(tech)).length;
                  return (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors hover:scale-105 ${
                        count >= 3 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        count >= 2 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}
                      title={`Used in ${count} project${count !== 1 ? 's' : ''}`}
                    >
                      {tech}
                      {count > 1 && <span className="ml-1 text-xs opacity-75">×{count}</span>}
                    </span>
                  );
                })
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="py-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Interested in working together?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I'm always excited to take on new challenges and build amazing things.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/portfolio/contact">
                <Button variant="default" size="lg">
                  📧 Contact Me
                </Button>
              </Link>
              <a
                href="https://github.com/S1NAPANAHI"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  📚 View GitHub
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Projects;