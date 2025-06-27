"use client"

import { useState } from "react"
import { EmployeeCard } from "@/components/EmployeeCard"
import { SearchAndFilter } from "@/components/SearchAndFilter"
import { useEmployees } from "@/hooks/useEmployees"
import { useSearch } from "@/hooks/useSearch"
import { useBookmarks } from "@/hooks/useBookmarks"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, Star, Bookmark, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react"
import { HeaderNav } from "@/components/HeaderNav"

const ITEMS_PER_PAGE = 12

const MetricCard = ({ title, value, icon: Icon, color }) =>{
  return (
    <Card className="bg-white border-gray-200 hover:shadow-lg transition-all duration-200 hover:scale-105">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
          <div
            className={`p-3 rounded-lg ${
              color === "text-blue-600"
                ? "bg-blue-100"
                : color === "text-yellow-600"
                  ? "bg-yellow-100"
                  : color === "text-purple-600"
                    ? "bg-purple-100"
                    : "bg-green-100"
            }`}
          >
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const  EmployeeCardSkeleton = () => {
  return (
    <Card className="bg-white border-gray-200">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start space-x-4">
          <Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-32 bg-gray-200" />
            <Skeleton className="h-4 w-24 bg-gray-200" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-gray-200" />
          <Skeleton className="h-4 w-20 bg-gray-200" />
        </div>
        <div className="flex space-x-2">
          <Skeleton className="h-10 flex-1 bg-gray-200" />
          <Skeleton className="h-10 w-20 bg-gray-200" />
        </div>
      </CardContent>
    </Card>
  )
}

const Dashboard = () =>{
  const { loading, error } = useEmployees()
  const { filteredEmployees } = useSearch()
  const { bookmarks } = useBookmarks()
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex)

  const metrics = {
    totalEmployees: filteredEmployees.length,
    averageRating:
      filteredEmployees.length > 0
        ? (filteredEmployees.reduce((sum, emp) => sum + emp.rating, 0) / filteredEmployees.length).toFixed(1)
        : 0,
    bookmarked: bookmarks.length,
    highPerformers: filteredEmployees.filter((emp) => emp.rating >= 4.5).length,
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNav />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard title="Total Employees" value={metrics.totalEmployees} icon={Users} color="text-blue-600" />
          <MetricCard title="Average Rating" value={metrics.averageRating} icon={Star} color="text-yellow-600" />
          <MetricCard title="Bookmarked" value={metrics.bookmarked} icon={Bookmark} color="text-purple-600" />
          <MetricCard title="High Performers" value={metrics.highPerformers} icon={TrendingUp} color="text-green-600" />
        </div>

        {/* Search and Filters */}
        <SearchAndFilter />

        {/* Results Info and Pagination */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredEmployees.length)} of {filteredEmployees.length}{" "}
            employees
          </p>

          {totalPages > 1 && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Employee Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <EmployeeCardSkeleton key={i} />
            ))}
          </div>
        ) : currentEmployees.length === 0 ? (
          <Card className="bg-white border-gray-200">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
              <p className="text-gray-600 text-center max-w-md">
                Try adjusting your search or filters to find employees.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard