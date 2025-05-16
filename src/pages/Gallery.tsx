// src/components/Gallery.tsx
import { useQuery } from '@tanstack/react-query';
import { SlideshowLightbox } from 'lightbox.js-react';
import { fetchGallery } from '@/api/creative';
import { OUTPUT_URL } from '@/api';

export default function Gallery() {
  const { data, isLoading } = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGallery,
  });

  if (isLoading) return <p className="text-center">Carregando imagens...</p>;

  if (!data || data.results.length === 0)
    return <p className="text-center">Nenhuma imagem encontrada.</p>;

  return (
    <SlideshowLightbox className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {data?.results.map((item: any) => (
        <img
          key={item}
          src={`${OUTPUT_URL}${item}`}
          alt={item || 'Imagem gerada'}
          className="w-full h-auto rounded-lg shadow-md cursor-pointer transition-transform hover:scale-[1.02]"
        />
      ))}
    </SlideshowLightbox>
  );
}