"use client"

import { createContext, useContext, useReducer, useEffect } from "react"

const AppContext = createContext()

const initialState = {
  employees: [],
  bookmarks: [],
  loading: false,
  error: null,
  searchTerm: "",
  selectedDepartments: [],
  selectedRatings: [],
}

function appReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false }
    case "SET_EMPLOYEES":
      return { ...state, employees: action.payload, loading: false }
    case "ADD_BOOKMARK":
      const newBookmarks = [...state.bookmarks, action.payload]
      localStorage.setItem("hr-bookmarks", JSON.stringify(newBookmarks))
      return { ...state, bookmarks: newBookmarks }
    case "REMOVE_BOOKMARK":
      const filteredBookmarks = state.bookmarks.filter((id) => id !== action.payload)
      localStorage.setItem("hr-bookmarks", JSON.stringify(filteredBookmarks))
      return { ...state, bookmarks: filteredBookmarks }
    case "SET_BOOKMARKS":
      return { ...state, bookmarks: action.payload }
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload }
    case "SET_SELECTED_DEPARTMENTS":
      return { ...state, selectedDepartments: action.payload }
    case "SET_SELECTED_RATINGS":
      return { ...state, selectedRatings: action.payload }
    case "PROMOTE_EMPLOYEE":
      const updatedEmployees = state.employees.map((emp) => {
        if (emp.id === action.payload) {
          // Calculate salary increase (10-15% raise)
          const raisePercentage = Math.random() * 0.05 + 0.10; // 10% to 15%
          const newSalary = Math.round(emp.salary * (1 + raisePercentage));

          return {
            ...emp,
            rating: Math.min(5, emp.rating + 0.5),
            salary: newSalary
          };
        }
        return emp;
      })
      return { ...state, employees: updatedEmployees }
    case "ADD_EMPLOYEE":
      const updatedEmployeesList = [...state.employees, action.payload]
      return { ...state, employees: updatedEmployeesList }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    // Load bookmarks from localStorage
    const savedBookmarks = localStorage.getItem("hr-bookmarks")
    if (savedBookmarks) {
      dispatch({ type: "SET_BOOKMARKS", payload: JSON.parse(savedBookmarks) })
    }
  }, [])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}
