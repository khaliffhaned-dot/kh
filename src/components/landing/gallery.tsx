import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export function GallerySection() {
  const galleryImages = PlaceHolderImages.filter((img) =>
    img.id.startsWith("gallery-")
  );

  const imageCols = [
    [galleryImages[0], galleryImages[1]],
    [galleryImages[2], galleryImages[3]],
    [galleryImages[4], galleryImages[5]],
    [galleryImages[6], galleryImages[7]],
  ].filter(col => col[0] && col[1]);

  return (
    <section id="gallery" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-headline text-5xl md:text-6xl font-semibold text-white">
            Our Community in Action
          </h2>
          <p className="mt-2 text-gray-300 max-w-2xl mx-auto">
            Capturing the focus, dedication, and fun at WARAC.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {imageCols.map((col, colIndex) => (
            <div key={colIndex} className="grid gap-4">
              {col.map((image, imgIndex) => (
                <div key={image.id}>
                    <Image
                    className="h-auto max-w-full rounded-lg hover:scale-105 transition-transform duration-300"
                    src={image.imageUrl}
                    alt={image.description}
                    width={400}
                    height={imgIndex % 2 === 0 ? 600 : 400}
                    data-ai-hint={image.imageHint}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
