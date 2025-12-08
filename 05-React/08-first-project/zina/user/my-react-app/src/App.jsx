import React, { useState } from "react";
import LoginForm from "./LoginForm";


function Notebook() {
  const makePages = (n) => Array.from({ length: n }).map((_, i) => ({
    id: i + 1,
    lines: 20,
    textByLine: {},
    // default date in YYYY-MM-DD suitable for <input type="date">
    date: new Date().toISOString().slice(0, 10),
  }));
  const [pages, setPages] = React.useState(() => makePages(30));
  const [currentPage, setCurrentPage] = React.useState(0);
  const [isFlipping, setIsFlipping] = React.useState(false);

  const leftPage = pages[currentPage];
  const rightPage = pages[currentPage + 1];

  const handleWrite = (pageIndex, lineIndex, value) => {
    setPages(prev => {
      const next = [...prev];
      const p = { ...next[pageIndex] };
      p.textByLine = { ...p.textByLine, [lineIndex]: value };
      next[pageIndex] = p;
      return next;
    });
  };

  const setPageDate = (pageIndex, dateStr) => {
    setPages(prev => {
      const next = [...prev];
      const p = { ...next[pageIndex], date: dateStr };
      next[pageIndex] = p;
      return next;
    });
  };

  const flipLeft = () => {
    if (currentPage > 0) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(p => Math.max(0, p - 2));
        setIsFlipping(false);
      }, 400);
    }
  };
  const flipRight = () => {
    if (currentPage < pages.length - 2) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(p => Math.min(pages.length - 2, p + 2));
        setIsFlipping(false);
      }, 400);
    }
  };

  return (
    <div className={`book book-flip${isFlipping ? ' flipping' : ''}`}>
      <div className="spine" />
      <div className="book-pages">
        <div className="page left-page">
            <div className="page-header">
              <button onClick={flipLeft} disabled={currentPage === 0}>← הקודם</button>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div>עמוד {currentPage + 1} / {pages.length}</div>
                <input
                  type="date"
                  className="page-date"
                  value={leftPage.date}
                  onChange={(e) => setPageDate(currentPage, e.target.value)}
                  aria-label={`Set date for page ${currentPage + 1}`}
                />
              </div>
            </div>
          <div className="lines">
            {[...Array(leftPage.lines)].map((_, i) => (
              <div className="line-row" key={i}>
                <div className="line" />
                <input
                  className="line-input"
                  placeholder=""
                  value={leftPage.textByLine[i] || ""}
                  onChange={(e) => handleWrite(currentPage, i, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
        {rightPage && (
          <div className="page right-page">
            <div className="page-header">
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div>עמוד {currentPage + 2} / {pages.length}</div>
                <input
                  type="date"
                  className="page-date"
                  value={rightPage.date}
                  onChange={(e) => setPageDate(currentPage + 1, e.target.value)}
                  aria-label={`Set date for page ${currentPage + 2}`}
                />
              </div>
              <button onClick={flipRight} disabled={currentPage >= pages.length - 2}>הבא →</button>
            </div>
            <div className="lines">
              {[...Array(rightPage.lines)].map((_, i) => (
                <div className="line-row" key={i}>
                  <div className="line" />
                  <input
                    className="line-input"
                    placeholder=""
                    value={rightPage.textByLine[i] || ""}
                    onChange={(e) => handleWrite(currentPage + 1, i, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="center-container">
      {!user ? (
        <LoginForm onLogin={setUser} />
      ) : (
        <div className="app-shell">
          <div className="top-bar">
            <div className="welcome">שלום, {user}</div>
            <button
              className="signout-button"
              onClick={() => setUser(null)}
              aria-label="Sign out">
              התנתק
            </button>
          </div>
          <Notebook />
        </div>
      )}
    </div>
  );
}

export default App;
