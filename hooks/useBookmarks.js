"use client"

import { useApp } from "@/contexts/AppContext"

export const useBookmarks = () => {
  const { state, dispatch } = useApp()

  const addBookmark = (employeeId) => {
    if (!state.bookmarks.includes(employeeId)) {
      dispatch({ type: "ADD_BOOKMARK", payload: employeeId })
    }
  }

  const removeBookmark = (employeeId) => {
    dispatch({ type: "REMOVE_BOOKMARK", payload: employeeId })
  }

  const isBookmarked = (employeeId) => {
    return state.bookmarks.includes(employeeId)
  }

  const getBookmarkedEmployees = () => {
    return state.employees.filter((emp) => state.bookmarks.includes(emp.id))
  }

  return {
    bookmarks: state.bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    getBookmarkedEmployees,
  }
}
