# Database Setup Guide

## 🏆 Recommended: PostgreSQL

For the Raju Affiliate Learning Platform, **PostgreSQL is strongly recommended** due to:

- ✅ **ACID Transactions** - Critical for financial operations
- ✅ **Relational Data** - Perfect for user-course-commission relationships
- ✅ **Performance** - Handles concurrent users efficiently  
- ✅ **Mature Ecosystem** - 25+ years of development
- ✅ **Cloud Support** - Available on all major platforms

## Quick Setup Options

### Option 1: Neon (Recommended for Development)
```bash
# 1. Sign up at https://neon.tech (Free 512MB)
# 2. Create a database
# 3. Copy connection string

# Update your .env file:
DATABASE_URL=postgresql://username:password@ep-xyz.neon.tech/neondb
```

### Option 2: Railway (Recommended for Production)
```bash
# 1. Sign up at https://railway.app
# 2. Create PostgreSQL service ($5/month)
# 3. Deploy your FastAPI alongside it

DATABASE_URL=postgresql://postgres:password@containers-us-west-xyz.railway.app:5432/railway
```

### Option 3: Local PostgreSQL
```bash
# Docker (Easiest)
docker run --name postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=affiliate_platform \
  -p 5432:5432 -d postgres:15

# Native Installation
# macOS: brew install postgresql
# Ubuntu: sudo apt install postgresql

DATABASE_URL=postgresql://postgres:password@localhost:5432/affiliate_platform
```

### Option 4: SQLite (Development Only)
```bash
# Quick start for testing
DATABASE_URL=sqlite:///./app.db
```

## Database Comparison

### PostgreSQL ✅ RECOMMENDED
**Perfect for financial platforms**

**Use when:**
- Handling money/transactions ✅
- Need complex relationships ✅  
- Multiple concurrent users ✅
- Production deployment ✅

**Pros:**
- ACID compliance for financial safety
- Excellent performance with indexing
- Rich data types (JSON, arrays)
- Full-text search capabilities
- Mature tooling and community

**Cons:**
- Requires setup (solved by cloud providers)
- Slightly more complex than SQLite

### MongoDB ❌ NOT RECOMMENDED
**Wrong fit for this platform**

**Issues for your use case:**
- No ACID across collections (dangerous for money)
- No foreign keys (data integrity problems)
- Complex aggregation for reporting
- Overkill for structured affiliate data

**Only consider if:**
- Building a content-heavy platform
- Need extreme flexibility
- Document-based data model

### Turso ⚠️ INTERESTING BUT RISKY
**Modern but unproven**

**Pros:**
- SQLite compatibility
- Edge deployment
- Good performance

**Cons:**
- Very new (2022)
- Small ecosystem
- Vendor lock-in risk
- Limited production track record

## Migration Commands

### From SQLite to PostgreSQL
```bash
# 1. Export SQLite data
sqlite3 app.db .dump > backup.sql

# 2. Convert to PostgreSQL format
# Edit backup.sql to fix SQLite-specific syntax

# 3. Import to PostgreSQL
psql $DATABASE_URL < backup.sql
```

### From Supabase to Your PostgreSQL
```bash
# 1. Export from Supabase dashboard
# 2. Import to new PostgreSQL instance
pg_restore -d $DATABASE_URL backup.dump
```

## Environment Setup

### Development (.env)
```bash
# Quick start with SQLite
DATABASE_URL=sqlite:///./app.db

# Or use cloud PostgreSQL for realistic testing
DATABASE_URL=postgresql://username:password@ep-xyz.neon.tech/neondb
```

### Production (.env)
```bash
# Use managed PostgreSQL
DATABASE_URL=postgresql://postgres:password@production-host:5432/affiliate_platform

# Enable optimizations
DATABASE_POOL_SIZE=20
DATABASE_MAX_OVERFLOW=30
```

## Performance Tips

### Indexing Strategy
```sql
-- Essential indexes for your platform
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_referral_code ON users(referral_code);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_commissions_user_id ON commissions(user_id);
CREATE INDEX idx_course_enrollments_user_course ON course_enrollments(user_id, course_id);
```

### Connection Pooling
```python
# In production, use connection pooling
DATABASE_POOL_SIZE=20
DATABASE_MAX_OVERFLOW=30
```

## Cost Comparison

| Provider | Free Tier | Paid Plans | Best For |
|----------|-----------|------------|----------|
| **Neon** | 512MB | $19/month | Development |
| **Railway** | None | $5/month | Production |
| **Supabase** | 500MB | $25/month | Full-stack |
| **PlanetScale** | 1GB | $29/month | Scale |

## Final Recommendation

**For Raju Platform: Use PostgreSQL with Neon**

1. **Development**: Neon free tier (512MB)
2. **Production**: Railway PostgreSQL ($5/month)
3. **Fallback**: SQLite for quick local testing

This gives you the perfect balance of:
- Financial transaction safety
- Performance for concurrent users  
- Cost-effectiveness
- Easy deployment