import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin, Github, Youtube } from 'lucide-react';

export const SocialLinks = () => {
  const socialLinks = [
    { icon: <Twitter size={24} />, url: '#', label: 'Twitter' },
    { icon: <Facebook size={24} />, url: '#', label: 'Facebook' },
    { icon: <Instagram size={24} />, url: '#', label: 'Instagram' },
    { icon: <Linkedin size={24} />, url: '#', label: 'LinkedIn' },
    { icon: <Github size={24} />, url: '#', label: 'GitHub' },
    { icon: <Youtube size={24} />, url: '#', label: 'YouTube' },
  ];

  return (
    <div className="flex flex-wrap gap-6">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          aria-label={link.label}
          className="text-gray-400 hover:text-white transform hover:scale-110 transition-all duration-300"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};