/**
 * https://bulma-calendar.onrender.com/#options
 */
export interface BulmaCalendarOptions {
  type?: "date" | "time" | "datetime";
}

export interface BulmaCalendar {
  attach: () => void;
}
