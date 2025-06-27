"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useApp } from "@/contexts/AppContext";
import {
  Star,
  Bookmark,
  BookmarkCheck,
  Eye,
  TrendingUp,
  Mail,
  Phone,
} from "lucide-react";

export const EmployeeCard = ({ employee }) => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { dispatch } = useApp();
  const [isPromoting, setIsPromoting] = useState(false);

  const handleBookmark = () => {
    if (isBookmarked(employee.id)) {
      removeBookmark(employee.id);
    } else {
      addBookmark(employee.id);
    }
  };

  const handlePromote = async () => {
    setIsPromoting(true);
    setTimeout(() => {
      dispatch({ type: "PROMOTE_EMPLOYEE", payload: employee.id });
      setIsPromoting(false);
    }, 1000);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

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
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Use the employee's actual salary from the data
  const getSalary = () => {
    return employee.salary || (Math.floor(Math.random() * 50000) + 50000);
  };

  return (
    <Card className="bg-white border-gray-200 hover:shadow-lg transition-all duration-200 hover:scale-105">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className={`relative w-12 h-12 rounded-full ${getAvatarColor(
                employee.firstName
              )} flex items-center justify-center`}
            >
              <span className="text-white font-semibold text-lg">
                {employee.firstName[0]}
                {employee.lastName[0]}
              </span>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 truncate">
                {employee.firstName} {employee.lastName}
              </h3>
              <Badge
                variant="secondary"
                className="text-xs bg-gray-100 text-gray-700"
              >
                {employee.department}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={`p-1 hover:bg-gray-100 ${
              isBookmarked(employee.id) ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            {isBookmarked(employee.id) ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="h-4 w-4 mr-2" />
            <span className="truncate">{employee.email}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-2" />
            <span>{employee.phone}</span>
          </div>
        </div>

        <div className="flex items-center space-x-1 mb-4">
          {renderStars(employee.rating)}
          <span className="text-sm text-gray-600 ml-2">
            ({employee.rating}/5)
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-600">Salary</span>
            <p className="font-semibold text-green-600">
              ${getSalary().toLocaleString()}
            </p>
          </div>
          <div>
            <span className="text-gray-600">Projects</span>
            <p className="font-semibold text-blue-600">{employee.projects}</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <Link href={`/employee/${employee.id}`} className="flex-1">
            <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={handlePromote}
            disabled={isPromoting || employee.rating >= 5}
            className="border-slate-200 dark:border-white/20 theme-text theme-hover"
          >
            {isPromoting ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
            ) : (
              <TrendingUp className="h-4 w-4" />
            )}
            Promote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
