import React from 'react';
import { Search, Github, Twitter, MessageCircle, Globe2, Mail, Crown } from 'lucide-react'

function NavLink({ children, hasDropdown = false }: { children: React.ReactNode, hasDropdown?: boolean }) {
  return (
    <a href="#" className="text-[#A1A1AA] hover:text-white flex items-center gap-1">
        {children}
        {hasDropdown && <span className="text-xs">▼</span>}
    </a>
  );

}

