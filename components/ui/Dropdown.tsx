"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ReactNode, Fragment } from "react";
import NavLink from "./NavLink";

export type DropdownLinkGroup = {
  sectionLabel?: string;
  links: { href: string; label: string }[];
};

export default function Dropdown({
  id,
  title,
  elements = [],
  linkGroups = [],
  fullWidth = false,
  onItemClick,
}: {
  id: string;
  title: string;
  elements?: ReactNode[];
  linkGroups: DropdownLinkGroup[];
  fullWidth?: boolean;
  onItemClick?: () => void;
}) {
  return (
    <Menu
      as="div"
      className={fullWidth ? "block w-full" : "relative inline-block"}
    >
      <MenuButton
        id={id}
        aria-haspopup="true"
        className={`inline-flex w-full gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20 ${
          fullWidth ? "justify-between" : "justify-center"
        }`}
      >
        {title}
        <ChevronDownIcon
          aria-hidden="true"
          className="-mr-1 size-5 text-teal-200"
        />
      </MenuButton>

      <MenuItems
        transition
        className={
          fullWidth
            ? "relative mt-2 w-full origin-top rounded-md bg-black/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            : "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-emerald-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        }
      >
        <div className="py-1" role="none">
          {linkGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              {group.sectionLabel && (
                <div className="px-4 py-2 text-xs font-bold text-teal-200 uppercase tracking-wider mt-1 opacity-80">
                  {group.sectionLabel}
                </div>
              )}
              {group.links.map((link) => (
                <MenuItem key={link.href} as={Fragment}>
                  <NavLink
                    href={link.href}
                    onClick={onItemClick}
                    className="block px-4 py-2 text-sm text-teal-50 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
                  >
                    {link.label}
                  </NavLink>
                </MenuItem>
              ))}
            </div>
          ))}
          {elements.map((element, index) => (
            <MenuItem key={index} as={Fragment}>
              {element}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
