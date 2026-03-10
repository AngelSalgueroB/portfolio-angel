import { useState, useEffect, useRef } from "react";
import "./App.css";
import { translations } from "./translations";
import Typewriter from "typewriter-effect";

import {
  Mail,
  FileText,
  Layout,
  Server,
  Database,
  Code,
  Terminal,
  Globe,
  Cpu,
  BarChart3,
  CloudCog,
  ArrowRight,
  Activity,
  Palette,
  Layers,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaWhatsapp
} from "react-icons/fa";

import DataCleanerDemo from "./components/DataCleanerDemo";
import FinanceHubDemo from "./components/FinanceHubDemo";
import SqlNoSqlDemo from "./components/SqlNoSqlDemo";
import GastroAppDemo from "./components/GastroAppDemo";
import AutomationToolsDemo from "./components/AutomationToolsDemo";
import UniVaultDemo from "./components/UniVaultDemo";

const TECH_STACK = [
  { name: "React", icon: <Code size={30} /> },
  { name: "Node.js", icon: <Server size={30} /> },
  { name: "JavaScript", icon: <Terminal size={30} /> },
  { name: "SQL", icon: <Database size={30} /> },
  { name: "Next.js", icon: <Globe size={30} /> },
  { name: "Python", icon: <Cpu size={30} /> },
  { name: "UX/UI", icon: <Layout size={30} /> },
  { name: "DevOps", icon: <Layers size={30} /> },
];

const COLOR_THEMES = [
  { id: "red", color: "#e11d48", name: "Rojo" },
  { id: "green", color: "#10b981", name: "Esmeralda" },
  { id: "blue", color: "#3b82f6", name: "Azul" },
  { id: "purple", color: "#8c5cff", name: "Violeta" },
  { id: "orange", color: "#f97316", name: "Naranja" },
  { id: "cyan", color: "#06b6d4", name: "Cian Cyber" },
  { id: "yellow", color: "#eab308", name: "Amarillo Code" },
  { id: "pink", color: "#ec4899", name: "Rosa Tech" },
  { id: "brown", color: "#a0522d", name: "Marrón Tierra" },
  { id: "black", color: "#374151", name: "Negro Carbón" },
  { id: "Peach", color: "#ff7e5f", name: "Peach" },
  { id: "Verde", color: "#33cc33", name: "Verde Lima" },
];

function App() {
  const [activeSection, setActiveSection] = useState(() => {
    return localStorage.getItem("myPortfolioSection") || "home";
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [selectedProject, setSelectedProject] = useState(null);

  const [language, setLanguage] = useState("es");
  const t = translations[language];

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [accentColor, setAccentColor] = useState("#e11d48");
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const themeMenuRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("myPortfolioSection", activeSection);
    window.scrollTo(0, 0);
  }, [activeSection]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accentColor);
  }, [accentColor]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        themeMenuRef.current &&
        !themeMenuRef.current.contains(event.target)
      ) {
        setShowThemeMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [themeMenuRef]);

  useEffect(() => {
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const distance = touchEndY - touchStartY;
      if (window.scrollY === 0 && distance > 150) {
        if (navigator.vibrate) navigator.vibrate(50);
        window.location.reload();
      }
    };
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  /*Crear la función de envío (AJAX)*/
  const handleContactSubmit = async (e) => {
    e.preventDefault(); 
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://formsubmit.co/ajax/lafprintsource@gmail.com", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setShowSuccessModal(true); 
        e.target.reset(); 
        
        // --- AQUÍ ESTÁ LA MAGIA ---
        // Desplaza la página suavemente hacia la parte superior
        window.scrollTo({ top: 0, behavior: "smooth" }); 
        
      } else {
        alert("Hubo un problema al enviar el mensaje. Por favor intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error enviando el formulario:", error);
      alert("Error de conexión. Revisa tu internet y vuelve a intentar.");
    } finally {
      setIsSubmitting(false); 
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return (
          <div
            className="section-wrapper fade-in home-wrapper"
            style={{
              position: "relative",
              overflow: "visible",
              display: "flex",
              flexDirection: "column",
              height: "auto",
              backgroundColor: theme === "dark" ? "#0a0a0a" : "#ffffff",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                backgroundImage:
                  theme === "dark"
                    ? "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)"
                    : "linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                maskImage:
                  "radial-gradient(circle at center, black 40%, transparent 100%)",
              }}
            ></div>

            <div
              className="hero-content"
              style={{
                position: "relative",
                zIndex: 1,
                flex: 1,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <div className="hero-text-group">
                <div
                  className="hero-status-indicator"
                  style={{
                    background: `${accentColor}1a`,
                    color: accentColor,
                    border: `1px solid ${accentColor}33`,
                    borderRadius: "5px",
                  }}
                >
                  {t.hero.badge}
                </div>

                <h1
                  style={{
                    fontSize: "3.5rem",
                    lineHeight: "1.3",
                    marginBottom: "20px",
                    color: "var(--text)",
                  }}
                >
                  {t.hero.title_start}{" "}
                  <span style={{ fontWeight: "700" }}>
                    {t.hero.title_gradient}
                  </span>{" "}
                  <span
                    style={{
                      color: "var(--accent)",
                      fontWeight: "800",
                    }}
                  >
                    {t.hero.title_end}
                  </span>
                </h1>

                <p
                  className="hero-desc"
                  style={{
                    fontSize: "1.1rem",
                    maxWidth: "500px",
                    color: "#94a3b8",
                  }}
                >
                  {t.hero.desc_start}{" "}
                  <span style={{ fontWeight: "bold" }}>Full Stack</span>{" "}
                  {t.hero.desc_mid}{" "}
                  <span style={{ fontWeight: "bold" }}>(UI/UX)</span>{" "}
                  {t.hero.desc_end}
                </p>

                <div
                  className="hero-buttons"
                  style={{
                    marginTop: "30px",
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={() => setActiveSection("projects")}
                    className="btn btn-primary"
                    style={{ padding: "12px 30px", fontSize: "1rem" }}
                  >
                    {t.hero.btn_primary}
                  </button>

                  <button
                    onClick={() => setActiveSection("contact")}
                    className="btn btn-ghost"
                    style={{ padding: "12px 30px", fontSize: "1rem" }}
                  >
                    {t.hero.btn_secondary}
                  </button>

                  <a
                    href="/CV_Angel_Salguero.pdf"
                    download="CV_Angel_Salguero.pdf"
                    className="btn btn-ghost"
                    style={{
                      padding: "12px 30px",
                      fontSize: "1rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      textDecoration: "none",
                    }}
                  >
                    <FileText size={18} /> CV
                  </a>
                </div>
              </div>

              <div
                className="hero-visuals"
                style={{
                  width: "400px",
                  height: "auto",
                  minHeight: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  className="hero-stats-card"
                  style={{
                    background: theme === "dark" ? "#1e1e1e" : "#ffffff",
                    border: `1px solid ${theme === "dark" ? "#333" : "#e2e8f0"}`,
                    padding: "0",
                    borderRadius: "12px",
                    width: "280px",
                    boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)",
                    overflow: "hidden",
                    fontFamily: "'Courier New', Courier, monospace",
                  }}
                >
                  <div
                    style={{
                      background: theme === "dark" ? "#252526" : "#f1f5f9",
                      padding: "10px 15px",
                      display: "flex",
                      gap: "8px",
                      borderBottom: `1px solid ${theme === "dark" ? "#333" : "#e2e8f0"}`,
                    }}
                  >
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: theme === "dark" ? "#ff5f56" : "#cbd5e1",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: theme === "dark" ? "#ffbd2e" : "#cbd5e1",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: theme === "dark" ? "#27c93f" : "#cbd5e1",
                      }}
                    ></div>
                  </div>

                  <div
                    style={{
                      padding: "25px",
                      textAlign: "left",
                      minHeight: "200px",
                      color: theme === "dark" ? "#d4d4d4" : "#334155",
                    }}
                  >
                    <Typewriter
                      key={language + accentColor}
                      onInit={(typewriter) => {
                        typewriter
                          .changeDelay(80)

                          .typeString(
                            `<span style="color: ${accentColor}; font-weight: bold; font-size: 0.8rem;">${t.hero.stats.exp}</span><br/>`,
                          )
                          .pauseFor(1000)
                          .typeString(
                            '<span style="color: #569cd6;">const</span> <span style="color: #9cdcfe;">exp</span> <span style="color: #d4d4d4;">+=</span> <span style="color: #b5cea8; font-weight: bold;">3;</span><br/><br/>',
                          )

                          .typeString(
                            `<span style="color: ${accentColor}; font-weight: bold; font-size: 0.8rem;">${t.hero.stats.projects}</span><br/>`,
                          )
                          .pauseFor(1000)
                          .typeString(
                            '<span style="color: #c586c0;">let</span> <span style="color: #9cdcfe;">done</span> <span style="color: #d4d4d4;">=</span> <span style="color: #b5cea8; font-weight: bold;">15;</span><br/><br/>',
                          )

                          .typeString(
                            `<span style="color: ${accentColor}; font-weight: bold; font-size: 0.8rem;">${t.hero.stats.clients}</span><br/>`,
                          )
                          .pauseFor(1000)
                          .typeString(
                            '<span style="color: #9cdcfe;">status</span> <span style="color: #d4d4d4;">:</span> <span style="color: #ce9178; font-weight: bold;">"100%"</span>',
                          )

                          .start();
                      }}
                      options={{
                        autoStart: true,
                        loop: false,
                        cursor: "_",
                        cursorClassName: "typewriter-cursor",
                        delay: 40, // Adjust typing speed here
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="skills-section">
              <h3 style={{ opacity: 0.6, marginBottom: "50px" }}>
                {t.hero.tech_stack}
              </h3>

              <div className="skills-track">
                {TECH_STACK.map((tech, index) => (
                  <div key={`skill-${index}`} className="skill-item">
                    {tech.icon}
                    <span>{tech.name}</span>
                  </div>
                ))}

                {TECH_STACK.map((tech, index) => (
                  <div key={`skill-dup-${index}`} className="skill-item">
                    {tech.icon}
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="section-wrapper fade-in">
            <div className="section-header">
              <p className="section-label">{t.section_titles.projects_label}</p>
              <h2 className="section-title">
                {t.section_titles.projects_title}
              </h2>
              <p style={{ marginTop: "10px", color: "var(--text-muted)" }}>
                {t.section_titles.projects_subtitle}
              </p>
            </div>
            <div className="projects-grid">
              {t.projects.map((project, i) => (
                <div
                  key={i}
                  className="project-card"
                  onClick={() => setSelectedProject(project)}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="project-icon">{project.icon}</div>
                  <h3>{project.title}</h3>
                  <div className="tech-stack">
                    {project.tech.map((tech, k) => (
                      <span key={k} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p>{project.desc}</p>
                  <span className="learn-more">{t.section_titles.projects_learn_more}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "services":
        return (
          <div className="section-wrapper fade-in">
            <div className="section-header">
              <p className="section-label">{t.section_titles.services_label}</p>
              <h2 className="section-title">
                {t.section_titles.services_title}
              </h2>
              <p
                style={{
                  marginTop: "10px",
                  color: "var(--text-muted)",
                  maxWidth: "600px",
                }}
              >
                {t.section_titles.services_desc}
              </p>
            </div>

            <div className="services-grid">
              {t.services.map((s, i) => (
                <div key={i} className="service-card">
                  <div className="service-icon-box">{s.icon}</div>
                  <div className="service-bg-num">{s.id}</div>
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-desc">{s.desc}</p>

                  <ul className="service-features">
                    {s.features.map((feat, j) => (
                      <li key={j}>
                        <span
                          style={{
                            color: "var(--accent)",
                            marginRight: "8px",
                            fontWeight: "bold",
                          }}
                        >
                          &gt;
                        </span>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <button
                    className="service-btn"
                    onClick={() => setActiveSection("contact")}
                  >
                    Solicitar <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      // Sustituye el bloque anterior de `case "contact":` con esto:

      case "contact":
        return (
          <div className="section-wrapper fade-in">
            <div className="cta-container">
              <p className="section-label">{t.section_titles.contact_label}</p>
              <h2 className="cta-title">{t.section_titles.contact_title}</h2>
              <p className="hero-desc" style={{ margin: "0 auto 30px" }}>
                {t.section_titles.contact_desc}
              </p>

              <a
                href="mailto:lafprintsource@gmail.com"
                className="btn btn-primary"
                style={{ marginBottom: "3rem", display: "inline-flex" }}
              >
                {t.section_titles.contact_btn}
              </a>

              <div className="contact-form">
                <div className="contact-phone-box">
                  <p style={{ margin: "0 0 5px 0", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    {t.section_titles.contact_phone}
                  </p>
                  <a 
                    href="https://wa.me/51974699157" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-phone-link"
                    style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
                  >
                    <FaWhatsapp size={26} style={{ color: "var(--accent)" }} /> 
                    <span style={{ color: "var(--text)", fontWeight: "bold", fontSize: "1.4rem" }}>
                      +51 974 699 157
                    </span>
                  </a>
                </div>

                <h3 style={{ borderBottom: "1px solid var(--border)", paddingBottom: "15px", marginTop: "20px" }}>
                  {language === "es" ? "O escríbeme directamente aquí" : "Or write me directly here"}
                </h3>

                {/* AQUÍ ESTÁ EL CAMBIO PRINCIPAL DEL FORMULARIO */}
                <form onSubmit={handleContactSubmit}>
                  {/* Ya no necesitamos _next ni _captcha porque lo manejamos por AJAX */}
                  <input type="hidden" name="_subject" value="Nuevo mensaje desde mi Portafolio Web!" />
                  
                  {/* ... (Todos tus form-groups se mantienen igual) ... */}
                  <div className="form-group">
                    <label htmlFor="name">{t.section_titles.contact_form_name}</label>
                    <input type="text" id="name" name="name" className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">{t.section_titles.contact_form_email}</label>
                    <input type="email" id="email" name="email" className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">{t.section_titles.contact_form_subject}</label>
                    <input type="text" id="subject" name="subject" className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">{t.section_titles.contact_form_message}</label>
                    <textarea id="message" name="message" className="form-control" required></textarea>
                  </div>

                  {/* El botón cambia su texto si está cargando */}
                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? (language === "es" ? "Enviando..." : "Sending...") : t.section_titles.contact_form_send} 
                    {!isSubmitting && <ArrowRight size={18} />}
                  </button>
                </form>

              </div>
            </div>

            {/* === MODAL DE ÉXITO === */}
            {showSuccessModal && (
              <div className="modal-overlay" style={{ zIndex: 3000 }} onClick={() => setShowSuccessModal(false)}>
                <div 
                  className="modal-content fade-in" 
                  style={{ 

                    padding: "40px", 
                    textAlign: "center", 
                    maxWidth: "400px",
                    marginTop: "-500px",
                  }} 
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 style={{ marginBottom: "5px", color: "var(--text)" }}>
                    {t.section_titles.contact_success_title}
                  </h2>
                  <p style={{ color: "var(--text-muted)", marginBottom: "30px", fontSize: "1rem" }}>
                    {t.section_titles.contact_success_desc}
                  </p>
                  <button 
                    className="btn btn-primary" 
                    style={{ width: "100%", justifyContent: "center" }}
                    onClick={() => setShowSuccessModal(false)}
                  >
                    {t.section_titles.contact_success_btn}
                  </button>
                </div>
              </div>
            )}
            
          </div>
        );

      case "privacy":
        return (
          <div
            className="section-wrapper fade-in"
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              padding: "40px 25px",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            }}
          >
            <div
              className="section-header"
              style={{ textAlign: "center", marginBottom: "70px" }}
            >
              <p
                className="section-label"
                style={{
                  letterSpacing: "3px",
                  fontSize: "0.85rem",
                  color: "#999",
                }}
              >
                {t.privacy.header.label}
              </p>

              <h2
                style={{
                  fontSize: "4rem",
                  fontFamily: 'Georgia, "Times New Roman", Times, serif',
                  fontWeight: "700",
                  lineHeight: "1.1",
                  margin: "15px 0",
                  color: "var(--accent)",
                  letterSpacing: "-2px",
                }}
              >
                {t.privacy.header.title}
              </h2>
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.4rem",
                  color: "var(--text-muted)",
                  fontStyle: "italic",
                  marginTop: "10px",
                }}
              >
                {t.privacy.header.subtitle}
              </p>
            </div>

            <div
              className="privacy-content"
              style={{
                lineHeight: "1.8",
                fontSize: "1.15rem",
                color: "var(--text-color)",
                opacity: 0.95,
              }}
            >
              <h3
                style={{
                  fontSize: "1.8rem",
                  fontFamily: "Georgia, serif",
                  marginTop: "50px",
                  marginBottom: "20px",
                }}
              >
                {t.privacy.sections.responsible.title}
              </h3>
              <p>{t.privacy.sections.responsible.text}</p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  marginTop: "15px",
                  borderLeft: "3px solid var(--accent)",
                  paddingLeft: "20px",
                }}
              >
                {t.privacy.sections.responsible.items.map((item, i) => (
                  <li key={i}>
                    <strong>{item}</strong>
                  </li>
                ))}
              </ul>

              <h3
                style={{
                  fontSize: "1.8rem",
                  fontFamily: "Georgia, serif",
                  marginTop: "50px",
                  marginBottom: "20px",
                }}
              >
                {t.privacy.sections.data.title}
              </h3>
              <p>{t.privacy.sections.data.intro}</p>
              <div style={{ display: "grid", gap: "20px", marginTop: "20px" }}>
                {t.privacy.sections.data.cards.map((card, i) => (
                  <div
                    key={i}
                    style={{
                      background: "var(--card-bg)",
                      padding: "20px",
                      borderRadius: "8px",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <strong
                      style={{
                        display: "block",
                        marginBottom: "10px",
                        color: "var(--accent)",
                      }}
                    >
                      {card.title}
                    </strong>
                    <p style={{ fontSize: "1rem", margin: 0 }}>
                      {card.content}
                    </p>
                  </div>
                ))}
              </div>

              <h3
                style={{
                  fontSize: "1.8rem",
                  fontFamily: "Georgia, serif",
                  marginTop: "50px",
                  marginBottom: "20px",
                }}
              >
                {t.privacy.sections.third_parties.title}
              </h3>
              <p>{t.privacy.sections.third_parties.text}</p>
              <ul style={{ paddingLeft: "20px", color: "var(--text-muted)" }}>
                {t.privacy.sections.third_parties.items.map((item, i) => (
                  <li key={i} style={{ marginBottom: "10px" }}>
                    <strong>{item}</strong>
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: "0.95rem", fontStyle: "italic" }}>
                {t.privacy.sections.third_parties.note}
              </p>

              <h3
                style={{
                  fontSize: "1.8rem",
                  fontFamily: "Georgia, serif",
                  marginTop: "50px",
                  marginBottom: "20px",
                }}
              >
                {t.privacy.sections.rights.title}
              </h3>
              <p>{t.privacy.sections.rights.intro}</p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "15px",
                  marginTop: "20px",
                }}
              >
                {t.privacy.sections.rights.list.map((right, i) => (
                  <li
                    key={i}
                    style={{
                      padding: "15px",
                      border: "1px solid var(--border-color)",
                      borderRadius: "6px",
                    }}
                  >
                    <strong>{right.label}:</strong>
                    <br /> {right.desc}
                  </li>
                ))}
              </ul>

              <h3
                style={{
                  fontSize: "1.8rem",
                  fontFamily: "Georgia, serif",
                  marginTop: "50px",
                  marginBottom: "20px",
                }}
              >
                {t.privacy.sections.cookies.title}
              </h3>
              <p>{t.privacy.sections.cookies.text}</p>

              <h3
                style={{
                  fontSize: "1.8rem",
                  fontFamily: "Georgia, serif",
                  marginTop: "50px",
                  marginBottom: "20px",
                }}
              >
                {t.privacy.sections.retention.title}
              </h3>
              <p>{t.privacy.sections.retention.text}</p>
            </div>

            <div
              style={{
                textAlign: "center",
                marginTop: "100px",
                marginBottom: "80px",
                borderTop: "1px solid var(--border-color)",
                paddingTop: "30px",
              }}
            >
              <span
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  color: "var(--text-muted)",
                }}
              >
                {t.privacy.footer_text}
              </span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 50px",
        }}
      >
        <div className="logo" onClick={() => setActiveSection("home")}>
          as<span className="dot">_</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <button
              className={`nav-btn ${activeSection === "home" ? "active" : ""}`}
              onClick={() => {
                setActiveSection("home");
                setMenuOpen(false);
              }}
            >
              {t.nav.home}
            </button>
            <button
              className={`nav-btn ${activeSection === "projects" ? "active" : ""}`}
              onClick={() => {
                setActiveSection("projects");
                setMenuOpen(false);
              }}
            >
              {t.nav.projects}
            </button>
            <button
              className={`nav-btn ${activeSection === "services" ? "active" : ""}`}
              onClick={() => {
                setActiveSection("services");
                setMenuOpen(false);
              }}
            >
              {t.nav.services}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                setActiveSection("contact");
                setMenuOpen(false);
              }}
            >
              {t.nav.contact}
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <button
              onClick={() =>
                setLanguage((prev) => (prev === "es" ? "en" : "es"))
              }
              style={{
                background: "transparent",
                border: "1px solid var(--border-color)",
                color: "var(--text-color)",
                width: "40px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "0.8rem",
                padding: "0",
              }}
            >
              {language === "es" ? "ES" : "EN"}
            </button>

            <div style={{ position: "relative" }} ref={themeMenuRef}>
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-color)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: "5px",
                }}
                title="Cambiar Color de Tema"
              >
                <Palette size={20} style={{ color: accentColor }} />
              </button>

              {showThemeMenu && (
                <div
                  className="theme-menu fade-in"
                  style={{
                    position: "absolute",
                    top: "40px",
                    right: "-10px",
                    background: "var(--card-bg)",
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "12px",
                    padding: "15px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    zIndex: 100,
                    minWidth: "160px",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.8rem",
                      color: "var(--text-muted)",
                      marginBottom: "5px",
                    }}
                  >
                    Selecciona un color:
                  </p>

                  {COLOR_THEMES.map((themeOption) => (
                    <button
                      key={themeOption.id}
                      onClick={() => {
                        setAccentColor(themeOption.color);
                        setShowThemeMenu(false);
                      }}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "5px",
                        color: "var(--text)",
                        fontSize: "0.9rem",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          background: themeOption.color,
                          border:
                            accentColor === themeOption.color
                              ? "2px solid white"
                              : "none",
                          boxShadow:
                            accentColor === themeOption.color
                              ? "0 0 0 2px #fff"
                              : "none",
                        }}
                      />
                      {themeOption.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <label className="switch">
              <input
                type="checkbox"
                onChange={toggleTheme}
                checked={theme === "light"}
              />
              <span className="slider"></span>
            </label>

            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">{renderContent()}</main>

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "1200px",
              width: "95%",
              maxHeight: "110vh",
              overflowY: "auto",
              padding: "50px",
            }}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>

            <div className="modal-header" style={{ marginBottom: "20px" }}>
              <h2>{selectedProject.title}</h2>
              <div className="project-icon">{selectedProject.icon}</div>
            </div>

            <div style={{ margin: "0 -20px 25px -20px" }}>
              {(() => {
                switch (selectedProject.title) {
                  case "FinanceHub":
                    return <FinanceHubDemo />;
                  case "DataCleaner Bot":
                    return <DataCleanerDemo />;
                  case "SQL vs NoSQL":
                    return <SqlNoSqlDemo />;
                  case "Gastro-App":
                    return <GastroAppDemo />;
                  case "Automation-Tools":
                    return <AutomationToolsDemo />;
                  case "UniVault":
                    return <UniVaultDemo />;
                  default:
                    // === NUEVA LÓGICA PARA ENLACES EXTERNOS ===
                    if (selectedProject.externalUrl) {
                      return (
                        <div style={{ 
                          textAlign: "center", 
                          padding: "60px 20px",
                          background: "var(--card-bg)",
                          borderTop: "1px solid var(--border-color)",
                          borderBottom: "1px solid var(--border-color)",
                        }}>
                          <Globe size={50} style={{ color: "var(--accent)", marginBottom: "15px" }} />
                          <h3 style={{ marginBottom: "10px" }}>
                            {language === "es" ? "Proyecto interactivo externo" : "External interactive project"}
                          </h3>
                          <p style={{ color: "var(--text-muted)", marginBottom: "25px", maxWidth: "400px", margin: "0 auto 25px" }}>
                            {language === "es" 
                              ? "Este proyecto está alojado en su propio dominio. Haz clic en el botón para explorar la demo en vivo." 
                              : "This project is hosted on its own domain. Click the button below to explore the live demo."}
                          </p>
                          <a 
                            href={selectedProject.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                          >
                            {language === "es" ? "Ver Demo en Vivo" : "View Live Demo"} <ArrowRight size={16} />
                          </a>
                        </div>
                      );
                    }
                    
                    // === FALLBACK PARA PROYECTOS SIN DEMO ===
                    return (
                      <div className="modal-image-container">
                        <img
                          src="/api/placeholder/400/320"
                          alt="Demo Placeholder"
                          className="modal-img"
                        />
                      </div>
                    );
                }
              })()}
            </div>

            <div className="modal-text">
              <div className="tech-stack" style={{ marginBottom: "1rem" }}>
                {selectedProject.tech.map((t, j) => (
                  <span key={j} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>
              <p className="modal-desc">
              {selectedProject.desc} <br />
              <br />{" "}
              {selectedProject.longDesc || t.section_titles.projects_no_desc}
              </p>
            </div>
          </div>
        </div>
      )}

      <footer
        className="footer-simple"
        style={{
          position: window.innerWidth <= 768 ? "relative" : "fixed",
          bottom: window.innerWidth <= 768 ? "auto" : 0,
          left: 0,
          zIndex: 1000,
          width: "100%",
          padding: window.innerWidth <= 768 ? "25px 20px" : "15px 50px",
          background: theme === "dark" ? "rgba(10,10,10,0.98)" : "rgba(255,255,255,0.98)",
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: window.innerWidth <= 768 ? "column" : "row",
          gap: window.innerWidth <= 768 ? "20px" : "0", 
          marginTop: window.innerWidth <= 768 ? "20px" : "0",
        }}
      >
        {/* 1. SECCIÓN IZQUIERDA (Copyright) */}
        <div style={{ 
          flex: 1, 
          display: "flex", 
          justifyContent: window.innerWidth <= 768 ? "center" : "flex-start",
          color: "#888", 
          fontSize: "0.9rem", 
          fontWeight: "500",
          width: window.innerWidth <= 768 ? "100%" : "auto"
        }}>
          {/* Aproveché para cambiar a "Salguero Dev" como acordamos */}
          <span>© {new Date().getFullYear()} Salguero Dev</span>
        </div>

        {/* 2. SECCIÓN CENTRAL (Política de Privacidad) */}
        <div style={{ 
          flex: 1, 
          display: "flex", 
          justifyContent: "center",
          width: window.innerWidth <= 768 ? "100%" : "auto"
        }}>
          <button
            onClick={(e) => {
              e.preventDefault();
              setActiveSection("privacy");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{
              background: "none",
              border: "none",
              color: "#888",
              fontSize: "0.9rem",
              textDecoration: "none",
              cursor: "pointer",
              transition: "color 0.2s",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => (e.target.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.target.style.color = "#888")}
          >
            {t.footer.privacy}
          </button>
        </div>

        {/* 3. SECCIÓN DERECHA (Redes Sociales) */}
        <div style={{ 
          flex: 1, 
          display: "flex", 
          justifyContent: window.innerWidth <= 768 ? "center" : "flex-end", 
          gap: "10px",
          width: window.innerWidth <= 768 ? "100%" : "auto"
        }}>
          {[
            { icon: FaLinkedin, link: "https://www.linkedin.com/in/angel-salguero-47b53535a/" },
            { icon: FaGithub, link: "https://github.com/AngelSalgueroB" },
            { icon: FaFacebook, link: "https://facebook.com/" },
            { icon: FaInstagram, link: "https://instagram.com/" },
            { icon: FaTwitter, link: "https://twitter.com/" },
            { icon: FaYoutube, link: "https://youtube.com/" },
            { icon: FaEnvelope, link: "mailto:lafprintsource@gmail.com" },
          ].map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <item.icon size={20} />
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default App;
``;
