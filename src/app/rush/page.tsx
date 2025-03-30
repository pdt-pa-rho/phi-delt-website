import React from 'react';
// import Image from 'next/image';
import Link from 'next/link';

export default function RushPage() {
  // Sample rush events - update with actual dates and events
  const rushEvents = [
    { 
      date: "April 15, 2025", 
      time: "7:00 PM - 9:00 PM", 
      title: "Meet the Brothers BBQ", 
      location: "Phi Delta Theta House, 1055 Morewood Avenue",
      description: "Join us for a casual BBQ at the chapter house and meet the brothers of Phi Delta Theta."
    },
    { 
      date: "April 16, 2025", 
      time: "6:00 PM - 8:00 PM", 
      title: "Poker Night", 
      location: "Phi Delta Theta House, 1055 Morewood Avenue",
      description: "Test your poker skills with the brothers. No experience necessary, we'll teach you how to play!"
    },
    { 
      date: "April 17, 2025", 
      time: "5:00 PM - 7:00 PM", 
      title: "Sports Day", 
      location: "CMU Intramural Fields",
      description: "Join us for some friendly competition with football, frisbee, and more."
    },
    { 
      date: "April 18, 2025", 
      time: "7:00 PM - 9:00 PM", 
      title: "Game Night", 
      location: "Phi Delta Theta House, 1055 Morewood Avenue",
      description: "Video games, board games, and more. Come hang out and have fun!"
    },
    { 
      date: "April 19, 2025", 
      time: "6:00 PM - 8:00 PM", 
      title: "Preference Dinner", 
      location: "Phi Delta Theta House, 1055 Morewood Avenue",
      description: "By invitation only. A more formal dinner to close out Rush Week."
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 bg-[var(--navy)]">
      <div className="max-w-5xl w-full">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--white)]">Rush Phi Delta Theta</h1>
          <p className="text-xl text-[var(--white)]/80 max-w-3xl mx-auto">
            Take the first step toward joining a brotherhood founded on friendship, sound learning, and moral rectitude.
          </p>
        </div>

        {/* Why Join Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[var(--white)]">Why Join Phi Delta Theta?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[var(--light-blue)] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[var(--navy)]">Lifelong Brotherhood</h3>
              <p className="text-[var(--navy)]">
                Join a diverse group of men who will support you throughout college and beyond. Our brotherhood extends far beyond graduation.
              </p>
            </div>
            <div className="bg-[var(--light-blue)] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[var(--navy)]">Academic Excellence</h3>
              <p className="text-[var(--navy)]">
                We prioritize academics and provide resources to help you succeed. Our chapter consistently maintains one of the highest GPAs among fraternities at CMU.
              </p>
            </div>
            <div className="bg-[var(--light-blue)] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[var(--navy)]">Leadership Development</h3>
              <p className="text-[var(--navy)]">
                Gain valuable leadership experience through chapter positions, campus involvement, and community service initiatives.
              </p>
            </div>
          </div>
        </section>

        {/* Rush Events Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[var(--white)]">Spring 2025 Rush Events</h2>
          <div className="space-y-4">
            {rushEvents.map((event, index) => (
              <div key={index} className="bg-[var(--light-blue)] p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-xl font-semibold text-[var(--navy)]">{event.title}</h3>
                  <div className="text-[var(--blue)] font-medium">{event.date} • {event.time}</div>
                </div>
                <p className="text-[var(--navy)]/80 mb-2">{event.description}</p>
                <p className="text-[var(--navy)] font-medium">{event.location}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[var(--white)]/80 text-center">
            All events are open to any interested CMU student. No prior invitation needed!
          </p>
        </section>

        {/* Rush Process Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[var(--white)]">The Rush Process</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-[var(--light-blue)] p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[var(--blue)] rounded-full flex items-center justify-center mx-auto mb-4 text-[var(--white)] font-bold text-xl">1</div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--navy)]">Attend Events</h3>
              <p className="text-[var(--navy)]">
                Come to our rush events to meet the brothers and learn about our chapter.
              </p>
            </div>
            <div className="bg-[var(--light-blue)] p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[var(--blue)] rounded-full flex items-center justify-center mx-auto mb-4 text-[var(--white)] font-bold text-xl">2</div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--navy)]">Receive a Bid</h3>
              <p className="text-[var(--navy)]">
                If there&apos;s mutual interest, you&apos;ll receive a bid to join our chapter.
              </p>
            </div>
            <div className="bg-[var(--light-blue)] p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[var(--blue)] rounded-full flex items-center justify-center mx-auto mb-4 text-[var(--white)] font-bold text-xl">3</div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--navy)]">New Member Education</h3>
              <p className="text-[var(--navy)]">
                Learn about our history, values, and brotherhood through our Phikeia program.
              </p>
            </div>
            <div className="bg-[var(--light-blue)] p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-[var(--blue)] rounded-full flex items-center justify-center mx-auto mb-4 text-[var(--white)] font-bold text-xl">4</div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--navy)]">Initiation</h3>
              <p className="text-[var(--navy)]">
                Become a full member of Phi Delta Theta and join our brotherhood for life.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[var(--white)]">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--white)]">What is the time commitment?</h3>
              <p className="text-[var(--white)]/80">
                We understand that academics come first. Our weekly time commitment includes a chapter meeting (2 hours), 
                occasional study hours, and social/philanthropy events. We work with each brother&apos;s schedule to ensure a balance 
                between fraternity involvement and academic success.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--white)]">What are the costs associated with membership?</h3>
              <p className="text-[var(--white)]/80">
                Membership dues help cover chapter operations, social events, and national fees. We offer payment plans and 
                scholarships to ensure that finances are not a barrier to joining. Specific cost information will be provided 
                during the rush process.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--white)]">Do I have to live in the chapter house?</h3>
              <p className="text-[var(--white)]/80">
                Living in the chapter house is not required but is an option for members. Many brothers choose to live in the 
                house for the convenience, community, and reduced housing costs compared to campus housing.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center bg-[var(--blue)] p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-[var(--white)]">Interested in Rushing?</h2>
          <p className="mb-6 max-w-2xl mx-auto text-[var(--white)]">
            Have questions or want to learn more about rushing Phi Delta Theta? Reach out to our Recruitment Chair!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:phideltcmu@gmail.com" 
              className="bg-[var(--white)] text-[var(--navy)] px-6 py-3 rounded-md font-medium hover:bg-[var(--light-blue)] transition-colors inline-block"
            >
              Contact Recruitment Chair
            </a>
            <Link 
              href="https://forms.gle/YourFormLinkHere" 
              target="_blank"
              className="bg-transparent border border-[var(--white)] text-[var(--white)] px-6 py-3 rounded-md font-medium hover:bg-[var(--white)]/10 transition-colors inline-block"
            >
              Interest Form
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}