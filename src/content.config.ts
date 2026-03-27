import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/pages" }),
  schema: z.object({
    heroTitle: z.string(),
    heroSubtitle: z.string(),
    introTitle: z.string(),
    introDescription: z.string(),
    aboutTitle: z.string(),
    aboutContent: z.string(),
    productsTitle: z.string(),
    productsSubtitle: z.string(),
    liveProducts: z.array(z.object({
      name: z.string(),
      description: z.string(),
      status: z.string(),
      bgColor: z.string(),
      textColor: z.string(),
      image: z.string().nullable().optional(),
      link: z.string().nullable().optional()
    })),
    comingSoonTitle: z.string(),
    comingSoonSubtitle: z.string(),
    upcomingProducts: z.array(z.object({
      name: z.string(),
      description: z.string(),
      image: z.string().nullable().optional(),
      link: z.string().nullable().optional()
    })),
    waitlistTitle: z.string(),
    waitlistSubtitle: z.string(),
    waitlistButtonText: z.string(),
    contactTitle: z.string(),
    contactSubtitle: z.string(),
    footerTitle: z.string()
  })
});

export const collections = {
  'pages': pagesCollection,
};
