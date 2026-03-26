# Flexoraa Studio Frontend UI

This represents the production-ready frontend for Flexoraa Studio. 
It has been modernized to decouple pure UI presentation from business logic using a centralized `Service` and `Hook` layer architecture.

## Tech Stack
- **Framework**: Next.js 15
- **Styling**: Tailwind CSS + `shadcn/ui` components
- **Charts**: Recharts
- **State Management Layer**: React Custom Hooks mapping to Services
- **Icons**: Lucide React

## Project Architecture

We follow a strict separation of concerns strategy.
- `/src/components/*`: Reusable, pure UI components. Components do not fetch or manipulate business state.
- `/src/services/*`: API wrappers and business logic layers targeting remote services (e.g. `analyticsService.ts`, `agentService.ts`).
- `/src/hooks/*`: The glue layer. Custom React Query-style wrapper hooks (`useDataFetch.ts`) that components call to receive uniform `{ data, isLoading, error }` states.
- `/src/config/*`: Centralized environment (`env.ts`) and global constants.

## Setup & Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Setup Environment config**
   Copy `.env.example` to `.env` and fill in your Firebase and backend API credentials.
   ```bash
   cp .env.example .env
   ```
3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:9002` (or the port shown in your terminal) to view the application.

## The Mock API Layer

During development, the `/services/apiClient.ts` has a feature flag `USE_MOCK_API`. 
When set to `true`, the UI receives rich randomized data from `/services/mockData.ts` and simulates network latencies (400ms) to trigger smooth loading skeletons without relying on a full backend deployment.

When your backend is ready, simply switch `USE_MOCK_API = false` in `apiClient.ts`, and the entire application will dynamically route to your `NEXT_PUBLIC_API_URL`.
