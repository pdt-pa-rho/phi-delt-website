"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/chapter_pic.jpg"
            alt="CMU Phi Delta Theta"
            fill
            className="object-cover brightness-50"
          />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-[var(--white)] px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Phi Delta Theta</h1>
          <h2 className="text-2xl md:text-3xl mb-8">Pennsylvania Rho Chapter • Carnegie Mellon University</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Becoming the greatest version of ourselves through the principles of Friendship, Sound Learning, and Moral Rectitude.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/rush" 
              className="px-8 py-3 bg-[var(--blue)] hover:bg-[var(--primary-dark)] text-[var(--white)] font-medium rounded-full transition-colors"
            >
              Rush Phi Delt
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-3 bg-[var(--white)]/10 hover:bg-[var(--white)]/20 backdrop-blur-sm text-[var(--white)] font-medium rounded-full border border-[var(--white)]/30 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-[var(--white)] dark:bg-[var(--navy)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Are</h2>
            <div className="w-24 h-1 bg-[var(--blue)] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-20 h-20 bg-[var(--light-blue)] dark:bg-[var(--blue)]/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Brotherhood</h3>
              <p className="text-[var(--navy)]/70 dark:text-[var(--white)]/70">
                We foster lifelong friendships through shared experiences, support, and a commitment to each other&#39;s growth.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-[var(--light-blue)] dark:bg-[var(--blue)]/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Academic Excellence</h3>
              <p className="text-[var(--navy)]/70 dark:text-[var(--white)]/70">
                We prioritize academic achievement and intellectual growth, supporting each other to excel at Carnegie Mellon.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-[var(--light-blue)] dark:bg-[var(--blue)]/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Service</h3>
              <p className="text-[var(--navy)]/70 dark:text-[var(--white)]/70">
                We are dedicated to making a positive impact in our community through service projects and philanthropic initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Highlights */}
      <section className="py-20 px-4 bg-[var(--light-blue)] dark:bg-[var(--navy)]/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Chapter Highlights</h2>
            <div className="w-24 h-1 bg-[var(--blue)] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-[var(--white)] dark:bg-[var(--navy)] rounded-xl shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1592247350271-c5efb34dd3b1?q=80&w=2070&auto=format&fit=crop"
                  alt="Phi Delta Theta Chapter House"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Our Chapter House</h3>
                <p className="text-[var(--navy)]/70 dark:text-[var(--white)]/70 mb-4">
                  Located in the heart of CMU&#39;s campus, our chapter house serves as the center of brotherhood activities and a home away from home for our members.
                </p>
                <Link 
                  href="/about#chapter-house" 
                  className="text-[var(--blue)] hover:text-[var(--primary-dark)] dark:hover:text-[var(--light-blue)] font-medium"
                >
                  Take a tour →
                </Link>
              </div>
            </div>
            
            <div className="bg-[var(--white)] dark:bg-[var(--navy)] rounded-xl shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2070&auto=format&fit=crop"
                  alt="Phi Delta Theta Philanthropy"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Our Philanthropy</h3>
                <p className="text-[var(--navy)]/70 dark:text-[var(--white)]/70 mb-4">
                  We&#39;re proud to support the LiveLikeLou Foundation in the fight against ALS, honoring Phi Delt brother Lou Gehrig&#39;s legacy.
                </p>
                <Link 
                  href="/philanthropy" 
                  className="text-[var(--blue)] hover:text-[var(--primary-dark)] dark:hover:text-[var(--light-blue)] font-medium"
                >
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 px-4 bg-[var(--white)] dark:bg-[var(--navy)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
            <div className="w-24 h-1 bg-[var(--blue)] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[var(--light-blue)] dark:bg-[var(--navy)]/50 p-6 rounded-xl">
              <div className="text-[var(--blue)] font-bold mb-2">APR 15, 2025</div>
              <h3 className="text-xl font-semibold mb-3">Spring Rush Week</h3>
              <p className="text-[var(--navy)]/70 dark:text-[var(--white)]/70 mb-4">
                Join us for a week of events to learn more about Phi Delta Theta and meet our brothers.
              </p>
              <Link 
                href="/events/spring-rush" 
                className="text-[var(--blue)] hover:text-[var(--primary-dark)] dark:hover:text-[var(--light-blue)] font-medium"
              >
                Details →
              </Link>
            </div>
            
            <div className="bg-[var(--light-blue)] dark:bg-[var(--navy)]/50 p-6 rounded-xl">
              <div className="text-[var(--blue)] font-bold mb-2">MAY 5, 2025</div>
              <h3 className="text-xl font-semibold mb-3">ALS Awareness 5K</h3>
              <p className="text-[var(--navy)]/70 dark:text-[var(--white)]/70 mb-4">
                Annual charity run to raise funds and awareness for ALS research in partnership with LiveLikeLou.
              </p>
              <Link 
                href="/events/als-5k" 
                className="text-[var(--blue)] hover:text-[var(--primary-dark)] dark:hover:text-[var(--light-blue)] font-medium"
              >
                Register →
              </Link>
            </div>
            
            <div className="bg-[var(--light-blue)] dark:bg-[var(--navy)]/50 p-6 rounded-xl">
              <div className="text-[var(--blue)] font-bold mb-2">MAY 20, 2025</div>
              <h3 className="text-xl font-semibold mb-3">Alumni Weekend</h3>
              <p className="text-[var(--navy)]/70 dark:text-[var(--white)]/70 mb-4">
                Welcome back our alumni for a weekend of brotherhood, networking, and celebration.
              </p>
              <Link 
                href="/events/alumni-weekend" 
                className="text-[var(--blue)] hover:text-[var(--primary-dark)] dark:hover:text-[var(--light-blue)] font-medium"
              >
                RSVP →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop"
            alt="Join Phi Delta Theta"
            fill
            className="object-cover brightness-50"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center text-[var(--white)]">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Become a Phi</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Ready to join a brotherhood that will shape your college experience and beyond? Rush Phi Delta Theta and become part of our legacy at Carnegie Mellon.
          </p>
          <Link 
            href="/rush" 
            className="px-8 py-3 bg-[var(--blue)] hover:bg-[var(--primary-dark)] text-[var(--white)] font-medium rounded-full transition-colors inline-block"
          >
            Rush Information
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-[var(--navy)] text-[var(--white)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Phi Delta Theta</h3>
              <p className="text-[var(--light-blue)] mb-4">
                Pennsylvania Rho Chapter<br />
                Carnegie Mellon University<br />
                1055 Morewood Avenue<br />
                Pittsburgh, PA 15213
              </p>
              <div className="flex space-x-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg className="h-6 w-6 text-[var(--light-blue)] hover:text-[var(--white)]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <svg className="h-6 w-6 text-[var(--light-blue)] hover:text-[var(--white)]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg className="h-6 w-6 text-[var(--light-blue)] hover:text-[var(--white)]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-[var(--light-blue)] hover:text-[var(--white)]">About Us</Link></li>
                <li><Link href="/rush" className="text-[var(--light-blue)] hover:text-[var(--white)]">Rush Information</Link></li>
                <li><Link href="/brothers" className="text-[var(--light-blue)] hover:text-[var(--white)]">Meet the Brothers</Link></li>
                <li><Link href="/philanthropy" className="text-[var(--light-blue)] hover:text-[var(--white)]">Philanthropy</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="https://www.phideltatheta.org/" target="_blank" rel="noopener noreferrer" className="text-[var(--light-blue)] hover:text-[var(--white)]">National Organization</a></li>
                <li><a href="https://www.cmu.edu/student-affairs/slice/student-activities/greek-life/" target="_blank" rel="noopener noreferrer" className="text-[var(--light-blue)] hover:text-[var(--white)]">CMU Greek Life</a></li>
                <li><Link href="/alumni" className="text-[var(--light-blue)] hover:text-[var(--white)]">Alumni Network</Link></li>
                <li><Link href="/parents" className="text-[var(--light-blue)] hover:text-[var(--white)]">Parents&#39; Guide</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-[var(--blue)]/30 text-center text-[var(--light-blue)]/70 text-sm">
            <p>&copy; {new Date().getFullYear()} Phi Delta Theta, Pennsylvania Rho Chapter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
