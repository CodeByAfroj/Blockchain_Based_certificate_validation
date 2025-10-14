import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ShieldCheck, Info, UserCog, Menu, X, Sun, Moon } from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
  { name: "Verify", href: "/verify", icon: <ShieldCheck className="h-4 w-4" /> },
  { name: "About", href: "/about", icon: <Info className="h-4 w-4" /> },
  { name: "Admin", href: "/admin", icon: <UserCog className="h-4 w-4" /> },
];

export default function Nav() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize dark mode from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "false" ? false : true; // default true
  });

  // Apply dark class to <html> and save preference
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
    localStorage.setItem("theme", darkMode ? "true" : "false");
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">CertValidator</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    location.pathname === item.href
                      ? "bg-primary text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Dark/Light toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-800" />}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 dark:border-gray-700">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-base font-medium transition-colors
                  ${
                    location.pathname === item.href
                      ? "bg-primary text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
