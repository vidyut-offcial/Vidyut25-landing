import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

export const SocialLinks = () => {
  const socialLinks = [
    { icon: <FaWhatsapp size={24} />, url: 'https://www.whatsapp.com/channel/0029VaPtG6GL7UVYwg8BH32o', label: 'Whatsapp' },
    { icon: <Facebook size={24} />, url: 'https://www.facebook.com/Vidyut.Multifest/', label: 'Facebook' },
    { icon: <Instagram size={24} />, url: 'https://www.instagram.com/vidyutmultifest/', label: 'Instagram' },
    { icon: <Linkedin size={24} />, url: 'https://www.linkedin.com/company/vidyut-amrita/', label: 'LinkedIn' },
  ];

  return (
    <div className="flex flex-wrap gap-6">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          aria-label={link.label}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transform hover:scale-110 transition-all duration-300"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};
