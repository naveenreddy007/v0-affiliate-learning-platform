#!/bin/bash

echo "🚀 Setting up Raju Affiliate Learning Platform"
echo "=============================================="

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Bun not found. Please install Bun first: https://bun.sh/"
    exit 1
fi

# Check if python3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 not found. Please install Python 3.9+."
    exit 1
fi

echo "📦 Installing frontend dependencies..."
bun install

echo "🐍 Setting up Python backend..."
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment and install dependencies
echo "📚 Installing Python dependencies..."
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# Copy environment file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "📄 Created .env file. Please edit it with your configuration."
else
    echo "📄 .env file already exists."
fi

cd ..

echo "✅ Setup complete!"
echo ""
echo "🚀 To start development:"
echo "  Frontend + Backend: bun run dev:full"
echo "  Frontend only:      bun dev"
echo "  Backend only:       bun run dev:backend"
echo ""
echo "📚 Visit http://localhost:8000/docs for API documentation"
echo "🌐 Visit http://localhost:3000 for the frontend"