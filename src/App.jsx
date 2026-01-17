import { useState, useEffect, useRef } from 'react';
import './App.css'; 

// --- 1. DATOS DEL PORTAFOLIO ---
const PROJECTS = [
  {
    title: "FinanceHub",
    desc: "Billetera virtual con autenticación segura y dashboards.",
    tech: ["Supabase", "React", "JS"],
    icon: "💳"
  },
  {
    title: "DataCleaner Bot",
    desc: "Pipeline de automatización de datos corporativos.",
    tech: ["Python", "Pandas", "ETL"],
    icon: "🤖"
  },
  {
    title: "SQL vs NoSQL",
    desc: "Benchmark de rendimiento de bases de datos.",
    tech: ["PostgreSQL", "Mongo", "DB"],
    icon: "⚡"
  },
   {
    title: "Gastro-App",
    desc: "Plataforma de reservas y gestión para restaurantes.",
    tech: ["Django", "React", "Docker"],
    icon: "🍽️"
  },
   {
    title: "Automation-Tools",
    desc: "Conjunto de scripts para automatizar tareas repetitivas.",
    tech: ["Next.js", "Node.js", "APIs"],
    icon: "🛠️"
  }
];

const SERVICES = [
  { 
    id: "01", 
    title: "Desarrollo Full Stack", 
    desc: "Apps web modernas y escalables." 
  },
  { 
    id: "02", 
    title: "Automatización de Datos", 
    desc: "Pipelines ETL y limpieza de datos." 
  },
  { 
    id: "03", 
    title: "Consultoría Cloud", 
    desc: "Migración y optimización en la nube." 
  },
  { 
    id: "04", 
    title: "Herramientas de Productividad", 
    desc: "Automatización de Excel, reportes y trazabilidad operativa." 
  },
  { 
    id: "05", 
    title: "Scripting de Sistema", 
    desc: "Gestión masiva de archivos y automatización de flujos locales." 
  }
];

const SOCIAL_LINKS = [
  { name: "GitHub", url: "https://github.com/AngelSalgueroB" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/angel-salguero-47b53535a/" },
  { name: "Facebook", url: "#" },
  { name: "Instagram", url: "#" },
  { name: "Twitter", url: "#" },
  { name: "YouTube", url: "#" },
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  
  // Referencia para el efecto del cursor
  const cursorRef = useRef(null);

  // Efecto: Aplicar tema al HTML
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Función para alternar tema
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Efecto Cursor (Seguimiento del mouse)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="section-wrapper fade-in">
            <div className="hero-content">
              <div className="badge">Disponible para proyectos</div>
              <h1>Construyo aplicaciones <span className="muted">que escalan negocios</span></h1>
              <p className="hero-desc">
                Ingeniero de Sistemas especializado en <strong>desarrollo full stack</strong> y <strong>automatización</strong>.
              </p>
              <div className="hero-buttons">
                <button onClick={() => setActiveSection('projects')} className="btn btn-primary">Ver proyectos →</button>
                <button onClick={() => setActiveSection('contact')} className="btn btn-ghost">Hablemos</button>
              </div>
              <div className="stats">
                <div className="stat-item"><h3>3<span>+</span></h3><p>Años exp.</p></div>
                <div className="stat-item"><h3>15<span>+</span></h3><p>Proyectos</p></div>
                <div className="stat-item"><h3>100<span>%</span></h3><p>Clientes</p></div>
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="section-wrapper fade-in">
            <div className="section-header">
              <p className="section-label">01 — PROYECTOS</p>
              <h2 className="section-title">Trabajo seleccionado</h2>
            </div>
            <div className="projects-grid">
              {PROJECTS.map((p, i) => (
                <div key={i} className="project-card">
                  <div className="project-icon">{p.icon}</div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="tech-stack">
                    {p.tech.map((t, j) => <span key={j} className="tech-tag">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="section-wrapper fade-in">
            <div className="section-header">
              <p className="section-label">02 — SERVICIOS</p>
              <h2 className="section-title">Cómo puedo ayudarte</h2>
            </div>
            <div className="services-grid">
              {SERVICES.map((s, i) => (
                <div key={i} className="service-item">
                  <p className="service-num">{s.id}</p>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="section-wrapper fade-in">
             <div className="cta-container">
                <p className="section-label">03 — CONTACTO</p>
                <h2 className="cta-title">¿Tienes un proyecto?</h2>
                <p className="hero-desc" style={{margin: '0 auto 30px'}}>
                  Estoy listo para nuevos desafíos freelance. Envíame un correo o conecta en redes.
                </p>
                
                <a href="mailto:tuemail@ejemplo.com" className="btn btn-primary" style={{marginBottom: '2rem'}}>
                  Envíame un correo →
                </a>

                {/* BOTONES SOCIALES ROJOS */}
                <div className="social-container">
                  {SOCIAL_LINKS.map((link) => (
                    <a 
                      key={link.name}
                      href={link.url}
                      className="social-btn"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
             </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {/* Efecto de luz de fondo */}
      <div className="cursor-glow" ref={cursorRef}></div>

      {/* Navbar */}
      <nav>
        <div className="logo" onClick={() => setActiveSection('home')}>as<span className="dot">_</span></div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Menú Escritorio */}
          <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <button className={`nav-btn ${activeSection === 'home' ? 'active' : ''}`} onClick={() => {setActiveSection('home'); setMenuOpen(false);}}>Inicio</button>
            <button className={`nav-btn ${activeSection === 'projects' ? 'active' : ''}`} onClick={() => {setActiveSection('projects'); setMenuOpen(false);}}>Proyectos</button>
            <button className={`nav-btn ${activeSection === 'services' ? 'active' : ''}`} onClick={() => {setActiveSection('services'); setMenuOpen(false);}}>Servicios</button>
            <button className="btn btn-primary" onClick={() => {setActiveSection('contact'); setMenuOpen(false);}}>Contacto</button>
          </div>

          {/* Switch Tema */}
          <label className="switch">
            <input type="checkbox" onChange={toggleTheme} checked={theme === 'light'} />
            <span className="slider"></span>
          </label>

          {/* Botón Móvil */}
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </nav>

      <main className="main-content">
        {renderContent()}
      </main>

      {/* ... código anterior ... */}

      <div className="footer-simple">
        <p style={{marginBottom: '1rem'}}>© 2026 Angel Salguero | Systems Engineer</p>
        
        {/* --- AQUÍ INSERTAMOS LOS BOTONES --- */}
        <div className="social-container" style={{justifyContent: 'center'}}>
          {SOCIAL_LINKS.map((link) => (
            <a 
              key={link.name}
              href={link.url}
              className="social-btn"
              target="_blank" 
              rel="noopener noreferrer"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
      
    </div> // Cierre del div app-container
  );
}

export default App;