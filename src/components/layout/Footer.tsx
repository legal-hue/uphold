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
            <p className="text-sm text-uphold-neutral-400 leading-relaxed mb-4">
              Upheld provides legal information to help you understand your rights.
              It is not a law firm and does not provide legal advice. For advice
              specific to your situation, consult a qualified solicitor or barrister.
            </p>
            <p className="text-sm text-uphold-neutral-400">
              <a href="mailto:hello@upheld.co.uk" className="hover:text-white transition-colors">
                hello@upheld.co.uk
              </a>
            </p>
          </div>

          <div className="flex flex-wrap gap-10">
            <div>
              <h4 className="text-sm font-semibold mb-3">App</h4>
              <ul className="space-y-2 text-sm text-uphold-neutral-400">
                <li><Link href="/triage" className="hover:text-white transition-colors">Check Your Rights</Link></li>
                <li><Link href="/expert" className="hover:text-white transition-colors">Expert Help</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Upheld</Link></li>
                <li><a href="https://karensafo.com/upheld-privacy.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="https://karensafo.com/upheld-terms.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms of Use</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Employment</h4>
              <ul className="space-y-2 text-sm text-uphold-neutral-400">
                <li><a href="https://www.acas.org.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ACAS</a></li>
                <li><a href="https://www.citizensadvice.org.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Citizens Advice</a></li>
                <li><a href="https://www.gov.uk/employment-tribunals" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Employment Tribunal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Housing &amp; Contracts</h4>
              <ul className="space-y-2 text-sm text-uphold-neutral-400">
                <li><a href="https://england.shelter.org.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Shelter</a></li>
                <li><a href="https://www.housing-ombudsman.org.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Housing Ombudsman</a></li>
                <li><a href="https://www.gov.uk/make-court-claim-for-money" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Small Claims Court</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Crisis support</h4>
              <ul className="space-y-2 text-sm text-uphold-neutral-400">
                <li><a href="tel:116123" className="hover:text-white transition-colors">Samaritans: 116 123</a></li>
                <li><a href="https://www.mind.org.uk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Mind</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-uphold-neutral-600 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-uphold-neutral-400">
          <span>&copy; {new Date().getFullYear()} Upheld. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="https://karensafo.com/upheld-privacy.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy</a>
            <a href="https://karensafo.com/upheld-terms.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
