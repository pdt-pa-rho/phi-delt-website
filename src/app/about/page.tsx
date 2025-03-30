import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 bg-[var(--navy)]">
      <div className="max-w-5xl w-full">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--white)]">About Phi Delta Theta</h1>
          <p className="text-xl text-[var(--white)]/80 max-w-3xl mx-auto">
            Established on principles of friendship, sound learning, and moral rectitude, 
            we strive to cultivate excellence in our members and community.
          </p>
        </div>

        {/* Mission and Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[var(--white)]">Our Mission & Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[var(--light-blue)] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[var(--navy)]">Friendship</h3>
              <p className="text-[var(--navy)]">
                We foster lifelong bonds among brothers through shared experiences, 
                mutual support, and a commitment to each other&apos;s growth and well-being.
              </p>
            </div>
            <div className="bg-[var(--light-blue)] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[var(--navy)]">Sound Learning</h3>
              <p className="text-[var(--navy)]">
                We promote academic excellence and intellectual growth, encouraging 
                brothers to pursue knowledge and develop skills for future success.
              </p>
            </div>
            <div className="bg-[var(--light-blue)] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[var(--navy)]">Moral Rectitude</h3>
              <p className="text-[var(--navy)]">
                We uphold the highest standards of integrity and ethical conduct, 
                guiding brothers to make principled decisions in all aspects of life.
              </p>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[var(--white)]">Our History</h2>
              <p className="mb-4 text-[var(--white)]">
                Founded on December 26, 1848, at Miami University in Oxford, Ohio, 
                Phi Delta Theta was established by six visionary men who sought to create 
                a brotherhood based on friendship, sound learning, and moral rectitude.
              </p>
              <p className="mb-4 text-[var(--white)]">
                Our chapter, Pennsylvania Rho, was chartered on April 21, 1996 and has since 
                maintained a strong presence on campus, contributing to both university life 
                and the broader community.
              </p>
              <p className="text-[var(--white)]">
                Through the decades, we have upheld our founding principles while adapting 
                to the changing landscape of higher education and society.
              </p>
            </div>
            <div className="relative h-80 w-full">
              {/* Replace with your chapter house or historical image */}
              <div className="bg-[var(--light-blue)] h-full w-full flex items-center justify-center rounded-lg relative">
                <Image
                  src="/house.jpg"
                  alt="Chapter House"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[var(--white)]">Chapter Leadership</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {/* Example leadership positions - customize as needed */}
            {[
              { title: 'President', name: 'Nathan Vastey' },
              { title: 'Vice President', name: 'Rohan Wadwha' },
              { title: 'Secretary', name: 'Aayush Bajaj' },
              { title: 'Treasurer', name: 'Wade Crum' },
              { title: 'Social Chair', name: 'Daniel Lee' },
              { title: 'House Manager', name: 'Spencer Fisher' },
              { title: 'Phikeia Educator', name: 'Harry Schneider' },
              { title: 'Brotherhood Chair', name: 'Cole Schaefer'},
              { title: 'Risk Management Chair', name: 'Chibueze Ike' },
              { title: 'Recruitment Chair', name: 'Prathik Guduri' },
              { title: 'Membership Development Chair', name: 'Rohan Jain' },
            ].map((leader, index) => (
              <div key={index} className="bg-[var(--light-blue)] p-4 rounded-lg shadow-md text-center">
                <div className="bg-[var(--white)] h-32 w-32 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  <Image 
                    src={`/exec/${leader.name}.jpg`} 
                    alt={leader.name} 
                    width={128}
                    height={128}
                    className="w-full h-full object-cover rounded-full" 
                  />
                </div>
                <h3 className="font-semibold text-[var(--navy)]">{leader.title}</h3>
                <p className="text-[var(--navy)]">{leader.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-[var(--blue)] p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-[var(--white)]">Join Our Brotherhood</h2>
          <p className="mb-6 max-w-2xl mx-auto text-[var(--white)]">
            Interested in becoming part of Phi Delta Theta? Learn more about our 
            recruitment process and how you can become a brother.
          </p>
          <Link 
            href="/recruitment" 
            className="bg-[var(--white)] text-[var(--navy)] px-6 py-3 rounded-md font-medium hover:bg-[var(--light-blue)] transition-colors inline-block"
          >
            Learn About Recruitment
          </Link>
        </section>
      </div>
    </main>
  );
}
