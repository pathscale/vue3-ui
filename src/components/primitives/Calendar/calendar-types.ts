/**
 * See more options at:
 * https://bulma-calendar.onrender.com/#options
 */
export interface BulmaCalendarOptions {
  type?: "date" | "time" | "datetime";
  displayMode?: "default" | "dialog" | "inline";
  isRange?: boolean;
  showClearButton?: boolean;
  startDate?: Date;
  startTime?: Date;
  endDate?: Date;
  endTime?: Date;
}

export interface BulmaCalendar {
  attach: (ref: HTMLElement, options: BulmaCalendarOptions) => void;
}
