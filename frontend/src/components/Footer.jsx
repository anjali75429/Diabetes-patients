'use client';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Diabetes Health Hub. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-4 text-gray-400 text-sm">
          <a href="/privacy" className="hover:text-white">Privacy Policy</a>
          <a href="/terms" className="hover:text-white">Terms of Service</a>
          <a href="/contact" className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
