import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail, MapPin, Phone } from 'lucide-react';

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
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="flex items-baseline space-x-1">
                <h1 className="text-xl font-black tracking-tight text-white">
                  VIZMIND
                </h1>
                <span className="text-xs font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                  BETA
                </span>
              </div>
            </Link>
            
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering businesses with AI-powered analytics and data visualization tools 
              that transform raw data into actionable insights. Your data stays private and secure.
            </p>
            
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Hyderabad, TS, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 8688057190</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>hello@vizmind.com</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0 font-medium">
              © 2025 VizMind Analytics. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="https://twitter.com/vizmind"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/vizmind"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/vizmind"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@vizmind.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};