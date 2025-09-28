# Raju - Affiliate Learning Platform

India's #1 affiliate learning platform. Join thousands of successful entrepreneurs building sustainable income streams through comprehensive digital marketing courses.

## Tech Stack

### Frontend
- **Framework**: Next.js 15.2.4 with React 19
- **UI Library**: Radix UI + Tailwind CSS + shadcn/ui
- **Styling**: Tailwind CSS with custom components
- **Animations**: Framer Motion
- **Package Manager**: Bun

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL (recommended) / SQLite (development)
- **ORM**: SQLAlchemy
- **Authentication**: JWT with passlib
- **API Documentation**: Auto-generated OpenAPI/Swagger

### Database Schema
- **Users**: Authentication, profiles, referral system
- **Courses**: Learning content, enrollment tracking
- **Payments**: Razorpay integration, transactions
- **Commissions**: Multi-level affiliate tracking

## Features

- **🔐 Authentication**: Secure JWT-based auth system
- **📚 Course Management**: Comprehensive learning platform
- **💰 Affiliate System**: Multi-level commission tracking
- **💳 Payment Integration**: Razorpay for Indian payments
- **📊 Analytics**: Earnings and performance tracking
- **📱 Responsive Design**: Mobile-first approach

## Getting Started

### Prerequisites
- Node.js 18+ and Bun
- Python 3.9+
- PostgreSQL (optional, can use SQLite for development)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd v0-affiliate-learning-platform
```

2. **Frontend Setup**
```bash
bun install
```

3. **Backend Setup**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

4. **Environment Configuration**
```bash
# Copy backend environment template
cd backend && cp .env.example .env
# Edit .env with your configuration

# For development with SQLite (default):
DATABASE_URL=sqlite:///./app.db

# For production with PostgreSQL:
DATABASE_URL=postgresql://username:password@localhost:5432/affiliate_platform
```

### Development

Start both frontend and backend in development mode:

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
python run.py
# Backend runs on http://localhost:8000
```

**Terminal 2 - Frontend:**
```bash
bun dev
# Frontend runs on http://localhost:3000
```

### API Documentation

Once the backend is running, visit:
- **API Docs**: http://localhost:8000/docs
- **API Health**: http://localhost:8000/health

## Package Options

- **Silver Package**: ₹2,950 - Access to 15+ courses
- **Gold Package**: ₹5,310 - Access to 25+ courses (Most Popular)
- **Platinum Package**: ₹8,850 - Access to all 35+ courses

## Database Choice Recommendation

**For Production: PostgreSQL** ✅ **STRONGLY RECOMMENDED**

For your affiliate learning platform with financial transactions:

**PostgreSQL Advantages:**
- **💰 Financial Safety**: Full ACID compliance for money operations
- **🔗 Relationships**: Perfect for user-course-commission data model
- **⚡ Performance**: Handles thousands of concurrent users
- **🔍 Search**: Full-text search for course content
- **🌐 Cloud Ready**: Available on all major platforms
- **🛡️ Data Integrity**: Foreign keys prevent orphaned records

**Quick Setup:**
```bash
# Neon (Free tier - Development)
DATABASE_URL=postgresql://user:pass@ep-xyz.neon.tech/neondb

# Railway (Production - $5/month)  
DATABASE_URL=postgresql://postgres:pass@containers-us-west-xyz.railway.app:5432/railway
```

**Other Options Comparison:**
- **SQLite**: ✅ Development only (single user, file-based)
- **MongoDB**: ❌ Wrong fit (no ACID, complex relationships)  
- **Turso**: ⚠️ Too new/risky (launched 2022)

👉 **See detailed comparison in `/backend/DATABASE_GUIDE.md`**

## Deployment

### Frontend (Vercel - Current)
The frontend is configured for Vercel deployment with `next.config.mjs`.

### Backend Options
1. **Railway** (Recommended)
2. **Render**
3. **DigitalOcean App Platform**
4. **AWS/GCP/Azure**

### Database Options
1. **Neon** (Serverless PostgreSQL)
2. **Railway PostgreSQL**
3. **Supabase** (Database only)
4. **PlanetScale**

## Migration from Supabase

✅ **Completed:**
- Removed all Supabase dependencies
- Created FastAPI backend structure
- Set up SQLAlchemy models
- Basic authentication endpoints
- Database initialization

🔄 **Next Steps:**
- Update frontend auth calls to use new API
- Implement JWT token management
- Add course and payment endpoints
- Set up database migrations with Alembic

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ for Indian entrepreneurs**
