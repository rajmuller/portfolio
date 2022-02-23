import React from 'react';
import { IconType } from 'react-icons';
import { BsTwitter, BsInstagram } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';

const Instance = ({ Icon }: { Icon: IconType }) => (
  <div className="my-1 flex h-10 w-10 items-center justify-center rounded-full border-secondary bg-white transition-all duration-300 ease-in-out hover:border-secondary hover:bg-secondary 2xl:my-2 2xl:h-16 2xl:w-16">
    <Icon className="h-4 w-4 text-gray hover:text-white 2xl:h-[30px] 2xl:w-[30px]" />
  </div>
);

const SocialMedia = () => (
  <div className="flex flex-col items-center justify-end p-4">
    <Instance Icon={BsTwitter} />
    <Instance Icon={FaFacebookF} />
    <Instance Icon={BsInstagram} />
  </div>
);

export default SocialMedia;
