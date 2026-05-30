import commonEn from '@/locales/en/common.json';
import projectsEn from '@/locales/en/projects.json';
import servicesEn from '@/locales/en/services.json';
import skillsEn from '@/locales/en/skills.json';

export const languages = {
    en: 'English',
    es: 'Español'
} as const;

export const defaultLang = 'en';

export const ui = {
    en: { ...commonEn, services: servicesEn, skills: skillsEn, projects: projectsEn },
    es: { ...commonEn, services: servicesEn, skills: skillsEn, projects: projectsEn }
} as const;

export type Locale = keyof typeof ui;
