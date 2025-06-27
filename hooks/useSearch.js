"use client"

import { useMemo } from "react"
import { useApp } from "@/contexts/AppContext"

export const useSearch = () => {
  const { state, dispatch } = useApp()

  const setSearchTerm = (term) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: term })
  }

  const setSelectedDepartments = (departments) => {
    dispatch({ type: "SET_SELECTED_DEPARTMENTS", payload: departments })
  }

  const setSelectedRatings = (ratings) => {
    dispatch({ type: "SET_SELECTED_RATINGS", payload: ratings })
  }

  const filteredEmployees = useMemo(() => {
    let filtered = state.employees

    if (state.searchTerm) {
      const searchLower = state.searchTerm.toLowerCase()
      filtered = filtered.filter(
        (emp) =>
          emp.firstName.toLowerCase().includes(searchLower) ||
          emp.lastName.toLowerCase().includes(searchLower) ||
          emp.email.toLowerCase().includes(searchLower) ||
          emp.department.toLowerCase().includes(searchLower),
      )
    }

    if (state.selectedDepartments.length > 0) {
      filtered = filtered.filter((emp) => state.selectedDepartments.includes(emp.department))
    }

    if (state.selectedRatings.length > 0) {
      filtered = filtered.filter((emp) => state.selectedRatings.includes(Math.floor(emp.rating)))
    }

    return filtered
  }, [state.employees, state.searchTerm, state.selectedDepartments, state.selectedRatings])

  return {
    searchTerm: state.searchTerm,
    selectedDepartments: state.selectedDepartments,
    selectedRatings: state.selectedRatings,
    filteredEmployees,
    setSearchTerm,
    setSelectedDepartments,
    setSelectedRatings,
  }
}
