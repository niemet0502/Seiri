# Seiri Mobile App

A React Native mobile application built with Expo for managing projects, tasks, and notes.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (macOS only) or Android Emulator

## Installation

```bash
cd mobile
npm install
```

## Configuration

Before running the app, configure the API base URL in `src/config/api.ts`. See [API_CONFIG.md](./API_CONFIG.md) for detailed instructions.

## Running the App

### Start the development server
```bash
npx expo start
```

### Run on iOS Simulator (macOS only)
```bash
npm run ios
```

### Run on Android Emulator
```bash
npm run android
```

### Run on Web
```bash
npm run web
```

## Project Structure

```
mobile/
├── src/
│   ├── config/          # Configuration files
│   ├── contexts/        # React contexts (Auth, QueryClient)
│   ├── hooks/           # Custom React hooks (useProjects, useTasks, useNotes)
│   ├── services/        # API client
│   ├── theme/           # Theme configuration (colors, spacing, typography)
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions (storage, date)
├── App.tsx              # Main app entry point
└── package.json
```

## Features

- **Authentication**: Login and signup with JWT token storage
- **Projects**: Create, view, update, and delete projects
- **Tasks**: Manage tasks with sub-tasks, due dates, and completion status
- **Notes**: Create and edit notes with markdown support
- **Offline-first**: Data caching with TanStack Query

## Tech Stack

- **Framework**: Expo / React Native
- **Language**: TypeScript
- **State Management**: TanStack Query (React Query)
- **Navigation**: React Navigation
- **Storage**: Expo SecureStore
- **HTTP Client**: Axios
- **Forms**: React Hook Form

## Development

The app uses TanStack Query for data fetching and caching. All API calls are centralized in `src/services/ApiClient.ts`, and React Query hooks are organized by feature in the `src/hooks/` directory.

## Next Steps

1. Configure the API URL in `src/config/api.ts`
2. Implement navigation and screens
3. Build UI components
4. Test on iOS and Android devices
