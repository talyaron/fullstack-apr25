import React, { useState } from "react";

function Notebook({ pages = [] }) {
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const FlipLeft = () => {
    if (currentPage === 0 || isFlipping) return;
    setFlipDir("left");
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage(p => p - 1);
      setIsFlipping(false);
      setFlipDir(null);
    }, 380);
  };

  const FlipRight = () => {
    if (currentPage === pages.length - 1 || isFlipping) return;
    setFlipDir("right");
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage(p => p + 1);
      setIsFlipping(false);
      setFlipDir(null);
    }, 380);
  };

  return (
    <div className={`page ${isFlipping ? (flipDir === "right" ? "flipping-right" : "flipping-left") : ""}`}>
      {/* תוכן העמוד */}
    </div>
  );
}

export default Notebook;