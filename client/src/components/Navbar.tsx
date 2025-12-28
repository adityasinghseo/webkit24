import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold font-display tracking-tighter text-white">
          WEBKIT<span className="text-gray-500">24</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/systems">Systems</NavLink>
          <NavLink href="/generator">Growth Plan</NavLink>
          <NavLink href="/ideas">Idea Lab</NavLink>
          <Button variant="premium" size="sm" onClick={() => window.location.href = '#contact'}>
            Start Growing
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              <MobileNavLink href="/systems" onClick={() => setIsOpen(false)}>Systems</MobileNavLink>
              <MobileNavLink href="/generator" onClick={() => setIsOpen(false)}>Growth Plan</MobileNavLink>
              <MobileNavLink href="/ideas" onClick={() => setIsOpen(false)}>Idea Lab</MobileNavLink>
              <Button variant="premium" className="w-full mt-4" onClick={() => {
                setIsOpen(false);
                window.location.href = '#contact';
              }}>
                Start Growing
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link 
      href={href} 
      className="text-lg font-medium text-gray-300 hover:text-white block py-2"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
