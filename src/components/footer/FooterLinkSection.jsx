import React from 'react';

const FooterLink = ({ name, href }) => {
  return (
    <a 
      href={href} 
      className="text-neutral-400 hover:text-white text-sm transition-colors duration-300 block py-1"
    >
      {name}
    </a>
  );
};

const FooterLinkSection = ({ title, links }) => {
  return (
    <div className="mr-8 md:mr-0">
      <h4 className="uppercase text-neutral-500 text-xs tracking-wider font-medium mb-4">
        {title}
      </h4>
      <div className="flex flex-col space-y-2">
        {links.map((link) => (
          <FooterLink key={link.name} name={link.name} href={link.href} />
        ))}
      </div>
    </div>
  );
};

export default FooterLinkSection;
