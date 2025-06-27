"use client"

import { useEffect } from "react"
import { useApp } from "@/contexts/AppContext"

const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
  "Design",
  "Product",
  "Legal",
  "Support",
]

const generateEmployeeData = (user) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    age: user.age,
    phone: user.phone,
    image: user.image,
    address: user.address,
    company: user.company,
    department: departments[Math.floor(Math.random() * departments.length)],
    rating: Math.round((Math.random() * 4 + 1) * 2) / 2, // 1-5 with 0.5 increments
    joinDate: new Date(
      2020 + Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28),
    )
      .toISOString()
      .split("T")[0],
    projects: Math.floor(Math.random() * 10) + 1,
    bio: `Experienced professional with ${Math.floor(Math.random() * 10) + 1} years in ${departments[Math.floor(Math.random() * departments.length)].toLowerCase()}.`,
    performanceHistory: Array.from({ length: 6 }, (_, i) => ({
      month: new Date(2024, i, 1).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      rating: Math.round((Math.random() * 4 + 1) * 2) / 2,
    })),
  }
}

export const useEmployees = () => {
  const { state, dispatch } = useApp()

  useEffect(() => {
    const fetchEmployees = async () => {
      dispatch({ type: "SET_LOADING", payload: true })
      try {
        const response = await fetch("https://dummyjson.com/users?limit=20")
        const data = await response.json()
        const employeesWithData = data.users.map(generateEmployeeData)
        dispatch({ type: "SET_EMPLOYEES", payload: employeesWithData })
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Failed to fetch employees" })
      }
    }

    if (state.employees.length === 0) {
      fetchEmployees()
    }
  }, [state.employees.length, dispatch])

  return {
    employees: state.employees,
    loading: state.loading,
    error: state.error,
  }
}
