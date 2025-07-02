import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail, MapPin, Phone, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const footerLinks = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Analytics Platform', href: '/analytics' },
      { name: 'API Documentation', href: '/docs' }
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Team', href: '/team' },
      { name: 'Careers', href: '/careers' },
      { name: 'News', href: '/news' }
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Help Center', href: '/help' },
      { name: 'Community', href: '/community' },
      { name: 'Status', href: '/status' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Security', href: '/security' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Enhanced Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-8 group">
              <div className="relative">
                <img 
                  src="/VizMind Logo - Flat Vector Style.png" 
                  alt="VizMind Logo" 
                  className="w-12 h-12 group-hover:scale-110 transition-transform"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity blur"></div>
              </div>
              <div className="flex items-baseline space-x-2">
                <h1 className="text-2xl font-black tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  VIZMIND
                </h1>
                <div className="flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" />
                  <span className="text-xs font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    BETA
                  </span>
                </div>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
              Empowering businesses with AI-powered analytics and data visualization tools 
              that transform raw data into actionable insights. Your data stays private and secure.
            </p>
            
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center space-x-3 group hover:text-blue-400 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">Hyderabad, TS, India</span>
              </div>
              <div className="flex items-center space-x-3 group hover:text-blue-400 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">+91 8688057190</span>
              </div>
              <div className="flex items-center space-x-3 group hover:text-blue-400 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">hello@vizmind.com</span>
              </div>
            </div>
          </div>

          {/* Enhanced Link Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xl font-bold mb-6 text-white capitalize">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white transition-colors font-medium text-lg hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Enhanced Bottom Section */}
        <div className="border-t border-gray-700 mt-16 pt-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-300 text-lg mb-6 md:mb-0 font-medium">
              <span>© 2025 VizMind Analytics. All rights reserved.</span>
              <span className="text-red-400">•</span>
              <span className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-400 fill-current" />
                <span>in India</span>
              </span>
            </div>
            
            {/* Enhanced Social Links */}
            <div className="flex items-center space-x-4">
              {[
                { icon: Twitter, href: 'https://twitter.com/vizmind', label: 'Twitter', color: 'from-blue-400 to-blue-600' },
                { icon: Linkedin, href: 'https://linkedin.com/company/vizmind', label: 'LinkedIn', color: 'from-blue-600 to-blue-800' },
                { icon: Github, href: 'https://github.com/vizmind', label: 'GitHub', color: 'from-gray-600 to-gray-800' },
                { icon: Mail, href: 'mailto:hello@vizmind.com', label: 'Email', color: 'from-purple-500 to-pink-600' }
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="group relative"
                    aria-label={social.label}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity blur"></div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};