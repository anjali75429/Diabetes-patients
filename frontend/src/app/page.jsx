import Link from "next/link";
import { HeartIcon, DevicePhoneMobileIcon, BookOpenIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Diabetes Care Platform</title>
        <meta name="description" content="A comprehensive solution for managing diabetes through nutrition, equipment, and education." />
        <meta property="og:title" content="Diabetes Care Platform" />
        <meta property="og:description" content="A comprehensive solution for managing diabetes through nutrition, equipment, and education." />
        <meta property="og:image" content="/images/diabetes-hero.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        {/* Decorative Background SVG */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Image
            src="/image/diabetic-main.jpeg"
            alt="Decorative image showing diabetes care"
            layout="fill"
            style={{ objectFit: 'cover' }}
            className="opacity-10"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Hero Image */}
          <div className="mb-8">
            <Image
              src="/images/diabetic-main.jpeg"
              alt="Diabetes Care Illustration"
              width={320}
              height={320}
              className="mx-auto w-64 sm:w-80"
            />
          </div>

          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 sm:text-5xl">
              Welcome to Diabetes Care Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your comprehensive solution for managing diabetes through nutrition, equipment, and education.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link href="/food-list" passHref>
                <button
                  aria-label="View Food List"
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
                >
                  View Food List
                </button>
              </Link>
              <Link href="/equipment-list" passHref>
                <button
                  aria-label="View Equipment"
                  className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                >
                  View Equipment
                </button>
              </Link>
              <Link href="/article-list" passHref>
                <button
                  aria-label="Read Articles"
                  className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition duration-300 shadow-md"
                >
                  Read Articles
                </button>
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transform transition-transform hover:-translate-y-1 duration-300">
              <HeartIcon className="w-10 h-10 text-blue-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-3">Nutrition Guide</h3>
              <p className="text-gray-600">
                Discover diabetes-friendly foods with detailed nutritional information to help manage your blood sugar levels.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transform transition-transform hover:-translate-y-1 duration-300">
              <DevicePhoneMobileIcon className="w-10 h-10 text-green-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-3">Essential Equipment</h3>
              <p className="text-gray-600">
                Find the right tools and devices to monitor and maintain your health with our curated equipment list.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transform transition-transform hover:-translate-y-1 duration-300">
              <BookOpenIcon className="w-10 h-10 text-purple-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-3">Educational Resources</h3>
              <p className="text-gray-600">
                Learn from expert articles and stay updated with the latest diabetes management techniques and research.
              </p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-blue-100 rounded-xl p-8 mb-16">
            <blockquote className="max-w-3xl mx-auto">
              <p className="text-xl italic text-gray-700 mb-4">
                "This platform has been a game-changer for managing my diabetes. The food recommendations and articles have helped me make better daily choices."
              </p>
              <footer className="text-blue-600 font-medium">— Sarah J., Type 2 Diabetes</footer>
            </blockquote>
          </div>

          <div className="bg-green-100 rounded-xl p-8 mb-16">
            <blockquote className="max-w-3xl mx-auto">
              <p className="text-xl italic text-gray-700 mb-4">
                "Tracking my meals and learning from the daily articles has made a real difference in how I manage my condition. It's like having a coach in my pocket."
              </p>
              <footer className="text-green-600 font-medium">— James R., Living with Type 1 Diabetes</footer>
            </blockquote>
          </div>

          <div className="bg-purple-100 rounded-xl p-8 mb-16">
            <blockquote className="max-w-3xl mx-auto">
              <p className="text-xl italic text-gray-700 mb-4">
                "The equipment tracker has taken the guesswork out of my routine. I always know when to reorder supplies, and it’s easy to log what I use. A total lifesaver!"
              </p>
              <footer className="text-purple-600 font-medium">— Lisa M., Insulin Pump User</footer>
            </blockquote>
          </div>

          {/* Call to Action */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to take control of your diabetes?</h2>
            <p className="text-gray-600 mb-6">Join thousands of users managing their health with our platform.</p>
            <Link href="/article-list" passHref>
              <button
                aria-label="Get Started Today"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-lg"
              >
                Get Started Today
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
