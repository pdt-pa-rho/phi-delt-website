import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Exec from './Exec';
import SvgTiltBackground from '@/components/SVGTiltBackground';

export default function AboutPage() {
  return (
    <SvgTiltBackground
      svgUrl="/svg/PDT_Greek_Stacked_1C.svg"
      className="min-h-screen bg-(--navy)"
      svgClassName="text-(--light-blue)/15 !opacity-50 drop-shadow-md drop-shadow-black"
    >
      <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 pt-28">
        <div className="max-w-5xl w-full">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-(--white)">About Phi Delta Theta</h1>
            <p className="text-xl text-(--white)/80 max-w-3xl mx-auto">
              Established on principles of friendship, sound learning, and moral rectitude,
              we strive to cultivate excellence in our members and community.
            </p>
          </div>

          {/* Mission and Values Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-(--white)">Our Mission & Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-(--light-blue) p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-(--navy)">Friendship</h3>
                <p className="text-(--navy)">
                  We foster lifelong bonds among brothers through shared experiences,
                  mutual support, and a commitment to each other&apos;s growth and well-being.
                </p>
              </div>
              <div className="bg-(--light-blue) p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-(--navy)">Sound Learning</h3>
                <p className="text-(--navy)">
                  We promote academic excellence and intellectual growth, encouraging
                  brothers to pursue knowledge and develop skills for future success.
                </p>
              </div>
              <div className="bg-(--light-blue) p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-(--navy)">Moral Rectitude</h3>
                <p className="text-(--navy)">
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
                <h2 className="text-3xl font-bold mb-6 text-(--white)">Our History</h2>
                <p className="mb-4 text-(--white)">
                  Founded on December 26, 1848, at Miami University in Oxford, Ohio,
                  Phi Delta Theta was established by six visionary men who sought to create
                  a brotherhood based on friendship, sound learning, and moral rectitude.
                </p>
                <p className="mb-4 text-(--white)">
                  Our chapter, Pennsylvania Rho, was chartered on October 15, 2013 and has since
                  maintained a strong presence on campus, contributing to both university life
                  and the broader community.
                </p>
                <p className="text-(--white)">
                  Through the decades, we have upheld our founding principles while adapting
                  to the changing landscape of higher education and society.
                </p>
              </div>
              <div className="relative h-80 w-full">
                {/* Replace with your chapter house or historical image */}
                <div id="house" className="bg-(--light-blue) h-full w-full flex items-center justify-center rounded-lg relative">
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
            <h2 className="text-3xl font-bold mb-6 text-(--white)">Chapter Leadership</h2>
            <Exec />
          </section>

          {/* Call to Action */}
          <section className="text-center bg-(--blue) p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4 text-(--white)">Join Our Brotherhood</h2>
            <p className="mb-6 max-w-2xl mx-auto text-(--white)">
              Interested in becoming part of Phi Delta Theta? Learn more about our
              recruitment process and how you can become a brother.
            </p>
            <Link
              href="/rush"
              className="bg-(--white) text-(--navy) px-6 py-3 rounded-md font-medium hover:bg-(--light-blue) transition-colors inline-block"
            >
              Learn About Recruitment
            </Link>
          </section>
        </div>
      </main>
    </SvgTiltBackground>
  );
}
