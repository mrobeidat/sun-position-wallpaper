# Sun Position Wallpaper Selector

A TypeScript application that selects a wallpaper based on the sun's position for a given time and coordinates.

## Features

- Selects appropriate wallpaper based on sun position
- Uses TypeScript for type safety
- Implements Zod for input validation
- Fetches real-time sunrise/sunset data from sunrise-sunset.org API

## Setup

### Install dependencies

```bash
npm install
```

### Setup environment variables

Create a `.env` file in the root directory with the following variables:

```env
LATITUDE=31.9544
LONGITUDE=35.9106
SUN_API_URL=https://api.sunrise-sunset.org/json
```

## Usage

### Using npm scripts

```bash
npm start -- <latitude> <longitude>            # Current time
npm run example                                # Run with example coordinates (Amman)
npm run example:time                           # Run with example time
```

### Using Docker

```bash
# Build Docker image
docker build -t sun-wallpaper .

# Run with default coordinates (Amman, Jordan)
docker run sun-wallpaper

# Run with custom coordinates (e.g., New York City)
docker run sun-wallpaper 40.7128 -74.0060

# Run with specific date and time
docker run sun-wallpaper 31.9544 35.9106 2025-03-18 17:00
```

### Direct execution

```bash
# Using ts-node
ts-node src/index.ts <latitude> <longitude>                    # Current time
ts-node src/index.ts <latitude> <longitude> <YYYY-MM-DD> <HH:MM> # Specific date & time
```

### Example coordinates (Amman, Jordan)

```bash
npm start -- 31.9544 35.9106
```

## Output

The application will output one of these wallpapers based on sun position:

- `morning.png` → Early daylight (10-50% of daylight period)
- `sunrise.png` → Early morning (first 10% of daylight period)
- `noon.png` → Midday (50-80% of daylight period)
- `evening.png` → Late afternoon (80-90% of daylight period)
- `sunset.png` → Sun setting (last 10% of daylight period)
- `night.png` → Sun below horizon (before sunrise or after sunset)

## How It Works

The application:

1. Takes latitude, longitude, and optional date/time as input
2. Fetches sunrise and sunset times from the sunrise-sunset.org API
3. Calculates the current time's position relative to sunrise and sunset
4. Selects the appropriate wallpaper based on this position

## Testing

```bash
# Run tests locally
npm test

# Run tests in Docker
docker build -t sun-wallpaper-test -f Dockerfile.test .
docker run sun-wallpaper-test
```

---
