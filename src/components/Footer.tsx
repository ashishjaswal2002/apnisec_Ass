import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-black border-t border-gray-800 text-gray-400 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-white text-lg font-bold mb-4">ApniSec</h3>
                    <p className="text-sm">Securing the digital world, one vulnerability at a time.</p>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Services</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="hover:text-blue-400">Cloud Security</Link></li>
                        <li><Link href="#" className="hover:text-blue-400">VAPT</Link></li>
                        <li><Link href="#" className="hover:text-blue-400">Reteam Assessment</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="hover:text-blue-400">About Us</Link></li>
                        <li><Link href="#" className="hover:text-blue-400">Careers</Link></li>
                        <li><Link href="#" className="hover:text-blue-400">Contact</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-semibold mb-4">Stay Secure</h4>
                    <p className="text-sm mb-4">Subscribe to our newsletter for the latest security insights.</p>
                    <div className="flex">
                        <input type="email" placeholder="Enter email" className="bg-gray-900 border border-gray-700 rounded-l-md px-4 py-2 w-full text-white focus:outline-none focus:border-blue-500" />
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md">Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-sm">
                &copy; {new Date().getFullYear()} ApniSec. All rights reserved.
            </div>
        </footer>
    );
}
