import { motion } from "framer-motion";

export default function Benefit() {
  const benefits = [
    {
      title: "PM Kisan Samman Nidhi Yojana",
      description:
        "Financial support to small and marginal farmers with ₹6,000/year direct cash transfer to promote sustainable agriculture.",
      link: "https://pmkisan.gov.in/",
    },
    {
      title: "MGNREGA",
      description:
        "100 days of wage employment to rural households, ensuring livelihood security and rural development.",
      link: "https://nrega.nic.in/",
    },
    {
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      description:
        "Insurance cover & financial support to farmers in case of crop failure due to natural calamities.",
      link: "https://pmfby.gov.in/",
    },
    {
      title: "Kisan Credit Card (KCC) Scheme",
      description:
        "Provides farmers with timely access to credit at lower interest rates, reducing dependency on informal moneylenders.",
      link: "https://pmkisan.gov.in/KisanCreditCard.aspx",
    },
    {
      title: "National Agriculture Market (eNAM)",
      description:
        "Pan-India electronic trading platform to facilitate better price discovery and remove middlemen.",
      link: "https://www.enam.gov.in/",
    },
    {
      title: "Soil Health Card Scheme",
      description:
        "Provides farmers with soil health information and best practices to improve soil fertility.",
      link: "https://soilhealth.dac.gov.in/",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 py-16 px-4">
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl font-bold text-green-800 mb-4">Government Benefits</h1>
        <p className="text-lg text-gray-700 mb-10">
          Explore schemes designed to support farmers and rural development.
        </p>
        <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          {benefits.map((benefit, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-2xl bg-white shadow-md hover:shadow-lg transition-all text-left border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-green-700 mb-2">{benefit.title}</h2>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
              <a
                href={benefit.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-green-600 hover:underline text-sm"
              >
                Learn More →
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
