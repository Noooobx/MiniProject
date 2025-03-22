import { Mail, PhoneCall, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { LifeBuoy } from "lucide-react";


export default function HelpSupport() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      {/* Back Button */}
      <Link to="/" className="absolute top-6 left-6 flex items-center text-green-700 hover:underline">
        <ArrowLeft size={20} /> <span className="ml-2">Back</span>
      </Link>

      {/* Page Heading */}
      <h1 className="text-2xl font-bold text-green-700 text-center mb-6 flex items-center gap-2">
        <LifeBuoy size={28} /> Help & Support
      </h1>

      {/* Contact Options */}
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center space-y-4 w-full max-w-md border border-green-300">
        <p className="text-gray-600 text-center">Need help? Contact us via email or call our support team.</p>

        {/* Email Support */}
        <a
          href="mailto:support@example.com"
          className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-3 rounded-lg shadow hover:bg-green-200 transition-all"
        >
          <Mail size={24} /> Send an Email
        </a>

        {/* Call Support */}
        <a
          href="tel:+1234567890"
          className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-3 rounded-lg shadow hover:bg-green-200 transition-all"
        >
          <PhoneCall size={24} /> Call Support
        </a>
      </div>
    </div>
  );
}
