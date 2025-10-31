import React, { createContext, useContext, useReducer } from 'react';

const GlobalContext = createContext();

const initialState = {
  theme: "light",
  tasks : [
    { id: 1, title: "Read Books", completed: false },
    { id: 2, title: "Play Games", completed: true },
    { id: 3, title: "Complete React Project", completed: false },
    { id: 4, title: "Go for Morning Walk", completed: true },
    { id: 5, title: "Prepare for Exam", completed: false },
    { id: 6, title: "Buy Groceries", completed: true },
    { id: 7, title: "Clean the Room", completed: false },
    { id: 8, title: "Watch a Tutorial", completed: false },
    { id: 9, title: "Call a Friend", completed: true },
    { id: 10, title: "Write Blog Post", completed: false },
    { id: 11, title: "Practice DSA Problems", completed: true },
    { id: 12, title: "Cook Dinner", completed: false },
    { id: 13, title: "Review Code Changes", completed: true },
    { id: 14, title: "Plan Weekend Trip", completed: false },
    { id: 15, title: "Meditate for 10 mins", completed: true },
  ]
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case "EDIT_TASK" :
        return {
            ...state,
            tasks: state.tasks.map((task) => 
                task.id === action.payload.id 
                ? {...task , title : action.payload.newTitle}
                : task
            ),
        };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value = {{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);