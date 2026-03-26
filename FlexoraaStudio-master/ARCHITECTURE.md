# Flexoraa Studio - Frontend Architecture

This document describes the flow of data within the refactored Flexoraa Studio frontend application. The main goal of this architecture is to ensure scalability by decoupling the component presentation layer from the API retrieval logic.

## Data Flow Diagram

```text
[UI COMPONENT] 
      │ (calls hook)
      ▼
[CUSTOM HOOK] (e.g., useDataFetch)
      │ (returns loading/error state instantly)
      │ (delegates request)
      ▼
[SERVICE LAYER] (e.g., analyticsService.getCampaignSummary)
      │ (assembles payload, chooses endpoint)
      ▼
[API CLIENT] (src/services/apiClient.ts)
      │ (checks environment auth, sets timeout, catches standard errors)
      ├───────────► [MOCK DATA STORE] (If USE_MOCK_API = true)
      │
      └───────────► [EXTERNAL BACKEND API] (If USE_MOCK_API = false)
```

## Core Abstractions

### 1. `useDataFetch<T>`
Found in `src/hooks/useDataFetch.ts`. This highly reusable hook replaces massive `useEffect` chains in components. It guarantees that any UI file only receives three standard variables:
- `data`: The requested generic `<T>` type (null initially).
- `isLoading`: Boolean boolean tracking the network response.
- `error`: Error object mapped from API fail states.

This ensures consistency: every Dashboard chart now uses the `ComponentLoader` skeleton when `isLoading` is true, or the `EmptyState` when `data` is empty.

### 2. Services
Instead of putting `fetch('/some-endpoint')` randomly in buttons, all API paths are codified in the `src/services/` layer.
- `analyticsService.ts`: Covers `LeadOS` overall metrics and chart generation.
- `agentService.ts`: Covers `AgentOS` leaderboards, conversational insights, and SDR behaviors.

### 3. Centralized Loading / Empty States
Located in `src/components/ui`.
- `EmptyState`: Visually appealing fallback graphic that ensures a 0-state is never broken or confusing.
- `ComponentLoader`: Pulsing skeleton bars used heavily in the Dashboards during network polling.

## Next Steps for the Team
- **Route Authorization**: Firebase hooks can now be layered elegantly into `apiClient.ts` to attach Bearer tokens automatically to all outgoing service requests.
- **WebSocket Expansion**: The `agentService` will likely need an event-listener model built out when SDR bots push live updates to the Unified Inbox.
