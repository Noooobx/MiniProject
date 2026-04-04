import { Brain, Leaf, Beaker, Activity } from "lucide-react";

const tools = [
  {
    name: "Yield Prediction",
    description: "Predict crop yield based on soil, climate & seasonal factors.",
    icon: <Brain className="w-10 h-10 text-indigo-500" />,
    link: "https://yeild-new.vercel.app/",
  },
  {
    name: "Disease Detection",
    description: "AI-powered crop disease identification from leaf images.",
    icon: <Leaf className="w-10 h-10 text-green-500" />,
    link: "https://disease-detection-theta.vercel.app/",
  },
{
  name: "Fertilizer Recommendation",
  description: "AI-powered fertilizer recommendations based on soil nutrients and crop type.",
  icon: <Beaker className="w-10 h-10 text-green-500" />,
  link: "https://fertilizerreccomendationpython.onrender.com/",
},
];

export default function AiTools() {
  return (
    <section className="py-16 px-6 bg-gradient-to-b flex justify-center items-center from-gray-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Explore Our <span className="text-indigo-600">AI Tools</span>
        </h2>
        <p className="text-gray-600 mb-12 text-lg">
          Empowering farmers with modern AI-driven insights and predictions.
        </p>

        {/* Grid Layout */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, index) => (
            <a
              key={index}
              href={tool.link}
              className="group block rounded-2xl bg-white/70 backdrop-blur-md border border-gray-200 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 bg-gray-100 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                  {tool.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tool.name}
                </h3>
                <p className="text-gray-600 text-sm">{tool.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
