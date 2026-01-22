import { useState, useEffect, useRef } from 'react';
import './App.css'; 

// --- 1. DATOS ACTUALIZADOS CON IMÁGENES Y DESCRIPCIÓN ---
const PROJECTS = [
  {
    title: "FinanceHub",
    desc: "Billetera virtual con autenticación segura.",
    longDesc: "Esta aplicación permite a los usuarios gestionar sus finanzas personales, establecer metas de ahorro y visualizar gastos mediante gráficos interactivos. Incluye autenticación segura y modo oscuro.",
    tech: ["Supabase", "React", "JS"],
    icon: "💳",
    img: "/1.jpg" // Asegúrate de poner la imagen en la carpeta public
  },
  {
    title: "DataCleaner Bot",
    desc: "Pipeline de automatización de datos.",
    longDesc: "Bot desarrollado en Python que procesa archivos Excel masivos, limpia datos inconsistentes y genera reportes automáticos listos para análisis en Power BI.",
    tech: ["Python", "Pandas", "ETL"],
    icon: "🤖",
    img: "/2.jpg"
  },
  {
    title: "SQL vs NoSQL",
    desc: "Benchmark de rendimiento de bases de datos.",
    longDesc: "Un estudio comparativo técnico donde se analizan tiempos de respuesta en consultas complejas utilizando millones de registros. Se comparan PostgreSQL vs MongoDB.",
    tech: ["PostgreSQL", "Mongo", "DB"],
    icon: "⚡",
    img: "/3.jpg"
  },
   {
    title: "Gastro-App",
    desc: "Plataforma de reservas para restaurantes.",
    longDesc: "Sistema completo para gestión de mesas y reservas en tiempo real. Permite a los dueños administrar el menú y a los clientes reservar su mesa favorita.",
    tech: ["Django", "React", "Docker"],
    icon: "🍽️",
    img: "/4.jpg"
  },
   {
    title: "Automation-Tools",
    desc: "Scripts para automatizar tareas.",
    longDesc: "Colección de scripts de utilidad para sistemas operativos Windows y Linux. Incluye organizadores de carpetas, renombrado masivo y backups automáticos.",
    tech: ["Next.js", "Node.js", "APIs"],
    icon: "🛠️",
    img: "/5.jpg"
  }
];

const SERVICES = [
  { id: "01", title: "Desarrollo Full Stack", desc: "Apps web modernas y escalables." },
  { id: "02", title: "Automatización de Datos", desc: "Pipelines ETL y limpieza de datos." },
  { id: "03", title: "Consultoría Cloud", desc: "Migración y optimización en la nube." },
  { id: "04", title: "Herramientas de Productividad", desc: "Automatización de Excel y reportes." },
  { id: "05", title: "Scripting de Sistema", desc: "Gestión masiva de archivos." }
];

const SOCIAL_LINKS = [
  { name: "GitHub", url: "https://github.com/TU_USUARIO" },
  { name: "LinkedIn", url: "https://linkedin.com/in/TU_USUARIO" },
  { name: "Facebook", url: "#" },
  { name: "Instagram", url: "#" },
  { name: "Twitter", url: "#" },
  { name: "YouTube", url: "#" },
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  
  // ESTADO NUEVO: Para saber qué proyecto se abrió
  const [selectedProject, setSelectedProject] = useState(null);
  
  const cursorRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

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
              <p style={{marginTop: '10px', color: 'var(--text-muted)'}}>Haz clic en una tarjeta para ver detalles.</p>
            </div>
            <div className="projects-grid">
              {PROJECTS.map((p, i) => (
                // AQUI AGREGAMOS EL EVENTO CLICK
                <div key={i} className="project-card clickable" onClick={() => setSelectedProject(p)}>
                  <div className="project-icon">{p.icon}</div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="tech-stack">
                    {p.tech.map((t, j) => <span key={j} className="tech-tag">{t}</span>)}
                  </div>
                  <span className="learn-more">Ver más +</span>
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
      <div className="cursor-glow" ref={cursorRef}></div>

      {/* Navbar */}
      <nav>
        <div className="logo" onClick={() => setActiveSection('home')}>as<span className="dot">_</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <button className={`nav-btn ${activeSection === 'home' ? 'active' : ''}`} onClick={() => {setActiveSection('home'); setMenuOpen(false);}}>Inicio</button>
            <button className={`nav-btn ${activeSection === 'projects' ? 'active' : ''}`} onClick={() => {setActiveSection('projects'); setMenuOpen(false);}}>Proyectos</button>
            <button className={`nav-btn ${activeSection === 'services' ? 'active' : ''}`} onClick={() => {setActiveSection('services'); setMenuOpen(false);}}>Servicios</button>
            <button className="btn btn-primary" onClick={() => {setActiveSection('contact'); setMenuOpen(false);}}>Contacto</button>
          </div>
          <label className="switch">
            <input type="checkbox" onChange={toggleTheme} checked={theme === 'light'} />
            <span className="slider"></span>
          </label>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </nav>

      <main className="main-content">
        {renderContent()}
      </main>

      {/* --- AQUÍ ESTÁ EL MODAL (POPUP) NUEVO --- */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>×</button>
            
            {/* Imagen del proyecto */}
            <div className="modal-image-container">
              <img src={selectedProject.img} alt={selectedProject.title} className="modal-img" />
            </div>

            <div className="modal-text">
              <div className="modal-header">
                <h2>{selectedProject.title}</h2>
                <div className="project-icon">{selectedProject.icon}</div>
              </div>
              
              <div className="tech-stack" style={{marginBottom: '1rem'}}>
                 {selectedProject.tech.map((t, j) => <span key={j} className="tech-tag">{t}</span>)}
              </div>

              <p className="modal-desc">{selectedProject.longDesc}</p>
            </div>
          </div>
        </div>
      )}

      <div className="footer-simple">
        <span>© 2026 Angel Salguero | Systems Engineer</span>
      </div>
    </div>
  );
}

export default App;