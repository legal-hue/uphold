import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-uphold-neutral-400 mb-6">
      <Link href="/" className="flex items-center hover:text-uphold-neutral-600 transition-colors">
        <Home className="w-3.5 h-3.5" />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="w-3.5 h-3.5" />
          {item.href ? (
            <Link href={item.href} className="hover:text-uphold-neutral-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-uphold-neutral-600 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
