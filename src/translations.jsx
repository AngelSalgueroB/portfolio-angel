import { 
    FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaEnvelope 
} from 'react-icons/fa';

// ICONOS
import { 
  Globe, Terminal, BarChart3, CloudCog, Activity, 
  CreditCard, Bot, Database, Utensils, Wrench, Library,Smartphone, ShoppingCart, Layers, ShieldAlert, BookOpen
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
      { 
      id: "01", 
      title: "Desarrollo Web & SaaS", 
      desc: "Aplicaciones web complejas, CRMs y paneles administrativos a medida.", 
      icon: <Globe size={28} />, 
      features: ["React / Next.js", "Gestión de Bases de Datos", "Sistemas Multi-usuario"] 
    },
    { 
      id: "02", 
      title: "Apps Móviles (iOS/Android)", 
      desc: "Lleva tu negocio al bolsillo del cliente con una sola base de código.", 
      icon: <Smartphone size={28} />, 
      features: ["React Native", "Notificaciones Push", "Modo Offline"] 
    },
    { 
      id: "03", 
      title: "E-commerce & Pagos", 
      desc: "Tiendas virtuales escalables con pasarelas de pago integradas.", 
      icon: <ShoppingCart size={28} />, 
      features: ["Integración Stripe/Niubiz", "Control de Stock", "Carrito de Compras"] 
    },

    // --- INGENIERÍA & PROCESOS (TU DIFERENCIAL) ---
    { 
      id: "04", 
      title: "Automatización (BPA)", 
      desc: "Scripts inteligentes para eliminar tareas manuales repetitivas.", 
      icon: <Terminal size={28} />, 
      features: ["Bots de WhatsApp", "Procesamiento Excel/PDF", "Conexión de APIs"] 
    },
    { 
      id: "05", 
      title: "Arquitectura & Consultoría", 
      desc: "Diseño de sistemas robustos y escalables (Enfoque TOGAF/ISO).", 
      icon: <Layers size={28} />, 
      features: ["Selección de Stack", "Diagramas de Flujo", "Optimización de Costos Cloud"] 
    },
    { 
      id: "06", 
      title: "Inteligencia de Negocios", 
      desc: "Transforma datos brutos en tableros para la toma de decisiones.", 
      icon: <BarChart3 size={28} />, 
      features: ["Dashboards Power BI", "Reportes Automáticos", "Métricas en Tiempo Real"] 
    },

    // --- MANTENIMIENTO & SEGURIDAD ---
    { 
      id: "07", 
      title: "Migración & Modernización", 
      desc: "Actualización de sistemas legados a tecnologías modernas.", 
      icon: <CloudCog size={28} />, 
      features: ["De Excel a Web App", "Migración a Nube", "Refactorización de Código"] 
    },
    { 
      id: "08", 
      title: "Auditoría & Seguridad", 
      desc: "Revisión técnica para blindar y acelerar tus sistemas.", 
      icon: <ShieldAlert size={28} />, 
      features: ["Hacking Ético Básico", "Optimización de Velocidad", "Copias de Seguridad"] 
    }
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
      { 
      id: "01", 
      title: "Web & SaaS Development", 
      desc: "Complex web applications, CRMs, and custom admin panels.", 
      icon: <Globe size={28} />, 
      features: ["React / Next.js", "Database Management", "Multi-user Systems"] 
    },
    { 
      id: "02", 
      title: "Mobile Apps (iOS/Android)", 
      desc: "Bring your business to your client's pocket with a single codebase.", 
      icon: <Smartphone size={28} />, 
      features: ["React Native", "Push Notifications", "Offline Mode"] 
    },
    { 
      id: "03", 
      title: "E-commerce & Payments", 
      desc: "Scalable online stores with integrated payment gateways.", 
      icon: <ShoppingCart size={28} />, 
      features: ["Stripe/Niubiz Integration", "Stock Control", "Shopping Cart"] 
    },

    // --- ENGINEERING & PROCESSES (YOUR EDGE) ---
    { 
      id: "04", 
      title: "Automation (BPA)", 
      desc: "Smart scripts to eliminate repetitive manual tasks.", 
      icon: <Terminal size={28} />, 
      features: ["WhatsApp Bots", "Excel/PDF Processing", "API Connection"] 
    },
    { 
      id: "05", 
      title: "Architecture & Consulting", 
      desc: "Design of robust and scalable systems (TOGAF/ISO approach).", 
      icon: <Layers size={28} />, 
      features: ["Stack Selection", "Flow Diagrams", "Cloud Cost Optimization"] 
    },
    { 
      id: "06", 
      title: "Business Intelligence", 
      desc: "Transform raw data into dashboards for decision-making.", 
      icon: <BarChart3 size={28} />, 
      features: ["Power BI Dashboards", "Automated Reports", "Real-time Metrics"] 
    },

    // --- MAINTENANCE & SECURITY ---
    { 
      id: "07", 
      title: "Migration & Modernization", 
      desc: "Updating legacy systems to modern technologies.", 
      icon: <CloudCog size={28} />, 
      features: ["Excel to Web App", "Cloud Migration", "Code Refactoring"] 
    },
    { 
      id: "08", 
      title: "Audit & Security", 
      desc: "Technical review to shield and accelerate your systems.", 
      icon: <ShieldAlert size={28} />, 
      features: ["Basic Ethical Hacking", "Speed Optimization", "Backups"] 
    }
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