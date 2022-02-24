import { AboutQuery, SkillQuery, WorkQuery } from '../../graphql/generated';

export type AboutsType = AboutQuery['allAbouts'];
export type WorksType = WorkQuery['allWorks'];
export type SkillsType = {
  experiences: SkillQuery['allExperiences'];
  skills: SkillQuery['allSkills'];
};
