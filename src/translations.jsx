  import React from 'react';
  import { 
      FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaEnvelope 
  } from 'react-icons/fa';

  // ICONOS
  import { 
    Globe, Terminal, BarChart3, CloudCog, Activity, 
    CreditCard, Bot, Database, Utensils, Wrench, Library,Smartphone, ShoppingCart, Layers, ShieldAlert, BookOpen, Palette, Layout, Map, Store
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
        badge: "Disponible para nuevos proyectos",
        title_start: "Ingeniero de",
        title_gradient: "Software",
        title_end: "Full Stack.",
        desc_start: "Especializado en el desarrollo de",
        desc_mid: "aplicaciones web escalables y la automatización de procesos empresariales. Entrego código limpio y",
        desc_end: "soluciones técnicas robustas.",
        btn_primary: "Ver Portafolio",
        btn_secondary: "Contactar",
        tech_stack: "Stack Tecnológico",
        stats: {
          cmd: "salguero-dev --status",
          expLabel: "[OK] Experiencia: ",
          expValue: "3+ años",
          projLabel: "[OK] Proyectos: ",
          projValue: "15+ desplegados",
          clientLabel: "[OK] Core systems: ",
          clientValue: "Operativos"
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
        contact_desc: "Completa el formulario o contáctame por mis redes. ¡Hablemos!",
        contact_phone: "Teléfono de Contacto",
        contact_form_name: "Nombre",
        contact_form_email: "Tu correo",
        contact_form_subject: "Asunto",
        contact_form_message: "Mensaje",
        contact_form_send: "Enviar Mensaje",
        contact_btn: "Envíame un correo →",
        contact_success_title: "¡Mensaje Enviado!",
        contact_success_desc: "Gracias por escribirme. Te responderé lo más pronto posible.",
        contact_success_btn: "Cerrar",
        projects_learn_more: "Ver más +",
        projects_no_desc: "Descripción disponible en la demo.",
      },
      footer: {
        privacy: "Política de Privacidad"
      },
      // --- TEXTOS LEGALES (ESPAÑOL) ---
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
            items: ["Titular: Angel Salguero", "Actividad: Desarrollo de Software", "Contacto: ssdev.code@gmail.com"]
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
          desc: "Construcción de plataformas en la nube, CRMs y paneles de administración de alto rendimiento.", 
          icon: <Globe size={28} />, 
          features: ["React / Next.js", "Arquitectura escalable", "Dashboards interactivos"] 
        },
        { 
          id: "02", 
          title: "Apps Móviles & Geolocalización", 
          desc: "Aplicaciones multiplataforma con capacidades de rastreo GPS y sincronización en tiempo real.", 
          icon: <Smartphone size={28} />, 
          features: ["React Native", "WebSockets / Supabase", "Integración de Mapas"] 
        },
        { 
          id: "03", 
          title: "E-Commerce & Pagos", 
          desc: "Desarrollo de tiendas virtuales seguras con logística, carritos dinámicos y control de inventario.", 
          icon: <ShoppingCart size={28} />, 
          features: ["Pasarelas (Stripe/Niubiz)", "Gestión de Stock", "Flujos de Checkout"] 
        },
        { 
          id: "04", 
          title: "Automatización de Datos (RPA)", 
          desc: "Scripts avanzados y pipelines para eliminar trabajo manual, procesar datos masivos y conectar sistemas.", 
          icon: <Terminal size={28} />, 
          features: ["Python / Node.js", "Procesamiento Excel/CSV", "Conexión de APIs REST"] 
        },
        { 
          id: "05", 
          title: "Arquitectura Cloud & Backend", 
          desc: "Diseño e implementación de bases de datos relacionales y servicios sin servidor (Serverless).", 
          icon: <Database size={28} />, 
          features: ["PostgreSQL / SQL", "Firebase / Supabase", "Modelado de Datos"] 
        },
        { 
          id: "06", 
          title: "Modernización de Sistemas", 
          desc: "Migración de procesos operativos obsoletos (ej. macros en Excel) a aplicaciones web centralizadas.", 
          icon: <Layers size={28} />, 
          features: ["Refactorización de código", "Migración a la nube", "Digitalización"] 
        }
      ],
      projects: [
        { title: "FinanceHub", desc: "Billetera virtual con autenticación segura.", longDesc: "Aplicación completa de finanzas con gráficos interactivos, metas de ahorro y autenticación segura con Supabase.", tech: ["Supabase", "React", "JS"], icon: <CreditCard size={40} />, hasDemo: true },
        { title: "DataCleaner Bot", desc: "Pipeline de automatización de datos.", longDesc: "Bot en Python que procesa Excels masivos, limpia inconsistencias y prepara datos para Power BI.", tech: ["Python", "Pandas", "ETL"], icon: <Bot size={40} />, hasDemo: true },
        { title: "SQL vs NoSQL", desc: "Benchmark de rendimiento.", longDesc: "Estudio comparativo de tiempos de respuesta entre PostgreSQL y MongoDB con millones de registros.", tech: ["PostgreSQL", "Mongo", "DB"], icon: <Database size={40} />, hasDemo: true },
        { title: "Gastro-App", desc: "Plataforma de reservas.", longDesc: "Sistema de gestión de mesas y reservas en tiempo real para restaurantes.", tech: ["Nuxt 3", "Vue.js", "Prisma"], icon: <Utensils size={40} />, hasDemo: true },
        { title: "Automation-Tools", desc: "Scripts de utilidad.", longDesc: "Colección de scripts para automatizar tareas repetitivas en Windows y Linux.", tech: ["Node.js", "TypeScript"], icon: <Wrench size={40} />, hasDemo: true },
        { title: "UniVault", desc: "Repositorio académico.", longDesc: "Plataforma para organizar material universitario con búsqueda indexada.", tech: ["React", "AWS S3"], icon: <Library size={40} />, hasDemo: true },
        { 
        title: "Tailwind Showcase", 
        desc: "Interfaz moderna construida con Tailwind CSS.", 
        longDesc: "Demostración de maquetación utilitaria, diseño 100% responsivo y personalización del tema utilizando Tailwind CSS.", 
        tech: ["Tailwind CSS", "HTML5"], 
        icon: <Palette size={40} />, 
        hasDemo: true, 
        externalUrl: "https://tailwind.salguero-dev.com/" 
      },
      { 
        title: "Bootstrap UI", 
        desc: "Componentes y sistema de grillas clásico.", 
        longDesc: "Implementación sólida de interfaces utilizando el sistema de grillas y los componentes pre-estilizados de Bootstrap.", 
        tech: ["Bootstrap", "JS"], 
        icon: <Layout size={40} />, 
        hasDemo: true, 
        externalUrl: "https://bootstrap.salguero-dev.com/" 
      },
      { 
          title: "MotoTracker App", 
          desc: "Aplicación móvil tipo Uber para mototaxis.", 
          longDesc: "Plataforma móvil con interfaces separadas para pasajeros y conductores. Cuenta con rastreo GPS en tiempo real, gestión de rutas, cálculo de precios y panel administrador de flotas conectado a un backend robusto con Supabase.", 
          tech: ["React Native", "Supabase", "Maps API"], 
          icon: <Map size={40} />, 
          hasDemo: true 
        },
        { 
          title: "Retail E-Commerce", 
          desc: "Tienda virtual escalable multicategoría.", 
          longDesc: "Plataforma e-commerce completa al estilo retail (Saga/Ripley). Incluye carrito de compras dinámico, pasarela de pagos segura, control de inventario y panel logístico de despachos.", 
          tech: ["Next.js", "Stripe", "PostgreSQL"], 
          icon: <Store size={40} />, 
          hasDemo: true 
        },

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
        badge: "Available for new projects",
        title_start: "Full Stack",
        title_gradient: "Software",
        title_end: "Engineer.",
        desc_start: "Systems Engineer specialized in building",
        desc_mid: "scalable web applications and automating business workflows. I deliver clean code and",
        desc_end: "robust technical solutions.",
        btn_primary: "View Portfolio",
        btn_secondary: "Get in Touch",
        tech_stack: "Tech Stack",
        stats: {
          cmd: "salguero-dev --status",
          expLabel: "[OK] Experience: ",
          expValue: "3+ years",
          projLabel: "[OK] Projects: ",
          projValue: "15+ deployed",
          clientLabel: "[OK] Core systems: ",
          clientValue: "Operational"
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
        contact_desc: "Fill out the form or reach out through my social media. Let's talk!",
        contact_phone: "Contact Phone",
        contact_form_name: "Name",
        contact_form_email: "Your email",
        contact_form_subject: "Subject",
        contact_form_message: "Message",
        contact_form_send: "Send Message",
        contact_btn: "Send me an email →",
        contact_success_title: "Message Sent!",
        contact_success_desc: "Thanks for reaching out. I'll get back to you as soon as possible.",
        contact_success_btn: "Close",
        projects_learn_more: "Learn more +",
        projects_no_desc: "Description available via demo.",
      },
      footer: {
        privacy: "Privacy Policy"
      },
      // --- TEXTOS LEGALES (INGLÉS) ---
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
            items: ["Owner: Angel Salguero", "Activity: Software Development", "Contact: ssdev.code@gmail.com"]
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
          desc: "Building high-performance cloud platforms, custom CRMs, and administrative dashboards.", 
          icon: <Globe size={28} />, 
          features: ["React / Next.js", "Scalable Architecture", "Interactive Dashboards"] 
        },
        { 
          id: "02", 
          title: "Mobile Apps & Geolocation", 
          desc: "Cross-platform applications with live GPS tracking and real-time data synchronization.", 
          icon: <Smartphone size={28} />, 
          features: ["React Native", "WebSockets / Supabase", "Maps Integration"] 
        },
        { 
          id: "03", 
          title: "E-Commerce & Payments", 
          desc: "Development of secure virtual stores with integrated logistics, dynamic carts, and inventory control.", 
          icon: <ShoppingCart size={28} />, 
          features: ["Payment Gateways (Stripe)", "Stock Management", "Checkout Flows"] 
        },
        { 
          id: "04", 
          title: "Data Automation (RPA)", 
          desc: "Advanced scripts and pipelines to eliminate manual work, process massive datasets, and connect systems.", 
          icon: <Terminal size={28} />, 
          features: ["Python / Node.js", "Excel/CSV Processing", "REST API Integration"] 
        },
        { 
          id: "05", 
          title: "Cloud Architecture & Backend", 
          desc: "Design and implementation of relational databases and Serverless backend services.", 
          icon: <Database size={28} />, 
          features: ["PostgreSQL / SQL", "Firebase / Supabase", "Data Modeling"] 
        },
        { 
          id: "06", 
          title: "System Modernization", 
          desc: "Migration of legacy operational processes (e.g., Excel macros) into centralized, modern web applications.", 
          icon: <Layers size={28} />, 
          features: ["Code Refactoring", "Cloud Migration", "Digital Transformation"] 
        }
      ],
      projects: [
        { title: "FinanceHub", desc: "Virtual wallet with secure authentication.", longDesc: "Full finance app with interactive charts, savings goals, and secure authentication via Supabase.", tech: ["Supabase", "React", "JS"], icon: <CreditCard size={40} />, hasDemo: true },
        { title: "DataCleaner Bot", desc: "Data automation pipeline.", longDesc: "Python bot that processes massive Excel files, cleans inconsistencies, and prepares data for Power BI.", tech: ["Python", "Pandas", "ETL"], icon: <Bot size={40} />, hasDemo: true },
        { title: "SQL vs NoSQL", desc: "Database performance benchmark.", longDesc: "Comparative study of response times between PostgreSQL and MongoDB dealing with millions of records.", tech: ["PostgreSQL", "Mongo", "DB"], icon: <Database size={40} />, hasDemo: true },
        { title: "Gastro-App", desc: "Restaurant reservation platform.", longDesc: "Real-time table management and reservation system for restaurants.", tech: ["Nuxt 3", "Vue.js", "Prisma"], icon: <Utensils size={40} />, hasDemo: true },
        { title: "Automation-Tools", desc: "Utility scripts for automation.", longDesc: "Collection of scripts to automate repetitive tasks on Windows and Linux.", tech: ["Node.js", "TypeScript"], icon: <Wrench size={40} />, hasDemo: true },
        { title: "UniVault", desc: "Centralized academic repository.", longDesc: "Platform to organize university material with indexed search.", tech: ["React", "AWS S3"], icon: <Library size={40} />, hasDemo: true },
        { 
        title: "Tailwind Showcase", 
        desc: "Modern interface built with Tailwind CSS.", 
        longDesc: "Demonstration of utility-first styling, 100% responsive design, and theme customization using Tailwind CSS.", 
        tech: ["Tailwind CSS", "HTML5"], 
        icon: <Palette size={40} />, 
        hasDemo: true, 
        externalUrl: "https://tailwind.salguero-dev.com/" 
      },
      { 
        title: "Bootstrap UI", 
        desc: "Classic grid system and components.", 
        longDesc: "Solid interface implementation using Bootstrap's 12-column grid system and pre-styled UI components.", 
        tech: ["Bootstrap", "JS"], 
        icon: <Layout size={40} />, 
        hasDemo: true, 
        externalUrl: "https://bootstrap.salguero-dev.com/" 
      },
      { 
          title: "MotoTracker App", 
          desc: "Uber-like mobile application for mototaxis.", 
          longDesc: "Mobile platform with separate interfaces for passengers and drivers. Features real-time GPS tracking, route management, price calculation, and a fleet admin dashboard powered by Supabase.", 
          tech: ["React Native", "Supabase", "Maps API"], 
          icon: <Map size={40} />, 
          hasDemo: true 
        },
        { 
          title: "Retail E-Commerce", 
          desc: "Scalable multi-category virtual store.", 
          longDesc: "Full e-commerce platform retail style. Includes a dynamic shopping cart, secure payment gateway, inventory control, and a logistics dashboard for order fulfillment.", 
          tech: ["Next.js", "Stripe", "PostgreSQL"], 
          icon: <Store size={40} />, 
          hasDemo: true 
        },
      ]
    }
  };