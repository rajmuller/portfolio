import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import { SkillsType } from '../../types/sanity';

import Tooltip from '../Tooltip';

import { MotionWrapper, Wrapper } from '../wrappers';

type SkillsProps = {
  skills: SkillsType;
};

const Skills = ({ skills: { experiences, skills } }: SkillsProps) => {
  const [showTooltip, setShowTooltip] = useState<{ [key: string]: boolean }>(
    {}
  );

  return (
    <MotionWrapper>
      <Wrapper idName="skills">
        <div className="mt-16 flex flex-col items-center justify-center md:mt-0">
          <h2 className="head-text">Skills & Experiences</h2>

          <div className="mt-12 flex w-4/5 flex-col lg:flex-row">
            <motion.div className="flex flex-[5] flex-wrap items-center justify-center lg:mr-20 lg:items-start lg:justify-start">
              {skills.map((skill) => (
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5 }}
                  className=" m-4 flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out"
                  key={skill.name}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fef4f5] transition-colors duration-300 ease-in-out hover:bg-[transparent] sm:h-24 sm:w-24">
                    <div className="relative h-1/2 w-1/2">
                      <Image
                        src={skill.icon!.asset!.url!}
                        layout="fill"
                        objectFit="cover"
                        alt={skill.name!}
                      />
                    </div>
                  </div>
                  <p className="p-text mt-2 font-medium 2xl:mt-4">
                    {skill.name}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-8 flex flex-[2] flex-col items-start justify-start md:mt-0">
              {experiences.map((experience) => (
                <motion.div
                  className="my-4 flex w-full flex-row items-start justify-start"
                  key={experience.year}
                >
                  <div className="mr-4 sm:mr-12">
                    <p className="bold-text font-extrabold text-secondary">
                      {experience.year}
                    </p>
                  </div>
                  <motion.div className="mb-4 flex w-full cursor-default flex-col items-start justify-start">
                    {experience.works!.map((work) => (
                      <div key={work!.name}>
                        <motion.div
                          onMouseEnter={() =>
                            setShowTooltip({ [work!.name!]: true })
                          }
                          onMouseLeave={() =>
                            setShowTooltip({ [work!.name!]: false })
                          }
                          whileInView={{ opacity: [0, 1] }}
                          transition={{ duration: 0.5 }}
                          className="relative mb-4 flex w-full cursor-pointer flex-col items-start justify-start"
                          data-tip
                          data-for={work!.name}
                        >
                          <h4 className="bold-text font-medium">
                            {work!.name}
                          </h4>
                          <p className="p-text mt-1.5 font-normal text-gray">
                            {work!.company}
                          </p>
                          <Tooltip show={showTooltip[work!.name!]}>
                            {work!.desc}
                          </Tooltip>
                        </motion.div>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </MotionWrapper>
  );
};

export default Skills;
