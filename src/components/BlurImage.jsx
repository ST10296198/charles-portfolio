import { motion } from "framer-motion";
import PortfolioImage from "./PortfolioImage";

export default function BlurImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  fetchPriority = "auto",
}) {
  return (
    <motion.div
      className={`blur-image ${className}`}
      initial={{
        opacity: 1,
        scale: 1.06,
        filter: "blur(18px)",
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        margin: "-10%",
      }}
      transition={{
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <PortfolioImage
        src={src}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
      />
    </motion.div>
  );
}