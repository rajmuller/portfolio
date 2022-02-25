import Image from 'next/image';
import { useCallback, useState } from 'react';
import axios from 'axios';

import { MotionWrapper, Wrapper } from '../wrappers';

type FooterProps = {};

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = useCallback(
    (e: any) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    },
    [formData]
  );

  const handleSubmit = async () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    const config = {
      method: 'post',
      url: `/api/contact`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: contact,
    };

    try {
      // @ts-ignore
      const response = await axios(config);
      if (response.status == 200) {
        setLoading(false);
        setIsFormSubmitted(true);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error({ err });
    }
  };

  return (
    <MotionWrapper>
      <Wrapper idName="contact">
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-4">
            <h2 className="head-text translate-y-1 -rotate-45 select-none">
              🤙
            </h2>
            <h2 className="head-text">Contact me</h2>
            <h2 className="head-text translate-y-1 -rotate-45 select-none">
              🤙
            </h2>
          </div>

          <div className="mx-8 mt-16 mb-8 flex w-full items-center justify-center gap-32 md:w-3/5">
            <div className="my-4 flex w-full min-w-[300px] cursor-pointer items-center justify-start rounded-xl bg-[#faebed] p-4 transition-all duration-300 ease-in-out hover:shadow-[0px_0px_2px_2px_#f5e3e5] sm:w-auto">
              <div className="relative mx-3 h-10 w-10">
                <Image
                  src="/images/email.png"
                  alt="email"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <a
                href="mailto:adam.rajmuller@gmail.com"
                className="p-text font-medium"
              >
                adam.rajmuller@gmail.com
              </a>
            </div>
            <a
              href="tel:+36 (20) 96-06333"
              className="my-4 flex w-full min-w-[300px] cursor-pointer items-center justify-start rounded-xl bg-slate-200 p-4 transition-all duration-300 ease-in-out hover:shadow-[0px_0px_2px_2px_#d6cdce58] sm:w-auto"
            >
              <div className="relative mx-3 h-10 w-10">
                <Image
                  src="/images/mobile.png"
                  alt="phone"
                  objectFit="cover"
                  layout="fill"
                />
              </div>
              <p className="p-text">+36 (20) 96-06333</p>
            </a>
          </div>
          {!isFormSubmitted ? (
            <div className="mx-8 my-4 flex w-full flex-col items-center justify-center md:w-3/5">
              <div className="my-3 flex w-full cursor-pointer items-center justify-center rounded-xl bg-primary transition-all duration-300 ease-in-out hover:shadow-sm hover:shadow-slate-300">
                <input
                  className="w-full rounded-lg bg-slate-200 p-4 text-gray outline-none focus:ring-2 focus:ring-secondary"
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  value={name}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="my-3 flex w-full cursor-pointer items-center justify-center rounded-xl bg-primary transition-all duration-300 ease-in-out hover:shadow-sm hover:shadow-slate-300">
                <input
                  className="w-full rounded-lg bg-slate-200 p-4 text-gray outline-none focus:ring-2 focus:ring-secondary"
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  value={email}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="my-3 flex w-full cursor-pointer items-center justify-center rounded-xl bg-primary transition-all duration-300 ease-in-out hover:shadow-sm hover:shadow-slate-300">
                <textarea
                  className="h-44 w-full rounded-lg bg-slate-200 p-4 text-gray outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="Your Message"
                  value={message}
                  name="message"
                  onChange={handleChangeInput}
                />
              </div>
              <button
                type="button"
                className="my-4 w-full cursor-pointer rounded-xl border-0  bg-tertiary px-8 py-4 font-medium text-white outline-none transition-[cubic-bezier(0.55_0.085_0.68_0.53)] hover:shadow-sm hover:shadow-secondary md:mt-8 md:mb-0 md:w-auto"
                onClick={handleSubmit}
              >
                {!loading ? 'Send Message' : 'Sending...'}
              </button>
            </div>
          ) : (
            <div>
              <h3 className="head-text">Thank you for getting in touch!</h3>
            </div>
          )}
        </div>
      </Wrapper>
    </MotionWrapper>
  );
};

export default Footer;
