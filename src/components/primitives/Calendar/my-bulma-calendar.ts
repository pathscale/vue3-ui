interface Options {
  /**
   * Component type
   *
   * @default 'datetime'
   */
  type?: "date" | "time" | "datetime";

  /**
   * Picker dominant color
   *
   * @default 'primary'
   */
  color?: string;

  /**
   * Range capability (start and end date/time selection
   *
   * @default false
   */
  isRange?: boolean;

  /**
   * Possibility to select same date as start and end date in range mode
   *
   * @default true
   */
  allowSameDayRange?: boolean;

  /**
   * Display lang (from language supported by date-fns)
   *
   * @default navigator.language.substring(0, 2) || "en"
   */
  lang?: string;

  /**
   * Date format pattern
   *
   * @default 'MM/dd/yyyy'
   */
  dateFormat?: string;

  /**
   * Time format pattern
   *
   * @default 'HH:mm'
   */
  timeFormat?: string;

  /**
   * Navigation month format pattern
   *
   * @default 'MMMM'
   */
  navigationMonthFormat?: string;

  /**
   * Navigation year format pattern
   *
   * @default 'yyyy'
   */
  navigationYearFormat?: string;

  /**
   * Header month year format pattern
   *
   * @default 'MMMM yyyy'
   */
  headerMonthYearFromat?: string;

  /**
   * Display mode
   *
   * @default 'default'
   */
  displayMode?: "default" | "dialog" | "inline";

  /**
   * @default 'auto'
   */
  position?: string;

  /**
   * Show/Hide header block (with current selection)
   *
   * @default true
   */
  showHeader?: boolean;

  /**
   * Header block position
   *
   * @default 'top'
   */
  headerPosition?: "top" | "bottom";

  /**
   * Show/Hide footer block
   *
   * @default true
   */
  showFooter?: boolean;

  /**
   * Show/Hide buttons
   *
   * @default true
   */
  showButtons?: boolean;

  /**
   * Show/Hide Today Button
   *
   * @default true
   */
  showTodayButton?: boolean;

  /**
   * Show/Hide Clear Button
   *
   * @default true
   */
  showClearButton?: boolean;

  /**
   * Cancel button label
   *
   * @default 'Cancel'
   */
  cancelLabel?: string;

  /**
   * Clear button label
   *
   * @default 'Clear'
   */
  clearLabel?: string;

  /**
   * Today button label
   *
   * @default 'Today'
   */
  todayLabel?: string;

  /**
   * Now button label
   *
   * @default 'Now'
   */
  nowLabel?: string;

  /**
   * Validate button label
   *
   * @default 'Validate'
   */
  validateLabel?: string;

  /**
   * Enable/disable month switch
   *
   * @default true
   */
  enableMonthSwitch?: boolean;

  /**
   * Enable/disable year switch
   *
   * @default true
   */
  enableYearSwitch?: boolean;

  /**
   * Pre-selected start date
   */
  startDate?: Date;

  /**
   * Pre-selected end date
   */
  endDate?: Date;

  /**
   * List of highlighted dates
   */
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  highlightedDates?: string | any[];

  /**
   * Minimum date allowed
   */
  minDate?: Date;

  /**
   * Maximum date allowed
   */
  maxDate?: Date;

  /**
   * List of disabled dates
   */
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  disabledDates?: any[];

  /**
   * List of disabled week days
   */
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  disabledWeekDays?: string | any[];

  /**
   * Default weekstart day number
   *
   * @default 0 // sunday
   */
  weekStart?: number;

  /**
   * Pre-selected start time
   */
  startTime?: Date;

  /**
   * Pre-selected end time
   */
  endTime?: Date;

  /**
   * Steps for minutes selector
   *
   * @default 5
   */
  minuteSteps?: number;

  /**
   * From label
   */
  labelFrom?: string;

  /**
   * To label
   */
  labelTo?: string;

  /**
   * Close picker on overlay click (only for dialog display style)
   *
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * Automatically close the datePicker when date selected (or range date selected) - not available
   * for inline display style. If set to False then a validate button will be displayed into the
   * footer section.
   *
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * Automatically open datepicker when click into input element
   *
   * @default true
   */
  toggleOnInputClick?: boolean;

  /**
   * Callback to trigger once picker initiated
   */
  onReady?: () => void;
  icons?: {
    /**
     * Previous button icon
     */
    previous?: string;

    /**
     * Next button icon
     */
    next?: string;

    /**
     * Time icon
     */
    time?: string;

    /**
     * Date icon
     */
    date?: string;
  };
}

type EventType = "show" | "hide" | "select" | "select:start";

interface Event<T extends EventType = EventType> {
  type: T;
  timeStamp: number;
  data: BulmaCalendar;
}

declare class BulmaCalendar {
  on<T extends EventType>(
    name: T,
    callback: (event: Event<T>) => void,
    once?: boolean,
  ): void;

  static attach(
    selector?: string | HTMLElement,
    options?: Options,
  ): BulmaCalendar[];
}
