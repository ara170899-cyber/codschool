"use client";

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1 text-xs text-gray-500 min-w-0 overflow-hidden">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1 min-w-0">
            {i > 0 && (
              <span className="text-gray-600 shrink-0">›</span>
            )}
            {isLast || !item.href ? (
              <span className="truncate max-w-[120px] sm:max-w-[200px] text-gray-500">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="truncate max-w-[120px] sm:max-w-[200px] text-gray-400 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
