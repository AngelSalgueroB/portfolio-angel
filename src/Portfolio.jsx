import { useState, useEffect, useRef } from "react";
import "./App.css";
// IMPORTAMOS EL DICCIONARIO DE IDIOMAS
import { translations } from './translations';

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
  Palette, // <--- Importante para el icono de temas
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";

import DataCleanerDemo from "./components/DataCleanerDemo";
import FinanceHubDemo from "./components/FinanceHubDemo";
import SqlNoSqlDemo from "./components/SqlNoSqlDemo";
import GastroAppDemo from "./components/GastroAppDemo";
import AutomationToolsDemo from "./components/AutomationToolsDemo";
import UniVaultDemo from "./components/UniVaultDemo";

// --- DATA: Fragmentos de código (Se mantiene por si lo usas luego) ---
const BACKGROUND_CODE = [
  "npm install react-router-dom",
  "git commit -m 'feat: new dashboard'",
  "SELECT * FROM users WHERE active=1;",
  "const [state, setState] = useState(null);",
  "if (res.status === 200) { return data; }",
  "pip install pandas numpy",
  "docker-compose up --build -d",
  "console.log('Debugging connection...');",
  "export default function App() {",
  "import { useEffect } from 'react';",
  ".map((item, i) => (<div key={i}>))",
  "sudo systemctl restart nginx",
  "while(isRunning) { processData(); }",
  "const theme = createTheme({ palette: ... })",
  "await prisma.user.findMany()",
  "tailwind.config.js: theme: { extend: ... }",
  "python3 manage.py runserver",
];

// --- DEFINICIÓN DE TEMAS DE COLOR (Fuera para que no se recree) ---
const COLOR_THEMES = [
  { id: 'red', color: '#e11d48', name: 'Rojo' },
  { id: 'green', color: '#10b981', name: 'Esmeralda' },
  { id: 'blue', color: '#3b82f6', name: 'Azul' },
  { id: 'purple', color: '#8c5cff', name: 'Violeta' },
  { id: 'orange', color: '#f97316', name: 'Naranja' },
  { id: 'cyan', color: '#06b6d4', name: 'Cian Cyber' },
  { id: 'yellow', color: '#eab308', name: 'Amarillo Code' },
  { id: 'pink', color: '#ec4899', name: 'Rosa Tech' },
  { id: 'brown', color: '#a0522d', name: 'Marrón Tierra' },
  { id: 'black', color: '#374151', name: 'Negro Carbón' },
  { id: 'Peach', color: '#ff7e5f', name: 'Peach' },
  { id: 'Verde', color: '#33cc33', name: 'Verde Lima' },
];

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  // ESTADO NUEVO: Para saber qué proyecto se abrió
  const [selectedProject, setSelectedProject] = useState(null);
  const cursorRef = useRef(null);
  
  // --- CONFIGURACIÓN DE IDIOMA ---
  const [language, setLanguage] = useState("es"); // 'es' o 'en'
  const t = translations[language]; // 't' contiene todo el texto en el idioma actual

  // --- CONFIGURACIÓN DE TEMA DE COLOR ---
  const [accentColor, setAccentColor] = useState('#e11d48'); // Rojo por defecto
  const [showThemeMenu, setShowThemeMenu] = useState(false); // Menú de colores

  // EFECTO 1: Tema Oscuro/Claro
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // EFECTO 2: Inyectar variable de color (--accent)
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accentColor);
  }, [accentColor]);

  // EFECTO 3: Cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return (
          <div
            className="section-wrapper fade-in home-wrapper"
            style={{ position: "relative", overflow: "hidden" }}
          >
            {/* 1. LUCES DE FONDO (GLOW) */}
            <div className="hero-glow-blob"></div>
            <div className="hero-glow-blob secondary"></div>

            <div
              className="hero-content"
              style={{ position: "relative", zIndex: 1 }}
            >
              {/* BLOQUE IZQUIERDO: Texto */}
              <div className="hero-text-group">
                <div
                  className="badge"
                  style={{
                    background: `${accentColor}1a`, // Color con transparencia (hex + 1a = ~10%)
                    color: accentColor,
                    border: `1px solid ${accentColor}33`,
                  }}
                >
                  {t.hero.badge}
                </div>

                <h1
                  style={{
                    fontSize: "3.5rem",
                    lineHeight: "1.3",
                    marginBottom: "20px",
                  }}
                >
                  {t.hero.title_start}{" "}
                  <span className="text-gradient">{t.hero.title_gradient}</span>{" "}
                  {t.hero.title_end}
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

                <div className="hero-buttons" style={{ marginTop: "30px" }}>
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
                </div>
              </div>

              {/* BLOQUE DERECHO: Visuales (Editor de Código) */}
              <div
                className="hero-visuals"
                style={{
                  width: "400px",
                  height: "400px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  className="stats-card"
                  style={{
                    background: "#1e1e1e",
                    border: "1px solid #333",
                    padding: "0",
                    borderRadius: "12px",
                    width: "280px",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
                    overflow: "hidden",
                    fontFamily: "'Courier New', Courier, monospace",
                    animation: "floatCard 6s ease-in-out infinite",
                  }}
                >
                  {/* Header de Ventana */}
                  <div
                    style={{
                      background: "#252526",
                      padding: "10px 15px",
                      display: "flex",
                      gap: "8px",
                      borderBottom: "1px solid #333",
                    }}
                  >
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" }}></div>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }}></div>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" }}></div>
                  </div>

                  {/* Contenido (Estadísticas como código) */}
                  <div style={{ padding: "25px" }}>
                    
                    {/* Item 1 */}
                    <div style={{ marginBottom: "20px" }}>
                      {/* AQUÍ EL CAMBIO: Usamos accentColor en lugar de #6a9955 */}
                      <p style={{ margin: 0, color: accentColor, fontSize: "0.8rem", fontWeight: "bold" }}>
                        {t.hero.stats.exp}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ color: "#569cd6" }}>const</span>
                        <span style={{ color: "#9cdcfe" }}>exp</span>
                        <span style={{ color: "#d4d4d4" }}>+=</span>
                        <span style={{ color: "#b5cea8", fontSize: "1.4rem", fontWeight: "bold" }}>
                          3;
                        </span>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div style={{ marginBottom: "20px" }}>
                      {/* AQUÍ EL CAMBIO */}
                      <p style={{ margin: 0, color: accentColor, fontSize: "0.8rem", fontWeight: "bold" }}>
                          {t.hero.stats.projects}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ color: "#c586c0" }}>let</span>
                        <span style={{ color: "#9cdcfe" }}>done</span>
                        <span style={{ color: "#d4d4d4" }}>=</span>
                        <span style={{ color: "#b5cea8", fontSize: "1.4rem", fontWeight: "bold" }}>
                          15;
                        </span>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div>
                      {/* AQUÍ EL CAMBIO */}
                      <p style={{ margin: 0, color: accentColor, fontSize: "0.8rem", fontWeight: "bold" }}>
                          {t.hero.stats.clients}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ color: "#9cdcfe" }}>status</span>
                        <span style={{ color: "#d4d4d4" }}>:</span>
                        <span style={{ color: "#ce9178", fontSize: "1.4rem", fontWeight: "bold" }}>
                          "100%"
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="section-wrapper fade-in">
            <div className="section-header">
              <p className="section-label">{t.section_titles.projects_label}</p>
              <h2 className="section-title">{t.section_titles.projects_title}</h2>
              <p style={{ marginTop: "10px", color: "var(--text-muted)" }}>
                 {t.section_titles.projects_subtitle}
              </p>
            </div>
            <div className="projects-grid">
              {t.projects.map((p, i) => (
                <div
                  key={i}
                  className="project-card clickable"
                  onClick={() => setSelectedProject(p)}
                >
                  <div className="project-icon">{p.icon}</div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="tech-stack">
                    {p.tech.map((techItem, j) => (
                      <span key={j} className="tech-tag">
                        {techItem}
                      </span>
                    ))}
                  </div>
                  <span className="learn-more">Ver más +</span>
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
              <h2 className="section-title">{t.section_titles.services_title}</h2>
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
                href="mailto:tuemail@ejemplo.com"
                className="btn btn-primary"
                style={{ marginBottom: "2rem" }}
              >
                  {t.section_titles.contact_btn}
              </a>
            </div>
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
            {/* Header Política */}
            <div
              className="section-header"
              style={{ textAlign: "center", marginBottom: "70px" }}
            >
              <p
                className="section-label"
                style={{ letterSpacing: "3px", fontSize: "0.85rem", color: "#999" }}
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

            {/* CONTENIDO DINÁMICO */}
            <div
              className="privacy-content"
              style={{
                lineHeight: "1.8",
                fontSize: "1.15rem",
                color: "var(--text-color)",
                opacity: 0.95,
              }}
            >
               {/* 1. RESPONSABLE */}
               <h3 style={{ fontSize: '1.8rem', fontFamily: 'Georgia, serif', marginTop: '50px', marginBottom: '20px' }}>
                 {t.privacy.sections.responsible.title}
               </h3>
               <p>{t.privacy.sections.responsible.text}</p>
               <ul style={{ listStyle: 'none', padding: 0, marginTop: '15px', borderLeft: '3px solid var(--accent)', paddingLeft: '20px' }}>
                 {t.privacy.sections.responsible.items.map((item, i) => (
                   <li key={i}><strong>{item}</strong></li>
                 ))}
               </ul>

               {/* 2. DATOS */}
               <h3 style={{ fontSize: '1.8rem', fontFamily: 'Georgia, serif', marginTop: '50px', marginBottom: '20px' }}>
                 {t.privacy.sections.data.title}
               </h3>
               <p>{t.privacy.sections.data.intro}</p>
               <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
                 {t.privacy.sections.data.cards.map((card, i) => (
                    <div key={i} style={{ background: 'var(--card-bg)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <strong style={{ display:'block', marginBottom:'10px', color: 'var(--accent)' }}>{card.title}</strong>
                      <p style={{ fontSize: '1rem', margin:0 }}>{card.content}</p>
                    </div>
                 ))}
               </div>

               {/* 3. TERCEROS */}
               <h3 style={{ fontSize: '1.8rem', fontFamily: 'Georgia, serif', marginTop: '50px', marginBottom: '20px' }}>
                 {t.privacy.sections.third_parties.title}
               </h3>
               <p>{t.privacy.sections.third_parties.text}</p>
               <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)' }}>
                 {t.privacy.sections.third_parties.items.map((item, i) => (
                   <li key={i} style={{ marginBottom: '10px' }}><strong>{item}</strong></li>
                 ))}
               </ul>
               <p style={{ fontSize: '0.95rem', fontStyle: 'italic' }}>{t.privacy.sections.third_parties.note}</p>

               {/* 4. DERECHOS */}
               <h3 style={{ fontSize: '1.8rem', fontFamily: 'Georgia, serif', marginTop: '50px', marginBottom: '20px' }}>
                 {t.privacy.sections.rights.title}
               </h3>
               <p>{t.privacy.sections.rights.intro}</p>
               <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '20px' }}>
                 {t.privacy.sections.rights.list.map((right, i) => (
                   <li key={i} style={{ padding: '15px', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                     <strong>{right.label}:</strong><br/> {right.desc}
                   </li>
                 ))}
               </ul>

               {/* 5 & 6. COOKIES Y RETENCIÓN */}
               <h3 style={{ fontSize: '1.8rem', fontFamily: 'Georgia, serif', marginTop: '50px', marginBottom: '20px' }}>
                 {t.privacy.sections.cookies.title}
               </h3>
               <p>{t.privacy.sections.cookies.text}</p>

               <h3 style={{ fontSize: '1.8rem', fontFamily: 'Georgia, serif', marginTop: '50px', marginBottom: '20px' }}>
                 {t.privacy.sections.retention.title}
               </h3>
               <p>{t.privacy.sections.retention.text}</p>
            </div>
            
             <div style={{ textAlign: 'center', marginTop: '100px', marginBottom: '80px', borderTop: '1px solid var(--border-color)', paddingTop: '30px' }}>
               <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: 'var(--text-muted)' }}>
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
      <div className="cursor-glow" ref={cursorRef}></div>

      {/* Navbar OPTIMIZADO */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 50px' }}>
        
        {/* 1. LOGO (Izquierda) */}
        <div className="logo" onClick={() => setActiveSection("home")}>
          as<span className="dot">_</span>
        </div>

        {/* CONTENEDOR DERECHO */}
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          
          {/* 2. ENLACES DE NAVEGACIÓN (Centro-Derecha) */}
          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <button
              className={`nav-btn ${activeSection === "home" ? "active" : ""}`}
              onClick={() => { setActiveSection("home"); setMenuOpen(false); }}
            >
              {t.nav.home}
            </button>
            <button
              className={`nav-btn ${activeSection === "projects" ? "active" : ""}`}
              onClick={() => { setActiveSection("projects"); setMenuOpen(false); }}
            >
               {t.nav.projects}
            </button>
            <button
              className={`nav-btn ${activeSection === "services" ? "active" : ""}`}
              onClick={() => { setActiveSection("services"); setMenuOpen(false); }}
            >
               {t.nav.services}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => { setActiveSection("contact"); setMenuOpen(false); }}
            >
               {t.nav.contact}
            </button>
          </div>

          {/* 3. CONTROLES (Idioma + Tema + Color) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            
            {/* BOTÓN IDIOMA */}
            <button 
                onClick={() => setLanguage(prev => prev === "es" ? "en" : "es")}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-color)',
                  width: '40px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                  padding: '0'
                }}
              >
                {language === "es" ? "ES" : "EN"}
            </button>

            {/* --- NUEVO: SELECTOR DE TEMA DE COLOR --- */}
            <div style={{ position: 'relative' }}> 
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-color)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '5px'
                }}
                title="Cambiar Color de Tema"
              >
                {/* El icono toma el color actual del tema */}
                <Palette size={20} style={{ color: accentColor }} />
              </button>

              {/* MODAL FLOTANTE (POPOVER) */}
              {showThemeMenu && (
                <div 
                  className="theme-menu fade-in"
                  style={{
                    position: 'absolute',
                    top: '40px',
                    right: '-10px',
                    background: 'var(--card-bg, #1e1e1e)', 
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    zIndex: 100,
                    minWidth: '160px'
                  }}
                >
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted, #888)', marginBottom: '5px' }}>
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
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '5px',
                        color: 'var(--text-color)',
                        fontSize: '0.9rem',
                        textAlign: 'left'
                      }}
                    >
                      <div 
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: themeOption.color,
                          border: accentColor === themeOption.color ? '2px solid white' : 'none',
                          boxShadow: accentColor === themeOption.color ? '0 0 0 2px var(--text-color)' : 'none'
                        }}
                      />
                      {themeOption.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* SWITCH TEMA */}
            <label className="switch">
              <input
                type="checkbox"
                onChange={toggleTheme}
                checked={theme === "light"}
              />
              <span className="slider"></span>
            </label>

            {/* HAMBURGUESA (Solo Móvil) */}
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

      {/* MODAL (POPUP) INTELIGENTE */}
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

            {/* DEMOS LOGIC */}
            <div style={{ margin: "0 -20px 25px -20px" }}>
              {(() => {
                switch (selectedProject.title) {
                  case "FinanceHub": return <FinanceHubDemo />;
                  case "DataCleaner Bot": return <DataCleanerDemo />;
                  case "SQL vs NoSQL": return <SqlNoSqlDemo />;
                  case "Gastro-App": return <GastroAppDemo />;
                  case "Automation-Tools": return <AutomationToolsDemo />;
                  case "UniVault": return <UniVaultDemo />;
                  default: 
                    return null; 
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
              <p className="modal-desc">{selectedProject.desc} <br/><br/> {selectedProject.longDesc || "Description available via demo."}</p>
            </div>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer
        style={{
          marginTop: "80px",
          padding: "30px 50px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid var(--border-color, rgba(255,255,255,0.1))",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div style={{ color: "#888", fontSize: "0.9rem", fontWeight: "500" }}>
          <span>© {new Date().getFullYear()} Angel Salguero</span>
        </div>

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

        <div style={{ display: "flex", gap: "10px" }}>
          {[
            { icon: FaLinkedin, link: "https://www.linkedin.com/in/TU-USUARIO" },
            { icon: FaGithub, link: "https://github.com/TU-USUARIO" },
            { icon: FaFacebook, link: "https://facebook.com/TU-USUARIO" },
            { icon: FaInstagram, link: "https://instagram.com/TU-USUARIO" },
            { icon: FaTwitter, link: "https://twitter.com/TU-USUARIO" },
            { icon: FaYoutube, link: "https://youtube.com/@TU-CANAL" },
            { icon: FaEnvelope, link: "mailto:tu-email@ejemplo.com" },
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