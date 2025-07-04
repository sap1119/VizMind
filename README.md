# VizMind - AI-Powered Data Analytics Platform

![VizMind Logo](https://via.placeholder.com/800x200/3B82F6/FFFFFF?text=VizMind+Analytics)

## 🚀 Overview

VizMind is a comprehensive, AI-powered data analytics platform that transforms raw CSV data into actionable insights through a guided 6-step workflow. Built with React, TypeScript, and Supabase, it offers enterprise-grade analytics capabilities with a beautiful, intuitive interface.

## ✨ Features

### 🔄 Complete Analytics Workflow
1. **Data Upload** - Smart CSV parsing with AI-powered insights
2. **Dashboard Creation** - Auto-generated interactive visualizations
3. **KPI Tracking** - Performance indicators with intelligent targets
4. **Portfolio Analysis** - Investment portfolio management and analysis
5. **Trend Analysis** - Predictive analytics with anomaly detection
6. **Complete Reports** - Downloadable comprehensive analytics reports

### 🎨 Premium User Experience
- **Dark/Light Theme** - Seamless theme switching with persistence
- **Responsive Design** - Optimized for all devices and screen sizes
- **Professional UI** - Apple-level design aesthetics with micro-interactions
- **Real-time Updates** - Live data synchronization and notifications
- **Premium Settings** - Comprehensive user profile and account management

### 🔐 Enterprise Security
- **Supabase Authentication** - Secure user authentication and authorization
- **Row Level Security** - Database-level security policies
- **Data Encryption** - Industry-standard data protection
- **Premium Account Management** - Full user profile and settings control

### 📊 Advanced Analytics
- **AI Question Answering** - Natural language data queries
- **Anomaly Detection** - Automated pattern recognition
- **Predictive Modeling** - Future trend forecasting
- **Interactive Visualizations** - Charts, graphs, and data tables
- **Export Capabilities** - Download reports in multiple formats

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with dark mode
- **Framer Motion** - Smooth animations and transitions
- **Recharts** - Interactive data visualizations
- **React Router** - Client-side routing
- **React Hook Form** - Form management and validation

### Backend & Database
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **Row Level Security** - Database-level access control
- **Real-time Subscriptions** - Live data updates
- **File Storage** - Secure file upload and management

### Development Tools
- **Vite** - Fast development server and build tool
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization
- **Papa Parse** - CSV parsing and data processing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for database)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/vizmind-analytics.git
cd vizmind-analytics
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env
```

4. **Configure Supabase**
- Create a new Supabase project
- Update `.env` with your Supabase URL and keys
- Run the database migrations

5. **Start development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to `http://localhost:5173`

## 📁 Project Structure

```
vizmind-analytics/
├── src/
│   ├── components/          # React components
│   │   ├── auth/           # Authentication components
│   │   ├── dashboard/      # Dashboard builder
│   │   ├── layout/         # Layout components
│   │   ├── settings/       # Settings and profile
│   │   └── workflow/       # 6-step workflow components
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.tsx # Authentication state
│   │   ├── DataContext.tsx # Data workflow state
│   │   └── ThemeContext.tsx # Theme management
│   ├── lib/               # Utilities and configurations
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Helper functions
├── supabase/
│   └── migrations/        # Database schema migrations
├── public/               # Static assets
└── dist/                # Production build output
```

## 🔧 Configuration

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup
The project includes comprehensive database migrations for:
- User profiles and authentication
- Dataset storage and management
- Dashboard configurations
- KPI tracking
- Portfolio management
- Sample data templates

## 🎯 Usage

### Demo Account
For quick testing, use the demo account:
- **Email:** demo@vizmind.com
- **Password:** demo123

### Workflow Steps

1. **Upload Data** - Start by uploading a CSV file
2. **Create Dashboard** - Auto-generated visualizations
3. **Define KPIs** - Set up performance tracking
4. **Analyze Portfolio** - Investment analysis tools
5. **Trend Analysis** - Predictive insights
6. **Generate Report** - Download comprehensive analytics

## 🚀 Deployment

### Netlify (Recommended)
```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** - Backend infrastructure
- **Tailwind CSS** - Styling framework
- **Recharts** - Data visualization library
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## 📞 Support

For support, email vizminds.help@gmail.com or join our [Discord community](https://discord.gg/vizmind).

## 🔗 Links

- **Live Demo:** [https://vizmind-analytics.netlify.app](https://vizmind-analytics.netlify.app)
- **site:** (https://vizmind.net)

---

**Built with ❤️ by the VizMind Team**

*Transform your data into actionable insights with VizMind's AI-powered analytics platform.*
