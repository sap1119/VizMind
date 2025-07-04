import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider, useData } from './contexts/DataContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { AuthModal } from './components/auth/AuthModal';
import { WorkflowSidebar } from './components/layout/WorkflowSidebar';
import { Header } from './components/layout/Header';
import { DataUploadStep } from './components/workflow/DataUploadStep';
import { DashboardStep } from './components/workflow/DashboardStep';
import { KPIStep } from './components/workflow/KPIStep';
import { PortfolioStep } from './components/workflow/PortfolioStep';
import { TrendAnalysisStep } from './components/workflow/TrendAnalysisStep';
import { AnalyticsReportStep } from './components/workflow/AnalyticsReportStep';
import { SettingsPage } from './components/settings/SettingsPage';
import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { TeamPage } from './pages/TeamPage';
import { BlogPage } from './pages/BlogPage';
import { NewsPage } from './pages/NewsPage';
import { CareersPage } from './pages/CareersPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { CommunityPage } from './pages/CommunityPage';
import { StatusPage } from './pages/StatusPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { SecurityPage } from './pages/SecurityPage';
import { AnalyticsPlatformPage } from './pages/AnalyticsPlatformPage';
import { ApiDocsPage } from './pages/ApiDocsPage';

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <img 
                src="/VizMind Logo - Flat Vector Style.png" 
                alt="VIZMINDS Logo" 
                className="w-8 h-8"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We're sorry, but there was an error loading the application.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Marketing Layout Component
const MarketingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
};

// Analytics App Layout Component
const AnalyticsAppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      <WorkflowSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading VIZMINDS...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};


// Main App Content
const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();

  // Handle auth modal for marketing pages
  useEffect(() => {
    if (location.pathname === '/auth' && !user) {
      setShowAuthModal(true);
    } else {
      setShowAuthModal(false);
    }
  }, [location.pathname, user]);

  return (
    <>
      <Routes>
        {/* Marketing Website Routes - Always accessible to everyone */}
        <Route path="/" element={
          <MarketingLayout>
            <HomePage />
          </MarketingLayout>
        } />
        
        <Route path="/home" element={
          <MarketingLayout>
            <HomePage />
          </MarketingLayout>
        } />
        
        <Route path="/features" element={
          <MarketingLayout>
            <FeaturesPage />
          </MarketingLayout>
        } />
        
        <Route path="/pricing" element={
          <MarketingLayout>
            <PricingPage />
          </MarketingLayout>
        } />
        
        <Route path="/about" element={
          <MarketingLayout>
            <AboutPage />
          </MarketingLayout>
        } />
        
        <Route path="/team" element={
          <MarketingLayout>
            <TeamPage />
          </MarketingLayout>
        } />
        
        <Route path="/blog" element={
          <MarketingLayout>
            <BlogPage />
          </MarketingLayout>
        } />
        
        <Route path="/blog/:id" element={
          <MarketingLayout>
            <BlogPage />
          </MarketingLayout>
        } />
        
        <Route path="/news" element={
          <MarketingLayout>
            <NewsPage />
          </MarketingLayout>
        } />
        
        <Route path="/careers" element={
          <MarketingLayout>
            <CareersPage />
          </MarketingLayout>
        } />
        
        <Route path="/help" element={
          <MarketingLayout>
            <HelpCenterPage />
          </MarketingLayout>
        } />
        
        <Route path="/community" element={
          <MarketingLayout>
            <CommunityPage />
          </MarketingLayout>
        } />
        
        <Route path="/status" element={
          <MarketingLayout>
            <StatusPage />
          </MarketingLayout>
        } />
        
        <Route path="/privacy" element={
          <MarketingLayout>
            <PrivacyPolicyPage />
          </MarketingLayout>
        } />
        
        <Route path="/terms" element={
          <MarketingLayout>
            <TermsOfServicePage />
          </MarketingLayout>
        } />
        
        <Route path="/cookies" element={
          <MarketingLayout>
            <CookiePolicyPage />
          </MarketingLayout>
        } />
        
        <Route path="/security" element={
          <MarketingLayout>
            <SecurityPage />
          </MarketingLayout>
        } />

        <Route path="/analytics-platform" element={
          <MarketingLayout>
            <AnalyticsPlatformPage />
          </MarketingLayout>
        } />
        
        <Route path="/api-docs" element={
          <MarketingLayout>
            <ApiDocsPage />
          </MarketingLayout>
        } />
        
        {/* Auth Route - Shows home page for non-authenticated users */}
        <Route path="/auth" element={
          user ? <Navigate to="/dashboard" /> : (
            <MarketingLayout>
              <HomePage />
            </MarketingLayout>
          )
        } />
        
        {/* Analytics App Routes - ONLY accessible when signed in */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AnalyticsAppLayout>
              <DataUploadStep />
            </AnalyticsAppLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/view" element={
          <ProtectedRoute>
            <AnalyticsAppLayout>
              <DashboardStep />
            </AnalyticsAppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/kpi" element={
          <ProtectedRoute>
            <AnalyticsAppLayout>
              <KPIStep />
            </AnalyticsAppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/portfolio" element={
          <ProtectedRoute>
            <AnalyticsAppLayout>
              <PortfolioStep />
            </AnalyticsAppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/trends" element={
          <ProtectedRoute>
            <AnalyticsAppLayout>
              <TrendAnalysisStep />
            </AnalyticsAppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/report" element={
          <ProtectedRoute>
            <AnalyticsAppLayout>
              <AnalyticsReportStep />
            </AnalyticsAppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/settings" element={
          <ProtectedRoute>
            <AnalyticsAppLayout>
              <SettingsPage />
            </AnalyticsAppLayout>
          </ProtectedRoute>
        } />
        
        {/* Catch all route - redirect to home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Auth Modal for marketing pages */}
      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => {
            setShowAuthModal(false);
            if (location.pathname === '/auth') {
              window.history.back();
            }
          }} 
        />
      )}
    </>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <Router>
              <div className="App">
                <AppContent />
                <Toaster 
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                  }}
                />
              </div>
            </Router>
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
