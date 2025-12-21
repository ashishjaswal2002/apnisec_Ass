import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-black pt-32 pb-16 lg:pt-48 lg:pb-32">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black opacity-60"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Limitless Security</span><br />
              For The Modern Web
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 mb-10">
              ApniSec provides enterprise-grade cybersecurity solutions including VAPT, Cloud Security, and Reteam Assessments. Protect what matters most.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/register" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]">
                Get Protected
              </Link>
              <Link href="#features" className="px-8 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm border border-white/10">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Our Core Services
              </h2>
              <p className="mt-4 text-gray-400">
                Comprehensive security solutions tailored to your infrastructure.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Feature 1 */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-blue-500/50 transition-all hover:scale-105 duration-300 group">
                <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <svg className="w-6 h-6 text-blue-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Cloud Security</h3>
                <p className="text-gray-400">Secure your cloud infrastructure across AWS, Azure, and GCP with our advanced monitoring and compliance tools.</p>
              </div>
              {/* Feature 2 */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-purple-500/50 transition-all hover:scale-105 duration-300 group">
                <div className="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                  <svg className="w-6 h-6 text-purple-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">VAPT</h3>
                <p className="text-gray-400">Vulnerability Assessment and Penetration Testing to identify and fix weaknesses before attackers exploit them.</p>
              </div>
              {/* Feature 3 */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-green-500/50 transition-all hover:scale-105 duration-300 group">
                <div className="w-12 h-12 bg-green-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                  <svg className="w-6 h-6 text-green-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Reteam Assessment</h3>
                <p className="text-gray-400">Simulate real-world attacks to test your organization's detection and response capabilities.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
