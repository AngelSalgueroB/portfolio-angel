import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase' 
import { 
  ArrowRight, ArrowLeft, Save, Sun, Moon, Plus, Download, List,
  Home, Send, Star, Lock, Mail, LogOut, Webhook, PenTool,
  TrendingDown, CreditCard, PackageX, Mountain, BarChart3, FileSpreadsheet, 
  Megaphone, Globe, AlertTriangle, Target, ShieldCheck, CheckCircle, XCircle,
  Database, Cloud, Code, Wrench, Smartphone, Lightbulb, Clock, Trash2, Edit2, Check, X, Copy, Terminal, CodeXml
} from 'lucide-react'
import { jsPDF } from "jspdf"
import autoTable from 'jspdf-autotable'
import Groq from "groq-sdk" 
import './FreelanceOS.css'

export default function FreelanceOS() {
  // --- 1. ESTADOS DE SESIÓN ---
  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // --- 2. ESTADOS APP & UI ---
  const [view, setView] = useState('wizard') 
  const [historyData, setHistoryData] = useState([])
  const [step, setStep] = useState(1) 
  const [loading, setLoading] = useState(false)
  const [theme, setTheme] = useState('light')
  const [notification, setNotification] = useState(null)

  // --- 3. ESTADOS CHAT IA ---
  const [messages, setMessages] = useState([]) 
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // --- 4. ESTADOS FORMULARIO ---
  const [modalOpen, setModalOpen] = useState(null)
  const [customText, setCustomText] = useState('')
  const [currency, setCurrency] = useState('PEN') 
  const today = new Date().toISOString().split('T')[0]

  // --- 5. ESTADOS DE IDEAS ---
  const [ideaModal, setIdeaModal] = useState(false)
  const [ideaText, setIdeaText] = useState('')
  const [ideasList, setIdeasList] = useState([])
  const [showIdeaHistory, setShowIdeaHistory] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null) // Para borrar Ideas

  // --- 6. ESTADO BORRADO PROYECTOS (NUEVO) ---
  const [deleteProjectTarget, setDeleteProjectTarget] = useState(null) // Para borrar Proyectos

  const [data, setData] = useState({
    fecha: today,
    fechaInicio: today,
    cliente: '', empresa: '', cargo: '', ruc: '',
    emailContacto: '', telefono: '', direccion: '',
    objetivo: '', 
    problemas: [], tecnologias: [], entregables: [],
    soporte: 'Ninguno', extras: [],
    plazo: '', presupuesto: '', descripcionProblema: ''
  })

  const LOGOS_OSCUROS = ['Next.js', 'GitHub',  'Power', 'OpenAI', 'Vercel'];

  // --- DATOS: CATEGORÍAS ---
  const TECH_CATEGORIES = {
    "Frontend & UI": {
      icon: <Smartphone size={20} />,
      items: [
        { label: 'React / Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', desc: 'Interfaces web rápidas y modernas.' },
        { label: 'Vue / Nuxt.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', desc: 'Framework progresivo y versátil.' },
        { label: 'WordPress', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg', desc: 'Gestión de contenidos fácil.' },
        { label: 'Shopify', logo: 'https://cdn.worldvectorlogo.com/logos/shopify.svg', desc: 'E-commerce todo en uno.' }
      ]
    },
    "Backend & APIs": {
      icon: <Code size={20} />,
      items: [
        { label: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', desc: 'Servidores escalables en tiempo real.' },
        { label: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', desc: 'Procesamiento de datos e IA.' },
        { label: 'PHP / Laravel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', desc: 'Sistemas robustos y estables.' },
        { label: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', desc: 'Seguridad corporativa.' }
      ]
    },
    "Base de Datos": {
      icon: <Database size={20} />,
      items: [
        { label: 'Supabase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', desc: 'PostgreSQL con tiempo real.' },
        { label: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', desc: 'Base de datos NoSQL rápida.' },
        { label: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', desc: 'Documentos flexibles y escalables.' }
      ]
    },
    "Infraestructura": {
      icon: <Cloud size={20} />,
      items: [
        { label: 'AWS', logo: 'https://cdn.worldvectorlogo.com/logos/aws-2.svg', desc: 'Nube líder mundial.' },
        { label: 'Vercel', logo: 'https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png', desc: 'Despliegue frontend instantáneo.' },
        { label: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', desc: 'Contenedores portátiles.' }
      ]
    },
    "Integraciones": {
      icon: <Webhook size={20} />,
      items: [
        { label: 'Pasarela Pagos', type: 'Payment', desc: 'Stripe, PayPal, Niubiz.' },
        { label: 'OpenAI API', logo: 'https://cdn.worldvectorlogo.com/logos/openai-2.svg', desc: 'Inteligencia Artificial.' },
        { label: 'Google Maps', type: 'Map', desc: 'Geolocalización y rutas.' }
      ]
    },
    "Herramientas": {
      icon: <Wrench size={20} />,
      items: [
        { label: 'Power BI', logo: 'https://cdn.worldvectorlogo.com/logos/power-bi-1.svg', desc: 'Análisis de datos.' },
        { label: 'Git / GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', desc: 'Control de versiones.' }
      ]
    }
  };

  const ALL_BASE_LABELS = Object.values(TECH_CATEGORIES).flatMap(cat => cat.items.map(i => i.label));
  const PROBLEMAS_BASE = [
    { label: 'Fallos Pedidos/Pagos', icon: <CreditCard size={32} color="#ef4444" strokeWidth={1.5} /> },
    { label: 'Pérdida de Ventas', icon: <TrendingDown size={32} color="#ef4444" strokeWidth={1.5} /> },
    { label: 'Inventario Caótico', icon: <PackageX size={32} color="#f97316" strokeWidth={1.5} /> },
    { label: 'Dificultad p/ Escalar', icon: <Mountain size={32} color="#8b5cf6" strokeWidth={1.5} /> },
    { label: 'Sin Datos/Análisis', icon: <BarChart3 size={32} color="#3b82f6" strokeWidth={1.5} /> },
    { label: 'Caos con Excel', icon: <FileSpreadsheet size={32} color="#10b981" strokeWidth={1.5} /> },
    { label: 'Mala Comunicación', icon: <Megaphone size={32} color="#eab308" strokeWidth={1.5} /> },
    { label: 'Sin Presencia Web', icon: <Globe size={32} color="#6366f1" strokeWidth={1.5} /> }
  ]
  const OBJETIVOS_NEGOCIO = [ 'Automatizar Procesos (Ahorro)', 'Aumentar Ventas', 'Mejorar Imagen/Marca', 'Cumplimiento Legal/Normativo', 'Centralizar Información' ]
  const ENTREGABLES_BASE = [ 'Código Fuente', 'Manual Usuario', 'Capacitación', 'Despliegue', 'Garantía 30 días' ]
  const EXTRAS_CALIDAD = [ 'Backups Automáticos', 'Seguridad SSL/WAF', 'Analytics Dashboard', 'Documentación Técnica' ]

  // --- EFECTOS ---
  useEffect(() => {
    // 1. Verificación inicial al cargar la página
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      // Si el usuario ya estaba logueado, mándalo directo al Wizard
      if (session) setView('wizard') 
    })

    // 2. Escuchar cambios en tiempo real (Login / Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      
      if (event === 'SIGNED_IN') {
        // ¡AQUÍ ESTÁ LA SOLUCIÓN! Al entrar, fuerza la vista Wizard
        setView('wizard') 
      }
      
      if (event === 'SIGNED_OUT') {
        // Al salir, fuerza la vista Login (y limpia datos por si acaso)
        setView('login')
        setHistoryData([]) 
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);
  
  // Mensaje inicial del chat
  useEffect(() => { 
    if (messages.length === 0) setMessages([{ role: 'assistant', content: "Hola ingeniero. Soy tu copiloto IA. Pregúntame sobre stack, costos o estrategia." }]) 
  }, [])

  // Auto-scroll chat
  useEffect(() => { 
    const timeoutId = setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 100);
    return () => clearTimeout(timeoutId); 
  }, [messages, isTyping]);

  // Carga de ideas
  useEffect(() => {
    if (ideaModal && showIdeaHistory) {
      cargarIdeas()
    }
  }, [ideaModal, showIdeaHistory])


  // --- FUNCIONES CORE ---
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const goHome = () => { setStep(1); setView('wizard'); }

  const handleLogin = async (e) => {
    e.preventDefault()
    setAuthLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setNotification({ type: 'error', msg: error.message })
    setAuthLoading(false)
  }
  const handleLogout = async () => {
    // 1. Cerrar en Supabase
    await supabase.auth.signOut();
    
    // 2. Limpiar estados locales
    setSession(null);
    setHistoryData([]); // Limpiamos el historial visualmente para que no quede "basura"
    
    // 3. ¡LO MÁS IMPORTANTE! Forzar el cambio de pantalla a Login
    setView('login'); 
  };

  // --- FUNCIÓN CHAT IA (V4: HÍBRIDA) ---
  const handleChatSubmit = async (manualPrompt = null) => {
    // 1. Detectar origen
    const isManualTrigger = typeof manualPrompt === 'string';
    const textToSend = isManualTrigger ? manualPrompt : chatInput;
    
    if (!textToSend.trim()) return;

    // 2. Agregar mensaje usuario
    const userMsg = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    
    if (!isManualTrigger) setChatInput(''); 
    setIsTyping(true);

    try {
      const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY, dangerouslyAllowBrowser: true });
      
      const projectContext = `
        PROYECTO ACTUAL:
        - Cliente: ${data.cliente || 'N/A'} (${data.empresa || 'N/A'})
        - Objetivo: ${data.objetivo}
        - Stack: ${data.tecnologias.join(', ')}
        - Plazo: ${data.plazo}
        - Presupuesto: ${data.presupuesto}
      `;

      let systemPrompt = "";

      if (isManualTrigger) {
         // MODO REPORTE (BOTONES)
         let specificInstruction = "";
         if (step === 2) specificInstruction = "Valida el Stack Tecnológico. Sé crítico.";
         if (step === 3) specificInstruction = "Analiza Plazo vs Presupuesto. Advierte riesgos.";
         if (step === 4) specificInstruction = `Genera ESPECIFICACIONES TÉCNICAS y CRONOGRAMA DETALLADO. Usa el plazo "${data.plazo}". Desglosa por fases/meses/semanas exactas.`;

         systemPrompt = `
           ACTÚA COMO: CTO Senior generando un DOCUMENTO FORMAL.
           CONTEXTO: ${projectContext}
           TAREA: ${specificInstruction}
           FORMATO: Markdown técnico, extenso, detallado, usa negritas y listas. NO saludes. Ve directo al contenido.
         `;
      } else {
         // MODO CONVERSACIÓN (CHAT)
         systemPrompt = `
           ACTÚA COMO: Un asistente CTO amigable y experto llamado "Copiloto".
           CONTEXTO DEL USUARIO: ${projectContext}
           OBJETIVO: Responder la duda del usuario de forma breve y útil.
           - Si te saludan, saluda corto.
           - Si preguntan algo técnico, responde basándote en el Stack.
           - No generes reportes largos a menos que te lo pidan.
         `;
      }

      const completion = await groq.chat.completions.create({ 
        messages: [ { role: 'system', content: systemPrompt }, ...messages, userMsg ], 
        model: "llama-3.3-70b-versatile", 
        temperature: isManualTrigger ? 0.5 : 0.7, 
        max_tokens: isManualTrigger ? 8000 : 1024 
      });

      const aiResponse = completion.choices[0]?.message?.content || "Error IA.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);

    } catch (error) { 
      setMessages(prev => [...prev, { role: 'assistant', content: "Error de conexión." }]);
    } finally { 
      setIsTyping(false);
    }
  }

  // --- HISTORIAL & PROYECTOS ---
  const handleHistoryToggle = () => {
    if (view === 'wizard') {
      cargarHistorial(); 
    } else {
      setView('wizard');
    }
  }

  const cargarHistorial = async () => {
    setLoading(true)
    const { data: records, error } = await supabase
      .from('reuniones')
      .select('*, clientes(*)')
      .order('created_at', { ascending: false }) 
    
    if (!error) setHistoryData(records || [])
    setLoading(false)
    setView('history') 
  }

  // MODAL BORRAR PROYECTO (LÓGICA)
  const solicitarBorradoProyecto = (id) => { setDeleteProjectTarget(id) }
  
  const confirmarBorradoProyecto = async () => {
    if (!deleteProjectTarget) return
    setLoading(true)
    const { error } = await supabase.from('reuniones').delete().eq('id', deleteProjectTarget)
    if (error) {
      setNotification({ type: 'error', msg: 'Error al eliminar proyecto.' })
    } else {
      setHistoryData(prev => prev.filter(i => i.id !== deleteProjectTarget))
      setNotification({ type: 'success', msg: 'Proyecto eliminado.' })
    }
    setLoading(false)
    setDeleteProjectTarget(null)
  }

  const guardarProyecto = async () => {
    if (!data.cliente) { setNotification({ type: 'error', msg: "⚠️ Por favor ingresa el nombre del cliente." }); return }
    setLoading(true)
    const notas = `MONEDA:${currency}\nOBJETIVO:${data.objetivo}\nSOPORTE:${data.soporte}\nEXTRAS:${data.extras}\nRUC:${data.ruc}\nEMAIL:${data.emailContacto}\nTEL:${data.telefono}\nDIR:${data.direccion}\nPROBLEMAS:${data.problemas}\nSTACK:${data.tecnologias}\nPLAZO:${data.plazo}\nDESC:${data.descripcionProblema}`
    const { data: cl, error: e1 } = await supabase.from('clientes').insert([{ nombre_contacto: data.cliente, empresa: data.empresa, notas }]).select()
    if (e1) { setNotification({ type: 'error', msg: "Error al guardar cliente: " + e1.message }); setLoading(false); return }
    await supabase.from('reuniones').insert([{ cliente_id: cl[0].id, presupuesto_estimado: parseFloat(data.presupuesto)||0 }])
    setLoading(false)
    setNotification({ type: 'success', msg: "✅ Proyecto guardado exitosamente." })
    setStep(1)
    setData({...data, cliente:'', empresa:'', ruc:'', emailContacto:'', telefono:'', direccion:'', objetivo:'', soporte:'Ninguno', extras:[], problemas:[], tecnologias:[], descripcionProblema:''})
  }

  // --- GESTIÓN DE IDEAS ---
  const guardarIdea = async () => {
    if (!ideaText.trim()) return
    setLoading(true)
    const { error } = await supabase.from('ideas').insert([{ content: ideaText }])
    if (error) { setNotification({ type: 'error', msg: 'Error al guardar idea' }) } 
    else {
      setNotification({ type: 'success', msg: 'Idea guardada.' })
      setIdeaText('')
      if (showIdeaHistory) cargarIdeas()
    }
    setLoading(false)
  }
  
  const solicitarBorrado = (id) => { setDeleteTarget(id) }
  const confirmarBorrado = async () => {
    if (!deleteTarget) return
    const { error } = await supabase.from('ideas').delete().eq('id', deleteTarget)
    if (!error) { 
        setNotification({ type: 'success', msg: 'Idea eliminada.' }); 
        cargarIdeas(); 
    }
    setDeleteTarget(null)
  }

  const empezarEdicion = (idea) => { setEditingId(idea.id); setEditText(idea.content) }
  const guardarEdicion = async (id) => {
    const { error } = await supabase.from('ideas').update({ content: editText }).eq('id', id)
    if (!error) { 
        setNotification({ type: 'success', msg: 'Idea actualizada.' }); 
        setEditingId(null); 
        cargarIdeas(); 
    }
  }

  const cargarIdeas = async () => {
    const { data, error } = await supabase.from('ideas').select('*').order('created_at', { ascending: false })
    if (data) setIdeasList(data)
  }

  // --- PARSEO Y RECUPERACIÓN ---
  const parseNotas = (notasStr) => {
    if (!notasStr) return {};
    const result = { problemas: [], tecnologias: [], entregables: [], extras: [] };
    notasStr.split('\n').forEach(line => {
      const [key, ...rest] = line.split(':');
      const val = rest.join(':').trim();
      if (!val) return;
      if (key === 'MONEDA') result.currency = val;
      else if (key === 'OBJETIVO') result.objetivo = val;
      else if (key === 'SOPORTE') result.soporte = val;
      else if (key === 'RUC') result.ruc = val;
      else if (key === 'EMAIL') result.emailContacto = val;
      else if (key === 'TEL') result.telefono = val;
      else if (key === 'DIR') result.direccion = val;
      else if (key === 'PLAZO') result.plazo = val;
      else if (key === 'DESC') result.descripcionProblema = val;
      else if (key === 'EXTRAS') result.extras = val.split(',').filter(x=>x);
      else if (key === 'PROBLEMAS') result.problemas = val.split(',').filter(x=>x);
      else if (key === 'STACK') result.tecnologias = val.split(',').filter(x=>x);
    });
    return result;
  }

  const cargarClienteParaEditar = (item) => {
    const infoRecuperada = parseNotas(item.clientes?.notas || '');
    if (infoRecuperada.currency) setCurrency(infoRecuperada.currency);
    setData({
      ...data,
      cliente: item.clientes?.nombre_contacto || '',
      empresa: item.clientes?.empresa || '',
      presupuesto: item.presupuesto_estimado?.toString() || '',
      fecha: new Date(item.created_at).toISOString().split('T')[0],
      fechaInicio: today,
      ...infoRecuperada
    });
    setStep(1); setView('wizard');
    setNotification({ type: 'success', msg: `Datos de ${item.clientes?.nombre_contacto} cargados.` });
  }

  // --- UTILS ---
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
     
  }

  const getDataUrl = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous'; 
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => resolve(null);
    });
  }

  const toggleSel = (field, value) => {
    setData(prev => {
      const list = prev[field] || [];
      if (list.includes(value)) return { ...prev, [field]: list.filter(item => item !== value) };
      else return { ...prev, [field]: [...list, value] };
    });
  };

  const openModal = (field) => { setModalOpen(field); setCustomText(''); };
  const saveCustom = () => {
    if (!customText.trim()) return;
    setData(prev => ({ ...prev, [modalOpen]: [...prev[modalOpen], customText] }));
    setModalOpen(null);
  };

  // --- FUNCIÓN PDF ---
  const descargarPDFHistorial = (item) => {
    const infoRecuperada = parseNotas(item.clientes?.notas || '');
    const datosParaPDF = {
      cliente: item.clientes?.nombre_contacto || '',
      empresa: item.clientes?.empresa || '',
      presupuesto: item.presupuesto_estimado || 0,
      fecha: new Date(item.created_at).toLocaleDateString(),
      fechaInicio: new Date(item.created_at).toISOString().split('T')[0],
      ...infoRecuperada
    };
    generarPDF(datosParaPDF); 
  }

  const generarPDF = async (source = null) => {
    setLoading(true);
    try {
      const doc = new jsPDF();
      const finalData = source || data;
      const symbol = (source?.currency || currency) === 'USD' ? '$' : 'S/.';
      
      const techIconsMap = {
        'React / Next.js': 'https://img.icons8.com/color/480/react-native.png',
        'React': 'https://img.icons8.com/color/480/react-native.png',
        'Vue / Nuxt.js': 'https://img.icons8.com/color/480/vue-js.png',
        'Node.js': 'https://img.icons8.com/color/480/nodejs.png',
        'Python': 'https://img.icons8.com/color/480/python.png',
        'PHP / Laravel': 'https://img.icons8.com/fluency/480/laravel.png',
        'Java': 'https://img.icons8.com/color/480/java-coffee-cup-logo.png',
        'Supabase': 'https://img.icons8.com/color/480/database.png',
        'Firebase': 'https://img.icons8.com/color/480/firebase.png',
        'MongoDB': 'https://img.icons8.com/color/480/mongodb.png',
        'AWS': 'https://img.icons8.com/color/480/amazon-web-services.png',
        'Vercel': 'https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png',
        'Docker': 'https://img.icons8.com/color/480/docker.png',
        'Pasarela Pagos': 'https://img.icons8.com/color/480/bank-cards.png', 
        'OpenAI API': 'https://img.icons8.com/fluency/480/chatgpt.png',
        'Google Maps': 'https://img.icons8.com/color/480/google-maps.png',
        'Power BI': 'https://img.icons8.com/color/480/power-bi.png',
        'Git / GitHub': 'https://img.icons8.com/fluency/480/github.png',
        'WordPress': 'https://img.icons8.com/color/480/wordpress.png',
        'Shopify': 'https://img.icons8.com/color/480/shopify.png'
      };

      const C_BG = [255, 255, 255];       
      const C_ACCENT = [225, 29, 72]; 
      const C_TEXT = [25, 25, 25];        
      const C_GRAY = [80, 80, 80];     
      const C_DARK_HEADER = [20, 20, 25]; 

      // PÁGINA 1
      doc.setFillColor(...C_BG); doc.rect(0, 0, 210, 297, 'F');
      doc.setFillColor(...C_ACCENT); doc.rect(0, 0, 8, 297, 'F'); 
      doc.setFillColor(20, 20, 20); doc.roundedRect(30, 20, 20, 20, 3, 3, 'F');
      doc.setTextColor(255, 255, 255); doc.setFont("courier", "bold"); doc.setFontSize(22); doc.text("as_", 40, 32, { align: 'center' });
      
      doc.setFont("helvetica", "bold"); doc.setFontSize(50); doc.setTextColor(...C_TEXT);
      doc.text("PROPUESTA", 30, 100); doc.setTextColor(...C_ACCENT); doc.text("TÉCNICA", 30, 118);
      doc.setTextColor(...C_GRAY); doc.setFontSize(16); doc.setFont("helvetica", "normal");
      doc.text("SOLUCIONES DIGITALES & CONSULTORÍA IA", 30, 135);

      let infoY = 210;
      doc.setDrawColor(200, 200, 200); doc.line(30, infoY, 180, infoY); infoY += 15;
      doc.setFontSize(10); doc.setTextColor(150,150,150); doc.setFont("helvetica", "bold");
      doc.text("PREPARADO EXCLUSIVAMENTE PARA:", 30, infoY); infoY += 10;
      doc.setFontSize(22); doc.setTextColor(...C_TEXT); doc.setFont("times", "bold");
      doc.text(finalData.empresa || finalData.cliente || "Cliente Confidencial", 30, infoY);
      infoY += 8;
      doc.setFontSize(11); doc.setFont("helvetica", "normal");
      if(finalData.ruc) {
          infoY += 8; doc.setFont("helvetica", "bold"); doc.setTextColor(60,60,60); doc.text("RUC:", 30, infoY);
          doc.setFont("helvetica", "normal"); doc.setTextColor(0,0,0); doc.text(finalData.ruc, 60, infoY);
      }
      infoY += 15;
      doc.setFont("helvetica", "bold"); doc.setTextColor(...C_ACCENT); doc.text("Emisión:", 30, infoY);
      doc.setTextColor(0,0,0); doc.setFont("helvetica", "normal");
      doc.text(new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }), 55, infoY);

      // PÁGINA 2
      doc.addPage();
      let y = 40; 
      doc.setFontSize(14); doc.setFont("helvetica", "bold"); doc.setTextColor(...C_ACCENT);
      doc.text("1. OBJETIVO ESTRATÉGICO", 20, y); y += 10;
      doc.setFontSize(11); doc.setTextColor(...C_TEXT); doc.setFont("helvetica", "normal");
      doc.text(doc.splitTextToSize(finalData.objetivo || "No definido", 170), 20, y);
      y += 20;

      doc.setFontSize(14); doc.setFont("helvetica", "bold"); doc.setTextColor(...C_ACCENT);
      doc.text("2. DIAGNÓSTICO INICIAL", 20, y); y += 5;
      const problemasData = finalData.problemas.map(p => [p]);
      autoTable(doc, {
          startY: y, head: [['Puntos de Dolor Detectados']], body: problemasData, theme: 'grid',
          headStyles: { fillColor: [40, 40, 40], textColor: 255 },
          styles: { fontSize: 10, cellPadding: 5 }, margin: { left: 20, right: 20 }
      });
      y = doc.lastAutoTable.finalY + 25;

      doc.setFontSize(14); doc.setFont("helvetica", "bold"); doc.setTextColor(...C_ACCENT);
      doc.text("3. ARQUITECTURA TECNOLÓGICA", 20, y); y += 15;
      let xIcon = 25;
      for (const techName of finalData.tecnologias) {
          const iconUrl = techIconsMap[techName] || null;
          let imageLoaded = false;
          doc.setDrawColor(220, 220, 220); doc.setFillColor(255, 255, 255);
          doc.roundedRect(xIcon, y, 26, 26, 3, 3, 'FD');
          if (iconUrl) {
              const imgData = await getDataUrl(iconUrl);
              if (imgData) { doc.addImage(imgData, 'PNG', xIcon + 4, y + 4, 18, 18); imageLoaded = true; }
          }
          if (!imageLoaded) {
              doc.setFontSize(14); doc.setTextColor(200, 200, 200); doc.text(techName.charAt(0), xIcon + 13, y + 17, { align: 'center' });
          }
          doc.setFontSize(7); doc.setTextColor(60, 60, 60); doc.setFont("helvetica", "bold");
          let cleanName = techName.split('/')[0].trim(); if(cleanName.length > 12) cleanName = cleanName.substring(0,11) + '.';
          doc.text(cleanName, xIcon + 13, y + 33, { align: 'center' });
          xIcon += 35; if (xIcon > 180) { xIcon = 25; y += 45; }
      }
      if (xIcon !== 25) y += 50; else y += 10;

      // ESPECIFICACIONES
      if (y > 230) { doc.addPage(); y = 40; }
      doc.setFontSize(14); doc.setFont("helvetica", "bold"); doc.setTextColor(...C_ACCENT);
      doc.text("4. ESPECIFICACIONES TÉCNICAS", 20, y); y += 15;
      doc.setFont("helvetica", "normal"); doc.setTextColor(...C_TEXT); doc.setFontSize(11); 
      const rawText = finalData.descripcionProblema || "Especificaciones según estándares.";
      const lines = rawText.split('\n');
      lines.forEach(line => {
          if (y > 270) { doc.addPage(); y = 40; }
          line = line.trim(); if (!line) return;
          if (line.includes(':') && line.length < 60) { 
              y+=5; doc.setFont("helvetica", "bold"); doc.setTextColor(0, 0, 0); 
              doc.text(line, 20, y); y += 7; doc.setFont("helvetica", "normal"); doc.setTextColor(...C_TEXT);
          } else {
              doc.text(line, 20, y, { maxWidth: 170, align: "justify", lineHeightFactor: 1.5 });
              const dim = doc.getTextDimensions(line, { maxWidth: 170 }); y += dim.h + 5; 
          }
      });

      // PÁGINA 3
      doc.addPage(); y = 40;
      doc.setFontSize(14); doc.setFont("helvetica", "bold"); doc.setTextColor(...C_ACCENT);
      doc.text("5. CRONOGRAMA DE EJECUCIÓN", 20, y);

      const plazoStr = finalData.plazo || "1 Mes";
      let totalUnits = 4; let unitType = 'week'; 
      if (plazoStr.toLowerCase().includes('mes')) { totalUnits = parseInt(plazoStr) || 1; unitType = 'month'; }
      else { totalUnits = (parseInt(plazoStr) || 2); unitType = 'week'; }
      if(totalUnits < 2) totalUnits = 2;

      const startDate = new Date(finalData.fechaInicio || new Date());
      const headers = [];
      const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
      for (let i = 0; i < totalUnits; i++) {
          const d = new Date(startDate);
          if (unitType === 'month') { d.setMonth(d.getMonth() + i); headers.push(`${monthNames[d.getMonth()]} ${d.getFullYear().toString().substr(2)}`); }
          else { d.setDate(d.getDate() + (i * 7)); headers.push(`Sem ${i+1}`); }
      }

      let gridY = 60; const gridWidth = 170; const colWidth = gridWidth / totalUnits; const rowHeight = 15;
      doc.setFillColor(240, 240, 240); doc.rect(20, gridY, gridWidth, 8, 'F');
      doc.setFontSize(8); doc.setTextColor(80,80,80);
      headers.forEach((h, i) => {
          const hX = 20 + (i * colWidth);
          doc.text(h, hX + (colWidth/2), gridY + 5, { align: 'center' });
          doc.setDrawColor(220, 220, 220); doc.line(hX, gridY, hX, gridY + 8 + (4 * rowHeight));
      });
      gridY += 8;

      let p1, p2, p3, p4; 
      if (totalUnits >= 8) { p1=1; p2=4; p3=2; p4=1; } else if (totalUnits >= 4) { p1=1; p2=totalUnits-3; p3=1; p4=1; } else { p1=0.5; p2=totalUnits-1.5; p3=0.5; p4=0.5; }
      const getTimeLabel = (dur) => { if(unitType === 'month') return dur <= 1 ? "1 Mes" : `${dur} Meses`; return dur <= 1 ? "1 Sem" : `${dur} Sem`; }
      
      const phases = [
          { label: "1. Diseño & Proto", start: 0, dur: p1, c: [79, 70, 229], tc: [255,255,255] },
          { label: "2. Desarrollo", start: p1, dur: p2, c: [225, 29, 72], tc: [255,255,255] },
          { label: "3. QA & Testing", start: p1+p2, dur: p3, c: [16, 185, 129], tc: [255,255,255] },
          { label: "4. Despliegue", start: p1+p2+p3, dur: Math.max(0.5, totalUnits - (p1+p2+p3)), c: [245, 158, 11], tc: [0,0,0] }
      ];

      phases.forEach((ph, i) => {
          if(i%2===0) doc.setFillColor(255,255,255); else doc.setFillColor(252,252,252);
          doc.rect(20, gridY, gridWidth, rowHeight, 'F');
          doc.setFontSize(9); doc.setTextColor(0,0,0); doc.setFont("helvetica", "bold");
          doc.text(ph.label, 22, gridY + 6);
          const barX = 20 + (ph.start * colWidth); const barW = ph.dur * colWidth;
          if (barW > 0) {
              doc.setFillColor(...ph.c); doc.roundedRect(barX, gridY + 8, barW, 5, 1, 1, 'F');
              doc.setTextColor(...ph.tc); doc.setFontSize(7);
              const lbl = getTimeLabel(ph.dur); const tw = doc.getTextWidth(lbl);
              if(barW > tw + 2) doc.text(lbl, barX + (barW/2) - (tw/2), gridY + 11.5);
              else { doc.setTextColor(0,0,0); doc.text(lbl, barX + barW + 2, gridY + 11.5); }
          }
          gridY += rowHeight;
      });
      doc.setDrawColor(150, 150, 150); doc.rect(20, 60, gridWidth, gridY - 60, 'S');

      const precioFmt = parseFloat(finalData.presupuesto || 0).toLocaleString('es-PE', { minimumFractionDigits: 2 });
      autoTable(doc, {
          startY: gridY + 20, head: [['Concepto', 'Detalle', 'Inversión']],
          body: [['Servicios Profesionales', 'Diseño, Desarrollo y Despliegue', `${symbol} ${precioFmt}`], ['Infraestructura', 'Configuración Servidores', 'Incluido']],
          foot: [['', 'TOTAL + IGV', `${symbol} ${precioFmt}`]], theme: 'grid',
          headStyles: { fillColor: [30, 30, 30] }, footStyles: { fillColor: C_ACCENT, fontSize: 12, halign: 'right' }, columnStyles: { 2: { halign: 'right' } }
      });

      // PÁGINA 4
      doc.addPage(); y = 40;
      doc.setFontSize(14); doc.setFont("helvetica", "bold"); doc.setTextColor(...C_ACCENT);
      doc.text("TÉRMINOS, CONDICIONES Y EXCLUSIÓN DE RESPONSABILIDAD", 20, y); 
      y += 15;
      
      doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(20, 20, 20); // Letra un poco más chica para que entre todo
      
      const clausulas = [
          { 
            titulo: "1. PROPIEDAD INTELECTUAL Y TRANSFERENCIA", 
            texto: "La titularidad del código fuente y los activos digitales se transfiere al CLIENTE únicamente tras el pago total (100%) del proyecto. El DESARROLLADOR conserva el derecho a reutilizar librerías, scripts y fragmentos de código genérico de su autoría (Background IP) en otros proyectos." 
          },
          { 
            titulo: "2. FORMA DE PAGO Y SUSPENSIÓN", 
            texto: "50% Adelanto al inicio, 50% Contra-entrega. El incumplimiento de los pagos en las fechas acordadas faculta al DESARROLLADOR a suspender el desarrollo, retener el código o dar de baja el servicio temporalmente hasta la regularización." 
          },
          { 
            titulo: "3. ALCANCE, CAMBIOS Y ADICIONALES", 
            texto: "El presupuesto cubre estrictamente lo descrito en este documento. Cualquier funcionalidad no listada explícitamente se considera 'fuera de alcance' y será cotizada como un costo adicional. Los cambios estructurales una vez aprobado el diseño tendrán un recargo." 
          },
          { 
            titulo: "4. PLAZOS Y DEPENDENCIAS DEL CLIENTE", 
            texto: "El plazo de entrega inicia cuando el CLIENTE entrega todo el material necesario (textos, logos, accesos). Retrasos en la entrega de insumos o feedback por parte del CLIENTE desplazarán la fecha final de entrega automáticamente." 
          },
          { 
            titulo: "5. COSTOS DE TERCEROS (HOSTING/APIS/DOMINIOS)", 
            texto: "Los costos recurrentes de infraestructura (Hosting, Dominios, Bases de Datos, Licencias de Software, APIs pagas como Google Maps/OpenAI) son responsabilidad exclusiva del CLIENTE. El DESARROLLADOR no asume pagos de servicios de terceros." 
          },
          { 
            titulo: "6. PUBLICACIÓN EN TIENDAS (MÓVILES)", 
            texto: "El CLIENTE abonará directamente a Google ($25) y Apple ($99/año) las tarifas de desarrollador. La App se publicará en la cuenta del CLIENTE. El DESARROLLADOR no garantiza la aprobación de la App si esta viola las políticas de contenido de las tiendas (ej: apuestas, contenido adulto)." 
          },
          { 
            titulo: "7. LIMITACIÓN DE RESPONSABILIDAD (IMPORTANTE)", 
            texto: "El DESARROLLADOR no será responsable por daños indirectos, lucro cesante, pérdida de datos o interrupción del negocio derivados del uso del software. La responsabilidad máxima del DESARROLLADOR se limita al monto total pagado por el CLIENTE en este proyecto." 
          },
          { 
            titulo: "8. RESPONSABILIDAD SOBRE CONTENIDOS (INDEMNIDAD)", 
            texto: "El CLIENTE declara ser dueño o tener licencia de todos los textos, imágenes y marcas que entrega para el proyecto. El CLIENTE mantendrá indemne al DESARROLLADOR ante cualquier reclamo de terceros por violación de derechos de autor sobre el material proporcionado." 
          },
          { 
            titulo: "9. GARANTÍA TÉCNICA Y MANTENIMIENTO", 
            texto: "Se incluye garantía de 30 días post-entrega para errores de código (bugs). Esta garantía NO CUBRE: fallos causados por actualizaciones de terceros (ej: cambio en API de Facebook), mal uso del sistema por el cliente, o intervenciones de otros programadores." 
          },
          { 
            titulo: "10. RELACIÓN INDEPENDIENTE", 
            texto: "El DESARROLLADOR actúa como contratista independiente y no como empleado. Este contrato no crea una relación de exclusividad; el DESARROLLADOR es libre de prestar servicios a otros clientes simultáneamente." 
          }
      ];

      // LÓGICA DE RENDERIZADO (Ajustada para que no se salga de la hoja)
      clausulas.forEach(item => {
        // Verificar si nos quedamos sin espacio en la hoja (aprox 270mm es el fin)
        if (y > 270) {
            doc.addPage();
            y = 20; // Margen superior nueva página
        }

        doc.setFont("helvetica", "bold");
        doc.text(item.titulo, 20, y);
        y += 5;
        
        doc.setFont("helvetica", "normal");
        // splitTextToSize corta el texto si es muy largo para que no se salga del margen derecho
        const splitText = doc.splitTextToSize(item.texto, 170); 
        doc.text(splitText, 20, y);
        
        // Calculamos cuánto espacio ocupó el texto para mover Y
        y += (splitText.length * 4) + 6; 
      });

      y += 15;
      if (y > 240) { doc.addPage(); y = 60; }
      const firmaY = y;
      doc.setDrawColor(100, 100, 100); doc.setLineWidth(0.5);
      doc.line(30, firmaY, 90, firmaY);
      doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.setTextColor(0,0,0);

      
      doc.text("CONFORME CLIENTE", 60, firmaY + 5, { align: 'center' });
      doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(100,100,100);
      doc.text(finalData.cliente || "Firma Autorizada", 60, firmaY + 10, { align: 'center' });
      if(finalData.ruc) doc.text(`RUC: ${finalData.ruc}`, 60, firmaY + 15, { align: 'center' });

      doc.line(120, firmaY, 180, firmaY);
      doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.setTextColor(0,0,0);
      doc.text("ANGEL SALGUERO", 150, firmaY + 5, { align: 'center' });
      doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(100,100,100);
      doc.text("Systems Developer", 150, firmaY + 10, { align: 'center' });

      // HEADERS & FOOTERS
      const pageCount = doc.internal.getNumberOfPages();
      for(let i = 2; i <= pageCount; i++) { 
          doc.setPage(i);
          doc.setFillColor(...C_DARK_HEADER); doc.rect(0, 0, 210, 18, 'F');
          doc.setFont("courier", "bold"); doc.setFontSize(14);
          doc.setTextColor(255, 255, 255); doc.text("as", 10, 12);
          doc.setTextColor(...C_ACCENT); doc.text("</>", 17, 12); 
          doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(200, 200, 200);
          doc.text("SISTEMA DE GESTIÓN & PROPUESTAS", 200, 12, { align: 'right' });

          const h = doc.internal.pageSize.height;
          doc.setFillColor(245, 245, 245); doc.rect(0, h - 15, 210, 15, 'F');
          doc.setFontSize(8); doc.setTextColor(100, 100, 100);
          doc.text(`Propuesta Confidencial - ${finalData.empresa || 'Cliente'}`, 20, h - 6);
          doc.text(`Página ${i} de ${pageCount}`, 200, h - 6, { align: 'right' });
      }

      doc.save(`Contrato_${finalData.empresa || 'Proyecto'}.pdf`);
    } catch (error) {
      console.error("Error PDF:", error);
      setNotification({ type: 'error', msg: 'Error al generar PDF' });
    } finally {
      setLoading(false);
    }
  }

  const renderSteps = () => (
    <div className="fade-in">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
        <h2 className="os-title">{step===1 && "1. Estrategia"} {step===2 && "2. Tecnologías"} {step===3 && "3. Negocio"} {step===4 && "4. Calidad"} {step===5 && "5. Resumen"}</h2>
        <span style={{fontSize:'0.85rem', color:'#888', background:'var(--card-bg)', padding:'5px 10px', borderRadius:'6px', border:'1px solid var(--border-color)'}}>Paso {step}/5</span>
      </div>

      {step === 1 && <>
        <p className="os-subtitle">Definición estratégica del cliente.</p>
        <div className="form-row"><input className="os-input" placeholder="Empresa" value={data.empresa} onChange={e=>setData({...data, empresa:e.target.value})}/><input className="os-input" placeholder="RUC / Tax ID" value={data.ruc} onChange={e=>setData({...data, ruc:e.target.value})}/></div>
        <div className="form-row"><input className="os-input" placeholder="Nombre Cliente" value={data.cliente} onChange={e=>setData({...data, cliente:e.target.value})}/><input className="os-input" placeholder="Cargo" value={data.cargo} onChange={e=>setData({...data, cargo:e.target.value})}/></div>
        <div className="form-row"><input className="os-input" placeholder="Email Contacto" value={data.emailContacto} onChange={e=>setData({...data, emailContacto:e.target.value})}/><input className="os-input" placeholder="Teléfono" value={data.telefono} onChange={e=>setData({...data, telefono:e.target.value})}/></div>
        <p style={{marginTop:'15px', fontWeight:'bold', fontSize:'0.9rem'}}>¿Cuál es el objetivo PRINCIPAL?</p>
        <div style={{display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'20px'}}>
            {OBJETIVOS_NEGOCIO.map(obj => (<button key={obj} onClick={()=>setData({...data, objetivo: obj})} style={{padding:'8px 12px', borderRadius:'20px', border:'1px solid var(--border-color)', background: data.objetivo===obj?'var(--accent-color)':'var(--input-bg)', color:data.objetivo===obj?'white':'var(--text-color)', cursor:'pointer', fontSize:'0.85rem'}}>{obj}</button>))}
        </div>
        <h3 style={{fontSize:'1rem', margin:'20px 0 15px'}}>Problemas (Pain Points)</h3>
        <div className="os-grid">
          {[...PROBLEMAS_BASE, ...data.problemas.filter(x => !PROBLEMAS_BASE.find(y => y.label===x))].map((p,i) => {
            const isBase = typeof p === 'object'; const label = isBase ? p.label : p; const renderIcon = isBase ? p.icon : <AlertTriangle size={32} color="#888"/>
            return <div key={i} className={`os-card ${data.problemas.includes(label)?'selected':''}`} onClick={()=>toggleSel('problemas', label)}><div style={{marginBottom:'10px', display:'flex', justifyContent:'center'}}>{renderIcon}</div><div style={{fontSize:'0.85rem', fontWeight: '500'}}>{label}</div></div>
          })}
          <div className="os-card" style={{borderStyle:'dashed', opacity:0.6}} onClick={()=>openModal('problemas')}><Plus size={32}/><div style={{marginTop:'5px', fontSize:'0.8rem'}}>Otro...</div></div>
        </div>
      </>}

      {step === 2 && <>
        <p className="os-subtitle">Arquitectura y Stack Tecnológico.</p>
        <button onClick={() => handleChatSubmit("Recomienda stack tecnológico para este objetivo y problemas.")} style={{marginBottom: '20px', padding: '12px 20px', background: 'linear-gradient(45deg, #4f46e5, #9333ea)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', fontSize: '0.9rem', boxShadow: '0 4px 15px rgba(79, 70, 229, 0.3)'}}><Star size={18} fill="white" /> Consultar al CTO (IA)</button>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px', alignItems: 'start' }}>
            {Object.entries(TECH_CATEGORIES).map(([catName, catData]) => (
               <div key={catName} style={{ background: 'var(--input-bg)', borderRadius: '12px', padding: '15px', border: '1px solid var(--border-color)', marginBottom: '10px' }}>
                  <h3 style={{fontSize:'1rem', color:'var(--accent-color)', borderBottom:'1px solid var(--border-color)', paddingBottom:'8px', marginBottom:'15px', display:'flex', alignItems:'center', gap:'8px', marginTop: 0}}>
                      {catData.icon} {catName}
                  </h3>
                  <div className="os-grid" style={{ marginBottom: 0 }}>
                      {catData.items.map((t, i) => {
                          const icon = t.type === 'Integration' ? <Webhook size={32} color="#1f15da"/> : 
                                       (t.type === 'Payment' ? <CreditCard size={32}/> : 
                                       (t.logo ? <img src={t.logo} alt={t.label} style={{ width: '32px', height: '32px', objectFit: 'contain', filter: (theme === 'dark' && LOGOS_OSCUROS.some(l => t.label.includes(l))) ? 'brightness(0) invert(1)' : 'none' }} /> : <div style={{fontSize:'1.8rem', marginBottom:'5px'}}>🚀</div>));
                          return (
                            <div key={i} className={`os-card ${data.tecnologias.includes(t.label) ? 'selected' : ''}`} onClick={() => toggleSel('tecnologias', t.label)}>
                              <div className="tech-tooltip">{t.desc}</div>
                              {icon} <div style={{fontSize:'0.8rem', marginTop: '5px'}}>{t.label}</div>
                            </div>
                          )
                      })}
                  </div>
               </div>
            ))}
        </div>
        {data.tecnologias.filter(x => !ALL_BASE_LABELS.includes(x)).length > 0 && (
           <div style={{marginTop: '20px', padding: '15px', border: '1px dashed var(--border-color)', borderRadius: '12px'}}>
              <h3 style={{fontSize:'2em', color:'var(--text-color)', marginBottom:'10px'}}>Personalizados</h3>
              <div className="os-grid" style={{marginBottom:0}}>
                 {data.tecnologias.filter(x => !ALL_BASE_LABELS.includes(x)).map((custom, i) => (
                    <div key={i} className="os-card selected" onClick={()=>toggleSel('tecnologias', custom)}>
                       <div style={{fontSize:'1.8rem', marginBottom:'5px'}}>✨</div>
                       <div style={{fontSize:'0.85rem'}}>{custom}</div>
                    </div>
                 ))}
              </div>
           </div>
        )}
        <button className="btn-ghost" style={{width:'100%', marginTop:'20px', borderStyle:'dashed'}} onClick={()=>openModal('tecnologias')}><Plus size={16}/> Agregar tecnología manual</button>
      </>}

      {step === 3 && <>
        <p className="os-subtitle">Alcance y Recurrencia.</p>
        <div style={{marginBottom: '15px'}}>
            <label style={{display:'block', fontSize:'0.9rem', fontWeight:'bold', marginBottom:'5px', color:'var(--text-color)'}}>📅 Fecha de Inicio:</label>
            <input type="date" className="os-input" style={{width: '100%'}} value={data.fechaInicio || today} onChange={e => setData({...data, fechaInicio: e.target.value})} />
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'20px'}}>
            {['Urgente (2 sem)', '1 Mes', '3 Meses', '6 Meses', '8 Meses'].map(p => (
                <button key={p} onClick={()=>setData({...data, plazo:p})} style={{padding:'12px', borderRadius:'8px', border:'1px solid var(--border-color)', background:data.plazo===p?'var(--accent-color)':'var(--input-bg)', color:data.plazo===p?'white':'var(--text-color)', fontSize:'0.9rem', cursor:'pointer'}}>{p}</button>
            ))}
        </div>
        <div style={{background:'var(--input-bg)', padding:'15px', borderRadius:'8px', border:'1px solid var(--border-color)', marginBottom:'20px'}}>
            <p style={{margin:'0 0 10px 0', fontWeight:'bold', fontSize:'0.9rem'}}>Soporte & Mantenimiento (Mensual):</p>
            <div style={{display:'flex', gap:'10px'}}>
                {['Ninguno', 'Básico (Monitorización)', 'Premium (Soporte 24/7)', 'Enterprise (SLA)'].map(s => (
                    <button key={s} onClick={()=>setData({...data, soporte: s})} style={{flex:1, padding:'8px', borderRadius:'6px', border:'1px solid var(--border-color)', background: data.soporte===s?'#10b981':'white', color:data.soporte===s?'white':'black', cursor:'pointer', fontSize:'0.8rem'}}>{s}</button>
                ))}
            </div>
        </div>
        <div className="os-grid">
            {[...ENTREGABLES_BASE, ...data.entregables.filter(x => !ENTREGABLES_BASE.includes(x))].map((e,i) => (
                <div key={i} className={`os-card ${data.entregables.includes(e)?'selected':''}`} style={{minHeight:'60px'}} onClick={()=>toggleSel('entregables', e)}>{e}</div>
            ))}
            <div className="os-card" style={{borderStyle:'dashed', opacity:0.6, minHeight:'60px'}} onClick={()=>openModal('entregables')}><Plus size={24}/><div style={{fontSize:'0.8rem'}}>Otro...</div></div>
        </div>
        <div style={{display:'flex', gap:'10px'}}>
            <input type="number" className="os-input" placeholder="Inversión Proyecto (Sin IGV)" value={data.presupuesto} onChange={e=>setData({...data, presupuesto:e.target.value})}/>
            <div className="currency-toggle">
                <button onClick={()=>setCurrency('PEN')} style={{background:currency==='PEN'?'var(--accent-color)':'transparent', color:currency==='PEN'?'white':'#888'}}>S/.</button>
                <button onClick={()=>setCurrency('USD')} style={{background:currency==='USD'?'var(--accent-color)':'transparent', color:currency==='USD'?'white':'#888'}}>$</button>
            </div>
        </div>
      </>}

      {step === 4 && <>
        <p className="os-subtitle">Calidad y Especificaciones.</p>
        <div style={{marginBottom:'20px'}}>
            <p style={{fontWeight:'bold', fontSize:'0.9rem', marginBottom:'10px'}}>Estándares de Calidad (No Funcionales):</p>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>{EXTRAS_CALIDAD.map(ex => (<div key={ex} onClick={()=>toggleSel('extras', ex)} style={{padding:'10px', borderRadius:'6px', border:'1px solid var(--border-color)', background: data.extras.includes(ex)?'#e0e7ff':'var(--card-bg)', cursor:'pointer', display:'flex', alignItems:'center', gap:'10px', fontSize:'0.9rem'}}>{data.extras.includes(ex) ? <ShieldCheck size={18} color="var(--accent-color)"/> : <Target size={18} color="#aaa"/>}{ex}</div>))}</div>
        </div>
        <button onClick={() => handleChatSubmit("Genera especificaciones técnicas formales.")} style={{marginBottom: '15px', padding: '10px 15px', background: 'var(--card-bg)', color: 'var(--text-color)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem'}}><PenTool size={16} /> Redactar con IA</button>
        <div style={{background:'var(--card-bg)', padding:'20px', borderRadius:'10px', border:'1px solid var(--border-color)'}}><textarea className="os-textarea" placeholder="Detalles específicos..." value={data.descripcionProblema} onChange={e=>setData({...data, descripcionProblema:e.target.value})}/></div>
      </>}

      {step === 5 && <div style={{background:'var(--card-bg)', padding:'30px', borderRadius:'12px', border:'1px solid var(--border-color)', boxShadow:'0 4px 20px rgba(0,0,0,0.05)'}}>
        <h3 style={{color:'var(--accent-color)', marginTop:0}}>{data.empresa}</h3><p><strong>Objetivo:</strong> {data.objetivo || 'No definido'}</p><p><strong>Stack:</strong> {data.tecnologias.join(', ')}</p><p><strong>Soporte:</strong> {data.soporte}</p><p style={{fontSize:'1.2rem'}}><strong>Inversión:</strong> {currency==='USD'?'$':'S/.'} {data.presupuesto} + IGV</p>
        <button onClick={() => generarPDF()} style={{marginTop:'25px', width:'100%', padding:'15px', background:'var(--text-color)', color:'var(--bg-color)', border:'none', borderRadius:'8px', cursor:'pointer', display:'flex', justifyContent:'center', gap:'10px', fontWeight:'bold'}}><Download size={20}/> Descargar PDF</button>
      </div>}
    </div>
  )
    
  // --- RENDERING: LOGIN (DISEÑO "SALGUERO DEV TECH") ---
  if (!session || view === 'login') {
    return (
      <div className="os-login-container" style={{
        display:'flex', 
        justifyContent:'center', 
        alignItems:'center', 
        height:'100vh', 
        background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)', // Fondo oscuro profesional
        color:'white', 
        position:'relative',
        overflow: 'hidden'
      }}>
        
        {/* Decoración de Fondo (Círculos sutiles) */}
        <div style={{position:'absolute', top:'-10%', left:'-10%', width:'500px', height:'500px', background:'rgba(79, 70, 229, 0.15)', borderRadius:'50%', filter:'blur(80px)'}}></div>
        <div style={{position:'absolute', bottom:'-10%', right:'-10%', width:'400px', height:'400px', background:'rgba(236, 72, 153, 0.1)', borderRadius:'50%', filter:'blur(80px)'}}></div>

        <div className="os-card fade-in" style={{
          width:'100%', 
          maxWidth:'420px', 
          padding:'40px', 
          background: 'rgba(255, 255, 255, 0.03)', // Efecto Glass oscuro
          backdropFilter: 'blur(10px)',
          border:'1px solid rgba(255, 255, 255, 0.1)', 
          borderRadius:'24px', 
          boxShadow:'0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          cursor: 'default'
        }}>
          
          {/* Header con estilo de Terminal */}
          <div style={{marginBottom:'30px', textAlign:'center'}}>
            <div style={{
              display:'inline-flex', 
              alignItems:'center', 
              justifyContent:'center', 
              width:'60px', height:'60px', 
              borderRadius:'16px', 
              background:'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
              marginBottom:'20px',
              boxShadow: '0 10px 20px rgba(79, 70, 229, 0.3)'
            }}>
              <CodeXml size={32} color="white" />
            </div>
            
            <h1 style={{fontSize:'1.8rem', margin:'0 0 5px 0', fontWeight:'700', letterSpacing:'-0.5px', fontFamily:'"Menlo", monospace'}}>
              <span style={{color:'#f8fafc'}}>Freelance</span>
              <span style={{color:'#818cf8'}}>OS - Salguero Dev~</span>
              
            </h1>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', opacity:0.6, fontSize:'0.8rem', fontFamily:'monospace'}}>
               <div style={{width:'8px', height:'8px', borderRadius:'50%', background:'#10b981', boxShadow:'0 0 5px #10b981'}}></div>
               SYSTEM STATUS: ONLINE
            </div>
          </div>

          <form onSubmit={handleLogin} style={{display:'flex', flexDirection:'column', gap:'20px'}}>
            
            <div style={{position:'relative'}}>
              <div style={{position:'absolute', left:'15px', top:'50%', transform:'translateY(-50%)', color:'#94a3b8'}}><Mail size={18}/></div>
              <input 
                className="os-input-dark" // Asegúrate de que esta clase no tenga fondo blanco forzado, o usa style inline abajo
                type="email" 
                placeholder="ID de Acceso (Email)" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding:'14px 14px 14px 45px', 
                  fontSize:'0.95rem', 
                  background:'rgba(0,0,0,0.2)', 
                  border:'1px solid rgba(255,255,255,0.1)', 
                  color:'white',
                  borderRadius:'12px',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                required
              />
            </div>

            <div style={{position:'relative'}}>
              <div style={{position:'absolute', left:'15px', top:'50%', transform:'translateY(-50%)', color:'#94a3b8'}}><Lock size={18}/></div>
              <input 
                type="password" 
                placeholder="Clave de Seguridad" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding:'14px 14px 14px 45px', 
                  fontSize:'0.95rem', 
                  background:'rgba(0,0,0,0.2)', 
                  border:'1px solid rgba(255,255,255,0.1)', 
                  color:'white',
                  borderRadius:'12px',
                  outline: 'none'
                }}
                required
              />
            </div>

            <button 
              type="submit" 
              style={{
                width:'100%', 
                padding:'16px', 
                fontSize:'1rem', 
                marginTop:'10px', 
                display:'flex', 
                justifyContent:'center', 
                alignItems:'center', 
                gap:'10px', 
                cursor:'pointer',
                background: 'white',
                color: '#0f172a',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 'bold',
                transition: 'transform 0.2s',
              }}
              disabled={authLoading}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {authLoading ? 'Autenticando...' : <><ArrowRight size={20}/> Iniciar Sistema</>}
            </button>
          </form>

          {/* --- PIE DE PÁGINA TECH --- */}
          <div style={{marginTop:'40px', paddingTop:'20px', borderTop:'1px solid rgba(255,255,255,0.5)', textAlign:'center'}}>
            <p style={{fontSize:'0.75rem', color:'#64748b', fontFamily:'monospace', margin:0}}>
              powered by<br/>
              <a 
                href="https://www.salguero-dev.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{color:'#818cf8', fontWeight:'bold', textDecoration:'none', cursor:'pointer', fontSize:'0.9rem', display:'inline-block', marginTop:'5px'}}
              >
                {`< Salguero Dev />`}
              </a>
            </p>
          </div>

          {notification && (
            <div style={{marginTop:'20px', padding:'12px', borderRadius:'10px', background: notification.type==='error'?'rgba(239, 68, 68, 0.2)':'rgba(16, 185, 129, 0.2)', border: notification.type==='error'?'1px solid #ef4444':'1px solid #10b981', color: 'white', fontSize:'0.85rem', textAlign:'center'}}>
              {notification.msg}
            </div>
          )}
        </div>
      </div>
    )
  }
  return (
    
    <div className="os-container">
      {modalOpen && <div className="os-modal-overlay" onClick={()=>setModalOpen(null)}><div className="os-modal" onClick={e=>e.stopPropagation()}><h3>Agregar</h3><input autoFocus className="os-input" value={customText} onChange={e=>setCustomText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&saveCustom()}/><button className="btn-finish" style={{width:'100%'}} onClick={saveCustom}>Guardar</button></div></div>}

      {notification && (
        <div className="os-modal-overlay" style={{zIndex: 9999}} onClick={() => setNotification(null)}>
          <div className="os-modal" style={{textAlign:'center', padding:'40px', maxWidth:'400px', borderRadius:'16px'}} onClick={e => e.stopPropagation()}>
            <div style={{marginBottom:'20px'}}>
              {notification.type === 'success' ? <CheckCircle size={64} color="#10b981" strokeWidth={1.5}/> : <AlertTriangle size={64} color="#ef4444" strokeWidth={1.5}/>}
            </div>
            <h3 style={{fontSize:'1.8rem', margin:'0 0 10px 0', fontWeight:'800', color:'var(--text-color)'}}>{notification.type === 'success' ? '¡Excelente!' : 'Atención'}</h3>
            <p style={{marginBottom:'30px', color:'var(--text-muted)', fontSize:'1.05rem', lineHeight:'1.5'}}>{notification.msg}</p>
            <button className="btn-finish" style={{width:'100%', padding:'16px', fontSize:'1.1rem', fontWeight:'bold', borderRadius:'12px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} onClick={() => setNotification(null)}>{notification.type === 'success' ? 'Continuar' : 'Entendido'}</button>
          </div>
        </div>
      )}

      <header className="os-header">
        <div className="os-logo" onClick={goHome}><Home size={20} color="var(--accent-color)"/> FreelanceOS</div>
        <button onClick={() => { setIdeaModal(true); setShowIdeaHistory(false); }} style={{background: 'red', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '0.85rem', marginLeft: 'auto', marginRight: '15px'}}><Lightbulb className="bulb" size={16} fill="white" /> Any idea?</button>
        <div style={{display:'flex', gap:'10px'}}>

            <button onClick={handleLogout} title="Cerrar Sesión" style={{background:'transparent', border:'none', cursor:'pointer', color:'#ef4444'}}><LogOut size={20}/></button>

            <button onClick={handleHistoryToggle} style={{background:'transparent', border:'none', cursor:'pointer', color:'var(--text-color)'}} title="Ver Historial"><List size={22}/></button>
            <button onClick={toggleTheme} style={{background:'transparent', border:'none', cursor:'pointer', color:'var(--text-color)'}}>{theme==='dark'?<Sun size={22}/>:<Moon size={22}/>}</button>
        </div>
      </header>

      <div className="os-layout">
        <div className="os-workspace">
          <div className="os-scroll-area">
            {view === 'wizard' ? renderSteps() : (
              <div className="fade-in">
                <h2 className="os-title">Historial de Proyectos</h2>
                <div className="os-grid" style={{gridTemplateColumns:'1fr'}}>
                  {historyData.map(item => (
                    <div key={item.id} className="history-card" style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'15px', background:'var(--card-bg)', borderRadius:'10px', border:'1px solid var(--border-color)', marginBottom:'10px'}}>
                      <div onClick={() => cargarClienteParaEditar(item)} style={{cursor:'pointer', flex:1}} title="Clic para editar este proyecto">
                        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                          <strong style={{fontSize:'1.1rem', color:'var(--text-color)'}}>{item.clientes?.nombre_contacto || "Sin Nombre"}</strong>
                          <span style={{fontSize:'0.75rem', background:'var(--input-bg)', padding:'3px 8px', borderRadius:'12px', color:'var(--text-muted)', border:'1px solid var(--border-color)', display:'flex', alignItems:'center', gap:'4px'}}><Clock size={12}/>{new Date(item.created_at).toLocaleString('es-PE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                        </div>
                        <div style={{color:'var(--text-muted)', fontSize:'0.9rem', marginTop:'4px'}}>{item.clientes?.empresa || "Empresa no registrada"} • {currency === 'USD' ? '$' : 'S/.'} {item.presupuesto_estimado}</div>
                      </div>
                      <div style={{display:'flex', gap:'10px', marginLeft:'15px'}}>
                        <button onClick={(e) => { e.stopPropagation(); descargarPDFHistorial(item); }} title="Descargar Contrato" style={{border:'1px solid var(--border-color)', background:'var(--bg-color)', padding:'8px', borderRadius:'8px', cursor:'pointer', color:'var(--accent-color)'}}><Download size={18}/></button>
                        <button onClick={(e) => { e.stopPropagation(); solicitarBorradoProyecto(item.id); }} title="Eliminar" style={{border:'1px solid #fee2e2', background:'#fef2f2', padding:'8px', borderRadius:'8px', cursor:'pointer', color:'#ef4444'}}><Trash2 size={18}/></button>
                      </div>
                    </div>
                  ))}
                  {historyData.length === 0 && <p style={{textAlign:'center', color:'#888', marginTop:'40px'}}>No hay proyectos guardados aún.</p>}
                </div>
              </div>
            )}
          </div>
          {view === 'wizard' && <div className="workspace-footer">{step > 1 ? <button className="btn-nav btn-back" onClick={()=>setStep(step-1)}><ArrowLeft size={18}/> Atrás</button> : <div/>}{step < 5 ? <button className="btn-nav btn-next" onClick={()=>setStep(step+1)}>Siguiente <ArrowRight size={18}/></button> : <button className="btn-nav btn-finish" onClick={guardarProyecto}>{loading?'...':'Finalizar'} <Save size={18}/></button>}</div>}
        </div>

        {/* CHAT SIDEBAR LIMPIO (Sin estilos inline conflictivos) */}
        <aside className="os-chat-sidebar">
          
          <div className="chat-header-simple">
            <Star size={16} color="var(--accent-color)"/> 
            Copiloto IA (CTO)
          </div>
          
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`chat-bubble ${m.role==='user'?'user':'ai'}`}
                style={m.role === 'assistant' ? {
                  background: 'var(--bg-color)', 
                  border: '1px solid var(--border-color)',
                  padding: '0', 
                  overflow: 'hidden', 
                  borderRadius: '12px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                  maxWidth: '100%', 
                  alignSelf: 'stretch'
                } : {
                   alignSelf: 'flex-end', 
                   maxWidth: '85%'
                }}
              >
                {/* ... (El contenido de la burbuja sigue igual) ... */}
                {m.role === 'assistant' && (
                  <div style={{ background: 'var(--card-bg)', padding: '6px 12px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{fontSize:'0.65rem', textTransform:'uppercase', fontWeight:'bold', color:'var(--text-color)', letterSpacing:'0.5px'}}>Respuesta Generada</span>
                    <button onClick={() => copyToClipboard(m.content)} style={{ background: 'var(--accent-color)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '3px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem', color: 'white', fontWeight: '600', transition: 'all 0.2s' }} title="Copiar contenido"><Copy size={12} /> Copiar</button>
                  </div>
                )}
                <div 
                  style={{
                    padding: '12px 15px',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                    // SOLO la IA usa fuente tipo código
                    fontFamily: m.role === 'assistant' ? '"Menlo", "Consolas", monospace' : 'inherit', 
                    // El usuario texto blanco (porque su fondo es azul/morado), la IA texto normal
                    color: m.role === 'user' ? 'var(--text-color)' : 'var(--text-color)', 
                    // SIN FONDO AQUÍ (El fondo lo da la clase .chat-bubble del padre)
                  }}
                  dangerouslySetInnerHTML={{
                    __html: (m.content || "")
                      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') 
                      .replace(/^- (.*)/gm, '• $1') 
                      .replace(/\n/g, '<br/>')
                  }} 
                />
              </div>
            ))}
            
            {isTyping && (<div style={{padding:'10px', fontSize:'0.8rem', color:'var(--text-muted)', fontStyle:'italic'}}>Escribiendo<span className="typing-dot">.</span><span className="typing-dot">.</span><span className="typing-dot">.</span></div>)}
            
            {/* ANCLA PARA AUTO-SCROLL */}
            <div ref={messagesEndRef} style={{ float: "left", clear: "both" }} />
          </div>

          <div className="chat-input-area">
            <div style={{display:'flex', gap:'10px', width: '100%'}}>
              <input className="os-input" style={{marginBottom:0, flex:1}} placeholder="Pregunta al CTO..." value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleChatSubmit()} />
              <button onClick={() => handleChatSubmit()} disabled={!chatInput.trim()} style={{ background:'var(--accent-color)', color:'white', border:'none', borderRadius:'8px', width:'42px', height:'42px', cursor:'pointer', display:'flex', justifyContent:'center', alignItems:'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}><Send size={18}/></button>
            </div>
          </div>
        </aside>
      </div>
      
      {/* MODAL IDEAS */}
      {ideaModal && (
        <div className="os-modal-overlay" onClick={() => setIdeaModal(false)} style={{backdropFilter: 'blur(5px)'}}>
          <div className="os-modal fade-in" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', width: '95%', padding: '0', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: '0 20px 50px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '20px 25px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--input-bg)' }}>
              <h3 style={{margin:0, display:'flex', alignItems:'center', gap:'12px', fontSize:'1.2rem', color:'var(--text-color)'}}><div style={{background:'rgba(245, 158, 11, 0.15)', padding:'8px', borderRadius:'10px', display:'flex'}}><Lightbulb size={22} color="#f59e0b" /></div>{showIdeaHistory ? 'Banco de Ideas' : 'Capturar Idea'}</h3>
              <button onClick={() => { setShowIdeaHistory(!showIdeaHistory); setEditingId(null); }} style={{ background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '6px 14px', fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}>{showIdeaHistory ? <><Plus size={14}/> Nueva Idea</> : <><Clock size={14}/> Historial</>}</button>
            </div>
            <div style={{padding: '25px', background: 'var(--card-bg)'}}>
              {!showIdeaHistory ? (
                <div className="fade-in">
                  <label style={{display:'block', marginBottom:'10px', fontSize:'0.9rem', color:'var(--text-muted)', fontWeight:'500'}}>Tu próxima gran idea comienza aquí:</label>
                  <textarea autoFocus className="os-textarea" rows="5" placeholder="Ej: App para paseadores de perros con GPS..." value={ideaText} onChange={e => setIdeaText(e.target.value)} style={{ fontSize: '1.1rem', resize: 'none', padding: '15px', lineHeight: '1.6', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'var(--bg-color)' }} />
                  <div style={{marginTop:'20px', display:'flex', gap:'10px'}}><button className="btn-finish" style={{width:'100%', padding:'14px', fontSize:'1rem', display:'flex', justifyContent:'center', gap:'10px'}} onClick={guardarIdea} disabled={loading}>{loading ? 'Guardando...' : <><CheckCircle size={18}/> Guardar Idea</>}</button></div>
                </div>
              ) : (
                <div className="os-scroll-area" style={{maxHeight:'400px', overflowY:'auto', paddingRight:'5px'}}>
                  {ideasList.length === 0 ? (<div style={{textAlign:'center', padding:'40px 20px', color:'var(--text-muted)'}}><div style={{marginBottom:'15px', opacity:0.3}}><Lightbulb size={40}/></div><p>Aún no hay ideas guardadas.</p></div>) : (
                    ideasList.map(idea => (
                      <div key={idea.id} style={{ background: 'var(--input-bg)', padding:'15px', borderRadius:'12px', marginBottom:'12px', border: '1px solid var(--border-color)', position: 'relative' }}>
                        {editingId === idea.id ? (
                          <div className="fade-in">
                            <textarea className="os-textarea" value={editText} onChange={e => setEditText(e.target.value)} rows="3" style={{fontSize:'0.95rem', background:'var(--bg-color)'}} />
                            <div style={{display:'flex', gap:'10px', justifyContent:'flex-end', marginTop:'10px'}}><button onClick={() => setEditingId(null)} style={{background:'transparent', border:'none', cursor:'pointer', color:'var(--text-muted)', fontSize:'0.85rem'}}>Cancelar</button><button onClick={() => guardarEdicion(idea.id)} style={{background:'var(--accent-color)', color:'white', border:'none', borderRadius:'6px', padding:'5px 12px', cursor:'pointer', fontSize:'0.85rem'}}>Guardar</button></div>
                          </div>
                        ) : (
                          <>
                            <div style={{fontSize:'1rem', color:'var(--text-color)', lineHeight:'1.5', whiteSpace:'pre-wrap'}}>{idea.content}</div>
                            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'12px', paddingTop:'12px', borderTop:'1px solid rgba(0,0,0,0.05)'}}>
                              <span style={{fontSize:'0.75rem', color:'var(--text-muted)', display:'flex', alignItems:'center', gap:'5px'}}><Clock size={12}/> {new Date(idea.created_at).toLocaleDateString()}</span>
                              <div style={{display:'flex', gap:'8px'}}><button onClick={() => empezarEdicion(idea)} style={{background:'transparent', border:'none', cursor:'pointer', padding:'5px'}} title="Editar"><Edit2 size={16} color="var(--text-muted)"/></button><button onClick={() => solicitarBorrado(idea.id)} style={{background:'transparent', border:'none', cursor:'pointer', padding:'5px'}} title="Eliminar"><Trash2 size={16} color="#ef4444"/></button></div>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
            <div style={{ padding: '15px 25px', background: 'var(--input-bg)', borderTop: '1px solid var(--border-color)', textAlign: 'right' }}>
              <button onClick={() => setIdeaModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', padding: '8px 16px', borderRadius: '8px' }}>Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL BORRAR IDEA */}
      {deleteTarget && (
        <div className="os-modal-overlay" onClick={() => setDeleteTarget(null)} style={{backdropFilter: 'blur(4px)', zIndex: 10001}}>
          <div className="os-modal fade-in" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px', width: '90%', textAlign: 'center', borderRadius: '20px', padding: '30px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}><div style={{ background: '#fee2e2', borderRadius: '50%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><AlertTriangle size={32} color="#ef4444" strokeWidth={2.5} /></div></div>
            <h3 style={{ marginTop: 0, fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-color)', marginBottom: '10px' }}>¿Eliminar esta idea?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '30px', lineHeight: '1.5' }}>Esta acción no se puede deshacer.</p>
            <div style={{display:'flex', gap:'12px'}}>
              <button onClick={() => setDeleteTarget(null)} style={{ flex: 1, background: 'white', border: '1px solid #e5e7eb', color: '#374151', borderRadius: '10px', padding: '12px', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem' }}>Cancelar</button>
              <button onClick={confirmarBorrado} style={{ flex: 1, background: '#ef4444', border: '1px solid #ef4444', color: 'white', borderRadius: '10px', padding: '12px', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem', boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.3)' }}>Sí, Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL BORRAR PROYECTO (HISTORIAL) */}
      {deleteProjectTarget && (
        <div className="os-modal-overlay" onClick={() => setDeleteProjectTarget(null)} style={{backdropFilter: 'blur(4px)', zIndex: 10002}}>
          <div className="os-modal fade-in" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px', width: '90%', textAlign: 'center', borderRadius: '20px', padding: '30px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}><div style={{ background: '#fee2e2', borderRadius: '50%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Trash2 size={32} color="#ef4444" strokeWidth={2.5} /></div></div>
            <h3 style={{ marginTop: 0, fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-color)', marginBottom: '10px' }}>¿Eliminar Proyecto?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '30px', lineHeight: '1.5' }}>El proyecto y sus datos se borrarán permanentemente del historial.</p>
            <div style={{display:'flex', gap:'12px'}}>
              <button onClick={() => setDeleteProjectTarget(null)} style={{ flex: 1, background: 'white', border: '1px solid #e5e7eb', color: '#374151', borderRadius: '10px', padding: '12px', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem' }}>Cancelar</button>
              <button onClick={confirmarBorradoProyecto} style={{ flex: 1, background: '#ef4444', border: '1px solid #ef4444', color: 'white', borderRadius: '10px', padding: '12px', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem', boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.3)' }}>{loading ? '...' : 'Sí, Eliminar'}</button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  )
}