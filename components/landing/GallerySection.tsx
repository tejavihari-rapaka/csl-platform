'use client';

import Image from 'next/image';
import * as React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { ZoomIn, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const GALLERY_IMAGES = [
  {
    src: '/gallery/gallery-1.jpeg',
    alt: 'CSL student group learning together',
    caption: 'Community learning in action',
  },
  {
    src: '/gallery/gallery-2.jpeg',
    alt: 'Volunteer mentor teaching a class online',
    caption: 'Volunteer mentor sessions',
  },
  {
    src: '/gallery/gallery-3.jpeg',
    alt: 'Language learners collaborating',
    caption: 'Collaborative language practice',
  },
  {
    src: '/gallery/gallery-4.jpeg',
    alt: 'Students enjoying a cultural exchange',
    caption: 'Cultural language exchange',
  },
  {
    src: '/gallery/gallery-5.jpeg',
    alt: 'A vibrant classroom discussion',
    caption: 'Vibrant classroom energy',
  },
];

type GalleryImage = (typeof GALLERY_IMAGES)[number];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = React.useState<GalleryImage | null>(null);
  const [autoPlay, setAutoPlay] = React.useState(true);
  const [carouselApi, setCarouselApi] = React.useState<
    import('embla-carousel-react').UseEmblaCarouselType[1] | undefined
  >(undefined);

  React.useEffect(() => {
    if (!carouselApi || !autoPlay) return;

    const interval = window.setInterval(() => {
      carouselApi.scrollNext();
    }, 4500);

    return () => window.clearInterval(interval);
  }, [carouselApi, autoPlay]);

  return (
    <section className="py-16 md:py-24" aria-label="Gallery">
      <div id="gallery" className="container">
        <h2 className="mt-2 text-3xl font-display font-bold tracking-tight text-csl-ink md:text-4xl">
          Community Gallery
        </h2>
        <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
          Moments from our language learning community. Tap any image to zoom and explore the details.
        </p>

        <div className="relative mt-10">
          <Carousel
            opts={{ loop: true, align: 'center', containScroll: 'trimSnaps', dragFree: false }}
            setApi={setCarouselApi}
            className="relative overflow-hidden"
          >
            <CarouselContent className="gap-6 px-4 sm:px-6">
              {GALLERY_IMAGES.map((image) => (
                <CarouselItem
                  key={image.src}
                  className="mx-auto w-[82vw] max-w-[520px] sm:w-[55vw] md:w-[45vw] xl:w-[35vw]"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    onMouseEnter={() => setAutoPlay(false)}
                    onMouseLeave={() => setAutoPlay(true)}
                    className={cn(
                      'group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-border bg-card/80 text-left shadow-sm transition duration-300',
                      'hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-csl-primary'
                    )}
                  >
                    <div className="relative aspect-[21/11] w-full overflow-hidden bg-muted">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-csl-primary shadow-sm">
                        <ZoomIn className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-semibold text-csl-ink">{image.caption}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Tap to zoom</p>
                    </div>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute left-2 top-1/2 z-10 -translate-y-1/2" aria-label="Previous image" />
            <CarouselNext className="absolute right-2 top-1/2 z-10 -translate-y-1/2" aria-label="Next image" />
          </Carousel>
        </div>
      </div>

      <Dialog open={Boolean(selectedImage)} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-6xl p-0 bg-transparent shadow-none">
          {selectedImage ? (
            <div className="relative w-screen max-w-6xl overflow-hidden rounded-3xl bg-black sm:w-[90vw] sm:rounded-[2rem]">
              <div className="absolute right-3 top-3 z-20 flex items-center gap-2">
                <DialogClose className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-csl-ink shadow-sm transition hover:bg-white">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </DialogClose>
              </div>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="space-y-2 bg-black/90 px-6 py-4 text-white sm:px-8">
                <p className="text-base font-semibold">{selectedImage.caption}</p>
                <p className="text-sm text-white/80">{selectedImage.alt}</p>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
