import SvgTiltBackground from "@/components/SVGTiltBackground";
import RushEvents from "./RushEvents";

export default function RushPage() {
  return (
    <SvgTiltBackground
      svgUrl="/svg/PDT_Swords.svg"
      className="min-h-screen bg-[var(--navy)]"
      svgClassName="text-[var(--light-blue)]/15 opacity-50 drop-shadow-md drop-shadow-black"
    >
      <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 pt-28">
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
            <RushEvents />
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
          {/* <section className="mb-16">
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
            </div>
          </section> */}

          {/* Contact CTA */}
          <section className="text-center bg-[var(--blue)] p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4 text-[var(--white)]">Interested in Rushing?</h2>
            <p className="mb-6 max-w-2xl mx-auto text-[var(--white)]">
              Have questions or want to learn more about rushing Phi Delta Theta? Reach out to our Recruitment Chair!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:phideltathetaparho@gmail.com"
                className="bg-[var(--white)] text-[var(--navy)] px-6 py-3 rounded-md font-medium hover:bg-[var(--light-blue)] transition-colors inline-block"
              >
                Contact Us
              </a>
            </div>
          </section>
        </div>
      </main>
    </SvgTiltBackground>
  );
}
