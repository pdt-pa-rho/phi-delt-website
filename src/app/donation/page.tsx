import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function DonationPage() {
  // ── Update this value as donations come in ──
  const raised = 0;
  // ─────────────────────────────────────────────
  const goal = 10000;
  const pct = Math.min((raised / goal) * 100, 100);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 bg-[var(--navy)]">
      <div className="max-w-5xl w-full">
        {/* Hero */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--white)]">
            Support Phi Delta Theta
          </h1>
          <p className="text-xl text-[var(--white)]/80 max-w-3xl mx-auto">
            Help our chapter reach our Greek Sing fundraising goal for the
            LiveLikeLou Foundation and the fight against ALS.
          </p>
        </div>

        {/* Progress Bar */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4 text-[var(--white)]">
            Fundraising Progress
          </h2>
          <div className="relative flex-1">
            <div className="w-full bg-[var(--white)] bg-opacity-20 rounded-full h-12" />

            <div
              className="absolute top-0 left-0 bg-[var(--blue)] h-12 rounded-full flex items-center px-4"
              style={{ width: `${pct}%` }}
            >
              {raised > 0 && (
                <span className="text-xl md:text-2xl font-semibold drop-shadow-md text-[var(--white)]">
                  ${raised.toLocaleString()}
                </span>
              )}
            </div>

            <div className="absolute top-0 right-0 h-12 flex items-center pr-4 pointer-events-none">
              <span className="text-xl md:text-2xl font-semibold drop-shadow-md text-[var(--blue)]">
                Goal: ${goal.toLocaleString()}
              </span>
            </div>
          </div>
          <p className="mt-3 text-[var(--white)]/60 text-sm">
            ${raised.toLocaleString()} of ${goal.toLocaleString()} raised
          </p>
        </section>

        {/* Donate via Zelle */}
        <section className="mb-16 bg-[var(--light-blue)] p-8 md:p-12 rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-bold mb-4 text-[var(--navy)]">
            Donate via Zelle
          </h2>
          <p className="text-[var(--navy)] mb-6 max-w-2xl mx-auto">
            Send your donation directly through Zelle using the phone number
            below. Every dollar goes toward our Greek Sing fundraiser
            supporting ALS research through the LiveLikeLou Foundation.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
            <div className="relative w-64 h-64 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/zelle.jpeg"
                alt="Zelle QR Code for Phi Delta Theta Pennsylvania Rho"
                fill
                className="object-contain"
              />
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-[var(--navy)] text-[var(--white)] px-8 py-4 rounded-lg">
                <p className="text-sm uppercase tracking-wider mb-1 text-[var(--white)]/60">
                  Zelle Phone Number
                </p>
                <p className="text-3xl md:text-4xl font-bold tracking-wide">
                  (954) 682-4972
                </p>
              </div>
              <p className="text-[var(--navy)]/70 text-sm max-w-xs mt-4 text-center">
                Scan the QR code or enter the phone number in your banking app.
                Please include your name in the memo so we can thank you!
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[var(--white)]">
            How to Donate
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[var(--light-blue)] p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-[var(--blue)] mb-3">1</div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--navy)]">
                Open Your Bank App
              </h3>
              <p className="text-[var(--navy)]">
                Open your bank&apos;s mobile app or website and navigate to Zelle.
              </p>
            </div>
            <div className="bg-[var(--light-blue)] p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-[var(--blue)] mb-3">2</div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--navy)]">
                Send to Our Number
              </h3>
              <p className="text-[var(--navy)]">
                Enter <span className="font-semibold">(954) 682-4972</span> as
                the recipient and choose your amount.
              </p>
            </div>
            <div className="bg-[var(--light-blue)] p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-[var(--blue)] mb-3">3</div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--navy)]">
                Add Your Name
              </h3>
              <p className="text-[var(--navy)]">
                Include your name in the memo so we can recognize your
                contribution!
              </p>
            </div>
          </div>
        </section>

        {/* Back to Philanthropy */}
        <section className="text-center bg-[var(--blue)] p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-[var(--white)]">
            Thank You for Your Support
          </h2>
          <p className="mb-6 max-w-2xl mx-auto text-[var(--white)]">
            Your generosity helps us fight ALS and honor the legacy of Brother
            Lou Gehrig. Together we can make a difference.
          </p>
          <Link
            href="/philanthropy"
            className="bg-[var(--white)] text-[var(--navy)] px-6 py-3 rounded-md font-medium hover:bg-[var(--light-blue)] transition-colors inline-block"
          >
            Learn More About Our Philanthropy
          </Link>
        </section>
      </div>
    </main>
  );
}
