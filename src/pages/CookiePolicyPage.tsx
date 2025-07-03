import React from 'react';
import { Cookie, Info, Shield, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const CookiePolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Cookie
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Policy</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Last updated: March 15, 2025
          </motion.p>
        </div>
      </section>

      {/* Cookie Policy Summary */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Cookie className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
              Cookie Policy Summary
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Essential Cookies:</strong> We use cookies necessary for the functioning of our website and service.
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Preference Cookies:</strong> We use cookies to remember your preferences and settings.
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Analytics Cookies:</strong> We use cookies to understand how you use our service.
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Cookie Control:</strong> You can control and delete cookies through your browser settings.
                </p>
              </div>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2>1. Introduction</h2>
            <p>
              This Cookie Policy explains how VizMind ("we", "our", or "us") uses cookies and similar technologies to recognize you when you visit our website and use our analytics platform (the "Service"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>
            
            <h2>2. What Are Cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
            <p>
              Cookies set by the website owner (in this case, VizMind) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).
            </p>
            
            <h2>3. Why Do We Use Cookies?</h2>
            <p>
              We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Service to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our Service. Third parties serve cookies through our Service for analytics and other purposes.
            </p>
            
            <h2>4. Types of Cookies We Use</h2>
            
            <h3>4.1 Essential Cookies</h3>
            <p>
              These cookies are strictly necessary to provide you with services available through our Service and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the Service, you cannot refuse them without impacting how our Service functions.
            </p>
            <p>
              Examples of essential cookies we use:
            </p>
            <ul>
              <li>Authentication cookies to identify you when you log in</li>
              <li>Session cookies to operate our Service</li>
              <li>Security cookies to prevent fraud and protect our Service</li>
            </ul>
            
            <h3>4.2 Preference Cookies</h3>
            <p>
              These cookies allow us to remember choices you make when you use our Service, such as remembering your login details, language preference, or your dark/light mode setting. The purpose of these cookies is to provide you with a more personal experience and to avoid you having to re-enter your preferences every time you visit our Service.
            </p>
            
            <h3>4.3 Analytics Cookies</h3>
            <p>
              These cookies collect information that is used either in aggregate form to help us understand how our Service is being used or how effective our marketing campaigns are, or to help us customize our Service for you.
            </p>
            <p>
              We use analytics cookies from:
            </p>
            <ul>
              <li>Google Analytics to understand how users interact with our Service</li>
              <li>Mixpanel to track user interactions and feature usage</li>
            </ul>
            
            <h2>5. How Can You Control Cookies?</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by following the instructions provided in your browser's "help" file or by visiting websites such as <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
            </p>
            <p>
              Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you. It may also stop you from saving customized settings like login information.
            </p>
            
            <h2>6. What About Other Tracking Technologies?</h2>
            <p>
              Cookies are not the only way to recognize or track visitors to a website. We may use other, similar technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These are tiny graphics files that contain a unique identifier that enables us to recognize when someone has visited our Service. This allows us, for example, to monitor the traffic patterns of users from one page within our Service to another, to deliver or communicate with cookies, to understand whether you have come to our Service from an online advertisement displayed on a third-party website, to improve site performance, and to measure the success of email marketing campaigns.
            </p>
            
            <h2>7. Do You Serve Targeted Advertising?</h2>
            <p>
              We do not serve targeted advertising on our Service and do not use cookies for this purpose.
            </p>
            
            <h2>8. How Often Will You Update This Cookie Policy?</h2>
            <p>
              We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>
            <p>
              The date at the top of this Cookie Policy indicates when it was last updated.
            </p>
            
            <h2>9. Where Can I Get Further Information?</h2>
            <p>
              If you have any questions about our use of cookies or other technologies, please email us at sathyaedu119@gmail.com.
            </p>
          </div>
        </div>
      </section>

      {/* Cookie Management */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg mr-4 flex-shrink-0">
                <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Managing Your Cookie Preferences
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  You can manage your cookie preferences at any time by adjusting the settings in your browser. Here's how to do it in common browsers:
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                  <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Commitment */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Our Privacy Commitment
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              At VizMind, we're committed to transparency and giving you control over your data. 
              Our cookie usage is designed to enhance your experience while respecting your privacy.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white">
              <span className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4 mr-2" />
                Transparent Practices
              </span>
              <span className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                <Cookie className="w-4 h-4 mr-2" />
                Minimal Cookie Usage
              </span>
              <span className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 mr-2" />
                User Control
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};