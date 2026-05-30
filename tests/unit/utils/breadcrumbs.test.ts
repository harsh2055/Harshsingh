import { describe, expect, it } from 'vitest';
import {
    generateBlogBreadcrumbs,
    generateBreadcrumbs,
    generateGoodiesBreadcrumbs,
    generateProjectBreadcrumbs,
    generateServiceBreadcrumbs
} from '@/utils/breadcrumbs';

describe('Breadcrumbs Utilities', () => {
    const baseUrl = 'https://harshsingh.qzz.io';

    describe('generateBreadcrumbs', () => {
        describe('English paths', () => {
            it('should generate breadcrumbs for blog post', () => {
                const result = generateBreadcrumbs('/en/blog/my-post', baseUrl, 'My Blog Post');
                expect(result).toEqual([
                    { name: 'Home', url: 'https://harshsingh.qzz.io/en' },
                    { name: 'Blog', url: 'https://harshsingh.qzz.io/en/blog' },
                    { name: 'My Blog Post' }
                ]);
            });

            it('should generate breadcrumbs for projects page', () => {
                const result = generateBreadcrumbs('/en/projects', baseUrl);
                expect(result).toEqual([{ name: 'Home', url: 'https://harshsingh.qzz.io/en' }, { name: 'Projects' }]);
            });

            it('should generate breadcrumbs for services page', () => {
                const result = generateBreadcrumbs('/en/services/web-apps', baseUrl, 'Web Applications');
                expect(result).toEqual([
                    { name: 'Home', url: 'https://harshsingh.qzz.io/en' },
                    { name: 'Services', url: 'https://harshsingh.qzz.io/en/services' },
                    { name: 'Web Applications' }
                ]);
            });

            it('should generate breadcrumbs for goodies nested page', () => {
                const result = generateBreadcrumbs('/en/goodies/css-tricks/gradient-text', baseUrl, 'Gradient Text');
                expect(result).toEqual([
                    { name: 'Home', url: 'https://harshsingh.qzz.io/en' },
                    { name: 'Goodies', url: 'https://harshsingh.qzz.io/en/goodies' },
                    { name: 'CSS Tricks', url: 'https://harshsingh.qzz.io/en/goodies/css-tricks' },
                    { name: 'Gradient Text' }
                ]);
            });
        });

        describe('Spanish paths', () => {
            it('should generate breadcrumbs for blog post in Spanish', () => {
                const result = generateBreadcrumbs('/es/blog/mi-post', baseUrl, 'Mi Post');
                expect(result).toEqual([
                    { name: 'Inicio', url: 'https://harshsingh.qzz.io/es' },
                    { name: 'Blog', url: 'https://harshsingh.qzz.io/es/blog' },
                    { name: 'Mi Post' }
                ]);
            });

            it('should generate breadcrumbs for projects in Spanish', () => {
                const result = generateBreadcrumbs('/es/projects', baseUrl);
                expect(result).toEqual([{ name: 'Inicio', url: 'https://harshsingh.qzz.io/es' }, { name: 'Proyectos' }]);
            });

            it('should translate service names in Spanish', () => {
                const result = generateBreadcrumbs('/es/services/landing-pages', baseUrl);
                expect(result).toEqual([
                    { name: 'Inicio', url: 'https://harshsingh.qzz.io/es' },
                    { name: 'Servicios', url: 'https://harshsingh.qzz.io/es/services' },
                    { name: 'Landing Pages' }
                ]);
            });
        });

        describe('Edge cases', () => {
            it('should handle root path', () => {
                const result = generateBreadcrumbs('/', baseUrl);
                expect(result).toEqual([{ name: 'Home' }]);
            });

            it('should handle empty path', () => {
                const result = generateBreadcrumbs('', baseUrl);
                expect(result).toEqual([{ name: 'Home' }]);
            });

            it('should handle unknown slug by converting to title case', () => {
                const result = generateBreadcrumbs('/en/some-unknown-page', baseUrl);
                expect(result).toEqual([{ name: 'Home', url: 'https://harshsingh.qzz.io/en' }, { name: 'Some Unknown Page' }]);
            });

            it('should handle path without language prefix', () => {
                const result = generateBreadcrumbs('/blog/post', baseUrl);
                expect(result).toEqual([
                    { name: 'Home', url: 'https://harshsingh.qzz.io' },
                    { name: 'Blog', url: 'https://harshsingh.qzz.io/blog' },
                    { name: 'Post' }
                ]);
            });

            it('should handle trailing slashes', () => {
                const result = generateBreadcrumbs('/en/blog/', baseUrl);
                expect(result).toEqual([{ name: 'Home', url: 'https://harshsingh.qzz.io/en' }, { name: 'Blog' }]);
            });
        });
    });

    describe('generateBlogBreadcrumbs', () => {
        it('should generate English blog breadcrumbs', () => {
            const result = generateBlogBreadcrumbs('en', baseUrl, 'My Post Title');
            expect(result).toEqual([
                { name: 'Home', url: 'https://harshsingh.qzz.io/en' },
                { name: 'Blog', url: 'https://harshsingh.qzz.io/en/blog' },
                { name: 'My Post Title' }
            ]);
        });

        it('should generate Spanish blog breadcrumbs', () => {
            const result = generateBlogBreadcrumbs('es', baseUrl, 'Título del Post');
            expect(result).toEqual([
                { name: 'Inicio', url: 'https://harshsingh.qzz.io/es' },
                { name: 'Blog', url: 'https://harshsingh.qzz.io/es/blog' },
                { name: 'Título del Post' }
            ]);
        });
    });

    describe('generateProjectBreadcrumbs', () => {
        it('should generate English project breadcrumbs', () => {
            const result = generateProjectBreadcrumbs('en', baseUrl, 'My Project');
            expect(result).toEqual([
                { name: 'Home', url: 'https://harshsingh.qzz.io/en' },
                { name: 'Projects', url: 'https://harshsingh.qzz.io/en/projects' },
                { name: 'My Project' }
            ]);
        });

        it('should generate Spanish project breadcrumbs', () => {
            const result = generateProjectBreadcrumbs('es', baseUrl, 'Mi Proyecto');
            expect(result).toEqual([
                { name: 'Inicio', url: 'https://harshsingh.qzz.io/es' },
                { name: 'Proyectos', url: 'https://harshsingh.qzz.io/es/projects' },
                { name: 'Mi Proyecto' }
            ]);
        });
    });

    describe('generateServiceBreadcrumbs', () => {
        it('should generate English service breadcrumbs', () => {
            const result = generateServiceBreadcrumbs('en', baseUrl, 'Web Apps');
            expect(result).toEqual([
                { name: 'Home', url: 'https://harshsingh.qzz.io/en' },
                { name: 'Services', url: 'https://harshsingh.qzz.io/en/services' },
                { name: 'Web Apps' }
            ]);
        });

        it('should generate Spanish service breadcrumbs', () => {
            const result = generateServiceBreadcrumbs('es', baseUrl, 'Aplicaciones Web');
            expect(result).toEqual([
                { name: 'Inicio', url: 'https://harshsingh.qzz.io/es' },
                { name: 'Servicios', url: 'https://harshsingh.qzz.io/es/services' },
                { name: 'Aplicaciones Web' }
            ]);
        });
    });

    describe('generateGoodiesBreadcrumbs', () => {
        it('should generate breadcrumbs for goodies category (no item)', () => {
            const result = generateGoodiesBreadcrumbs('en', baseUrl, 'css-tricks');
            expect(result).toEqual([
                { name: 'Home', url: 'https://harshsingh.qzz.io/en' },
                { name: 'Goodies', url: 'https://harshsingh.qzz.io/en/goodies' },
                { name: 'CSS Tricks', url: undefined }
            ]);
        });

        it('should generate breadcrumbs for goodies item', () => {
            const result = generateGoodiesBreadcrumbs('en', baseUrl, 'css-tricks', 'Gradient Text');
            expect(result).toEqual([
                { name: 'Home', url: 'https://harshsingh.qzz.io/en' },
                { name: 'Goodies', url: 'https://harshsingh.qzz.io/en/goodies' },
                { name: 'CSS Tricks', url: 'https://harshsingh.qzz.io/en/goodies/css-tricks' },
                { name: 'Gradient Text' }
            ]);
        });

        it('should generate Spanish goodies breadcrumbs', () => {
            const result = generateGoodiesBreadcrumbs('es', baseUrl, 'snippets', 'Mi Snippet');
            expect(result).toEqual([
                { name: 'Inicio', url: 'https://harshsingh.qzz.io/es' },
                { name: 'Recursos', url: 'https://harshsingh.qzz.io/es/goodies' },
                { name: 'Snippets', url: 'https://harshsingh.qzz.io/es/goodies/snippets' },
                { name: 'Mi Snippet' }
            ]);
        });

        it('should handle tools category', () => {
            const result = generateGoodiesBreadcrumbs('en', baseUrl, 'tools');
            expect(result).toEqual([
                { name: 'Home', url: 'https://harshsingh.qzz.io/en' },
                { name: 'Goodies', url: 'https://harshsingh.qzz.io/en/goodies' },
                { name: 'Tools', url: undefined }
            ]);
        });

        it('should handle useful-links category', () => {
            const result = generateGoodiesBreadcrumbs('es', baseUrl, 'useful-links');
            expect(result).toEqual([
                { name: 'Inicio', url: 'https://harshsingh.qzz.io/es' },
                { name: 'Recursos', url: 'https://harshsingh.qzz.io/es/goodies' },
                { name: 'Enlaces Útiles', url: undefined }
            ]);
        });
    });
});
