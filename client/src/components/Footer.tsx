import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <Link href="/" className="text-2xl font-bold font-display tracking-tighter text-white">
            WEBKIT<span className="text-gray-500">24</span>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed">
            Not an agency. A growth systems architect. We build the digital infrastructure that scales modern businesses.
          </p>
        </div>
        
        <div>
          <h4 className="font-display font-bold text-white mb-6">Systems</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><Link href="/systems" className="hover:text-white transition-colors">Growth Infrastructure</Link></li>
            <li><Link href="/systems" className="hover:text-white transition-colors">Lead Automation</Link></li>
            <li><Link href="/systems" className="hover:text-white transition-colors">Retention Loops</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-6">Tools</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><Link href="/generator" className="hover:text-white transition-colors">Growth Plan Generator</Link></li>
            <li><Link href="/ideas" className="hover:text-white transition-colors">App Idea Lab</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-6">Connect</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><a href="#" className="hover:text-white transition-colors">Twitter / X</a></li>
            <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
            <li><a href="mailto:hello@webkit24.com" className="hover:text-white transition-colors">hello@webkit24.com</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
        <p>&copy; 2024 Webkit24. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
