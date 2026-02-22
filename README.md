# User Management App

A React application built for the LinkPlus internship challenge.

## Tech Stack
- React + TypeScript
- Redux Toolkit (state management)
- React Router (navigation)
- Axios (API calls)
- Tailwind CSS (styling)

## Features
- List users fetched from API
- Search by name or email (debounced)
- Sort by name or email
- User detail page
- Add new user with validation
- Delete user
- Update user

## Performance
- useDebounce on search (300ms)
- useMemo on filtering and sorting
- React.memo on UserCard
- useCallback on all handlers

## Architecture
- SOLID principles
- Repository pattern (service layer)
- Custom hooks
- Clean folder structure

## Run Locally
npm install
npm run dev