/**
 * Contact Data
 * Personal contact information and social media links
 */

export interface ContactData {
    email: string;
    phone: string;
    location: string;
    address?: string;
    social: {
        github: string;
        linkedin: string;
        fiverr: string;
        upwork: string;
        whatsapp: string;
        mail: string;
        buymeacoffee: string;
        discord: string;
        x: string;
    };
}

export const contact: ContactData = {
    email: 'harshs288375@gmail.com',
    phone: '9967254145',
    location: 'Nallasopara, Mumbai',
    address: 'Nallasopara, Mumbai, India',
    social: {
        github: 'https://github.com/harsh2055',
        linkedin: 'https://www.linkedin.com/in/harsh-singh-b5836b350',
        fiverr: '#',
        upwork: '#',
        whatsapp: 'https://wa.me/919967254145',
        mail: 'mailto:harshs288375@gmail.com',
        buymeacoffee: '#',
        discord: '#',
        x: '#'
    }
};
