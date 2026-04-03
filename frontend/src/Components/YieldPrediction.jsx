import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Leaf, Sparkles } from "lucide-react";

export default function YieldPrediction() {
  const [form, setForm] = useState({
    crop: "",
    season: "",
    state: "",
    annual_rainfall: "",
    fertilizer: "", // input in kg
    pesticide: "",  // input in kg
  });

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const steps = [
    "Analyzing crop and season data",
    "Processing rainfall",
    "Evaluating fertilizer & pesticide usage",
    "Running yield prediction model",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    setStep(0);

    const startTime = Date.now();

    const interval = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1200);

    try {
      // Convert fertilizer and pesticide from kg to grams
      const fertilizerGrams = parseFloat(form.fertilizer) * 1000;
      const pesticideGrams = parseFloat(form.pesticide) * 1000;

      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crop: form.crop,
          season: form.season,
          state: form.state,
          annual_rainfall: parseFloat(form.annual_rainfall),
          fertilizer: fertilizerGrams,
          pesticide: pesticideGrams,
        }),
      });

      const data = await response.json();

      const elapsed = Date.now() - startTime;
      const MIN_LOADING_TIME = 4000;
      if (elapsed < MIN_LOADING_TIME) {
        await new Promise((res) =>
          setTimeout(res, MIN_LOADING_TIME - elapsed)
        );
      }

      if (data.predicted_yield !== undefined) {
        // Show exact value from backend
        setResult(data.predicted_yield.toFixed(2) + " tons/ha");
      } else {
        setError(data.error || "Prediction failed");
      }
    } catch (err) {
      setError("Server error: " + err.message);
    }

    clearInterval(interval);
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-30 h-auto bg-gradient-to-br from-green-50 via-green-100 to-green-200 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-green-700 flex items-center gap-2 mb-8">
            <Leaf className="w-8 h-8 text-green-600" />
            Smart Crop Yield Prediction
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {[
              { label: "Crop", name: "crop" },
              { label: "Season", name: "season" },
              { label: "State", name: "state" },
              { label: "Annual Rainfall (mm)", name: "annual_rainfall", type: "number" },
              { label: "Fertilizer (kg/ha)", name: "fertilizer", type: "number" },
              { label: "Pesticide (kg/ha)", name: "pesticide", type: "number" },
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 rounded-xl border border-gray-300
                             focus:ring-2 focus:ring-green-400
                             focus:outline-none shadow-sm"
                />
              </div>
            ))}

            <div className="md:col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                disabled={loading}
                className="px-10 py-4 bg-green-600 hover:bg-green-700
                           text-white font-semibold rounded-xl shadow-lg
                           flex items-center gap-2 transition-all
                           disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    Predicting...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Predict Yield
                  </>
                )}
              </button>
            </div>
          </form>

          {/* LOADING STEPS */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 text-center"
              >
                <Loader2 className="w-10 h-10 mx-auto animate-spin text-green-600 mb-3" />
                <motion.p
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg font-medium text-green-700"
                >
                  {steps[step]}...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* RESULT */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-10 bg-green-50 border border-green-200
                           rounded-2xl p-6 text-center shadow-inner"
              >
                <h3 className="text-xl font-bold text-green-700 mb-2">
                  Predicted Yield
                </h3>
                <p className="text-4xl font-extrabold text-green-800">
                  {result}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  AI-based agricultural estimation 🌱
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ERROR */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-10 bg-red-50 border border-red-200
                           rounded-2xl p-6 text-center shadow-inner"
              >
                <h3 className="text-xl font-bold text-red-700 mb-2">Error</h3>
                <p className="text-red-800">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
