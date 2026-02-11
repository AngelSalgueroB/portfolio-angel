import { 
    FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaEnvelope 
} from 'react-icons/fa';

// ICONOS
import { 
  Globe, Terminal, BarChart3, CloudCog, Activity, 
  CreditCard, Bot, Database, Utensils, Wrench, Library 
} from 'lucide-react';

export const translations = {
  es: {
    nav: {
      home: "Inicio", 
      projects: "Proyectos",
      services: "Servicios",
      contact: "Contacto"
    },
    hero: {
      badge: "Disponible para proyectos",
      title_start: "Resuelvo problemas complejos",
      title_gradient: "con soluciones",
      title_end: "digitales.",
      desc_start: "Ingeniero de Sistemas enfocado en el desarrollo",
      desc_mid: "y la optimización de procesos. Transformo requerimientos en aplicaciones web automatizadas con una interfaz",
      desc_end: "limpia y funcional.",
      btn_primary: "Ver Portafolio",
      btn_secondary: "Contactar",
      tech_stack: "Tecnologías que domino",
      stats: {
        exp: "// Años Experiencia",
        projects: "// Proyectos Reales",
        clients: "// Clientes Satisfechos"
      }
    },
    section_titles: {
      projects_label: "01 — PROYECTOS",
      projects_title: "Trabajo seleccionado",
      projects_subtitle: "Haz clic en una tarjeta para ver detalles.",
      services_label: "02 — SOLUCIONES",
      services_title: "Cómo puedo ayudarte",
      services_desc: "Combino ingeniería de sistemas con visión de negocio para entregar resultados técnicos que resuelven problemas reales.",
      contact_label: "03 — CONTACTO",
      contact_title: "¿Tienes un proyecto?",
      contact_desc: "Estoy listo para nuevos desafíos freelance. Envíame un correo o conecta en redes.",
      contact_btn: "Envíame un correo →"
    },
    footer: {
      privacy: "Política de Privacidad"
    },
    // --- NUEVO: TEXTOS LEGALES (ESPAÑOL) ---
    privacy: {
      header: {
        label: "LEGAL",
        title: "Política de Privacidad",
        subtitle: "Transparencia total sobre tus datos"
      },
      sections: {
        responsible: {
          title: "1. Responsable del Tratamiento",
          text: "El responsable de los datos recogidos en este sitio web es:",
          items: ["Titular: Angel Salguero", "Actividad: Desarrollo de Software", "Contacto: lafprintsource@gmail.com"]
        },
        data: {
          title: "2. Qué datos recopilo y para qué",
          intro: "Dependiendo de cómo interactúes con la web, trato los siguientes datos:",
          cards: [
            { title: "A. Datos Técnicos", content: "IP, navegador y dispositivo. Se usan por seguridad y prevención de ataques." },
            { title: "B. Datos de Contacto", content: "Nombre y email si decides escribirme. Se usan solo para responderte." },
            { title: "C. Uso de Demos", content: "Datos que introduzcas en las apps de demostración (FinanceHub, etc)." }
          ]
        },
        third_parties: {
          title: "3. Compartición con Terceros",
          text: "No vendo tus datos. Utilizo proveedores de infraestructura tecnológica estrictamente necesarios:",
          items: [
            "Vercel Inc. (Hosting & Logs)",
            "Supabase (Base de Datos para Demos)"
          ],
          note: "*Transferencia internacional segura bajo estándares cloud."
        },
        rights: {
          title: "4. Tus Derechos",
          intro: "Tienes el control total sobre tu información:",
          list: [
            { label: "Acceso", desc: "¿Qué sé de ti?" },
            { label: "Rectificación", desc: "Corregir errores" },
            { label: "Supresión", desc: "Borrar todo" },
            { label: "Limitación", desc: "Pausar uso" },
            { label: "Portabilidad", desc: "Exportar datos" },
            { label: "Oposición", desc: "Negarte al uso" }
          ]
        },
        cookies: {
          title: "5. Cookies y Seguridad",
          text: "NO utilizo cookies de rastreo. Solo almacenamiento local técnico (LocalStorage) para tu preferencia de tema. Todo el tráfico viaja cifrado por HTTPS."
        },
        retention: {
          title: "6. Conservación",
          text: "Los datos se conservan solo el tiempo necesario para atender tu solicitud o mientras dure la relación profesional."
        }
      },
      footer_text: "Versión 1.0 — Enero 2026"
    },
    services: [
      { id: "01", title: "Desarrollo Full Stack", desc: "Arquitectura y construcción de aplicaciones web a medida.", icon: <Globe size={28} />, features: ["React / Next.js", "APIs REST & GraphQL", "Paneles Administrativos"] },
      { id: "02", title: "Automatización & Scripts", desc: "Bots y scripts que trabajan por ti 24/7.", icon: <Terminal size={28} />, features: ["Web Scraping", "Procesamiento Excel", "Bots Telegram/WhatsApp"] },
      { id: "03", title: "Ingeniería de Datos", desc: "Dashboards interactivos para toma de decisiones.", icon: <BarChart3 size={28} />, features: ["ETL Pipelines", "Limpieza de Datos", "Power BI / Looker"] },
      { id: "04", title: "Infraestructura Cloud", desc: "Despliegue y optimización de servidores.", icon: <CloudCog size={28} />, features: ["AWS / Vercel", "CI/CD Pipelines", "Docker"] },
      { id: "05", title: "Auditoría de Rendimiento", desc: "Diagnóstico profundo de sistemas.", icon: <Activity size={28} />, features: ["SQL vs NoSQL", "Optimización Consultas", "Stress Testing"] }
    ],
    projects: [
      { title: "FinanceHub", desc: "Billetera virtual con autenticación segura.", longDesc: "Aplicación completa de finanzas con gráficos interactivos, metas de ahorro y autenticación segura con Supabase.", tech: ["Supabase", "React", "JS"], icon: <CreditCard size={40} />, hasDemo: true },
      { title: "DataCleaner Bot", desc: "Pipeline de automatización de datos.", longDesc: "Bot en Python que procesa Excels masivos, limpia inconsistencias y prepara datos para Power BI.", tech: ["Python", "Pandas", "ETL"], icon: <Bot size={40} />, hasDemo: true },
      { title: "SQL vs NoSQL", desc: "Benchmark de rendimiento.", longDesc: "Estudio comparativo de tiempos de respuesta entre PostgreSQL y MongoDB con millones de registros.", tech: ["PostgreSQL", "Mongo", "DB"], icon: <Database size={40} />, hasDemo: true },
      { title: "Gastro-App", desc: "Plataforma de reservas.", longDesc: "Sistema de gestión de mesas y reservas en tiempo real para restaurantes.", tech: ["Nuxt 3", "Vue.js", "Prisma"], icon: <Utensils size={40} />, hasDemo: true },
      { title: "Automation-Tools", desc: "Scripts de utilidad.", longDesc: "Colección de scripts para automatizar tareas repetitivas en Windows y Linux.", tech: ["Node.js", "TypeScript"], icon: <Wrench size={40} />, hasDemo: true },
      { title: "UniVault", desc: "Repositorio académico.", longDesc: "Plataforma para organizar material universitario con búsqueda indexada.", tech: ["React", "AWS S3"], icon: <Library size={40} />, hasDemo: true },
      { title: "Proyecto X", desc: "Descripción breve del proyecto X.", longDesc: "Descripción larga y detallada del proyecto X, sus funcionalidades y tecnologías usadas.", tech: ["Tecnología1", "Tecnología2"], icon: <Globe size={40} />, hasDemo: false },
    ]
  },
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      services: "Services",
      contact: "Contact"
    },
    hero: {
      badge: "Available for projects",
      title_start: "I solve complex",
      title_gradient: "problems with",
      title_end: "digital solutions.",
      desc_start: "Systems Engineer focused on",
      desc_mid: "development and process optimization. I transform requirements into automated web apps with a",
      desc_end: "clean and functional UI.",
      btn_primary: "View Portfolio",
      btn_secondary: "Get in Touch",
      tech_stack: "Technologies I Master",
      stats: {
        exp: "// Years Experience",
        projects: "// Real Projects",
        clients: "// Happy Clients"
      }
    },
    section_titles: {
      projects_label: "01 — PROJECTS",
      projects_title: "Selected Work",
      projects_subtitle: "Click on a card to see details.",
      services_label: "02 — SOLUTIONS",
      services_title: "How I can help",
      services_desc: "I combine system engineering with business vision to deliver technical results that solve real-world problems.",
      contact_label: "03 — CONTACT",
      contact_title: "Have a project?",
      contact_desc: "I'm ready for new freelance challenges. Send me an email or connect on social media.",
      contact_btn: "Send me an email →"
    },
    footer: {
      privacy: "Privacy Policy"
    },
    // --- NUEVO: TEXTOS LEGALES (INGLÉS) ---
    privacy: {
      header: {
        label: "LEGAL",
        title: "Privacy Policy",
        subtitle: "Total transparency about your data"
      },
      sections: {
        responsible: {
          title: "1. Data Controller",
          text: "The party responsible for data collected on this website is:",
          items: ["Owner: Angel Salguero", "Activity: Software Development", "Contact: tu-email@example.com"]
        },
        data: {
          title: "2. Data Collected & Purpose",
          intro: "Depending on how you interact with the site, I process:",
          cards: [
            { title: "A. Technical Data", content: "IP address, browser, and device info. Used for security and DDoS prevention." },
            { title: "B. Contact Data", content: "Name and email if you choose to write to me. Used only to reply to you." },
            { title: "C. Demo Usage", content: "Data you enter into demo apps (FinanceHub, etc) for functionality." }
          ]
        },
        third_parties: {
          title: "3. Third Parties",
          text: "I do not sell your data. I use strictly necessary infrastructure providers:",
          items: [
            "Vercel Inc. (Hosting & Logs)",
            "Supabase (Database for Demos)"
          ],
          note: "*Secure international transfer under standard cloud protocols."
        },
        rights: {
          title: "4. Your Rights",
          intro: "You have full control over your information:",
          list: [
            { label: "Access", desc: "What do I know?" },
            { label: "Rectification", desc: "Fix errors" },
            { label: "Erasure", desc: "Delete everything" },
            { label: "Restriction", desc: "Pause usage" },
            { label: "Portability", desc: "Export data" },
            { label: "Objection", desc: "Refuse usage" }
          ]
        },
        cookies: {
          title: "5. Cookies & Security",
          text: "I do NOT use tracking cookies. Only technical LocalStorage for your theme preference. All traffic is encrypted via HTTPS."
        },
        retention: {
          title: "6. Data Retention",
          text: "Data is kept only as long as necessary to fulfill your request or as long as the professional relationship lasts."
        }
      },
      footer_text: "Version 1.0 — January 2026"
    },
    services: [
      { id: "01", title: "Full Stack Development", desc: "Architecture and build of custom web applications.", icon: <Globe size={28} />, features: ["React / Next.js", "REST & GraphQL APIs", "Admin Panels"] },
      { id: "02", title: "Automation & Scripts", desc: "Bots and scripts that work for you 24/7.", icon: <Terminal size={28} />, features: ["Web Scraping", "Excel Processing", "Telegram/WhatsApp Bots"] },
      { id: "03", title: "Data Engineering", desc: "Interactive dashboards for decision making.", icon: <BarChart3 size={28} />, features: ["ETL Pipelines", "Data Cleaning", "Power BI / Looker"] },
      { id: "04", title: "Cloud Infrastructure", desc: "Server deployment and optimization.", icon: <CloudCog size={28} />, features: ["AWS / Vercel", "CI/CD Pipelines", "Docker"] },
      { id: "05", title: "Performance Audit", desc: "Deep system diagnostics.", icon: <Activity size={28} />, features: ["SQL vs NoSQL", "Query Optimization", "Stress Testing"] }
    ],
    projects: [
      { title: "FinanceHub", desc: "Virtual wallet with secure authentication.", longDesc: "Full finance app with interactive charts, savings goals, and secure authentication via Supabase.", tech: ["Supabase", "React", "JS"], icon: <CreditCard size={40} />, hasDemo: true },
      { title: "DataCleaner Bot", desc: "Data automation pipeline.", longDesc: "Python bot that processes massive Excel files, cleans inconsistencies, and prepares data for Power BI.", tech: ["Python", "Pandas", "ETL"], icon: <Bot size={40} />, hasDemo: true },
      { title: "SQL vs NoSQL", desc: "Database performance benchmark.", longDesc: "Comparative study of response times between PostgreSQL and MongoDB dealing with millions of records.", tech: ["PostgreSQL", "Mongo", "DB"], icon: <Database size={40} />, hasDemo: true },
      { title: "Gastro-App", desc: "Restaurant reservation platform.", longDesc: "Real-time table management and reservation system for restaurants.", tech: ["Nuxt 3", "Vue.js", "Prisma"], icon: <Utensils size={40} />, hasDemo: true },
      { title: "Automation-Tools", desc: "Utility scripts for automation.", longDesc: "Collection of scripts to automate repetitive tasks on Windows and Linux.", tech: ["Node.js", "TypeScript"], icon: <Wrench size={40} />, hasDemo: true },
      { title: "UniVault", desc: "Centralized academic repository.", longDesc: "Platform to organize university material with indexed search.", tech: ["React", "AWS S3"], icon: <Library size={40} />, hasDemo: true },
      { title: "Project X", desc: "Brief description of Project X.", longDesc: "Detailed long description of Project X, its features, and technologies used.", tech: ["Technology1", "Technology2"], icon: <Globe size={40} />, hasDemo: false },
    ]
  }
};