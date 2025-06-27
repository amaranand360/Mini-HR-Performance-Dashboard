"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useApp } from "@/contexts/AppContext"
import { useBookmarks } from "@/hooks/useBookmarks"
import {
  ArrowLeft,
  Star,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  BookmarkCheck,
  Bookmark,
  TrendingUp,
  User,
  Eye,
  Building,
  CreditCard,
  Globe,
  GraduationCap,
} from "lucide-react"

export const EmployeeDetails = () => {
  const params = useParams()
  const { state, dispatch } = useApp()
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks()

  const employee = state.employees.find((emp) => emp.id === Number.parseInt(params.id))

  const handleBookmark = () => {
    if (isBookmarked(employee.id)) {
      removeBookmark(employee.id)
    } else {
      addBookmark(employee.id)
    }
  }

  const handlePromote = async () => {
    dispatch({ type: "PROMOTE_EMPLOYEE", payload: employee.id })
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-5 w-5 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          </div>
        </div>,
      )
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />)
    }

    return stars
  }

  const getAvatarColor = (name) => {
    const colors = [
      "bg-purple-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-teal-500",
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  const getSalary = () => {
    return employee?.salary || (Math.floor(Math.random() * 50000) + 50000)
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="flex items-center gap-2 mb-6 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <Card className="bg-white border-gray-200">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-lg text-gray-600">Employee not found</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link href="/">
          <Button
            variant="ghost"
            className="flex items-center gap-2 mb-6 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Employee Header */}
        <Card className="bg-white border-gray-200 mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="relative">
                <div
                  className={`w-24 h-24 rounded-full ${getAvatarColor(employee.firstName)} flex items-center justify-center`}
                >
                  <span className="text-white font-bold text-2xl">
                    {employee.firstName[0]}
                    {employee.lastName[0]}
                  </span>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {employee.firstName} {employee.lastName}
                    </h1>
                    <Badge className="bg-purple-100 text-purple-800 mt-2">{employee.department}</Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={handleBookmark}
                      className={`border-gray-300 hover:bg-gray-50 ${isBookmarked(employee.id) ? "bg-yellow-50 text-yellow-600 border-yellow-200" : "text-gray-700"}`}
                    >
                      {isBookmarked(employee.id) ? (
                        <BookmarkCheck className="h-4 w-4 mr-2" />
                      ) : (
                        <Bookmark className="h-4 w-4 mr-2" />
                      )}
                      {isBookmarked(employee.id) ? "Bookmarked" : "Bookmark"}
                    </Button>

                    <Button
                      onClick={handlePromote}
                      disabled={employee.rating >= 5}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Promote
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="text-sm">{employee.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">Joined {employee.joinDate}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="text-sm">{employee.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span className="text-sm">${getSalary().toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">
                    {employee.address.city}, {employee.address.state}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <div className="flex items-center space-x-1">{renderStars(employee.rating)}</div>
                  <span className="text-sm font-medium text-gray-900">({employee.rating}/5)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabbed Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white p-1 rounded-lg border border-gray-200">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="personal" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Projects
            </TabsTrigger>
            <TabsTrigger value="feedback" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <User className="h-5 w-5" />
                    Bio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{employee.bio}</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <MapPin className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Address</label>
                    <p className="text-gray-900">
                      {employee.address.address}
                      <br />
                      {employee.address.city}, {employee.address.state} {employee.address.postalCode}
                      <br />
                      United States
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="personal" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <User className="h-5 w-5" />
                    Personal Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age:</span>
                    <span className="font-medium text-gray-900">{employee.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Blood Group:</span>
                    <span className="font-medium text-gray-900">O-</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Height:</span>
                    <span className="font-medium text-gray-900">193.24 cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-medium text-gray-900">63.16 kg</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Eye className="h-5 w-5" />
                    Appearance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Eye Color:</span>
                    <span className="font-medium text-gray-900">Green</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hair Color:</span>
                    <span className="font-medium text-gray-900">Brown</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hair Type:</span>
                    <span className="font-medium text-gray-900">Curly</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <GraduationCap className="h-5 w-5" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-gray-900">University of Wisconsin--Madison</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Building className="h-5 w-5" />
                    Company Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-gray-600 block">Company</span>
                    <span className="font-medium text-gray-900">{employee.company.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 block">Title</span>
                    <span className="font-medium text-gray-900">Sales Manager</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <CreditCard className="h-5 w-5" />
                    Banking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Card Type:</span>
                    <span className="font-medium text-gray-900">Elo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Currency:</span>
                    <span className="font-medium text-gray-900">CNY</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Card Expires:</span>
                    <span className="font-medium text-gray-900">03/26</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Globe className="h-5 w-5" />
                    Digital Assets
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-gray-600 block">Crypto</span>
                    <span className="font-medium text-gray-900">Bitcoin</span>
                  </div>
                  <div>
                    <span className="text-gray-600 block">Network</span>
                    <span className="font-medium text-gray-900">Ethereum (ERC20)</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }, (_, i) => {
                const progress = [50, 31, 89][i]
                const status = progress === 89 ? "on-hold" : "completed"
                const statusColor = status === "on-hold" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"

                return (
                  <Card key={i} className="bg-white border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">Project {String.fromCharCode(65 + i)}</h3>
                        <Badge className={statusColor}>{status}</Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium text-gray-900">{progress}%</span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Deadline:</span>
                          <span className="font-medium text-gray-900">
                            {new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toLocaleDateString(
                              "en-GB",
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <div className="space-y-6">
              {[
                {
                  manager: "Manager 1",
                  date: "12/07/2024",
                  rating: 2,
                  feedback: "Great team player with strong technical abilities",
                },
                {
                  manager: "Manager 2",
                  date: "22/09/2024",
                  rating: 4,
                  feedback: "Excellent performance and leadership skills",
                },
              ].map((item, index) => (
                <Card key={index} className="bg-white border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.manager}</h3>
                        <p className="text-sm text-gray-600">{item.date}</p>
                      </div>
                      <div className="flex items-center space-x-1">{renderStars(item.rating)}</div>
                    </div>
                    <p className="text-gray-600">{item.feedback}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default EmployeeDetails