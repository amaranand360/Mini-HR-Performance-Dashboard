"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearch } from "@/hooks/useSearch"
import { Search, Filter } from "lucide-react"

const departments = [
  "All Departments",
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

const ratings = ["All Ratings", "5 Stars", "4+ Stars", "3+ Stars", "2+ Stars", "1+ Stars"]

const SearchAndFilter = () => {
  const {
    searchTerm,
    selectedDepartments,
    selectedRatings,
    setSearchTerm,
    setSelectedDepartments,
    setSelectedRatings,
  } = useSearch()

  const handleDepartmentChange = (value) => {
    if (value === "All Departments") {
      setSelectedDepartments([])
    } else {
      setSelectedDepartments([value])
    }
  }

  const handleRatingChange = (value) => {
    if (value === "All Ratings") {
      setSelectedRatings([])
    } else {
      const ratingMap = {
        "5 Stars": [5],
        "4+ Stars": [4, 5],
        "3+ Stars": [3, 4, 5],
        "2+ Stars": [2, 3, 4, 5],
        "1+ Stars": [1, 2, 3, 4, 5],
      }
      setSelectedRatings(ratingMap[value] || [])
    }
  }

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div className="flex gap-2">
          <Select onValueChange={handleDepartmentChange}>
            <SelectTrigger className="w-48 bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept} className="hover:bg-gray-50">
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={handleRatingChange}>
            <SelectTrigger className="w-40 bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500">
              <SelectValue placeholder="All Ratings" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              {ratings.map((rating) => (
                <SelectItem key={rating} value={rating} className="hover:bg-gray-50">
                  {rating}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default SearchAndFilter