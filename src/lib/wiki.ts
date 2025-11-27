import axios from 'axios';

export interface Author {
  id: string;
  name: string;
  birthDate?: string;
  deathDate?: string;
  image?: string;
  description?: string;
  worksCount?: number;
}

/**
 * Fetches a list of Bengali authors from Wikidata using SPARQL.
 * @returns A promise that resolves to an array of author data.
 */
export async function getBengaliAuthors(): Promise<Author[]> {
  // SPARQL query: Fetch authors (P106) whose language is Bengali (Q9610)
  // Added death date and notable works count for better data
  const sparqlQuery = `
    SELECT DISTINCT ?author ?authorLabel ?birthDate ?deathDate ?image (COUNT(?work) as ?worksCount) WHERE {
      ?author wdt:P106 wd:Q36180;  # Occupation: writer
              wdt:P1412 wd:Q9610;  # Language: Bengali
              wdt:P569 ?birthDate. # Date of birth

      OPTIONAL { ?author wdt:P570 ?deathDate. } # Date of death (if available)
      OPTIONAL { ?author wdt:P18 ?image. }      # Image (if available)
      OPTIONAL { ?work wdt:P50 ?author. }       # Works by the author

      SERVICE wikibase:label { bd:serviceParam wikibase:language "bn,en". }
    }
    GROUP BY ?author ?authorLabel ?birthDate ?deathDate ?image
    ORDER BY DESC(?worksCount)
    LIMIT 10
  `;

  const url = 'https://query.wikidata.org/sparql';
  
  try {
    const response = await axios.get(url, {
      params: {
        query: sparqlQuery,
        format: 'json'
      }
    });

    return response.data.results.bindings.map((item: any) => ({
      id: item.author.value.split('/').pop(),
      name: item.authorLabel.value,
      birthDate: item.birthDate ? new Date(item.birthDate.value).getFullYear().toString() : 'অজানা',
      deathDate: item.deathDate ? new Date(item.deathDate.value).getFullYear().toString() : 'বর্তমান',
      image: item.image ? item.image.value : null,
      worksCount: item.worksCount ? parseInt(item.worksCount.value) : 0
    }));
  } catch (error) {
    console.error('Error fetching authors from Wikidata:', error);
    return [];
  }
}

/**
 * Fetches the image URL for a given Wikidata entity ID.
 * @param id The Wikidata entity ID (e.g., Q1191069).
 * @returns A promise that resolves to the image URL or null.
 */
export async function getWikiImage(id: string): Promise<string | null> {
  const sparqlQuery = `
    SELECT ?image WHERE {
      wd:${id} wdt:P18 ?image.
    }
    LIMIT 1
  `;

  const url = 'https://query.wikidata.org/sparql';

  try {
    const response = await axios.get(url, {
      params: {
        query: sparqlQuery,
        format: 'json',
      },
    });

    const bindings = response.data.results.bindings;
    if (bindings.length > 0 && bindings[0].image) {
      return bindings[0].image.value;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching image for ${id}:`, error);
    return null;
  }
}

/**
 * Fetches the image URL from a Wikipedia page summary.
 * @param title The title of the Wikipedia page (Bengali).
 * @returns A promise that resolves to the image URL or null.
 */
export async function getWikiImageByTitle(title: string): Promise<string | null> {
  const url = `https://bn.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();
    return data.originalimage?.source || data.thumbnail?.source || null;
  } catch (error) {
    console.error(`Error fetching image for ${title}:`, error);
    return null;
  }
}

/**
 * Fetches the summary of a Wikipedia page.
 * @param title The title of the Wikipedia page.
 * @returns A promise that resolves to the page summary/extract.
 */
export async function getWikiSummary(title: string) {
  const url = `https://bn.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  try {
      const response = await fetch(url);
      if (!response.ok) return null;
      const data = await response.json();
      return data.extract; // or data.description
  } catch (error) {
      console.error(`Error fetching summary for ${title}:`, error);
      return null;
  }
}

export interface Director {
  id: string;
  name: string;
  birthDate?: string;
  image?: string;
}

export async function getBengaliFilmDirectors(): Promise<Director[]> {
  // SPARQL Query: বিখ্যাত বাঙালি চলচ্চিত্র পরিচালক খোঁজা হচ্ছে
  const sparqlQuery = `
    SELECT DISTINCT ?director ?directorLabel ?birthDate ?image WHERE {
      ?director wdt:P31 wd:Q5;              # শর্ত ১: মানুষ হতে হবে
                wdt:P106 wd:Q2526255;       # শর্ত ২: পেশা চলচ্চিত্র পরিচালক
                wdt:P1412 wd:Q9610.         # শর্ত ৩: ভাষা বাংলা
      
      OPTIONAL { ?director wdt:P18 ?image. }      # ছবি (যদি থাকে)
      OPTIONAL { ?director wdt:P569 ?birthDate. } # জন্ম তারিখ (যদি থাকে)
      
      SERVICE wikibase:label { bd:serviceParam wikibase:language "bn,en". }
    }
    ORDER BY DESC(?birthDate) # জন্ম তারিখ অনুযায়ী সাজানো
    LIMIT 30                  # প্রথম ৩০ জন দেখাবে
  `;

  const url = 'https://query.wikidata.org/sparql';

  try {
    const response = await axios.get(url, {
      params: {
        query: sparqlQuery,
        format: 'json',
      },
    });

    // ডেটা প্রসেসিং করে সহজ ফরম্যাটে আনা
    return response.data.results.bindings.map((item: any) => ({
      id: item.director.value.split('/').pop(),
      name: item.directorLabel.value,
      birthDate: item.birthDate ? new Date(item.birthDate.value).toLocaleDateString('bn-BD') : 'অজানা',
      image: item.image ? item.image.value : null, // ছবি না থাকলে null
    }));
  } catch (error) {
    console.error('Error fetching directors from Wikidata:', error);
    return [];
  }
}
