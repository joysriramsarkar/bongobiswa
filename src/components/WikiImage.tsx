
'use client';

import { useState, useEffect } from 'react';
import { getWikiImage, getWikiImageByTitle } from '@/lib/wiki';

interface WikiImageProps {
  id?: string;
  term?: string;
  fallback: string;
  alt: string;
  className?: string;
}

export function WikiImage({ id, term, fallback, alt, className }: WikiImageProps) {
  const [src, setSrc] = useState(fallback);

  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
      let url = null;

      // Try title first as it corresponds to the Wikipedia page which usually has a main image
      if (term) {
        url = await getWikiImageByTitle(term);
      }

      // If no image from title, try Wikidata ID
      if (!url && id) {
        url = await getWikiImage(id);
      }

      if (isMounted && url) {
        setSrc(url);
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [id, term]);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setSrc(fallback)}
    />
  );
}
