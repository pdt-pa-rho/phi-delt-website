import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FundraisingProgress from './FundraisingProgress';

export default function PhilanthropyPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 bg-[var(--navy)]">
      <div className="max-w-5xl w-full">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--white)]">Our Philanthropy</h1>
          <p className="text-xl text-[var(--white)]/80 max-w-3xl mx-auto">
            Phi Delta Theta is committed to making a difference in our community through
            service and philanthropy, with a special focus on the fight against ALS.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4 text-[var(--white)]">
            Fundraising Progress
          </h2>
          <FundraisingProgress />
        </section>

        {/* LiveLikeLou Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[var(--white)]">LiveLikeLou Foundation</h2>
              <p className="mb-4 text-[var(--white)]">
                Phi Delta Theta&apos;s national philanthropy honors Brother Lou Gehrig (Columbia University),
                who died of Amyotrophic Lateral Sclerosis (ALS) in 1941. The LiveLikeLou Foundation was
                established to support ALS research and families affected by this devastating disease.
              </p>
              <p className="mb-4 text-[var(--white)]">
                Our chapter actively supports this cause through various fundraising events and awareness
                campaigns throughout the academic year.
              </p>
              <Link
                href="https://www.livelikelou.org/"
                target="_blank"
                className="inline-block bg-[var(--blue)] text-[var(--white)] px-6 py-3 rounded-md font-medium hover:bg-[var(--blue)]/80 transition-colors mt-4"
              >
                Learn More About LiveLikeLou
              </Link>
            </div>
            <div className="relative h-80 w-full">
              <div className="bg-[var(--light-blue)] h-full w-full flex items-center justify-center rounded-lg">
                <Image
                  src="/LLL.png"
                  alt="LiveLikeLou Foundation"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Annual Events Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[var(--white)]">Our Annual Philanthropy Events</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[var(--light-blue)] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[var(--navy)]">Greek Sing</h3>
              <p className="text-[var(--navy)]">
                Greek Sing is an annual spring event put together by Greek organizations at Carnegie Mellon to raise money for charities. Generally, a fraternity and a sorority pair up to host a 15 minute musical rendition of a movie or musical.
              </p>
            </div>
            <div className="bg-[var(--light-blue)] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[var(--navy)]">Painting Auction</h3>
              <p className="text-[var(--navy)]">
                The painting auction is a bi-annual event where artistic brothers come together to sell their artwork and raise money for Live Like Lou.
              </p>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[var(--white)]">Our Impact</h2>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-[var(--blue)] mb-2">$4,000+</div>
              <p className="text-[var(--white)]">Raised for ALS research annually</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-[var(--blue)] mb-2">500+</div>
              <p className="text-[var(--white)]">Community service hours per semester</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-[var(--blue)] mb-2">5+</div>
              <p className="text-[var(--white)]">Local organizations supported</p>
            </div>
          </div>
        </section>

        {/* Get Involved CTA */}
        <section className="text-center bg-[var(--blue)] p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-[var(--white)]">Get Involved</h2>
          <p className="mb-6 max-w-2xl mx-auto text-[var(--white)]">
            Want to support our philanthropic efforts? Whether you&apos;re a student, alumni, or community member,
            there are many ways to get involved and make a difference.
          </p>
          <Link
            href="mailto:phideltathetaparho@gmail.com"
            className="bg-[var(--white)] text-[var(--navy)] px-6 py-3 rounded-md font-medium hover:bg-[var(--light-blue)] transition-colors inline-block"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </main>
  );
}
