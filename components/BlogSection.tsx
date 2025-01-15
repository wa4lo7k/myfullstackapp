'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const blogPosts = [
  {
    title: "The Future of AI in Healthcare",
    excerpt: "Discover how artificial intelligence is revolutionizing patient care and diagnosis.",
    image: "/images/blog-post-1.jpg",
    date: "May 15, 2023"
  },
  {
    title: "Nutrition Tips for a Healthy Heart",
    excerpt: "Learn about the best foods to eat for maintaining a healthy cardiovascular system.",
    image: "/images/blog-post-2.jpg",
    date: "May 10, 2023"
  },
  {
    title: "The Importance of Mental Health Awareness",
    excerpt: "Explore the growing need for mental health support and available resources.",
    image: "/images/blog-post-3.jpg",
    date: "May 5, 2023"
  },
  {
    title: "Advancements in Telemedicine",
    excerpt: "How virtual consultations are changing the landscape of healthcare delivery.",
    image: "/images/blog-post-4.jpg",
    date: "May 1, 2023"
  }
]

export default function BlogSection() {
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

  return (
    <motion.section 
      className="py-16 bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          variants={itemVariants}
        >
          Latest Healthcare Insights
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Image 
                src={post.image || "/placeholder.svg"} 
                alt={post.title} 
                width={300} 
                height={200} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <motion.a 
                    href="#" 
                    className="text-blue-600 hover:underline"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Read More
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

