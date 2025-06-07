import Link from "next/link";
import {
  HeartIcon,
  DevicePhoneMobileIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Head from "next/head";

export default function HomePage() {
  const colorClasses = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
  };

  return (
    <>
      <Head>
        <title>Diabetes Care Platform</title>
        <meta
          name="description"
          content="A comprehensive solution for managing diabetes through nutrition, equipment, and education."
        />
        <meta property="og:title" content="Diabetes Care Platform" />
        <meta
          property="og:description"
          content="A comprehensive solution for managing diabetes through nutrition, equipment, and education."
        />
        <meta property="og:image" content="/images/diabetes-hero.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background image overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/diabetic-main.jpeg"
            alt="Decorative image showing diabetes care"
            fill
            style={{ objectFit: "cover" }}
            className="opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-white bg-opacity-60 backdrop-blur-sm" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Hero Image */}
          <div className="mb-10">
            <Image
              src="/images/diabetic-main.jpeg"
              alt="Diabetes Care Illustration"
              width={320}
              height={320}
              className="mx-auto rounded-2xl shadow-lg"
              priority
            />
          </div>

          {/* Hero Text */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 shadow-lg bg-white bg-opacity-60 inline-block px-4 py-2 rounded-xl backdrop-blur-sm">
            Welcome to{" "}
            <span className="text-blue-600">Diabetes Care Platform</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-10">
            Your all-in-one solution for managing diabetes through nutrition,
            smart equipment, and expert education.
          </p>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Link
              href="/food-list"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            >
              🍎 View Food List
            </Link>
            <Link
              href="/equipment-list"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            >
              🔧 View Equipment
            </Link>
            <Link
              href="/article-list"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            >
              📘 Read Articles
            </Link>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                Icon: HeartIcon,
                title: "Nutrition Guide",
                text: "Discover diabetes-friendly foods and manage your diet more effectively.",
              },
              {
                Icon: DevicePhoneMobileIcon,
                title: "Essential Equipment",
                text: "Stay on track with devices and tools to monitor your condition.",
              },
              {
                Icon: BookOpenIcon,
                title: "Educational Resources",
                text: "Learn from trusted experts and stay informed on diabetes care.",
              },
            ].map(({ Icon, title, text }) => (
              <div
                key={title}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transform transition-transform hover:-translate-y-1"
              >
                <Icon className="w-12 h-12 mx-auto text-indigo-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{text}</p>
              </div>
            ))}
          </div>

          {/* Testimonials Section */}
          <section className="space-y-12 mb-20">
            {[
              {
                quote:
                  "This platform has been a game-changer for managing my diabetes. The food recommendations and articles have helped me make better daily choices.",
                name: "Sarah J., Type 2 Diabetes",
                color: "blue",
              },
              {
                quote:
                  "Tracking my meals and learning from the daily articles has made a real difference in how I manage my condition.",
                name: "James R., Living with Type 1 Diabetes",
                color: "green",
              },
              {
                quote:
                  "The equipment tracker has taken the guesswork out of my routine. It’s like having a coach in my pocket.",
                name: "Lisa M., Insulin Pump User",
                color: "purple",
              },
            ].map(({ quote, name, color }) => {
              const { bg, text } = colorClasses[color] || {};
              return (
                <blockquote
                  key={name}
                  className={`${bg} rounded-xl p-6 sm:p-8 shadow-md transition-all duration-300 transform hover:scale-105`}
                >
                  <p className="text-lg italic text-gray-700 mb-3">“{quote}”</p>
                  <footer className={`${text} font-medium`}>— {name}</footer>
                </blockquote>
              );
            })}
          </section>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to take control of your diabetes?
            </h2>
            <p className="text-gray-600 mb-6">
              Join thousands of users managing their health with our platform.
            </p>
            <Link
              href="/article-list"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition transform hover:scale-105"
            >
              Get Started Today
            </Link>
          </div>
          
        </div>
      </div>
    </>
  );
}
