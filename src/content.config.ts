import { defineCollection, z} from 'astro:content'; 
import {glob} from 'astro/loaders'; 

const journal = defineCollection({
    loader: glob({ base: './src/content/journal', pattern: '**/*.md'}), 
    schema: z.object({
        title: z.string(), 
        date: z.date(), 
        summary: z.string(), 
        tags: z.array(z.string()).default([])
    })
}); 

export const collections = { journal };