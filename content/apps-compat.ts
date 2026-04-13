// Re-export from canonical source for backwards compatibility
export type { AppCaseStudy as App } from "./apps/index";
export { APP_CASE_STUDIES as APPS, APP_CASE_STUDIES as ALL_APPS } from "./apps/index";

// Featured apps for homepage portfolio grid
import { APP_CASE_STUDIES } from "./apps/index";
export const FEATURED_APPS = APP_CASE_STUDIES.slice(0, 4);
