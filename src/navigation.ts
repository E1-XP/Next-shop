import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { locales } from "./app/_helpers/constants";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
