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