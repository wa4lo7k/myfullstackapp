export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="mb-2">Email: info@healthsync.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
          <p className="mb-2">Stay updated with our latest news and offers.</p>
          <div className="flex">
            <input type="email" placeholder="Your email" className="p-2 w-full rounded-l-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-center text-sm">
        <p>&copy; 2025 HealthSync. All rights reserved.</p>
      </div>
    </footer>
  )
}

