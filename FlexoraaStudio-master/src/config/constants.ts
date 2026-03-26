/**
 * Centralized Application Constants
 * This file contains static constants used across the application.
 * It ensures we avoid magic strings and properly scale our configuration.
 */

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: {
    ROOT: '/dashboard',
    LEAD_OS: '/dashboard/leados',
    AGENT_OS: '/dashboard/agentos',
    SDR: '/dashboard/sdr',
    ADMIN: '/dashboard/admin',
    UPLOAD_LEADS: '/dashboard/upload-leads',
    PROFILE: '/dashboard/profile',
  },
  ONBOARDING: '/onboarding',
  CHOOSE_AGENT: '/choose-agent',
} as const;

export const UI_CONSTANTS = {
  PAGINATION_DEFAULT_LIMIT: 20,
  TOAST_DURATION_MS: 3000,
  POLLING_INTERVAL_MS: 30000, // 30 seconds
} as const;

export const AGENT_TYPES = {
  LEAD_OS: 'leados',
  AGENT_OS: 'agentos',
} as const;
