// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Home, ShieldCheck, Info, UserCog, Menu, X, Sun, Moon } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleDarkMode } from "../redux/themeslice";
// import { motion, AnimatePresence } from "framer-motion";

// const navigation = [
//   { name: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
//   { name: "Verify", href: "/verify", icon: <ShieldCheck className="h-4 w-4" /> },
//   { name: "About", href: "/about", icon: <Info className="h-4 w-4" /> },
//   { name: "Admin", href: "/admin", icon: <UserCog className="h-4 w-4" /> },
// ];

// export default function Nav() {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const darkMode = useSelector((state) => state.theme.darkMode);

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   // Shadow on scroll
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Apply global dark mode class
//   useEffect(() => {
//     const html = document.documentElement;
//     html.classList.toggle("dark", darkMode);
//   }, [darkMode]);

//   return (
//     <nav
//       className={`sticky top-0 z-50 bg-white/80 dark:bg-gray-900 backdrop-blur-md text-gray-900 dark:text-white transition-all duration-300 border-b border-gray-200 dark:border-gray-700
//         ${scrolled ? "shadow-md" : ""} bg-white/80 dark:bg-gray-900 backdrop-blur-md text-gray-900 dark:text-white`}
//     >
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center  justify-between">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2">
//             <ShieldCheck className="h-8 w-8 text-blue-600 dark:text-blue-400" />
//             <span className={`font-bold text-xl tracking-wide ${darkMode ? "text-white" : "text-gray-900"}`}>
//               Cert<span className="text-blue-500">Validator</span>
//             </span>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center gap-4">
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
//                   ${
//                     location.pathname === item.href
//                       ? "bg-blue-600 text-white"
//                       : darkMode
//                       ? "text-white hover:text-blue-400 hover:bg-gray-800"
//                       : "text-gray-900 hover:text-blue-600 hover:bg-gray-100"
//                   }`}
//               >
//                 {item.icon}
//                 {item.name}
//               </Link>
//             ))}

//             {/* Desktop Dark Mode Toggle */}
//             <button
//               onClick={() => dispatch(toggleDarkMode())}
//               className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
//               aria-label="Toggle dark mode"
//             >
//               {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-800" />}
//             </button>
//           </div>

//           {/* Mobile Controls */}
//           <div className="flex md:hidden items-center gap-2">
//             {/* Mobile Dark Mode Toggle */}
//             <button
//               onClick={() => dispatch(toggleDarkMode())}
//               className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
//               aria-label="Toggle dark mode"
//             >
//               {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-800" />}
//             </button>

//             {/* Mobile Menu Toggle */}
//             <button
//               className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {mobileMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="md:hidden mt-2 px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 dark:border-gray-700"
//             >
//               {navigation.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   onClick={() => setMobileMenuOpen(false)}
//                   className={`block px-3 py-2 rounded-md text-base font-medium transition-colors
//                     ${
//                       location.pathname === item.href
//                         ? "bg-blue-600 text-white"
//                         : darkMode
//                         ? "text-white hover:text-blue-400 hover:bg-gray-800"
//                         : "text-gray-900 hover:text-blue-600 hover:bg-gray-100"
//                     }`}
//                 >
//                   {item.icon} {item.name}
//                 </Link>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </nav>
//   );
// }



import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu,Shield, X, Sun, Moon, Home, ShieldCheck, Info, UserCog } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/themeslice";
import { MegaMenu, NavbarCollapse } from "flowbite-react";

const navigation = [
  { to: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
  { to: "/verify", label: "Verify", icon: <ShieldCheck className="w-4 h-4" /> },
  { to: "/about", label: "About", icon: <Info className="w-4 h-4" /> },
  { to: "/admin", label: "Admin", icon: <UserCog className="w-4 h-4" /> },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <nav
      className={`sticky top-0 z-50 w-full bg-white dark:bg-gray-900 transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span
            className={`text-2xl font-bold tracking-wide ${
              darkMode ? "text-white" : "text-blue-900"
            }`}
          >
             <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-foreground">Cert<span className="text-blue-600">Validator</span></span>
            </div>          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          {navigation.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : darkMode
                    ? "text-white hover:text-blue-400 hover:bg-gray-800"
                    : "text-blue-900 hover:text-blue-600 hover:bg-gray-100"
                }`}
              >
                {link.icon} {link.label}
              </Link>
            );
          })}

          {/* Desktop Dark Mode Toggle */}
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-800" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-800" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden px-2 pt-2 pb-3 space-y-1 transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {navigation.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : darkMode
                  ? "text-white hover:text-blue-400 hover:bg-gray-800"
                  : "text-blue-900 hover:text-blue-600 hover:bg-gray-100"
              }`}
            >
              {link.icon} {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
