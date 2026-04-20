import { Shield } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <Shield className="w-12 h-12 text-uphold-green-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Page not found</h1>
      <p className="text-uphold-neutral-600 mb-6 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/triage"
        className="bg-uphold-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-uphold-green-700 transition-colors"
      >
        Check Your Rights
      </Link>
    </div>
  );
}
