
import { getBengaliAuthors, getBengaliFilmDirectors } from '../src/lib/wiki';

async function main() {
  console.log('Fetching Bengali Authors...');
  const authors = await getBengaliAuthors();
  console.log(`Found ${authors.length} authors.`);
  if (authors.length > 0) {
    console.log('Sample Author:', JSON.stringify(authors[0], null, 2));
  }

  console.log('\nFetching Bengali Film Directors...');
  const directors = await getBengaliFilmDirectors();
  console.log(`Found ${directors.length} directors.`);
  if (directors.length > 0) {
    console.log('Sample Director:', JSON.stringify(directors[0], null, 2));
  }
}

main().catch(console.error);
