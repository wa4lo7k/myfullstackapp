'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import KeyServices from '@/components/KeyServices'
import Stats from '@/components/Stats'
import BlogSection from '@/components/BlogSection'
import PharmacySection from '@/components/PharmacySection'
import { CalendarDays, Video, Brain, Shield } from 'lucide-react'

const services = [
  {
    title: "Appointment Scheduling",
    description: "Book your healthcare appointments with ease and convenience.",
    icon: CalendarDays,
    color: "bg-blue-100 hover:bg-blue-200 text-blue-600"
  },
  {
    title: "Telemedicine",
    description: "Consult with doctors remotely through secure video calls.",
    icon: Video,
    color: "bg-green-100 hover:bg-green-200 text-green-600"
  },
  {
    title: "AI Health Insights",
    description: "Receive personalized health insights powered by AI.",
    icon: Brain,
    color: "bg-purple-100 hover:bg-purple-200 text-purple-600"
  },
  {
    title: "Blockchain Security",
    description: "Ensure your data is secure with state-of-the-art blockchain technology.",
    icon: Shield,
    color: "bg-red-100 hover:bg-red-200 text-red-600"
  }
]

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <motion.main 
        className="flex-grow"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.section 
          className="bg-gradient-to-r from-slate-800 to-blue-900 text-white py-20"
          variants={itemVariants}
        >
          <div className="container mx-auto text-center px-4">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              variants={itemVariants}
            >
              Revolutionizing Healthcare at Your Fingertips
            </motion.h1>
            <motion.p 
              className="text-xl mb-8"
              variants={itemVariants}
            >
              Experience seamless healthcare management with advanced technology and personalized care.
            </motion.p>
            <motion.button 
              className="bg-red-500 text-white font-bold py-3 px-8 rounded-full hover:bg-red-600 transition duration-300 transform hover:scale-105"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>
        </motion.section>
        <KeyServices services={services}/>
        <Stats />
        <BlogSection />
        <PharmacySection />
      </motion.main>
      <Footer />
    </div>
  )
}

