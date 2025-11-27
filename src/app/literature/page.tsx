
import { getLiteratureWorksByCategory } from '@/actions/literature';
import { getBengaliAuthors, getWikiSummary } from '@/lib/wiki';
import LiteratureClient from '@/components/literature/LiteratureClient';

export const dynamic = 'force-dynamic';

export default async function LiteraturePage() {
  const initialWorks = await getLiteratureWorksByCategory('কবিতা');

  // Fetch initial authors (server-side for SEO)
  let initialAuthors: any[] = [];
  try {
      const fetchedAuthors = await getBengaliAuthors();
      const authorPromises = fetchedAuthors.map(async (author) => {
        let description = author.description;
        if (!description) {
          description = await getWikiSummary(author.name) || 'বিখ্যাত বাঙালি সাহিত্যিক';
        }

        return {
          id: author.id,
          name: author.name,
          birth: author.birthDate || 'অজানা',
          death: author.deathDate || 'বর্তমান',
          works: author.worksCount || 0,
          description: description,
          avatar: author.image || 'https://placehold.co/100x100',
          famousWorks: []
        };
      });
      initialAuthors = await Promise.all(authorPromises);
  } catch (error) {
      console.error("Error fetching authors:", error);
  }

  return <LiteratureClient initialWorks={initialWorks} initialAuthors={initialAuthors} />;
}
