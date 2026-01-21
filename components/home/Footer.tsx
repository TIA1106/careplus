import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 pt-24 pb-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tighter text-white">
                Care<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Plus</span>
              </span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              Providing accessible, high-quality healthcare services to everyone. Book appointments, consult online, and manage your health journey with ease.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Facebook size={18} />, href: "#" },
                { icon: <Twitter size={18} />, href: "#" },
                { icon: <Instagram size={18} />, href: "#" },
                { icon: <Linkedin size={18} />, href: "#" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Our Services</h3>
            <ul className="space-y-4">
              {[
                "General Consultation",
                "Pediatrics",
                "Dermatology",
                "Cardiology",
                "Psychiatry"
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-neutral-400 hover:text-blue-400 text-sm transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-blue-500 mr-2 transition-colors"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links (New) */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: "About Us", href: "#" },
                { name: "Find Doctors", href: "#" },
                { name: "Book Appointment", href: "#" },
                { name: "Health Plans", href: "#" },
                { name: "FAQs", href: "#" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-neutral-400 hover:text-purple-400 text-sm transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                  <MapPin className="text-red-500" size={16} />
                </div>
                <span className="text-neutral-400 text-sm leading-relaxed">123 Health Street, Medical District, NY 10001</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                  <Phone className="text-green-500" size={16} />
                </div>
                <span className="text-neutral-400 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                  <Mail className="text-blue-500" size={16} />
                </div>
                <span className="text-neutral-400 text-sm">support@careplus.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <p className="text-neutral-500 text-xs">
              © {new Date().getFullYear()} CarePlus Inc.
            </p>
            <span className="text-neutral-800">•</span>
            <p className="text-neutral-500 text-xs">
              All healthcare services verified.
            </p>
          </div>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-neutral-500 hover:text-white text-xs transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-neutral-500 hover:text-white text-xs transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="text-neutral-500 hover:text-white text-xs transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
