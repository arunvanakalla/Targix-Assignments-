# 📝 Task Tracker

A modern, responsive task management application built with React and styled-components. Demonstrates advanced state management using Context API and showcases dynamic styling with themed components.

![React](https://img.shields.io/badge/React-19.2.0-blue.svg)
![styled-components](https://img.shields.io/badge/styled--components-6.1.19-pink.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- **Task Management**: Add, edit, delete, and toggle task completion status
- **Filter & View**: Filter tasks by All, Completed, or Pending
- **Progress Tracking**: Visual progress bar showing completion percentage
- **Statistics Dashboard**: Real-time stats for total, completed, and pending tasks
- **Theme Switching**: Toggle between light and dark themes with smooth transitions
- **Modern UI**: Beautiful, responsive design with hover effects and animations
- **State Management**: Centralized state management using React Context API with useReducer

## 🚀 Tech Stack

- **React** (19.2.0) - UI library
- **styled-components** (6.1.19) - CSS-in-JS styling
- **Context API** - State management
- **React Hooks** - Functional components and state

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/task-tracker.git
cd task-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Usage

### Adding a Task
1. Enter a unique task ID and title in the "Add Task" section
2. Click "Add Task" button

### Managing Tasks
- **Mark Complete**: Click "Mark Completed" button to toggle task status
- **Edit**: Click "Edit" button, modify the title, and save
- **Delete**: Click "Delete" button and confirm the action
- **Filter**: Use tabs to filter tasks by status (All/Completed/Pending)

### Theme Switching
- Toggle between light and dark themes using the theme switcher in the header

## 📁 Project Structure

```
task-tracker/
├── public/
│   ├── checklist.svg       # App logo
│   └── ...
├── src/
│   ├── components/
│   │   ├── AddTaskForm.jsx    # Task creation form
│   │   ├── TaskList.jsx        # Task list with filtering
│   │   └── TaskSummary.jsx     # Progress summary component
│   ├── context/
│   │   └── GlobalContext.jsx   # Global state management
│   ├── styles/
│   │   ├── Styled.js           # styled-components definitions
│   │   └── Theme.js             # Theme configurations
│   ├── App.js                   # Main application component
│   └── index.js                 # Entry point
├── package.json
└── README.md
```

## 🎨 Key Features

### State Management
- Global state using Context API with useReducer pattern
- Actions: `ADD_TASK`, `DELETE_TASK`, `EDIT_TASK`, `TOGGLE_TASK`, `TOGGLE_THEME`
- Centralized state accessible across all components

### Styled Components
- Themed components with light/dark mode support
- Dynamic styling based on state changes
- Responsive design with mobile-first approach
- Smooth animations and hover effects

### UI Components
- **Hero Header**: Branded header with theme toggle
- **Stat Cards**: Dashboard showing task statistics
- **Progress Bar**: Visual representation of completion percentage
- **Task Cards**: Interactive task items with status badges
- **Tabs**: Filter navigation with active state indicators

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📝 State Structure

```javascript
{
  theme: "light" | "dark",
  tasks: [
    {
      id: number,
      title: string,
      completed: boolean
    }
  ]
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Built with [Create React App](https://github.com/facebook/create-react-app)
- Styling powered by [styled-components](https://styled-components.com/)
- Icons and assets created for this project

---

⭐ If you like this project, please give it a star on GitHub!
