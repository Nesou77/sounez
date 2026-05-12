/**
 * AdSense slot IDs per placement.
 * Each placement should use a distinct ad unit created in your AdSense account.
 * If a slot ID is empty, AdSlot will render a placeholder instead of a real ad.
 *
 * Create ad units at: https://www.google.com/adsense/new/u/0/pub-XXXX/myads/units
 */
export const ADSENSE_SLOTS = {
  /** Homepage — between popular tools and categories */
  homeMiddle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_MIDDLE ?? "",
  /** Tool pages — directly below the tool widget */
  toolAfterWidget: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_AFTER_WIDGET ?? "",
  /** Tool pages — between FAQ and related tools */
  toolBottom: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BOTTOM ?? "",
  /** Blog article — after the intro / tool sidebar */
  blogMiddle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_MIDDLE ?? "",
  /** Blog article — before "Keep reading" section */
  blogBottom: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_BOTTOM ?? "",
  /** Blog sidebar sticky */
  blogSidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_SIDEBAR ?? "",
  /** Tools listing page */
  toolsPage: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOLS_PAGE ?? "",
} as const;

export type AdSlotKey = keyof typeof ADSENSE_SLOTS;
