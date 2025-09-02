#!/bin/bash

# Exit on any error
set -e

echo "Starting build process..."

# Navigate to frontend directory
cd frontend

# Clean install dependencies
echo "Installing frontend dependencies..."
npm ci

# Build the frontend
echo "Building frontend..."
npm run build

echo "Build completed successfully!"

