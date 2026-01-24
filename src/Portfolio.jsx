import { useState, useEffect, useRef } from 'react';
import './App.css'; 
// AGREGAMOS: Layout, Server, Database, Code
import { 
  Github, Linkedin, Mail, FileText, Facebook, Youtube, Instagram, Twitter, 
  Layout, Server, Database, Code, 
  Terminal, Globe, Cpu, BarChart3, CloudCog, ArrowRight, Activity // <--- NUEVOS ICONOS
} from 'lucide-react';

import DataCleanerDemo from './components/DataCleanerDemo';
import FinanceHubDemo from './components/FinanceHubDemo';
import SqlNoSqlDemo from './components/SqlNoSqlDemo';
import GastroAppDemo from './components/GastroAppDemo';
import AutomationToolsDemo from './components/AutomationToolsDemo';
import UniVaultDemo from './components/UniVaultDemo';

// --- DATA: Fragmentos de código para el fondo ---
const BACKGROUND_CODE = [
  "npm install react-router-dom", "git commit -m 'feat: new dashboard'", "SELECT * FROM users WHERE active=1;",
  "const [state, setState] = useState(null);", "if (res.status === 200) { return data; }", 
  "pip install pandas numpy", "docker-compose up --build -d", "console.log('Debugging connection...');",
  "export default function App() {", "import { useEffect } from 'react';", ".map((item, i) => (<div key={i}>))",
  "sudo systemctl restart nginx", "while(isRunning) { processData(); }", "const theme = createTheme({ palette: ... })",
  "await prisma.user.findMany()", "tailwind.config.js: theme: { extend: ... }", "python3 manage.py runserver"
];
// Repetimos la lista para llenar la pantalla
const fullCodeGrid = [...BACKGROUND_CODE, ...BACKGROUND_CODE, ...BACKGROUND_CODE];

// --- 1. DATOS ACTUALIZADOS CON IMÁGENES Y DESCRIPCIÓN ---
const PROJECTS = [
  {
    title: "FinanceHub",
    desc: "Billetera virtual con autenticación segura.",
    longDesc: "Esta aplicación permite a los usuarios gestionar sus finanzas personales, establecer metas de ahorro y visualizar gastos mediante gráficos interactivos. Incluye autenticación segura y modo oscuro.",
    tech: ["Supabase", "React", "JS"],
    icon: "💳",
    
    hasDemo: true
  },
  {
    title: "DataCleaner Bot",
    desc: "Pipeline de automatización de datos.",
    longDesc: "Bot desarrollado en Python que procesa archivos Excel masivos, limpia datos inconsistentes y genera reportes automáticos listos para análisis en Power BI.",
    tech: ["Python", "Pandas", "ETL"],
    icon: "🤖",    
    hasDemo: true //
  },
  {
    title: "SQL vs NoSQL",
    desc: "Benchmark de rendimiento de bases de datos.",
    longDesc: "Un estudio comparativo técnico donde se analizan tiempos de respuesta en consultas complejas utilizando millones de registros. Se comparan PostgreSQL vs MongoDB.",
    tech: ["PostgreSQL", "Mongo", "DB"],
    icon: "⚡",
    hasDemo: true
  },
   {
    title: "Gastro-App",
    desc: "Plataforma de reservas para restaurantes.",
    longDesc: "Sistema completo para gestión de mesas y reservas en tiempo real. Permite a los dueños administrar el menú y a los clientes reservar su mesa favorita.",
    tech: ["Nuxt 3", "Vue.js", "Prisma", "Pinia"],
    icon: "🍽️",
    hasDemo: true
  },
   {
    title: "Automation-Tools",
    desc: "Scripts para automatizar tareas.",
    longDesc: "Colección de scripts de utilidad para sistemas operativos Windows y Linux. Incluye organizadores de carpetas, renombrado masivo y backups automáticos.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    icon: "🛠️",
    hasDemo: true
  },
  {
    title: "UniVault",
    desc: "Repositorio académico centralizado.",
    longDesc: "Plataforma de gestión del conocimiento universitario. Organiza el material de los 10 ciclos académicos (Syllabus, Proyectos, PDFs) con búsqueda indexada y previsualización de documentos.",
    tech: ["React", "Node.js", "AWS S3"], // El stack ideal para esto
    icon: "🎓",
    hasDemo: true
  }
];

const SERVICES = [
  { 
    id: "01", 
    title: "Desarrollo Full Stack", 
    desc: "Arquitectura y construcción de aplicaciones web a medida. Desde el diseño UI hasta la base de datos.",
    icon: <Globe size={28} />,
    features: ["React / Next.js", "APIs REST & GraphQL", "Paneles Administrativos"]
  },
  { 
    id: "02", 
    title: "Automatización & Scripts", 
    desc: "Elimino tareas repetitivas creando bots y scripts que trabajan por ti 24/7.",
    icon: <Terminal size={28} />,
    features: ["Web Scraping (Python)", "Procesamiento de Excel", "Bots de Telegram/WhatsApp"]
  },
  { 
    id: "03", 
    title: "Ingeniería de Datos", 
    desc: "Transformo datos brutos en dashboards interactivos para la toma de decisiones.",
    icon: <BarChart3 size={28} />,
    features: ["ETL Pipelines", "Limpieza de Datos", "Power BI / Looker Studio"]
  },
  { 
    id: "04", 
    title: "Infraestructura Cloud", 
    desc: "Despliegue y optimización de servidores para que tu aplicación nunca se caiga.",
    icon: <CloudCog size={28} />,
    features: ["AWS / Vercel / Docker", "CI/CD Pipelines", "Optimización de Costos"]
  },

  { 
    id: "05", 
    title: "Auditoría de Rendimiento", 
    desc: "Diagnóstico profundo de bases de datos y sistemas para maximizar la velocidad y escalabilidad.",
    icon: <Activity size={28} />, // Icono de pulso/actividad
    features: ["Benchmarking SQL vs NoSQL", "Optimización de Consultas", "Pruebas de Carga (Stress Testing)"]
  }

  
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
  const [theme, setTheme] = useState('light');
  
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
          <div className="section-wrapper fade-in home-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
            
            {/* 1. LUCES DE FONDO (GLOW) */}
            <div className="hero-glow-blob"></div>
            <div className="hero-glow-blob secondary"></div>

            <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
              
              {/* BLOQUE IZQUIERDO: Texto */}
              <div className="hero-text-group">
                <div className="badge" style={{ background: 'rgba(225, 29, 72, 0.1)', color: '#e11d48', border: '1px solid rgba(225, 29, 72, 0.2)' }}>
                   Disponible para proyectos
                </div>
                
                <h1 style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '20px' }}>
                  Construyo <span className="text-gradient">experiencias digitales</span> que impactan.
                </h1>
                
                <p className="hero-desc" style={{ fontSize: '1.1rem', maxWidth: '500px', color: '#94a3b8' }}>
                  Ingeniero de Sistemas especializado en transformar ideas complejas en <strong>Software Full Stack</strong> robusto, escalable y automatizado.
                </p>
                
                <div className="hero-buttons" style={{ marginTop: '30px' }}>
                  <button onClick={() => setActiveSection('projects')} className="btn btn-primary" style={{ padding: '12px 30px', fontSize: '1rem' }}>Ver Portafolio</button>
                  <button onClick={() => setActiveSection('contact')} className="btn btn-ghost" style={{ padding: '12px 30px', fontSize: '1rem' }}>Contactar</button>
                </div>
              </div>

              {/* BLOQUE DERECHO: Visuales (Editor de Código) */}
              <div className="hero-visuals" style={{ width: '400px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 
                               

                <div className="stats-card" style={{ 
                     background: '#1e1e1e', 
                     border: '1px solid #333', 
                     padding: '0', 
                     borderRadius: '12px', 
                     width: '280px',
                     boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
                     overflow: 'hidden',
                     fontFamily: "'Courier New', Courier, monospace",
                     animation: 'floatCard 6s ease-in-out infinite' // Mantenemos que la tarjeta flote suave
                 }}>
                  {/* Header de Ventana */}
                    <div style={{ background: '#252526', padding: '10px 15px', display: 'flex', gap: '8px', borderBottom: '1px solid #333' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
                    </div>
                    
                   
                    {/* Contenido (Estadísticas como código) */}
                    <div style={{ padding: '25px' }}>
                        
                        {/* Item 1 */}
                        <div style={{ marginBottom: '20px' }}>
                           <p style={{ margin: 0, color: '#6a9955', fontSize: '0.8rem' }}>// Años Experiencia</p>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ color: '#569cd6' }}>const</span> 
                              <span style={{ color: '#9cdcfe' }}>exp</span> 
                              <span style={{ color: '#d4d4d4' }}>+=</span> 
                              <span style={{ color: '#b5cea8', fontSize: '1.4rem', fontWeight: 'bold' }}>3;</span>
                           </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                           <p style={{ margin: 0, color: '#6a9955', fontSize: '0.8rem' }}>// Proyectos Reales</p>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ color: '#c586c0' }}>let</span> 
                              <span style={{ color: '#9cdcfe' }}>done</span> 
                              <span style={{ color: '#d4d4d4' }}>=</span> 
                              <span style={{ color: '#b5cea8', fontSize: '1.4rem', fontWeight: 'bold' }}>15;</span>
                           </div>
                        </div>

                        {/* Item 3 */}
                        <div>
                           <p style={{ margin: 0, color: '#6a9955', fontSize: '0.8rem' }}>// Clientes Satisfechos</p>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ color: '#9cdcfe' }}>status</span> 
                              <span style={{ color: '#d4d4d4' }}>:</span> 
                              <span style={{ color: '#ce9178', fontSize: '1.4rem', fontWeight: 'bold' }}>"100%"</span>
                           </div>
                        </div>

                    </div>
                 </div>

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
              <p className="section-label">02 — SOLUCIONES</p>
              <h2 className="section-title">Cómo puedo ayudarte</h2>
              <p style={{ marginTop: '10px', color: 'var(--text-muted)', maxWidth: '600px' }}>
                Combino ingeniería de software con visión de negocio para entregar resultados técnicos que resuelven problemas reales.
              </p>
            </div>

            <div className="services-grid">
              {SERVICES.map((s, i) => (
                <div key={i} className="service-card">
                  {/* Icono Flotante */}
                  <div className="service-icon-box">
                    {s.icon}
                  </div>
                  
                  {/* Número de fondo sutil */}
                  <div className="service-bg-num">{s.id}</div>

                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-desc">{s.desc}</p>

                  {/* Lista de características estilo terminal */}
                  <ul className="service-features">
                    {s.features.map((feat, j) => (
                      <li key={j}>
                        <span style={{ color: 'var(--accent)', marginRight: '8px', fontWeight: 'bold' }}>&gt;</span>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <button className="service-btn" onClick={() => setActiveSection('contact')}>
                    Solicitar <ArrowRight size={14} />
                  </button>
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

      
      {/* MODAL (POPUP) INTELIGENTE */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ 
              maxWidth: '1200px',      // <--- AUMENTADO (Antes 850px)
              width: '95%',            // Ocupa casi todo el ancho de la pantalla
              maxHeight: '110vh',       // Casi todo el alto
              overflowY: 'auto',       // Scroll solo si es extremaaaamente necesario
              padding: '50px'          // Más aire interno
          }}>
            
            <button className="modal-close" onClick={() => setSelectedProject(null)}>×</button>
            
            <div className="modal-header" style={{ marginBottom: '20px' }}>
              <h2>{selectedProject.title}</h2>
              <div className="project-icon">{selectedProject.icon}</div>
            </div>

            {/* --- AQUÍ ESTÁ LA LÓGICA DE LA DEMO --- */}
            {selectedProject.hasDemo ? (
  <div style={{ margin: '0 -20px 25px -20px' }}>
     {(() => {
        switch(selectedProject.title) {
            case "FinanceHub": return <FinanceHubDemo />;
            case "DataCleaner Bot": return <DataCleanerDemo />;
            case "SQL vs NoSQL": return <SqlNoSqlDemo />; 
            case "Gastro-App": return <GastroAppDemo />;
            case "Automation-Tools": return <AutomationToolsDemo />;
            case "UniVault": return <UniVaultDemo />;
            default: return null;
        }
     })()}
  </div>
) : (
  // Imagen normal...
  <div className="modal-image-container">
    <img src={selectedProject.img} alt={selectedProject.title} className="modal-img" />
  </div>
)}
            
            {/* Descripción y Texto (Igual para todos) */}
            <div className="modal-text">
              <div className="tech-stack" style={{marginBottom: '1rem'}}>
                 {selectedProject.tech.map((t, j) => <span key={j} className="tech-tag">{t}</span>)}
              </div>
              <p className="modal-desc">{selectedProject.longDesc}</p>
            </div>
            
          </div>
        </div>
      )}

      <div className>
        
      {/* --- FOOTER HORIZONTAL (OPTIMIZADO) --- */}
      <footer style={{ 
        marginTop: '80px', 
        padding: '30px 50px', // Espacio a los lados
        width: '100%', 
        display: 'flex', 
        flexDirection: 'row', // Alineación horizontal
        alignItems: 'center', 
        justifyContent: 'space-between', // Separa los elementos a los extremos
        borderTop: '1px solid var(--border-color, rgba(255,255,255,0.1))', // Línea sutil superior
        flexWrap: 'wrap', // Para que se adapte en móviles
        gap: '20px'
      }}>
        
        {/* IZQUIERDA: Copyright */}
        <div style={{ color: '#888', fontSize: '0.9rem', fontWeight: '500' }}>
          <span>© {new Date().getFullYear()} Angel Salguero</span>
        </div>

        {/* DERECHA: Iconos Sociales */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {[
            { icon: Linkedin, link: "https://www.linkedin.com/in/TU-USUARIO" },
            { icon: Github, link: "https://github.com/TU-USUARIO" },
            { icon: Facebook, link: "https://facebook.com/TU-USUARIO" },
            { icon: Instagram, link: "https://instagram.com/TU-USUARIO" },
            { icon: Twitter, link: "https://twitter.com/TU-USUARIO" },
            { icon: Youtube, link: "https://youtube.com/@TU-CANAL" },
            { icon: Mail, link: "mailto:tu-email@ejemplo.com" },
          ].map((item, index) => (
            <a 
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <item.icon size={20} strokeWidth={1.5} />
            </a>
          ))}
        </div>

      </footer>

      </div>
    </div>
  );
}

export default App;