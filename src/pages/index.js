import React, { useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import Book from "../components/book";

const letterStyle = {
  width: "calc(100% - 1rem)",
  height: "calc(100% - 1rem)",
  top: "0.5rem",
  left: "0.5rem",
  backgroundColor: "#f8efd5",
  overflow: "hidden",
  padding: "1rem",
  boxSizing: "border-box",
  position: "absolute",
};

const envelopeStyle = {
  width: "28rem",
  height: "15rem",
  scale: 1,
  position: "fixed",
  top: "10rem",
  left: "calc(50% - 14rem)",
  boxShadow: `rgba(0, 0, 0, 0.5) 0px 0px 150px 10px`,
};

const frontfaceStyle = {
  width: "100%",
  height: "100%",
  backgroundColor: "#debda1",
  position: "absolute",
  left: 0,
  top: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function Letter() {
  const { scrollYProgress } = useViewportScroll();
  const scaleAnim = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 1.5]);
  const yPosAnim = useTransform(scrollYProgress, [0, 0.4, 1], [0, -250, -100]);

  return (
    <motion.div
      style={{
        ...letterStyle,
        scale: scaleAnim,
        y: yPosAnim,
      }}
    >
      <p>Letter content</p>
      <Book />
    </motion.div>
  );
}

function Envelope({ children }) {
  const [ffLayer, setFfLayer] = useState(0);
  const { scrollYProgress } = useViewportScroll();
  const scaleAnim = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
  const yPosAnim = useTransform(scrollYProgress, [0, 0.5, 1], [0, 100, 200]);
  const zRotAnim = useTransform(scrollYProgress, [0, 0.5, 1], [0, 3, 0]);

  scrollYProgress.onChange((x) => {
    setFfLayer(x > 0.4 ? -1 : 0);
  });

  return (
    <motion.div
      style={{
        ...envelopeStyle,
        scale: scaleAnim,
        y: yPosAnim,
        rotateZ: zRotAnim,
      }}
    >
      {children}
      <div style={{ ...frontfaceStyle, zIndex: ffLayer }}>
        <button onClick={() => window.scrollTo(0, 1500)}>Open Me</button>
      </div>
    </motion.div>
  );
}

const IndexPage = () => {
  return (
    <main>
      <div style={{ height: "200vh" }}>
        <Envelope>
          <Letter />
        </Envelope>
      </div>
    </main>
  );
};

export default IndexPage;
