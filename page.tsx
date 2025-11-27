import { getBengaliFilmDirectors } from '@/lib/wiki';
import Image from 'next/image';

export default async function CinemaPage() {
  const directors = await getBengaliFilmDirectors();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">কিংবদন্তি চলচ্চিত্রকার</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {directors.map((director) => (
          <div key={director.id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition bg-card">
            {director.image ? (
              <div className="relative w-full h-64 mb-4 overflow-hidden rounded-md">
                <Image 
                  src={director.image} 
                  alt={director.name} 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md mb-4">
                <span>ছবি পাওয়া যায়নি</span>
              </div>
            )}
            
            <h2 className="text-xl font-semibold">{director.name}</h2>
            <p className="text-sm text-muted-foreground">জন্ম: {director.birthDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}