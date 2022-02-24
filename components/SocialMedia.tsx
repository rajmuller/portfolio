import React from 'react';
import { IconType } from 'react-icons';
import { BsTwitter, BsInstagram } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';

const Instance = ({ Icon }: { Icon: IconType }) => (
  <div className="my-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full  border-secondary bg-white text-gray transition-all duration-300 ease-in-out hover:border-secondary hover:bg-secondary hover:text-white 2xl:my-2 2xl:h-12 2xl:w-12">
    <Icon className="h-3 w-3 text-current 2xl:h-6 2xl:w-6" />
  </div>
);

// TODO: real social media
const SocialMedia = () => (
  <div className="absolute bottom-0 left-1 flex flex-col items-center justify-end md:bottom-8 md:left-8">
    <Instance Icon={BsTwitter} />
    <Instance Icon={FaFacebookF} />
    <Instance Icon={BsInstagram} />
  </div>
);

export default SocialMedia;
