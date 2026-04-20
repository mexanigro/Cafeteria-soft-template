import type { ReactNode } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';

type NavLinkProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
};

function NavLink({ href, onClick, children }: NavLinkProps) {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="text-espresso font-medium hover:opacity-60 transition-opacity duration-300"
      >
        {children}
      </button>
    );
  }
  return (
    <a
      href={href!}
      className="text-espresso font-medium hover:opacity-60 transition-opacity duration-300"
    >
      {children}
    </a>
  );
}

type NavbarProps = {
  brandName: string;
  isScrolled: boolean;
  nav: { menu: string; vibe: string; visit: string; orderAhead: string };
  vibeHref: string;
  visitHref: string;
  onOpenFullMenu: () => void;
  onOpenOrder: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
};

export function Navbar({
  brandName,
  isScrolled,
  nav,
  vibeHref,
  visitHref,
  onOpenFullMenu,
  onOpenOrder,
  mobileMenuOpen,
  onToggleMobileMenu,
}: NavbarProps) {
  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 px-6 py-4 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-2xl font-serif font-semibold tracking-tight hover:opacity-70 transition-opacity"
        >
          {brandName}
        </button>

        <div className="hidden md:flex space-x-12">
          <NavLink onClick={onOpenFullMenu}>{nav.menu}</NavLink>
          <NavLink href={vibeHref}>{nav.vibe}</NavLink>
          <NavLink href={visitHref}>{nav.visit}</NavLink>
        </div>

        <div className="hidden md:block">
          <button
            type="button"
            onClick={onOpenOrder}
            className="bg-espresso text-white px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform duration-300 shadow-lg shadow-black/5"
          >
            {nav.orderAhead}
          </button>
        </div>

        <button type="button" className="md:hidden" onClick={onToggleMobileMenu}>
          {mobileMenuOpen ? <X /> : <MenuIcon />}
        </button>
      </div>
    </nav>
  );
}
