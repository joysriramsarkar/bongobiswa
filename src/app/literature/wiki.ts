import axios from 'axios';

/**
 * Fetches a list of Bengali authors from Wikidata using SPARQL.
 * @returns A promise that resolves to an array of author data.
 */
export async function getBengaliAuthors() {
  // SPARQL query: Fetch authors (P106) whose language is Bengali (Q9610)
  const sparqlQuery = `
    SELECT ?author ?authorLabel ?birthDate ?image WHERE {
      ?author wdt:P106 wd:Q36180;  # Occupation: writer
              wdt:P1412 wd:Q9610;  # Language: Bengali
              wdt:P569 ?birthDate. # Date of birth
      OPTIONAL { ?author wdt:P18 ?image. } # Image (if available)
      SERVICE wikibase:label { bd:serviceParam wikibase:language "bn,en". }
    }
    LIMIT 20
  `;

  const url = 'https://query.wikidata.org/sparql';
  
  try {
    const response = await axios.get(url, {
      params: {
        query: sparqlQuery,
        format: 'json'
      }
    });
    return response.data.results.bindings;
  } catch (error) {
    console.error('Error fetching from Wikidata:', error);
    return [];
  }
}

/**
 * Fetches the summary of a Wikipedia page.
 * @param title The title of the Wikipedia page.
 * @returns A promise that resolves to the page summary/extract.
 */
export async function getWikiSummary(title: string) {
  const url = `https://bn.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.extract; // or data.description
}