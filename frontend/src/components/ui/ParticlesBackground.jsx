import { motion } from "framer-motion";

const ParticlesBackground = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            {[...Array(25)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-[2px] h-[2px] bg-white/30 rounded-full"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        opacity: 0,
                    }}
                    animate={{
                        y: [null, -200],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: Math.random() * 12 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

export default ParticlesBackground;
