"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Users, BarChart3, Bookmark, Plus, LogOut, User } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import CreateUserModal from "./CreateUserModal"

export const HeaderNav = () => {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Dashboard", icon: Users },
    { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
  ]

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

          <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                 <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">HR Dashboard</span>
              </Link>

              {/* Navigation Links */}
              <nav className="hidden md:flex space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className={`flex items-center space-x-2 ${isActive
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                          }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Button>
                    </Link>
                  )
                })}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Button onClick={() => setIsCreateModalOpen(true)} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Employee
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-gray-700 hover:bg-gray-50">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:bg-red-50">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="md:hidden pb-4">
            <nav className="flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} className="flex-1">
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full flex items-center justify-center space-x-2 ${isActive
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{item.label}</span>
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </header>

      <CreateUserModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </>
  )
}

export default HeaderNav
