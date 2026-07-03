import { MapPin } from "lucide-react";
import { FaTelegram, FaLinkedin, FaYoutube, FaTiktok } from "react-icons/fa6";

import BrandLogo from "./BrandLogo";
const socials = [
  {
    icon: FaTelegram,
    label: "Telegram",
    href: "https://t.me/InformationSystemsHub",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/information-system-hub/?viewAsMember=true",
  },
  {
    icon: FaYoutube,
    label: "YouTube",
    href: "https://www.youtube.com/@InformationSystemTalks",
  },
  {
    icon: FaTiktok,
    label: "TikTok",
    href: "https://www.tiktok.com/@ishubaau",
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <BrandLogo textClassName="text-white" />
          </div>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
            ISHub Summer Bootcamp is committed to empowering students with
            practical technology skills through free, high-quality, hands-on
            learning.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">
            Contact
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-primary-light shrink-0" />
              <span>Addis Ababa, Ethiopia</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">
            Follow Us
          </h4>
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-xl2 bg-slate-800 hover:bg-primary grid place-items-center transition-colors duration-200"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <p className="text-center text-xs text-slate-500 py-6">
          (c) 2026 ISHub Summer Bootcamp. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
