import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center h-screen items-center">
      <motion.div
        className="w-6 h-6 bg-green-500 rounded-full"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
      />
    </div>
  );
};

export default LoadingSpinner;
