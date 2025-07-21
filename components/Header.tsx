'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Activity } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const isLoggedIn = pathname.includes('dashboard')
  const userRole = pathname.split('/')[1].split('-')[0]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const linkVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  }

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-800 shadow-md' : 'bg-transparent'
      }`}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 flex-wrap">
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-full flex items-center justify-center mr-2">
              <Activity className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-blue-400' : 'text-white'
            }`}>
              HealthSync
            </span>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {isLoggedIn ? (
                <>
                  <motion.li whileHover="hover" variants={linkVariants}>
                    <Link href={`/${userRole}-dashboard`} className={`hover:text-blue-400 transition-colors duration-300 ${
                      isScrolled ? 'text-gray-300' : 'text-white'
                    }`}>Dashboard</Link>
                  </motion.li>
                  {userRole === 'admin' && (
                    <motion.li whileHover="hover" variants={linkVariants}>
                      <Link href="/admin-dashboard/users" className={`hover:text-blue-400 transition-colors duration-300 ${
                        isScrolled ? 'text-gray-300' : 'text-white'
                      }`}>Manage Users</Link>
                    </motion.li>
                  )}
                  {userRole === 'doctor' && (
                    <motion.li whileHover="hover" variants={linkVariants}>
                      <Link href="/doctor-dashboard/appointments-management" className={`hover:text-blue-400 transition-colors duration-300 ${
                        isScrolled ? 'text-gray-300' : 'text-white'
                      }`}>Appointments</Link>
                    </motion.li>
                  )}
                  {userRole === 'patient' && (
                    <motion.li whileHover="hover" variants={linkVariants}>
                      <Link href="/patient-dashboard/health-records" className={`hover:text-blue-400 transition-colors duration-300 ${
                        isScrolled ? 'text-gray-300' : 'text-white'
                      }`}>Health Records</Link>
                    </motion.li>
                  )}
                  <motion.li whileHover="hover" variants={linkVariants}>
                    <Link href="/login" className={`hover:text-blue-400 transition-colors duration-300 ${
                      isScrolled ? 'text-gray-300' : 'text-white'
                    }`}>Logout</Link>
                  </motion.li>
                </>
              ) : (
                <>
                  <motion.li whileHover="hover" variants={linkVariants}>
                    <Link href="/" className={`hover:text-blue-400 transition-colors duration-300 ${
                      isScrolled ? 'text-gray-300' : 'text-white'
                    }`}>Home</Link>
                  </motion.li>
                  <motion.li whileHover="hover" variants={linkVariants}>
                    <Link href="/about" className={`hover:text-blue-400 transition-colors duration-300 ${
                      isScrolled ? 'text-gray-300' : 'text-white'
                    }`}>About</Link>
                  </motion.li>
                  <motion.li whileHover="hover" variants={linkVariants}>
                    <Link href="/features" className={`hover:text-blue-400 transition-colors duration-300 ${
                      isScrolled ? 'text-gray-300' : 'text-white'
                    }`}>Features</Link>
                  </motion.li>
                  <motion.li whileHover="hover" variants={linkVariants}>
                    <Link href="/login" className={`hover:text-blue-400 transition-colors duration-300 ${
                      isScrolled ? 'text-gray-300' : 'text-white'
                    }`}>Login</Link>
                  </motion.li>
                  <motion.li whileHover="hover" variants={linkVariants}>
                    <Link href="/register" className={`hover:text-blue-400 transition-colors duration-300 ${
                      isScrolled ? 'text-gray-300' : 'text-white'
                    }`}>Register</Link>
                  </motion.li>
                </>
              )}
            </ul>
          </nav>
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-gray-300' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-300' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-slate-800 absolute top-full left-0 right-0 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="px-4 py-2 space-y-2">
            {isLoggedIn ? (
              <>
                <li><Link href={`/${userRole}-dashboard`} className="block py-2 text-gray-300 hover:text-blue-400 text-lg">Dashboard</Link></li>
                {userRole === 'admin' && (
                  <li><Link href="/admin-dashboard/users" className="block py-2 text-gray-300 hover:text-blue-400 text-lg">Manage Users</Link></li>
                )}
                {userRole === 'doctor' && (
                  <li><Link href="/doctor-dashboard/appointments-management" className="block py-2 text-gray-300 hover:text-blue-400 text-lg">Appointments</Link></li>
                )}
                {userRole === 'patient' && (
                  <li><Link href="/patient-dashboard/health-records" className="block py-2 text-gray-300 hover:text-blue-400 text-lg">Health Records</Link></li>
                )}
                <li><Link href="/login" className="block py-2 text-gray-300 hover:text-blue-400 text-lg">Logout</Link></li>
              </>
            ) : (
              <>
                <li><Link href="/" className="block py-2 text-gray-300 hover:text-blue-400 text-lg">Home</Link></li>
                <li><Link href="/about" className="block py-2 text-gray-300 hover:text-blue-400 text-lg">About</Link></li>
                <li><Link href="/features" className="block py-2 text-gray-300 hover:text-blue-400 text-lg">Features</Link></li>
                <li><Link href="/login" className="block py-2 text-gray-300 hover:text-blue-400 text-lg">Login</Link></li>
                <li><Link href="/register" className="block py-2 text-gray-300 hover:text-blue-400 text-lg">Register</Link></li>
              </>
            )}
          </ul>
        </motion.div>
      )}
    </motion.header>
  )
}

