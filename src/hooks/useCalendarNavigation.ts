import { useState, useEffect, useCallback, useRef } from "react";

interface UseCalendarNavigationProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  calendarWeeks: Date[][];
  onDaySelect?: (day: Date) => void;
  onDayAction?: (day: Date) => void;
}

interface TouchState {
  startX: number;
  startY: number;
  startTime: number;
}

export function useCalendarNavigation({
  currentDate,
  onDateChange,
  calendarWeeks,
  onDaySelect,
  onDayAction,
}: UseCalendarNavigationProps) {
  const [selectedDayIndex, setSelectedDayIndex] = useState<{ week: number; day: number } | null>(null);
  const touchRef = useRef<TouchState | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Flatten calendar weeks for easier navigation
  const flatDays = calendarWeeks.flat();

  // Navigate to previous week
  const goToPreviousWeek = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    onDateChange(newDate);
  }, [currentDate, onDateChange]);

  // Navigate to next week
  const goToNextWeek = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    onDateChange(newDate);
  }, [currentDate, onDateChange]);

  // Get the currently selected day
  const getSelectedDay = useCallback(() => {
    if (selectedDayIndex === null) return null;
    return calendarWeeks[selectedDayIndex.week]?.[selectedDayIndex.day] || null;
  }, [selectedDayIndex, calendarWeeks]);

  // Move selection with arrow keys
  const moveSelection = useCallback((direction: "up" | "down" | "left" | "right") => {
    setSelectedDayIndex(prev => {
      // If no selection, start at today or first day
      if (prev === null) {
        const today = new Date();
        const todayIndex = flatDays.findIndex(
          d => d.toDateString() === today.toDateString()
        );
        if (todayIndex >= 0) {
          return { week: Math.floor(todayIndex / 7), day: todayIndex % 7 };
        }
        return { week: 0, day: 0 };
      }

      let newWeek = prev.week;
      let newDay = prev.day;

      switch (direction) {
        case "left":
          if (newDay > 0) {
            newDay--;
          } else if (newWeek > 0) {
            newWeek--;
            newDay = 6;
          }
          break;
        case "right":
          if (newDay < 6) {
            newDay++;
          } else if (newWeek < calendarWeeks.length - 1) {
            newWeek++;
            newDay = 0;
          }
          break;
        case "up":
          if (newWeek > 0) {
            newWeek--;
          }
          break;
        case "down":
          if (newWeek < calendarWeeks.length - 1) {
            newWeek++;
          }
          break;
      }

      const selectedDay = calendarWeeks[newWeek]?.[newDay];
      if (selectedDay && onDaySelect) {
        onDaySelect(selectedDay);
      }

      return { week: newWeek, day: newDay };
    });
  }, [calendarWeeks, flatDays, onDaySelect]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if focus is within the calendar or no input is focused
      const activeElement = document.activeElement;
      const isInputFocused = activeElement?.tagName === "INPUT" || 
                            activeElement?.tagName === "TEXTAREA" ||
                            activeElement?.getAttribute("contenteditable") === "true";
      
      if (isInputFocused) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          moveSelection("left");
          break;
        case "ArrowRight":
          e.preventDefault();
          moveSelection("right");
          break;
        case "ArrowUp":
          e.preventDefault();
          moveSelection("up");
          break;
        case "ArrowDown":
          e.preventDefault();
          moveSelection("down");
          break;
        case "Enter":
        case " ": {
          e.preventDefault();
          const selectedDay = getSelectedDay();
          if (selectedDay && onDayAction) {
            onDayAction(selectedDay);
          }
          break;
        }
        case "PageUp":
          e.preventDefault();
          goToPreviousWeek();
          break;
        case "PageDown":
          e.preventDefault();
          goToNextWeek();
          break;
        case "Escape":
          setSelectedDayIndex(null);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveSelection, getSelectedDay, onDayAction, goToPreviousWeek, goToNextWeek]);

  // Touch gesture handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
    };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchRef.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchRef.current.startX;
    const deltaY = touch.clientY - touchRef.current.startY;
    const deltaTime = Date.now() - touchRef.current.startTime;

    // Minimum swipe distance and maximum time
    const minSwipeDistance = 50;
    const maxSwipeTime = 300;

    // Check if it's a horizontal swipe (not a scroll)
    if (
      Math.abs(deltaX) > minSwipeDistance &&
      Math.abs(deltaX) > Math.abs(deltaY) * 1.5 &&
      deltaTime < maxSwipeTime
    ) {
      // Trigger haptic feedback on mobile
      if (navigator.vibrate) {
        navigator.vibrate(10); // Short 10ms vibration
      }
      
      if (deltaX > 0) {
        // Swipe right = previous week
        goToPreviousWeek();
      } else {
        // Swipe left = next week
        goToNextWeek();
      }
    }

    touchRef.current = null;
  }, [goToPreviousWeek, goToNextWeek]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchRef.current) return;

    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchRef.current.startX);
    const deltaY = Math.abs(touch.clientY - touchRef.current.startY);

    // If horizontal movement is dominant, prevent vertical scroll
    if (deltaX > deltaY * 1.5 && deltaX > 10) {
      e.preventDefault();
    }
  }, []);

  // Check if a day cell is selected
  const isDaySelected = useCallback((weekIndex: number, dayIndex: number) => {
    return selectedDayIndex?.week === weekIndex && selectedDayIndex?.day === dayIndex;
  }, [selectedDayIndex]);

  // Programmatically select a day
  const selectDay = useCallback((weekIndex: number, dayIndex: number) => {
    setSelectedDayIndex({ week: weekIndex, day: dayIndex });
    const day = calendarWeeks[weekIndex]?.[dayIndex];
    if (day && onDaySelect) {
      onDaySelect(day);
    }
  }, [calendarWeeks, onDaySelect]);

  // Clear selection
  const clearSelection = useCallback(() => {
    setSelectedDayIndex(null);
  }, []);

  return {
    // Touch gesture props for the container
    touchProps: {
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onTouchMove: handleTouchMove,
    },
    // Container ref for keyboard focus
    containerRef,
    // Selection state
    selectedDayIndex,
    isDaySelected,
    selectDay,
    clearSelection,
    getSelectedDay,
    // Navigation functions
    goToPreviousWeek,
    goToNextWeek,
  };
}
