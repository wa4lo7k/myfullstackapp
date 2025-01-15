import React from 'react'

const activities = [
  { id: 1, user: 'John Doe', action: 'Created an appointment', time: '2 hours ago' },
  { id: 2, user: 'Jane Smith', action: 'Updated patient records', time: '4 hours ago' },
  { id: 3, user: 'Mike Johnson', action: 'Completed telemedicine session', time: '1 day ago' },
  { id: 4, user: 'Emily Brown', action: 'Registered as a new patient', time: '2 days ago' },
]

export default function RecentActivity() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Recent Activity</h2>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {activities.map((activity) => (
          <li key={activity.id} className="py-4">
            <div className="flex space-x-3">
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">{activity.user}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{activity.action}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

