import { useState, useCallback } from 'react';
import { TourStep } from '@/components/onboarding/GuidedTour';

// Define tour steps for different pages/features
export const DASHBOARD_TOUR_STEPS: TourStep[] = [
  {
    target: '[data-tour="welcome-header"]',
    title: 'Welcome to Your Dashboard!',
    description: 'This is your command center. Get a quick overview of your business performance, pending tasks, and AI-powered suggestions all in one place.',
    position: 'bottom',
  },
  {
    target: '[data-tour="sidebar"]',
    title: 'Navigation Menu',
    description: 'Access all features from here - manage reviews, schedule social posts, view analytics, and configure your business locations.',
    position: 'right',
  },
  {
    target: '[data-tour="action-cards"]',
    title: 'Quick Actions',
    description: 'See what needs your attention! These cards show pending reviews, scheduled posts, and helpful AI tips to grow your business.',
    position: 'bottom',
  },
  {
    target: '[data-tour="onboarding-progress"]',
    title: 'Setup Progress',
    description: 'Track your setup progress here. Complete all steps to unlock the full potential of the platform!',
    position: 'bottom',
  },
  {
    target: '[data-tour="ai-agent"]',
    title: 'AI Assistant',
    description: 'Need help? Click here anytime to chat with our AI assistant. It can create content, manage reviews, and automate tasks for you.',
    position: 'top',
  },
];

export const LOCATIONS_TOUR_STEPS: TourStep[] = [
  {
    target: '[data-tour="connect-google"]',
    title: 'Connect Google Business',
    description: 'Link your Google Business Profile to sync reviews and post updates.',
    position: 'bottom',
  },
  {
    target: '[data-tour="locations-list"]',
    title: 'Your Locations',
    description: 'Manage all your business locations in one place. Configure review settings for each.',
    position: 'top',
  },
];

export const CALENDAR_TOUR_STEPS: TourStep[] = [
  {
    target: '[data-tour="calendar-grid"]',
    title: 'Social Calendar',
    description: 'View and manage all your scheduled posts. Drag and drop to reschedule.',
    position: 'bottom',
  },
  {
    target: '[data-tour="create-post"]',
    title: 'Create New Post',
    description: 'Click here to create AI-powered content for your social channels.',
    position: 'left',
  },
];

export function useGuidedTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTour, setCurrentTour] = useState<TourStep[]>([]);

  const startTour = useCallback((steps: TourStep[]) => {
    setCurrentTour(steps);
    setIsOpen(true);
  }, []);

  const closeTour = useCallback(() => {
    setIsOpen(false);
    setCurrentTour([]);
  }, []);

  const completeTour = useCallback(() => {
    setIsOpen(false);
    setCurrentTour([]);
    // Could save completion state to localStorage or database
  }, []);

  return {
    isOpen,
    currentTour,
    startTour,
    closeTour,
    completeTour,
  };
}
