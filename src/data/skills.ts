/**
 * Skills Data
 * Tech stack and skills categorized by type for radar chart visualization
 */

export interface Skill {
    name: string; // i18n key for soft skills and other skills, direct name for dev hard skills
    icon: string; // icon filename (without path or extension)
    color: string; // hex color for radar chart
    value: number; // 0-100 for radar chart visualization
    description?: string; // Optional description key for i18n (for other skills)
}

export interface SkillCategory {
    id: 'technicalSkills' | 'humanCreativeSkills';
    skills: Skill[];
}

export const skillsData: SkillCategory[] = [
    {
        id: 'technicalSkills',
        skills: [
            // Core Development Skills
            { name: 'JavaScript', icon: 'javascript', color: '#F7DF1E', value: 90 },
            { name: 'Python', icon: 'python', color: '#3776AB', value: 85 },
            { name: 'Java', icon: 'java', color: '#007396', value: 75 },
            { name: 'SQL', icon: 'database', color: '#336791', value: 80 },
            { name: 'HTML & CSS', icon: 'html5', color: '#E34F26', value: 95 },
            { name: 'Flask', icon: 'flask', color: '#000000', value: 80 },
            { name: 'Spring Boot', icon: 'leaf', color: '#6DB33F', value: 65 },
            { name: 'PostgreSQL', icon: 'postgresql', color: '#336791', value: 80 },
            { name: 'MongoDB', icon: 'mongodb', color: '#47A248', value: 85 },
            { name: 'Supabase', icon: 'supabase', color: '#3ECF8E', value: 85 },
            { name: 'Firebase', icon: 'firebase', color: '#FFCA28', value: 80 },
            // Technical Other Skills
            {
                name: 'API Integration',
                icon: 'api',
                color: '#10B981',
                value: 90
            }
        ]
    },
    {
        id: 'humanCreativeSkills',
        skills: [
            // Top Soft Skills (High Value)
            { name: 'problemSolving', icon: 'lightbulb', color: '#F59E0B', value: 95 },
            { name: 'teamwork', icon: 'user-group', color: '#EC4899', value: 90 },
            { name: 'curiosity', icon: 'search', color: '#84CC16', value: 95 },
            { name: 'communication', icon: 'chat-bubble', color: '#3B82F6', value: 85 },
            { name: 'analyticalThinking', icon: 'chart-bar', color: '#EF4444', value: 90 },
            { name: 'adaptability', icon: 'arrow-right', color: '#06B6D4', value: 85 },
            { name: 'flexibility', icon: 'arrow-up', color: '#10B981', value: 85 },
            // Creative Skills
            {
                name: 'AI Prompt Engineering',
                icon: 'brain',
                color: '#31A8FF',
                value: 90
            },
            {
                name: 'SaaS App Dev',
                icon: 'cloud',
                color: '#6C4AB6',
                value: 85
            }
        ]
    }
];
