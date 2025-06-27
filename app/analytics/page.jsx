"use client"

import { useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useApp } from "@/contexts/AppContext"
import { useBookmarks } from "@/hooks/useBookmarks"
import { ArrowLeft, BarChart3, Users, Star, TrendingUp } from "lucide-react"
import { HeaderNav } from "@/components/HeaderNav"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

export default function AnalyticsPage() {
  const { state } = useApp()
  const { bookmarks } = useBookmarks()

  const analytics = useMemo(() => {
    const employees = state.employees || []

    // Use mock data if no employees exist to ensure charts are always visible
    const mockDepartmentAnalytics = [
      { department: "Marketing", averageRating: 3.2, count: 4 },
      { department: "Finance", averageRating: 3.8, count: 3 },
      { department: "HR", averageRating: 2.8, count: 2 },
      { department: "Operations", averageRating: 1.7, count: 5 },
      { department: "Sales", averageRating: 1.9, count: 6 }
    ]

    const mockRatingDistribution = [
      { name: "1 Star", value: 6, rating: 1, fill: "#DC2626" },
      { name: "2 Stars", value: 4, rating: 2, fill: "#EF4444" },
      { name: "3 Stars", value: 4, rating: 3, fill: "#F59E0B" },
      { name: "4 Stars", value: 2, rating: 4, fill: "#22C55E" },
      { name: "5 Stars", value: 4, rating: 5, fill: "#10B981" }
    ]

    const mockSalaryData = [
      { department: "Marketing", avgSalary: 75000 },
      { department: "Finance", avgSalary: 85000 },
      { department: "HR", avgSalary: 78000 },
      { department: "Operations", avgSalary: 80000 },
      { department: "Sales", avgSalary: 62000 }
    ]

    const mockPerformanceTrends = [
      { month: "Jan", highPerformers: 3, avgPerformance: 2.7 },
      { month: "Feb", highPerformers: 8, avgPerformance: 3.2 },
      { month: "Mar", highPerformers: 12, avgPerformance: 3.5 },
      { month: "Apr", highPerformers: 15, avgPerformance: 3.8 },
      { month: "May", highPerformers: 18, avgPerformance: 4.2 },
      { month: "Jun", highPerformers: 3, avgPerformance: 2.8 }
    ]

    if (employees.length === 0) {
      return {
        departmentAnalytics: mockDepartmentAnalytics,
        ratingDistribution: mockRatingDistribution,
        salaryData: mockSalaryData,
        performanceTrends: mockPerformanceTrends,
        totalEmployees: 20,
        averageRating: 2.7,
        highPerformers: 6,
        totalBookmarks: 5,
      }
    }

    const departmentStats = employees.reduce((acc, emp) => {
      const dept = emp.department || "Unknown"
      if (!acc[dept]) {
        acc[dept] = {
          department: dept,
          count: 0,
          totalRating: 0,
          employees: [],
        }
      }
      acc[dept].count++
      acc[dept].totalRating += emp.rating || 0
      acc[dept].employees.push(emp)
      return acc
    }, {})

    const departmentAnalytics = Object.values(departmentStats)
      .map((dept) => ({
        department: dept.department,
        count: dept.count,
        averageRating: Number((dept.totalRating / dept.count).toFixed(1)),
        employees: dept.employees,
      }))
      .filter((dept) => dept.count > 0) // Only include departments with employees
      .sort((a, b) => a.department.localeCompare(b.department)) // Sort alphabetically for consistent display

    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    employees.forEach((emp) => {
      const rating = Math.floor(emp.rating || 0)
      if (rating >= 1 && rating <= 5) {
        ratingCounts[rating]++
      }
    })

    const ratingDistribution = Object.entries(ratingCounts)
      .map(([rating, count]) => ({
        name: `${rating} Star${rating > 1 ? "s" : ""}`,
        value: count,
        rating: Number.parseInt(rating),
        fill: rating == 5 ? "#10B981" : rating == 4 ? "#22C55E" : rating == 3 ? "#F59E0B" : rating == 2 ? "#EF4444" : "#DC2626",
      }))
      .filter((item) => item.value > 0)

    const salaryData = departmentAnalytics.map((dept) => {
      // Calculate actual average salary from employee data
      const deptEmployees = dept.employees;
      const totalSalary = deptEmployees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
      const avgSalary = deptEmployees.length > 0 ? Math.round(totalSalary / deptEmployees.length) : 0;

      return {
        department: dept.department,
        avgSalary: avgSalary,
        count: dept.count,
      }
    })

    const currentMonth = new Date().getMonth()
    const performanceTrends = Array.from({ length: 6 }, (_, i) => {
      const monthIndex = (currentMonth - 5 + i + 12) % 12
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

      const baseRating = employees.reduce((sum, emp) => sum + (emp.rating || 0), 0) / employees.length
      const variation = (Math.random() - 0.5) * 0.4
      const baseHighPerformers = employees.filter((emp) => (emp.rating || 0) >= 4.5).length

      return {
        month: monthNames[monthIndex],
        avgPerformance: Number((baseRating + variation).toFixed(1)),
        highPerformers: Math.max(1, Math.floor(baseHighPerformers * (0.7 + i * 0.08))),
        bookmarks: Math.floor(bookmarks.length * (0.3 + i * 0.15)),
        employees: Math.floor(employees.length * (0.8 + i * 0.04)),
      }
    })

    const totalEmployees = employees.length
    const averageRating =
      employees.length > 0
        ? Number((employees.reduce((sum, emp) => sum + (emp.rating || 0), 0) / employees.length).toFixed(1))
        : 0
    const highPerformers = employees.filter((emp) => (emp.rating || 0) >= 4.5).length
    const totalBookmarks = bookmarks.length

    // Debug logging
    console.log('Department Analytics:', departmentAnalytics);
    console.log('Rating Distribution:', ratingDistribution);
    console.log('Salary Data:', salaryData);

    return {
      departmentAnalytics,
      ratingDistribution,
      salaryData,
      performanceTrends,
      totalEmployees,
      averageRating,
      highPerformers,
      totalBookmarks,
    }
  }, [state.employees, bookmarks])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg border border-gray-200 rounded-lg">
          <p className="font-semibold text-gray-900 mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}:{" "}
              {typeof entry.value === "number"
                ? entry.name.includes("Salary")
                  ? `$${entry.value.toLocaleString()}`
                  : entry.value
                : entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const MetricCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <Card className="bg-white border-gray-200 hover:shadow-lg transition-all duration-200 hover:scale-105">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div
            className={`p-3 rounded-lg ${
              color === "text-blue-600"
                ? "bg-blue-100"
                : color === "text-yellow-600"
                  ? "bg-yellow-100"
                  : color === "text-green-600"
                    ? "bg-green-100"
                    : "bg-purple-100"
            }`}
          >
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (state.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (state.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading data: {state.error}</p>
          <Link href="/">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNav />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">HR Analytics Dashboard</h1>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Employees"
            value={analytics.totalEmployees}
            icon={Users}
            color="text-blue-600"
            subtitle="Active workforce"
          />
          <MetricCard
            title="Avg Performance"
            value={analytics.averageRating}
            icon={Star}
            color="text-yellow-600"
            subtitle="Out of 5.0"
          />
          <MetricCard
            title="High Performers"
            value={analytics.highPerformers}
            icon={TrendingUp}
            color="text-green-600"
            subtitle="Rating ≥ 4.5"
          />
          <MetricCard
            title="Departments"
            value={analytics.departmentAnalytics.length}
            icon={BarChart3}
            color="text-purple-600"
            subtitle="Active departments"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Department Performance</CardTitle>
              <p className="text-sm text-gray-600">Average rating by department</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={analytics.departmentAnalytics} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                  <defs>
                    <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#A855F7" stopOpacity={1} />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="department"
                    tick={{ fill: "#6b7280", fontSize: 11 }}
                    axisLine={{ stroke: "#d1d5db" }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                  />
                  <YAxis
                    tick={{ fill: "#6b7280" }}
                    axisLine={{ stroke: "#d1d5db" }}
                    domain={[0, 5]}
                    tickCount={6}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="averageRating"
                    fill="url(#purpleGradient)"
                    radius={[4, 4, 0, 0]}
                    name="Avg Rating"
                    maxBarSize={60}
                    stroke="#8B5CF6"
                    strokeWidth={0}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Rating Distribution</CardTitle>
              <p className="text-sm text-gray-600">Employee performance breakdown</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={analytics.ratingDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    {analytics.ratingDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value} employees`, name]}
                    labelFormatter={() => ''}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Average Salary by Department</CardTitle>
              <p className="text-sm text-gray-600">Compensation analysis</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={analytics.salaryData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                  <defs>
                    <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22C55E" stopOpacity={1} />
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="department"
                    tick={{ fill: "#6b7280", fontSize: 11 }}
                    axisLine={{ stroke: "#d1d5db" }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                  />
                  <YAxis
                    tick={{ fill: "#6b7280" }}
                    axisLine={{ stroke: "#d1d5db" }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="avgSalary"
                    fill="#10B981"
                    fillOpacity={0.8}
                    radius={[4, 4, 0, 0]}
                    name="Avg Salary"
                    maxBarSize={60}
                    stroke="#059669"
                    strokeWidth={1}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Trends */}
          <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Performance Trends</CardTitle>
              <p className="text-sm text-gray-600">6-month performance overview</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={analytics.performanceTrends} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#d1d5db" }} />
                  <YAxis tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#d1d5db" }} domain={[0, 20]} tickCount={6} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="highPerformers"
                    stroke="#F59E0B"
                    strokeWidth={3}
                    dot={{ fill: "#F59E0B", strokeWidth: 2, r: 6 }}
                    name="High Performers"
                    activeDot={{ r: 8, stroke: "#F59E0B", strokeWidth: 2, fill: "#fff" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="avgPerformance"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 6 }}
                    name="Avg Performance"
                    activeDot={{ r: 8, stroke: "#8B5CF6", strokeWidth: 2, fill: "#fff" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
