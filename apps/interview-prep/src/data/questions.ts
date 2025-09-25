import { Question, QuestionSection, TopQuestion, CodingChallenge } from '../types';

// Core React Questions (Top 20)
export const coreReactQuestions: Question[] = [
  {
    id: 'react-1',
    question: 'What is React and why would you use it?',
    difficulty: 'Beginner',
    category: 'React Fundamentals',
    answer: 'React is a JavaScript library developed by Facebook for building user interfaces, particularly single-page applications. It uses a component-based architecture, Virtual DOM for efficient updates, and follows a declarative programming paradigm. Key benefits include reusable components, better performance through Virtual DOM, strong community support, and excellent developer tools.',
    keyPoints: [
      'Virtual DOM for performance optimization',
      'Component-based architecture for reusability',
      'Strong ecosystem and community support',
      'Backed by Meta (Facebook) with regular updates',
      'Declarative programming paradigm',
      'Great developer tools and debugging support'
    ],
    codeExample: `function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Usage
<Welcome name="World" />`,
    followUpQuestions: [
      'How does React differ from vanilla JavaScript?',
      'What are the main benefits of using React?',
      'Can you provide a simple React component example?'
    ],
    tags: ['fundamentals', 'introduction', 'virtual-dom']
  },
  {
    id: 'react-2',
    question: 'What is JSX and how does it work?',
    difficulty: 'Beginner',
    category: 'React Fundamentals',
    answer: 'JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript. It makes React components more readable and easier to write. JSX gets transpiled by tools like Babel into React.createElement() calls.',
    keyPoints: [
      'Syntax extension for JavaScript',
      'HTML-like syntax within JS files',
      'Transpiled to React.createElement calls',
      'Supports JavaScript expressions with {}',
      'Must return single parent element',
      'Uses camelCase for HTML attributes'
    ],
    codeExample: `// JSX
const element = <h1>Hello, world!</h1>;

// Transpiled to:
const element = React.createElement('h1', null, 'Hello, world!');

// With expressions
const name = 'John';
const element = <h1>Hello, {name}!</h1>;`,
    followUpQuestions: [
      'How does JSX differ from HTML?',
      'What are JSX expressions and how do you use them?',
      'Can you use if statements directly in JSX?'
    ],
    tags: ['jsx', 'syntax', 'transpilation']
  },
  {
    id: 'react-3',
    question: 'What is the Virtual DOM and how does it work?',
    difficulty: 'Intermediate',
    category: 'React Fundamentals',
    answer: 'The Virtual DOM is a JavaScript representation of the real DOM kept in memory. React uses it to optimize rendering by comparing the virtual representation with the previous version (diffing) and only updating the parts that changed (reconciliation). This minimizes expensive DOM operations.',
    keyPoints: [
      'JavaScript representation of the real DOM',
      'Enables efficient diffing algorithm',
      'Minimizes expensive DOM manipulations',
      'Improves performance significantly',
      'Allows React to batch updates',
      'Enables predictable state management'
    ],
    codeExample: `// React creates virtual DOM nodes like this
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};

// Which represents this HTML
// <h1 class="greeting">Hello, world!</h1>`,
    followUpQuestions: [
      'How does the diffing algorithm work?',
      'What is reconciliation in React?',
      'Why is Virtual DOM faster than direct DOM manipulation?'
    ],
    tags: ['virtual-dom', 'performance', 'reconciliation']
  },
  {
    id: 'react-4',
    question: 'What are React components and how do you create them?',
    difficulty: 'Beginner',
    category: 'React Fundamentals',
    answer: 'React components are reusable pieces of UI that can be either functional or class-based. They accept props as input and return JSX describing what should appear on screen. Modern React favors functional components with hooks.',
    keyPoints: [
      'Building blocks of React applications',
      'Can be functional or class-based',
      'Accept props and return JSX',
      'Promote code reusability and modularity',
      'Can manage their own state',
      'Follow single responsibility principle'
    ],
    codeExample: `// Functional Component (Modern)
function Button({ text, onClick }) {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
}

// Class Component (Legacy)
class Button extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick}>
        {this.props.text}
      </button>
    );
  }
}`,
    followUpQuestions: [
      'What\'s the difference between functional and class components?',
      'How do you pass data between components?',
      'What are component lifecycle methods?'
    ],
    tags: ['components', 'functional', 'class', 'props']
  },
  {
    id: 'react-5',
    question: 'What is the difference between props and state?',
    difficulty: 'Beginner',
    category: 'React Fundamentals',
    answer: 'Props (properties) are read-only data passed from parent to child components, while state is mutable data that belongs to a component and can be changed over time. Props flow down the component tree, while state is managed within the component.',
    keyPoints: [
      'Props are read-only and passed from parent',
      'State is mutable and owned by component',
      'Props flow down, events flow up',
      'State changes trigger re-renders',
      'Props make components reusable',
      'State makes components interactive'
    ],
    codeExample: `function UserProfile({ name, age }) { // props
  const [isVisible, setIsVisible] = useState(true); // state
  
  return (
    <div>
      {isVisible && (
        <div>
          <h2>{name}</h2>
          <p>Age: {age}</p>
          <button onClick={() => setIsVisible(false)}>
            Hide
          </button>
        </div>
      )}
    </div>
  );
}`,
    followUpQuestions: [
      'Can you modify props inside a component?',
      'How do you pass functions as props?',
      'What happens when state changes?'
    ],
    tags: ['props', 'state', 'data-flow']
  }
];

// React Hooks Questions
export const hooksQuestions: Question[] = [
  {
    id: 'hooks-1',
    question: 'What is useState hook and how does it work?',
    difficulty: 'Beginner',
    category: 'React Hooks',
    answer: 'useState is a React Hook that lets you add state variables to functional components. It returns an array with two elements: the current state value and a function to update it. When state changes, the component re-renders.',
    keyPoints: [
      'Adds state to functional components',
      'Returns [value, setter] array',
      'Triggers re-renders on state change',
      'Supports functional updates',
      'Can have multiple useState calls',
      'State updates are asynchronous'
    ],
    codeExample: `function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(count - 1);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}`,
    followUpQuestions: [
      'What are the rules of hooks?',
      'How do you update state based on previous state?',
      'Can you have multiple useState calls in one component?'
    ],
    tags: ['hooks', 'state', 'functional-components']
  },
  {
    id: 'hooks-2',
    question: 'What is useEffect hook and when do you use it?',
    difficulty: 'Intermediate',
    category: 'React Hooks',
    answer: 'useEffect is a React Hook that lets you perform side effects in functional components. It combines componentDidMount, componentDidUpdate, and componentWillUnmount. Use it for data fetching, subscriptions, timers, or manually changing the DOM.',
    keyPoints: [
      'Handles side effects in functional components',
      'Runs after every render by default',
      'Can be controlled with dependency array',
      'Cleanup function prevents memory leaks',
      'Replaces multiple lifecycle methods',
      'Supports conditional execution'
    ],
    codeExample: `function DataFetcher({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let cancelled = false;
    
    fetch(\`/api/users/\${userId}\`)
      .then(response => response.json())
      .then(userData => {
        if (!cancelled) {
          setUser(userData);
          setLoading(false);
        }
      });
    
    return () => { cancelled = true; };
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}`,
    followUpQuestions: [
      'What is the dependency array and why is it important?',
      'When does the cleanup function run?',
      'How do you prevent infinite loops in useEffect?'
    ],
    tags: ['hooks', 'side-effects', 'lifecycle']
  },
  {
    id: 'hooks-3',
    question: 'What are custom hooks and how do you create them?',
    difficulty: 'Intermediate',
    category: 'React Hooks',
    answer: 'Custom hooks are JavaScript functions that use other hooks and allow you to extract component logic into reusable functions. They must start with \'use\' and can call other hooks. They help share stateful logic between components.',
    keyPoints: [
      'Functions that use other hooks',
      'Must start with \'use\' prefix',
      'Share stateful logic between components',
      'Follow all rules of hooks',
      'Can return any value or object',
      'Enable logic reusability'
    ],
    codeExample: `// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}`,
    followUpQuestions: [
      'What are the rules for creating custom hooks?',
      'How do you test custom hooks?',
      'Can custom hooks have their own state?'
    ],
    tags: ['hooks', 'custom-hooks', 'reusability']
  }
];

// Coding Challenges
export const codingChallenges: CodingChallenge[] = [
  {
    id: 'challenge-1',
    title: 'Counter Component with Hooks',
    difficulty: 'Easy',
    category: 'React Hooks',
    description: 'Build a counter component that can increment, decrement, and reset to zero using React hooks.',
    requirements: [
      'Use useState hook for state management',
      'Implement increment, decrement, and reset functionality',
      'Display current count value',
      'Handle negative numbers properly',
      'Add keyboard shortcuts (optional)'
    ],
    solution: `function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);
  
  // Optional: Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === '+') increment();
      if (e.key === '-') decrement();
      if (e.key === 'r') reset();
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
  
  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <div className="controls">
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}`,
    explanation: 'This solution uses useState to manage the counter state and provides three functions for state updates. The optional keyboard shortcuts are added using useEffect with event listeners.',
    timeLimit: 15,
    tags: ['hooks', 'useState', 'event-handling', 'beginner']
  },
  {
    id: 'challenge-2',
    title: 'Todo List with Local Storage',
    difficulty: 'Medium',
    category: 'State Management',
    description: 'Create a todo list component that persists data in localStorage and includes add, toggle, and delete functionality.',
    requirements: [
      'Use useState for todos state',
      'Implement useEffect for localStorage sync',
      'Add, toggle, and delete functionality',
      'Persist data across browser sessions',
      'Handle edge cases (empty input, etc.)'
    ],
    solution: `function TodoList() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: input.trim(),
        completed: false
      }]);
      setInput('');
    }
  };
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <div>
      <div className="input-section">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggleTodo(todo.id)}>
              {todo.completed ? '✅' : '⭕'} {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    explanation: 'This solution demonstrates state management, localStorage integration, and common todo operations. The useState initializer function ensures data persistence.',
    timeLimit: 30,
    tags: ['state-management', 'localStorage', 'useEffect', 'intermediate']
  }
];

// Question Sections Configuration
export const questionSections: QuestionSection[] = [
  {
    id: 'react-fundamentals',
    title: 'React Fundamentals',
    description: 'Core React concepts every developer should know',
    questions: coreReactQuestions,
    icon: '⚛️'
  },
  {
    id: 'react-hooks',
    title: 'React Hooks',
    description: 'Modern React with hooks - useState, useEffect, and custom hooks',
    questions: hooksQuestions,
    icon: '🎣'
  },
  {
    id: 'challenges',
    title: 'Coding Challenges',
    description: 'Practice building React components with hands-on challenges',
    questions: codingChallenges.map(challenge => ({
      id: challenge.id,
      question: challenge.title,
      difficulty: challenge.difficulty as 'Beginner' | 'Intermediate' | 'Advanced',
      category: challenge.category,
      answer: challenge.explanation,
      keyPoints: challenge.requirements,
      codeExample: challenge.solution,
      tags: challenge.tags
    })),
    icon: '💻'
  }
];

// Top 20 Most Important Questions
export const top20Questions: TopQuestion[] = [
  ...coreReactQuestions.map(q => ({
    ...q,
    importance: 'High' as const,
    frequency: 95,
    companies: ['Meta', 'Google', 'Netflix', 'Airbnb', 'Uber']
  })),
  ...hooksQuestions.map(q => ({
    ...q,
    importance: 'High' as const,
    frequency: 85,
    companies: ['Meta', 'Google', 'Microsoft', 'Amazon']
  }))
].slice(0, 20);

// Combined questions data
export const questionsData = {
  sections: questionSections,
  allQuestions: [...coreReactQuestions, ...hooksQuestions],
  top20: top20Questions,
  challenges: codingChallenges,
  categories: ['React Fundamentals', 'React Hooks', 'State Management', 'Performance', 'Testing'],
  difficulties: ['Beginner', 'Intermediate', 'Advanced']
};

export default questionsData;