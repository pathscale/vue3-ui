/**
 * See more options at:
 * https://bulma-calendar.onrender.com/#options
 */
export interface BulmaCalendarOptions {
  type?: "date" | "time" | "datetime";
  displayMode?: "default" | "dialog" | "inline";
  isRange?: boolean;
  showClearButton?: boolean;
  startDate?: Date | null;
  startTime?: Date | null;
  endDate?: Date | null;
  endTime?: Date | null;
}

export interface BulmaCalendar {
  attach: (ref: HTMLElement, options: BulmaCalendarOptions) => void;
}
