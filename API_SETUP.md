# API Setup Guide

This application uses external APIs for the Entertainment and Health features. To make these features work properly, you need to set up API keys.

## Required API Keys

### 1. TMDB API (Entertainment/Movies)
- **Purpose**: Fetch movie information and details
- **Get API Key**: Visit [TMDB API Settings](https://www.themoviedb.org/settings/api)
- **Cost**: Free
- **Environment Variable**: `VITE_TMDB_API_KEY`

### 2. Nutritionix API (Health/Nutrition)
- **Purpose**: Fetch nutritional information for foods
- **Get API Keys**: Visit [Nutritionix API](https://www.nutritionix.com/business/api)
- **Cost**: Free tier available
- **Environment Variables**: 
  - `VITE_NUTRITIONIX_APP_ID`
  - `VITE_NUTRITIONIX_APP_KEY`

## Setup Instructions

1. Create a `.env` file in the root directory of your project
2. Add your API keys to the `.env` file:

```env
# TMDB API Key for Movie Entertainment
VITE_TMDB_API_KEY=your_actual_tmdb_api_key

# Nutritionix API Keys for Health & Nutrition
VITE_NUTRITIONIX_APP_ID=your_actual_nutritionix_app_id
VITE_NUTRITIONIX_APP_KEY=your_actual_nutritionix_app_key
```

3. Restart your development server after adding the environment variables

## Features Status

- **Finance**: ✅ Works without API keys (uses local data)
- **Entertainment**: ⚠️ Requires TMDB API key
- **Health**: ⚠️ Requires Nutritionix API keys