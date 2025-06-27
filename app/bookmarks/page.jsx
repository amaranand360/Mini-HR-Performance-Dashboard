"use client"

import Link from "next/link"
import { EmployeeCard } from "@/components/EmployeeCard"
import { useBookmarks } from "@/hooks/useBookmarks"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Bookmark, Users, Trash2 } from "lucide-react"

export default function BookmarksPage() {
  const { getBookmarkedEmployees, removeBookmark } = useBookmarks()
  const bookmarkedEmployees = getBookmarkedEmployees()

  const handleRemoveAll = () => {
    if (confirm("Are you sure you want to remove all bookmarks?")) {
      bookmarkedEmployees.forEach((emp) => removeBookmark(emp.id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Bookmark className="h-6 w-6 text-yellow-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Bookmarked Employees</h1>
            </div>
          </div>

          {bookmarkedEmployees.length > 0 && (
            <Button
              variant="outline"
              onClick={handleRemoveAll}
              className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            {bookmarkedEmployees.length} bookmarked employee{bookmarkedEmployees.length !== 1 ? "s" : ""}
          </p>
        </div>

        {bookmarkedEmployees.length === 0 ? (
          <Card className="bg-white border-gray-200">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="p-4 bg-gray-100 rounded-full mb-4">
                <Users className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookmarked Employees</h3>
              <p className="text-gray-600 text-center max-w-md mb-6">
                You haven't bookmarked any employees yet. Go to the dashboard and bookmark employees you want to keep
                track of.
              </p>
              <Link href="/">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">Go to Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bookmarkedEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
