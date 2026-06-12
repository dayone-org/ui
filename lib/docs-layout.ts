/** Shared horizontal layout for playground docs (sidebar + main column). */

export const DOCS_PAGE_PADDING = "px-8 lg:px-12";

export const DOCS_SIDEBAR_WIDTH = "w-44 shrink-0 xl:w-52";

/** Logo + section nav — further left; main column padding compensates so content stays put. */
export const DOCS_SIDEBAR_INSET = "pl-4 xl:pl-6";

export const DOCS_SIDEBAR_ASIDE = `hidden shrink-0 lg:flex ${DOCS_SIDEBAR_WIDTH}`;

/** Space between section navigation and main content (unchanged visual start vs. prior layout). */
export const DOCS_MAIN_COLUMN = "min-w-0 flex-1 pl-10 lg:pl-20 xl:pl-28";
