import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="max-w-5xl w-full">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Phi Delta Theta</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Established on principles of friendship, sound learning, and moral rectitude, 
            we strive to cultivate excellence in our members and community.
          </p>
        </div>

        {/* Mission and Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Mission & Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Friendship</h3>
              <p>
                We foster lifelong bonds among brothers through shared experiences, 
                mutual support, and a commitment to each other's growth and well-being.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Sound Learning</h3>
              <p>
                We promote academic excellence and intellectual growth, encouraging 
                brothers to pursue knowledge and develop skills for future success.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Moral Rectitude</h3>
              <p>
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
              <h2 className="text-3xl font-bold mb-6">Our History</h2>
              <p className="mb-4">
                Founded on December 26, 1848, at Miami University in Oxford, Ohio, 
                Phi Delta Theta was established by six visionary men who sought to create 
                a brotherhood based on friendship, sound learning, and moral rectitude.
              </p>
              <p className="mb-4">
                Our chapter, [Chapter Name], was chartered on [Charter Date] and has since 
                maintained a strong presence on campus, contributing to both university life 
                and the broader community.
              </p>
              <p>
                Through the decades, we have upheld our founding principles while adapting 
                to the changing landscape of higher education and society.
              </p>
            </div>
            <div className="relative h-80 w-full">
              {/* Replace with your chapter house or historical image */}
              <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                <p className="text-gray-500">Chapter House Image</p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Chapter Leadership</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {/* Example leadership positions - customize as needed */}
            {[
              { title: 'President', name: 'John Doe' },
              { title: 'Vice President', name: 'James Smith' },
              { title: 'Treasurer', name: 'Robert Johnson' },
              { title: 'Secretary', name: 'Michael Brown' },
              { title: 'Recruitment Chair', name: 'William Davis' },
              { title: 'Academic Chair', name: 'Richard Wilson' },
              { title: 'Social Chair', name: 'Joseph Taylor' },
              { title: 'Philanthropy Chair', name: 'Thomas Anderson' }
            ].map((leader, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="bg-gray-200 h-32 w-32 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Photo</span>
                </div>
                <h3 className="font-semibold">{leader.title}</h3>
                <p>{leader.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-blue-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Join Our Brotherhood</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Interested in becoming part of Phi Delta Theta? Learn more about our 
            recruitment process and how you can become a brother.
          </p>
          <Link 
            href="/recruitment" 
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Learn About Recruitment
          </Link>
        </section>
      </div>
    </main>
  );
}
