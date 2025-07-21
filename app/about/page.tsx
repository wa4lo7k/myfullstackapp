'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Users, Clock, Shield } from 'lucide-react'
import RatingChart from '@/components/RatingChart'

const ratings = [
  { name: '5 Stars', value: 45 },
  { name: '4 Stars', value: 30 },
  { name: '3 Stars', value: 15 },
  { name: '2 Stars', value: 7 },
  { name: '1 Star', value: 3 },
]

const reviews = [
  { name: 'John Doe', rating: 5, comment: 'HealthSync has revolutionized how I manage my health. Highly recommended!' },
  { name: 'Jane Smith', rating: 4, comment: 'Great app with intuitive features. Could use some minor improvements.' },
  { name: 'Mike Johnson', rating: 5, comment: 'The AI insights are incredibly helpful. It\'s like having a personal health assistant.' },
  { name: 'Emily Rodriguez', rating: 3, comment: 'Good concept, but I\'ve experienced some glitches. Hope to see improvements soon.' },
  { name: 'David Kim', rating: 5, comment: 'As a healthcare provider, HealthSync has streamlined my patient management process significantly.' },
  { name: 'Sarah Thompson', rating: 4, comment: 'I love the telemedicine feature. It\'s so convenient for quick consultations.' },
  { name: 'Alex Chen', rating: 2, comment: 'The app is okay, but it needs more customization options for individual health goals.' },
  { name: 'Lisa Patel', rating: 5, comment: 'The integration with wearable devices is seamless. Great job!' },
  { name: 'Chris Wilson', rating: 4, comment: 'HealthSync has made it much easier to keep track of my medications and appointments.' },
  { name: 'Olivia Brown', rating: 3, comment: 'Decent app, but the user interface could be more intuitive.' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5, 
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const cardVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 300,
    },
  },
}

export default function About() {
  const [newComment, setNewComment] = useState('')
  const [selectedRating, setSelectedRating] = useState(0)

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('New comment:', newComment)
    setNewComment('')
  }

  const filteredReviews = selectedRating === 0 ? reviews : reviews.filter(review => review.rating === selectedRating)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#108dc7] to-[#ef8e38]">
      <Header />
      <motion.main 
        className="flex-grow container mx-auto py-10 px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 className="text-4xl font-bold mb-8 text-center text-blue-800" variants={itemVariants}>About HealthSync</motion.h1>
        
        <motion.section className="mb-12" variants={itemVariants}>
          <h2 className="text-3xl font-semibold mb-6 text-blue-900">Our Mission</h2>
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            variants={cardVariants}
            whileHover="hover"
          >
            <p className="text-gray-700 leading-relaxed">
              At HealthSync, we&apos;re committed to revolutionizing healthcare management through innovative technology.
              Our goal is to empower individuals to take control of their health by providing intuitive tools and 
              AI-driven insights, all while ensuring the highest standards of data security and privacy.
            </p>
          </motion.div>
        </motion.section>
        
        <motion.section className="mb-12" variants={itemVariants}>
          <h2 className="text-3xl font-semibold mb-6 text-blue-900">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "User-Centric Design", description: "Intuitive interface tailored for patients and healthcare providers.", color: "blue" },
              { icon: Star, title: "AI-Powered Insights", description: "Advanced algorithms providing personalized health recommendations.", color: "green" },
              { icon: Clock, title: "Real-Time Monitoring", description: "Continuous health tracking and instant alerts for critical changes.", color: "purple" },
              { icon: Shield, title: "Data Security", description: "State-of-the-art encryption and privacy measures to protect your data.", color: "red" },
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className={`bg-white p-6 rounded-lg shadow-md`}
                variants={cardVariants}
                whileHover="hover"
              >
                <feature.icon className={`w-12 h-12 text-${feature.color}-500 mb-4`} />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        <motion.section className="mb-12" variants={itemVariants}>
          <h2 className="text-3xl font-semibold mb-6 text-blue-900">User Ratings</h2>
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            variants={cardVariants}
            whileHover="hover"
          >
            <RatingChart ratings={ratings} onRatingClick={setSelectedRating} />
          </motion.div>
        </motion.section>
        
        <motion.section variants={itemVariants}>
          <h2 className="text-3xl font-semibold mb-6 text-blue-900">User Feedback</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredReviews.map((review, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white p-4 rounded-lg shadow-md"
                  variants={cardVariants}
                  whileHover="hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-2">
                    <h4 className="font-semibold mr-2 text-blue-600 text-sm">{review.name}</h4>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{review.comment}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.section>
        
        <motion.section className="mt-12" variants={itemVariants}>
          <h2 className="text-3xl font-semibold mb-6 text-blue-900">Leave Your Feedback</h2>
          <motion.form 
            onSubmit={handleSubmitComment} 
            className="bg-gradient-to-r from-blue-400 to-purple-500 p-6 rounded-lg shadow-md"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.textarea
              className="w-full p-3 border-2 border-blue-300 rounded-md mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ease-in-out bg-white bg-opacity-90"
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your experience with HealthSync..."
              required
              whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(129, 140, 248, 0.5)" }}
            />
            <motion.button
              type="submit"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-md font-semibold shadow-lg hover:from-yellow-500 hover:to-orange-600 transition duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Your Feedback
            </motion.button>
          </motion.form>
        </motion.section>
      </motion.main>
      <Footer />
    </div>
  )
}

