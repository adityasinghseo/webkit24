import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar({ systemState }: { systemState?: "automated" | "manual" }) {
  const [isOpen, setIsOpen] = useState(false);

  // Dynamic CTA Styles
  const getCtaStyle = () => {
    if (systemState === "automated") return "bg-green-500 hover:bg-green-600 text-black border-none shadow-[0_0_20px_rgba(34,197,94,0.4)]";
    if (systemState === "manual") return "bg-red-500 hover:bg-red-600 text-white border-none shadow-[0_0_20px_rgba(239,68,68,0.4)]";
    return ""; // Default premium
  };

  const getCtaText = () => {
    return "Build My System";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-gray-200 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold font-display tracking-tighter text-gray-900">
          WEBKIT<span className="text-blue-600">24</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/systems">Systems</NavLink>
          <NavLink href="/generator">Growth Plan</NavLink>
          <NavLink href="/ideas">Diagnose</NavLink>
          <Button
            variant={systemState ? "default" : "premium"}
            size="sm"
            className={`transition-all duration-500 ${getCtaStyle()}`}
            onClick={() => window.location.href = '#contact'}
          >
            {getCtaText()}
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-900"
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
            className="md:hidden bg-white border-b border-gray-200 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              <MobileNavLink href="/systems" onClick={() => setIsOpen(false)}>Systems</MobileNavLink>
              <MobileNavLink href="/generator" onClick={() => setIsOpen(false)}>Growth Plan</MobileNavLink>
              <MobileNavLink href="/ideas" onClick={() => setIsOpen(false)}>Diagnose</MobileNavLink>
              <Button
                variant={systemState ? "default" : "premium"}
                className={`w-full mt-4 ${getCtaStyle()}`}
                onClick={() => {
                  setIsOpen(false);
                  window.location.href = '#contact';
                }}
              >
                {getCtaText()}
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
    <Link href={href} className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      href={href}
      className="text-lg font-medium text-gray-900 hover:text-blue-600 block py-2"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
