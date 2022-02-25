import React from 'react';
import { IconType } from 'react-icons';
import { BsTwitter } from 'react-icons/bs';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Instance = ({ Icon, href }: { Icon: IconType; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="my-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full  border-secondary bg-white text-gray transition-all duration-300 ease-in-out hover:border-secondary hover:bg-secondary hover:text-white lg:my-2 lg:h-12 lg:w-12"
  >
    <Icon className="h-3 w-3 text-current lg:h-6 lg:w-6" />
  </a>
);

const SocialMedia = () => (
  <div className="absolute bottom-0 left-1 z-50 flex flex-col items-center justify-end md:bottom-8 md:left-8">
    <Instance
      Icon={FaLinkedinIn}
      href="https://www.linkedin.com/in/adam-rajmuller/"
    />
    <Instance Icon={FaGithub} href="https://github.com/AdamReinmuller" />
    <Instance Icon={BsTwitter} href="https://twitter.com/adamrraj" />
  </div>
);

export default SocialMedia;
