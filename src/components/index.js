import "../index.css";

/* Primitives */

export { default as VAvatar } from "./primitives/Avatar/Avatar.vue";
export { default as VButton } from "./primitives/Button/Button.vue";
export { default as VCalendar } from "./primitives/Calendar/Calendar.vue";
export { default as VChart } from "./primitives/Chart/Chart.vue";
export { default as VCheckbox } from "./primitives/Checkbox/Checkbox.vue";
export { default as VContainer } from "./primitives/Container/Container.vue";
export { default as VDepthChart } from "./primitives/DepthChart/DepthChart.vue";
export { default as VField } from "./primitives/Field/Field.vue";
export { default as VFile } from "./primitives/FileInput/FileInput.vue";
export { default as VIcon } from "./primitives/Icon/Icon.vue";
export { default as VImage } from "./primitives/Image/Image.vue";
export { default as VInput } from "./primitives/Input/Input.vue";
export { default as VMedia } from "./primitives/Media/Media.vue";
export { default as VModal } from "./primitives/Modal/Modal.vue";
export { default as VProgress } from "./primitives/Progress/Progress.vue";
export { default as VSelect } from "./primitives/Select/Select.vue";
export { default as VSidebar } from "./primitives/Sidebar/Sidebar.vue";
export { default as VSlider } from "./primitives/Slider/Slider.vue";
export { default as VSwitch } from "./primitives/Switch/Switch.vue";
export { default as VTag } from "./primitives/Tag/Tag.vue";
export { default as VTextarea } from "./primitives/Textarea/Textarea.vue";
export { default as VTimeline } from "./primitives/Timeline/Timeline.vue";
export { default as VTooltip } from "./primitives/Tooltip/Tooltip.vue";
export { default as VUpload } from "./primitives/Upload/Upload.vue";
export { default as VAutocomplete } from "./primitives/Autocomplete/Autocomplete.vue";

/* Compounds */

export { default as DataGrid } from "./compounds/Table/DataGrid.ts";
export {
  default as Toaster,
  ToasterPositions,
  createToaster,
} from "./compounds/Toast/Toaster";
export { default as VAccordion } from "./compounds/Accordion/Accordion.vue";
export { default as VAccordionMenu } from "./compounds/Accordion/AccordionMenu.vue";
export { default as VBreadcrumb } from "./compounds/Breadcrumb/Breadcrumb.vue";
export { default as VBreadcrumbItem } from "./compounds/Breadcrumb/BreadcrumbItem.vue";
export { default as VCard } from "./compounds/Card/Card.vue";
export { default as VCardContent } from "./compounds/Card/CardContent.vue";
export { default as VCardFooter } from "./compounds/Card/CardFooter.vue";
export { default as VCardFooterItem } from "./compounds/Card/CardFooterItem.vue";
export { default as VCardHeader } from "./compounds/Card/CardHeader.vue";
export { default as VCardImage } from "./compounds/Card/CardImage.vue";
export { default as VColumn } from "./compounds/Columns/Column.vue";
export { default as VColumns } from "./compounds/Columns/Columns.vue";
export { default as VDropdown } from "./compounds/Dropdown/Dropdown.vue";
export { default as VDropdownItem } from "./compounds/Dropdown/DropdownItem.vue";
export { default as VMenu } from "./compounds/Menu/Menu.vue";
export { default as VMenuItem } from "./compounds/Menu/MenuItem.vue";
export { default as VMenuList } from "./compounds/Menu/MenuList.vue";
export { default as VNavbar } from "./compounds/Navbar/Navbar.vue";
export { default as VNavbarBurger } from "./compounds/Navbar/NavbarBurger.vue";
export { default as VNavbarDropdown } from "./compounds/Navbar/NavbarDropdown.vue";
export { default as VNavbarItem } from "./compounds/Navbar/NavbarItem.vue";
export { default as VPagination } from "./compounds/Pagination/Pagination.vue";
export { default as VPaginationItem } from "./compounds/Pagination/PaginationItem.vue";
export { default as VStepItem } from "./compounds/Steps/StepItem.vue";
export { default as VSteps } from "./compounds/Steps/Steps.vue";
export { default as VTab } from "./compounds/Tabs/Tab.vue";
export { default as VTable } from "./compounds/Table/Table.vue";
export { default as VTabs } from "./compounds/Tabs/Tabs.vue";

export * from "./global-settings";
