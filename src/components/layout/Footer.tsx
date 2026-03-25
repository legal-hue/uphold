import { Shield } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-uphold-neutral-800 text-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-uphold-green-500" />
              <span className="text-lg font-bold">Upheld</span>
            </div>
            <p className="text-sm text-uphold-neutral-400 leading-relaxed">
              Upheld provides legal information to help you understand your rights.
              It is not a law firm and does not provide legal advice. For advice
              specific to your situation, consult a qualified solicitor or barrister.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <h4 className="text-sm font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-uphold-neutral-400">
                <li><Link href="/triage" className="hover:text-white transition-colors">Check Your Rights</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Upheld</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-uphold-neutral-400">
                <li><a href="https://www.acas.org.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ACAS</a></li>
                <li><a href="https://www.citizensadvice.org.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Citizens Advice</a></li>
                <li><a href="tel:116123" className="hover:text-white transition-colors">Samaritans: 116 123</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-uphold-neutral-600 mt-8 pt-6 text-xs text-uphold-neutral-400 text-center">
          &copy; {new Date().getFullYear()} Upheld. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
