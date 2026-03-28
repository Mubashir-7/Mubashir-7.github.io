import { ModemAnimatedFooter } from "@/components/ui/modem-animated-footer"
import { Instagram, Linkedin, Github, Mail, BrainCircuit } from "lucide-react"

export default function Footer() {
  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/Mubashir-7",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/mubashir-ajaz",
      label: "LinkedIn",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "https://www.instagram.com/mubashirajaz2002?igsh=Z2RheGNha2ZkNDk1&utm_source=qr",
      label: "Instagram",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:mubashirajaz14@gmail.com",
      label: "Email",
    },
  ]

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <ModemAnimatedFooter
      brandName="Mubashir."
      brandDescription="Engineering intelligent AI systems and robust full-stack applications to solve complex business problems."
      socialLinks={socialLinks}
      navLinks={navLinks}
      creatorName="Mubashir"
      creatorUrl="https://github.com/Mubashir-7"
      brandIcon={<BrainCircuit className="w-8 h-8 md:w-10 md:h-10 text-white/80" />}
    />
  )
}
