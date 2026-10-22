import { useState, useEffect } from "react";
import "./App.css";

const API_BASE = "http://127.0.0.1:5000/api";

const SAMPLE_LEGAL_TEXT = `MUNICIPAL CORPORATION NOTICE & LEASE COMPLIANCE
Pursuant to Section 106 of the Transfer of Property Act, 1882 and Municipal By-Laws:
1. The Lessee (Tenant) shall remit the arrears of maintenance amounting to Rs. 4,500/- on or before the 5th day of November 2026, failing which a statutory penalty of 12% per annum shall accrue forthwith.
2. Non-compliance with mandatory fire-safety verification requires the occupant to submit Form-B duly signed by the premises holder within 15 days of receipt of this notice.
3. The Lessor reserves the right to terminate the tenancy upon 30 days' written notice in the event of sub-letting without prior written consent.`;

const TOPICS = [
  { emoji: "🏠", title: "Tenant & eviction rights", query: "Tenant security deposit and eviction rights", desc: "Deposits, notice periods, rent disputes" },
  { emoji: "🚔", title: "Zero FIR procedure", query: "Zero FIR registration procedure under BNS", desc: "How to file an FIR at any police station" },
  { emoji: "📨", title: "RTI application", query: "Right to Information (RTI) application steps", desc: "Ask the government for information" },
];

/* ---------- Shared small components ---------- */

function Navbar({ page, go }) {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <button className="brand" onClick={() => go("home")} aria-label="Go to home">
          <div className="brand-logo">⚖️</div>
          <div>
            <div className="brand-name">Samvidhaan Saral</div>
            <div className="brand-tag">AI Legal & Civic Simplifier</div>
          </div>
        </button>
        <nav className="tab-nav">
          <button className={`tab-btn ${page === "home" ? "active" : ""}`} onClick={() => go("home")}>
            <span className="tab-emoji">🏠</span> Home
          </button>
          <button className={`tab-btn ${page === "simplify" ? "active" : ""}`} onClick={() => go("simplify")}>
            <span className="tab-emoji">📄</span> Document Simplifier
          </button>
          <button className={`tab-btn ${page === "search" ? "active" : ""}`} onClick={() => go("search")}>
            <span className="tab-emoji">🔎</span> Legal Search
          </button>
        </nav>
      </div>
    </header>
  );
}

function Footer({ go }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <b>Samvidhaan Saral</b> · Legal information, simplified. Not a substitute for professional legal advice.
        </div>
        <div className="footer-links">
          <button onClick={() => go("home")}>Home</button>
          <button onClick={() => go("simplify")}>Document Simplifier</button>
          <button onClick={() => go("search")}>Legal Search</button>
        </div>
      </div>
    </footer>
  );
}

function LoadingSkeleton() {
  return (
    <div className="panel">
      <div className="skeleton-panel">
        <div className="skeleton w40" />
        <div className="skeleton tall" />
        <div className="skeleton w80" />
        <div className="skeleton w60" />
        <div className="skeleton tall" />
      </div>
    </div>
  );
}

function PageHero({ go, icon, title, subtitle, crumb, tone }) {
  return (
    <section className={`page-hero ${tone || ""}`}>
      <div className="container page-hero-inner">
        <div className="breadcrumb">
          <button onClick={() => go("home")}>Home</button>
          <span>/</span>
          <span className="current">{crumb}</span>
        </div>
        <h1>
          <span>{icon}</span> {title}
        </h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}

/* ================= PAGE 1: HOME ================= */

function HomePage({ go }) {
  return (
    <div className="page-fade">
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="hero-pill">
              <span className="dot" /> Built for every citizen of India
            </div>
            <h1>
              From <span className="grad">Legal Complexity</span> to Everyday Clarity
            </h1>
            <p className="lead">
              Upload a notice, rental agreement or contract and get a plain-language explanation,
              key deadlines and an action checklist in seconds.
            </p>
            <div className="hero-cta">
              <button className="saffron-btn" onClick={() => go("simplify")}>
                📄 Simplify a Document
              </button>
              <button className="ghost-btn" onClick={() => go("search")}>
                🔎 Search Legal Topics
              </button>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <strong>Plain English</strong>
                <span>Side-by-side clause view</span>
              </div>
              <div className="hero-stat">
                <strong>Auto Checklist</strong>
                <span>Deadlines & obligations</span>
              </div>
              <div className="hero-stat">
                <strong>BNS · IPC</strong>
                <span>Linked provisions</span>
              </div>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-title">How it works</div>
            <div className="hero-step">
              <div className="hero-step-num">1</div>
              <div className="hero-step-text">
                <b>Upload or paste</b>
                <small>PDF or raw legal text, or search a topic</small>
              </div>
            </div>
            <div className="hero-step">
              <div className="hero-step-num">2</div>
              <div className="hero-step-text">
                <b>AI simplifies</b>
                <small>Clauses are explained in everyday language</small>
              </div>
            </div>
            <div className="hero-step">
              <div className="hero-step-num">3</div>
              <div className="hero-step-text">
                <b>Act with confidence</b>
                <small>Tick off your deadlines and next steps</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The problem</span>
            <h2>Legal language shouldn't be a barrier to justice</h2>
            <p>Dense jargon leaves ordinary citizens guessing about what they are signing and what they owe.</p>
          </div>
          <div className="card-grid-3">
            <div className="info-card problem-card">
              <div className="i-icon">😵</div>
              <h3>Unreadable jargon</h3>
              <p>Contracts and notices are written for professionals, not for tenants, students or first-time signers.</p>
            </div>
            <div className="info-card problem-card">
              <div className="i-icon">⏰</div>
              <h3>Missed deadlines</h3>
              <p>Fees, penalties and compliance dates get buried inside long paragraphs and are easy to miss.</p>
            </div>
            <div className="info-card problem-card">
              <div className="i-icon">💸</div>
              <h3>Costly clarification</h3>
              <p>Paying for a consultation just to understand a basic notice is out of reach for many households.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Features</span>
            <h2>Everything you need to understand the fine print</h2>
            <p>Two focused tools built specifically for legal and civic literacy.</p>
          </div>
          <div className="card-grid-3">
            <div className="info-card">
              <div className="i-icon">🧾</div>
              <h3>Side-by-side translation</h3>
              <p>See the original clause next to what it actually means in plain language.</p>
            </div>
            <div className="info-card">
              <div className="i-icon">✅</div>
              <h3>Automated action checklist</h3>
              <p>Obligations, fees, dates and signatures pulled into a tick-off task list.</p>
            </div>
            <div className="info-card">
              <div className="i-icon">📚</div>
              <h3>Structured legal search</h3>
              <p>Definitions, rights, provisions and procedures in one consistent format.</p>
            </div>
            <div className="info-card">
              <div className="i-icon">🧠</div>
              <h3>Context-aware AI</h3>
              <p>Interprets clauses in context instead of swapping words one by one.</p>
            </div>
            <div className="info-card">
              <div className="i-icon">🔒</div>
              <h3>Privacy first</h3>
              <p>Documents are processed in-memory with no personal data kept on disk.</p>
            </div>
            <div className="info-card">
              <div className="i-icon">🛡️</div>
              <h3>Information, not advice</h3>
              <p>Designed to inform and simplify, not to replace a qualified lawyer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tool CTAs */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Get started</span>
            <h2>Choose a tool</h2>
            <p>Pick what you need right now.</p>
          </div>
          <div className="tool-grid">
            <button className="tool-card one" onClick={() => go("simplify")}>
              <div className="tool-emoji">📄</div>
              <h3>Document Simplifier</h3>
              <p>Upload a PDF or paste text to get a plain-language summary, clause translation and checklist.</p>
              <span className="go">Open simplifier →</span>
            </button>
            <button className="tool-card two" onClick={() => go("search")}>
              <div className="tool-emoji">🔎</div>
              <h3>Legal Search</h3>
              <p>Look up any legal or civic topic and get rights, provisions and step-by-step procedures.</p>
              <span className="go">Open search →</span>
            </button>
          </div>

          <div style={{ marginTop: 32 }}>
            <div className="disclaimer-strip">
              <span className="big">⚠️</span>
              <div>
                <b>Please note:</b> Samvidhaan Saral provides general legal information to help you understand
                documents. It does not provide personalised legal advice. For important decisions, consult a
                qualified lawyer.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================= PAGE 2: DOCUMENT SIMPLIFIER ================= */

function SimplifierPage({ go }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [rawText, setRawText] = useState("");
  const [simplifyData, setSimplifyData] = useState(null);
  const [checkedTasks, setCheckedTasks] = useState({});
  const [loadingSimplify, setLoadingSimplify] = useState(false);
  const [simplifyError, setSimplifyError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleSimplify = async (e) => {
    e.preventDefault();
    setSimplifyError("");
    setSimplifyData(null);
    setCheckedTasks({});
    setLoadingSimplify(true);

    try {
      let response;
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        response = await fetch(`${API_BASE}/simplify`, { method: "POST", body: formData });
      } else if (rawText.trim()) {
        response = await fetch(`${API_BASE}/simplify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: rawText }),
        });
      } else {
        throw new Error("Please upload a PDF file or paste legal text first.");
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to process document.");
      setSimplifyData(data);
    } catch (err) {
      setSimplifyError(err.message);
    } finally {
      setLoadingSimplify(false);
    }
  };

  const toggleTask = (index) => setCheckedTasks((prev) => ({ ...prev, [index]: !prev[index] }));

  const pickFile = (file) => {
    if (!file) return;
    setSimplifyError("");
    setSelectedFile(file);
    setRawText("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.name.toLowerCase().endsWith(".pdf")) pickFile(file);
    else if (file) setSimplifyError("Only PDF files are supported for upload.");
  };

  const totalTasks = simplifyData?.action_checklist?.length || 0;
  const doneTasks = Object.values(checkedTasks).filter(Boolean).length;
  const progress = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="page-fade">
      <PageHero
        go={go}
        icon="📄"
        crumb="Document Simplifier"
        title="Document Simplifier"
        subtitle="Upload a legal document or civic notice and get a plain-language summary, a clause-by-clause translation and an action checklist."
      />

      <main className="container page-main">
        <section className="panel">
          <div className="panel-header">
            <h2 className="panel-title">
              <span className="icon-chip">📥</span> Ingest Legal Document or Civic Notice
            </h2>
            <button
              type="button"
              className="secondary-btn"
              onClick={() => {
                setSelectedFile(null);
                setRawText(SAMPLE_LEGAL_TEXT);
              }}
            >
              ✨ Load Sample Notice
            </button>
          </div>

          {simplifyError && <div className="error-box">⚠️ {simplifyError}</div>}

          <form onSubmit={handleSimplify}>
            <div className="input-grid">
              <div
                className={`upload-box ${dragActive ? "drag" : ""} ${selectedFile ? "has-file" : ""}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
              >
                <div className="upload-icon">{selectedFile ? "✅" : "📤"}</div>
                <span className="upload-label">
                  {selectedFile ? "Document ready" : "Drop your PDF here or click to browse"}
                </span>
                {selectedFile ? (
                  <span className="file-chip">📎 {selectedFile.name}</span>
                ) : (
                  <span className="upload-hint">Supports text-based PDF files</span>
                )}
                <span className="secure-note">🔒 Processed in-memory. Zero PII disk retention.</span>
                <input
                  type="file"
                  accept=".pdf"
                  className="file-input"
                  onChange={(e) => pickFile(e.target.files[0])}
                />
              </div>

              <div>
                <textarea
                  rows="5"
                  className="text-input"
                  placeholder="Or paste dense legal clauses, rental agreements, or municipal notices here..."
                  value={rawText}
                  onChange={(e) => {
                    setRawText(e.target.value);
                    if (e.target.value) setSelectedFile(null);
                  }}
                />
              </div>
            </div>

            <div className="btn-row">
              <button type="submit" className="primary-btn" disabled={loadingSimplify}>
                {loadingSimplify ? (
                  <>
                    <span className="spinner" /> Parsing & Simplifying...
                  </>
                ) : (
                  <>✨ Simplify Document & Extract Checklist</>
                )}
              </button>
              {(selectedFile || rawText) && (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => {
                    setSelectedFile(null);
                    setRawText("");
                    setSimplifyData(null);
                    setSimplifyError("");
                  }}
                >
                  Clear Input
                </button>
              )}
            </div>
          </form>
        </section>

        {loadingSimplify && <LoadingSkeleton />}

        {simplifyData && (
          <div>
            <div className="summary-banner">
              <h3>💡 Plain-Language Executive Summary</h3>
              <p>{simplifyData.overall_summary}</p>
            </div>

            <div className="results-grid">
              <div className="panel">
                <div className="panel-header">
                  <h2 className="panel-title">
                    <span className="icon-chip">🧾</span> Side-by-Side Legal Translation
                  </h2>
                </div>
                {simplifyData.clauses?.map((item, idx) => (
                  <div key={idx} className="clause-card">
                    <div className="clause-split">
                      <div className="clause-original">
                        <span className="pane-tag tag-legalese">📜 Original Clause</span>
                        <p>{item.original_clause}</p>
                      </div>
                      <div className="clause-arrow">→</div>
                      <div className="clause-simplified">
                        <span className="pane-tag tag-plain">💬 Plain Meaning</span>
                        <p>{item.simplified_meaning}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className="panel">
                  <div className="panel-header">
                    <h2 className="panel-title">
                      <span className="icon-chip">✅</span> Action Checklist
                    </h2>
                  </div>

                  {totalTasks > 0 && (
                    <div className="progress-wrap">
                      <div className="progress-meta">
                        <span>
                          {doneTasks} of {totalTasks} completed
                        </span>
                        <span>{progress}%</span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  )}

                  {simplifyData.action_checklist?.map((item, idx) => (
                    <div
                      key={idx}
                      className={`checklist-item ${checkedTasks[idx] ? "completed" : ""}`}
                      onClick={() => toggleTask(idx)}
                    >
                      <input
                        type="checkbox"
                        className="task-checkbox"
                        checked={!!checkedTasks[idx]}
                        onChange={() => toggleTask(idx)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div>
                        <div className="task-text">{item.task}</div>
                        <div className="task-meta">
                          <span className="badge badge-category">{item.category}</span>
                          <span className="badge badge-deadline">⏳ Due: {item.deadline}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="panel">
                  <div className="panel-header">
                    <h2 className="panel-title">
                      <span className="icon-chip">📚</span> Referenced Statutes
                    </h2>
                  </div>
                  <ul className="law-list">
                    {simplifyData.relevant_laws?.map((law, idx) => (
                      <li key={idx}>{law}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ================= PAGE 3: LEGAL SEARCH ================= */

function SearchPage({ go }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchError, setSearchError] = useState("");

  const handleSearch = async (e, customQuery) => {
    if (e) e.preventDefault();
    const q = customQuery || searchQuery;
    if (!q.trim()) return;

    setSearchError("");
    setSearchData(null);
    setLoadingSearch(true);

    try {
      const response = await fetch(`${API_BASE}/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Search request failed.");
      setSearchData(data);
    } catch (err) {
      setSearchError(err.message);
    } finally {
      setLoadingSearch(false);
    }
  };

  return (
    <div className="page-fade">
      <PageHero
        go={go}
        tone="green"
        icon="🔎"
        crumb="Legal Search"
        title="Contextual Legal Search"
        subtitle="Search any Indian legal or civic topic and get a simple explanation, your rights, relevant provisions and the standard procedure."
      />

      <main className="container page-main">
        <section className="panel">
          <div className="panel-header">
            <h2 className="panel-title">
              <span className="icon-chip">🔍</span> Search Indian Legal & Civic Topics
            </h2>
          </div>

          {searchError && <div className="error-box">⚠️ {searchError}</div>}

          <form onSubmit={(e) => handleSearch(e)}>
            <div className="search-bar">
              <div className="search-wrap">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Try: Tenant eviction rights, FIR registration under BNS, Consumer refund laws..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button type="submit" className="primary-btn" disabled={loadingSearch}>
                {loadingSearch ? (
                  <>
                    <span className="spinner" /> Searching...
                  </>
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </form>

          <div className="btn-row">
            <span className="chip-label">Quick queries:</span>
            {TOPICS.map((t, i) => (
              <button
                key={i}
                type="button"
                className="secondary-btn"
                onClick={() => {
                  setSearchQuery(t.query);
                  handleSearch(null, t.query);
                }}
              >
                {t.query}
              </button>
            ))}
          </div>
        </section>

        {loadingSearch && <LoadingSkeleton />}

        {!loadingSearch && !searchData && (
          <section className="panel">
            <div className="empty-state">
              <div className="big">🏛️</div>
              <h3>Popular topics to explore</h3>
              <p style={{ marginBottom: 20 }}>Tap a topic to see rights, provisions and procedures.</p>
            </div>
            <div className="topic-grid">
              {TOPICS.map((t, i) => (
                <button
                  key={i}
                  className="topic-card"
                  onClick={() => {
                    setSearchQuery(t.query);
                    handleSearch(null, t.query);
                  }}
                >
                  <span className="t-emoji">{t.emoji}</span>
                  <b>{t.title}</b>
                  <span>{t.desc}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {searchData && (
          <div className="panel">
            <div className="panel-header">
              <h2 className="panel-title">
                <span className="icon-chip">🏛️</span> {searchData.topic_title}
              </h2>
            </div>

            <div className="summary-banner">
              <h3>💡 Plain-Language Overview</h3>
              <p>{searchData.simple_explanation}</p>
            </div>

            <div className="results-grid">
              <div>
                <h3 className="section-heading heading-blue">📖 Relevant Provisions (Constitution / BNS / IPC)</h3>
                {searchData.relevant_provisions?.map((prov, idx) => (
                  <div key={idx} className="provision-item">
                    <div className="provision-section">{prov.section}</div>
                    <div className="provision-desc">{prov.description}</div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="section-heading heading-green">🛡️ Citizen Rights & Protections</h3>
                <ul className="rights-list">
                  {searchData.citizen_rights?.map((right, idx) => (
                    <li key={idx}>{right}</li>
                  ))}
                </ul>

                <h3 className="section-heading heading-dark">🧭 Standard Action Procedure</h3>
                <ol className="steps-list">
                  {searchData.standard_procedure?.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="disclaimer">⚠️ Disclaimer: {searchData.disclaimer}</div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ================= APP ROOT (hash-based routing, no extra packages) ================= */

const PAGES = ["home", "simplify", "search"];

const getPageFromHash = () => {
  const h = window.location.hash.replace("#/", "").replace("#", "");
  return PAGES.includes(h) ? h : "home";
};

function App() {
  const [page, setPage] = useState(getPageFromHash());

  useEffect(() => {
    const onHashChange = () => {
      setPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const go = (target) => {
    window.location.hash = target === "home" ? "#/" : `#/${target}`;
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page">
      <Navbar page={page} go={go} />
      {page === "home" && <HomePage go={go} />}
      {page === "simplify" && <SimplifierPage go={go} />}
      {page === "search" && <SearchPage go={go} />}
      <Footer go={go} />
    </div>
  );
}

export default App;