import React from 'react';
// import Image from 'next/image';

export default function PhotosPage() {
  // Sample photo gallery data - replace with your actual photos
  const photoCategories = [
    {
      title: "Brotherhood Events",
      photos: [
        { src: "/photos/brotherhood1.jpg", alt: "Brotherhood Retreat", caption: "Annual Brotherhood Retreat 2024" },
        { src: "/photos/brotherhood2.jpg", alt: "Game Night", caption: "Weekly Game Night" },
        { src: "/photos/brotherhood3.jpg", alt: "Hiking Trip", caption: "Hiking Trip to Laurel Highlands" },
      ]
    },
    {
      title: "Philanthropy",
      photos: [
        { src: "/photos/philanthropy1.jpg", alt: "ALS 5K", caption: "Annual ALS Awareness 5K" },
        { src: "/photos/philanthropy2.jpg", alt: "Fundraiser", caption: "Campus Fundraiser Event" },
        { src: "/photos/philanthropy3.jpg", alt: "Community Service", caption: "Community Service Day" },
      ]
    },
    {
      title: "Social Events",
      photos: [
        { src: "/photos/social1.jpg", alt: "Formal", caption: "Spring Formal 2024" },
        { src: "/photos/social2.jpg", alt: "Mixer", caption: "Mixer with Alpha Phi" },
        { src: "/photos/social3.jpg", alt: "Alumni Event", caption: "Alumni Weekend" },
      ]
    },
    {
      title: "Chapter House",
      photos: [
        { src: "/photos/house1.jpg", alt: "Chapter House", caption: "Our Chapter House at 1055 Morewood Avenue" },
        { src: "/photos/house2.jpg", alt: "Common Room", caption: "Common Room" },
        { src: "/photos/house3.jpg", alt: "Dining Area", caption: "Dining Area" },
      ]
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 bg-[var(--navy)]">
      <div className="max-w-6xl w-full">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--white)]">Photo Gallery</h1>
          <p className="text-xl text-[var(--white)]/80 max-w-3xl mx-auto">
            A glimpse into the brotherhood, philanthropy, and social events of the Pennsylvania Rho Chapter of Phi Delta Theta.
          </p>
        </div>

        {/* Photo Gallery */}
        <div className="space-y-16">
          {photoCategories.map((category, categoryIndex) => (
            <section key={categoryIndex} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-[var(--white)]">{category.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.photos.map((photo, photoIndex) => (
                  <div key={photoIndex} className="bg-[var(--light-blue)] rounded-lg overflow-hidden shadow-md">
                    <div className="relative h-64 w-full">
                      {/* Replace with actual images when available */}
                      <div className="bg-[var(--blue)]/20 h-full w-full flex items-center justify-center">
                        <p className="text-[var(--navy)]">{photo.alt}</p>
                      </div>
                      {/* Uncomment when you have actual images
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover"
                      />
                      */}
                    </div>
                    <div className="p-4">
                      <p className="text-[var(--navy)] font-medium">{photo.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Photo Submission CTA */}
        <section className="text-center bg-[var(--blue)] p-8 rounded-lg mt-16">
          <h2 className="text-3xl font-bold mb-4 text-[var(--white)]">Share Your Photos</h2>
          <p className="mb-6 max-w-2xl mx-auto text-[var(--white)]">
            Have photos from a recent Phi Delt event? We&apos;d love to add them to our gallery!
          </p>
          <a 
            href="mailto:phideltathetaparho@gmail.com" 
            className="bg-[var(--white)] text-[var(--navy)] px-6 py-3 rounded-md font-medium hover:bg-[var(--light-blue)] transition-colors inline-block"
          >
            Submit Photos
          </a>
        </section>
      </div>
    </main>
  );
}