import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface Rating {
  name: string
  value: number
}

interface RatingChartProps {
  ratings: Rating[]
  onRatingClick: (rating: number) => void
}

const RatingChart: React.FC<RatingChartProps> = ({ ratings, onRatingClick }) => {
  const totalRatings = ratings.reduce((sum, rating) => sum + rating.value, 0)

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-2 mb-4">
        {[5, 4, 3, 2, 1].map((star) => (
          <motion.button
            key={star}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onRatingClick(star)}
          >
            <Star className="w-8 h-8 text-yellow-400 fill-current" />
          </motion.button>
        ))}
      </div>
      {ratings.map((rating, index) => (
        <div key={index} className="flex items-center space-x-4">
          <span className="w-16 text-right">{rating.name}</span>
          <div className="flex-grow bg-gray-200 rounded-full h-4 overflow-hidden">
            <motion.div
              className="bg-yellow-400 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${(rating.value / totalRatings) * 100}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
            />
          </div>
          <span className="w-16">{rating.value}</span>
        </div>
      ))}
    </div>
  )
}

export default RatingChart

