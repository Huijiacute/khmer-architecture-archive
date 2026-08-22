"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Main", href: "/" },
  { label: "Archive", href: "/archive" },
  { label: "Timeline", href: "/timeline" },
  { label: "Map", href: "/map" },
  { label: "About", href: "/about" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navStyle = {
    position: "sticky",
    top: 0,
    zIndex: 100,
    backgroundColor: "#FAFAF8",
    borderBottom: scrolled ? "1px solid #E5E0D8" : "1px solid transparent",
    transition: "border-color 0.3s ease",
  };

  const innerStyle = {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 40px",
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 40,
  };

  const linkStyle = (href) => ({
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: pathname === href ? "#1A1A1A" : "#8A8A8A",
    paddingBottom: 3,
    borderBottom: pathname === href ? "1.5px solid #C9A96E" : "1.5px solid transparent",
    transition: "color 0.2s ease, border-color 0.2s ease",
    textDecoration: "none",
  });

  return (
    <nav style={navStyle} aria-label="Main navigation">
      <div style={innerStyle}>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} style={linkStyle(link.href)}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
