interface TimelineItem {
    id: string;
    year: string;
    title: {
        en: string;
        es: string;
    };
    description: {
        en: string;
        es: string;
    };
    icon: string; // Icon name for the timeline
    iconUseItemColor: boolean; // If true, icon uses item color; if false, uses its own colors
    category: 'education' | 'work' | 'project' | 'achievement' | 'skill';
    colorLightTheme: string; // Color for light theme
    colorDarkTheme: string; // Color for dark theme
}

export const timelineData: TimelineItem[] = [
    {
        id: 'secondary-school',
        year: '2020 - 2021',
        title: {
            en: 'Secondary Education (10th)',
            es: 'Educación Secundaria (10mo)'
        },
        description: {
            en: 'Completed Secondary Education at Chandresh Lodha Memorial School.',
            es: 'Completé la educación secundaria en Chandresh Lodha Memorial School.'
        },
        icon: 'academic-cap',
        iconUseItemColor: true,
        category: 'education',
        colorLightTheme: '#059669',
        colorDarkTheme: '#34d399'
    },
    {
        id: 'higher-secondary',
        year: '2022 - 2023',
        title: {
            en: 'Higher Secondary Education (12th)',
            es: 'Educación Secundaria Superior (12mo)'
        },
        description: {
            en: 'Completed Higher Secondary Education at Thakur College.',
            es: 'Completé la educación secundaria superior en Thakur College.'
        },
        icon: 'academic-cap',
        iconUseItemColor: true,
        category: 'education',
        colorLightTheme: '#2563eb',
        colorDarkTheme: '#60a5fa'
    },
    {
        id: 'bachelors-it',
        year: '2023 - 2026',
        title: {
            en: 'BSc. in Information Technology',
            es: 'Licenciatura en Tecnología de la Información'
        },
        description: {
            en: 'Pursuing Bachelor of Science in Information Technology at Reena Mehta College.',
            es: 'Cursando la Licenciatura en Ciencias de la Información en Reena Mehta College.'
        },
        icon: 'academic-cap',
        iconUseItemColor: true,
        category: 'education',
        colorLightTheme: '#7c3aed',
        colorDarkTheme: '#a78bfa'
    }
];

export type { TimelineItem };
