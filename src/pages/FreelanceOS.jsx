import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase' 
import { 
  ArrowRight, ArrowLeft, Save, Sun, Moon, Plus, Download, List, Trash2, 
  Home, Send, Star, Lock, Mail, LogOut, Webhook, PenTool,
  TrendingDown, CreditCard, PackageX, Mountain, BarChart3, FileSpreadsheet, 
  Megaphone, Globe, AlertTriangle, Target, ShieldCheck, CheckCircle, XCircle,
  Database, Cloud, Code, Wrench, Smartphone
} from 'lucide-react'
import { jsPDF } from "jspdf"
import Groq from "groq-sdk" 
import './FreelanceOS.css'

export default function FreelanceOS() {
  // --- 1. ESTADOS DE SESIÓN ---
  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)

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

  const [data, setData] = useState({
    fecha: today,
    cliente: '', empresa: '', cargo: '', ruc: '',
    emailContacto: '', telefono: '', direccion: '',
    objetivo: '', 
    problemas: [], tecnologias: [], entregables: [],
    soporte: 'Ninguno', extras: [],
    plazo: '', presupuesto: '', descripcionProblema: ''
  })

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

  // --- EFECTOS ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);
  useEffect(() => { if (messages.length === 0) setMessages([{ role: 'assistant', content: "Hola ingeniero. Soy tu copiloto IA. Pregúntame sobre stack, costos o estrategia." }]) }, [])
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const goHome = () => { setStep(1); setView('wizard'); }

  const handleLogin = async (e) => {
    e.preventDefault()
    setAuthLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setNotification({ type: 'error', msg: error.message })
    setAuthLoading(false)
  }
  const handleLogout = async () => { await supabase.auth.signOut(); setSession(null) }

  // --- OTROS CATÁLOGOS ---
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

  const handleChatSubmit = async (manualPrompt = null) => {
    const textToSend = typeof manualPrompt === 'string' ? manualPrompt : chatInput
    if (!textToSend.trim()) return
    const userMsg = { role: 'user', content: textToSend }
    setMessages(prev => [...prev, userMsg])
    if (typeof manualPrompt !== 'string') setChatInput('')
    setIsTyping(true)
    try {
      const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY, dangerouslyAllowBrowser: true });
      let contextTip = ""
      if (step === 1) contextTip = "Diagnóstico: Enfócate en el OBJETIVO seleccionado."
      if (step === 2) contextTip = "Stack: Recomienda tecnología robusta."
      if (step === 3) contextTip = "Negocio: Sugiere soporte mensual."
      if (step === 4) contextTip = "Detalles: Escribe especificaciones técnicas."
      const systemPrompt = `ACTÚA COMO: CTO Senior para Angel Salguero. CONTEXTO (${step}/5): ${contextTip}. DATOS: Cliente: ${data.cliente} (${data.empresa}) | Objetivo: ${data.objetivo} | Stack: ${data.tecnologias.join(',')} REGLAS: Breve, técnico, usa negritas.`
      const completion = await groq.chat.completions.create({ messages: [{ role: 'system', content: systemPrompt }, ...messages, userMsg], model: "llama-3.3-70b-versatile", temperature: 0.6 });
      setMessages(prev => [...prev, { role: 'assistant', content: completion.choices[0]?.message?.content || "Error IA." }])
    } catch (error) { setMessages(prev => [...prev, { role: 'assistant', content: "Error Groq." }]) } 
    finally { setIsTyping(false) }
  }

  const cargarHistorial = async () => {
    setLoading(true)
    const { data: records, error } = await supabase.from('reuniones').select('*, clientes(*)').order('created_at', { ascending: false })
    if (!error) setHistoryData(records || [])
    setLoading(false); setView('history')
  }
  const borrarItem = async (id) => { if(confirm("¿Borrar registro?")) { await supabase.from('reuniones').delete().eq('id', id); setHistoryData(prev => prev.filter(i => i.id !== id)) } }

  const guardarProyecto = async () => {
    if (!data.cliente) { setNotification({ type: 'error', msg: "⚠️ Por favor ingresa el nombre del cliente." }); return }
    setLoading(true)
    const notas = `MONEDA:${currency}\nOBJETIVO:${data.objetivo}\nSOPORTE:${data.soporte}\nEXTRAS:${data.extras}\nRUC:${data.ruc}\nEMAIL:${data.emailContacto}\nTEL:${data.telefono}\nDIR:${data.direccion}\nPROBLEMAS:${data.problemas}\nSTACK:${data.tecnologias}\nPLAZO:${data.plazo}`
    const { data: cl, error: e1 } = await supabase.from('clientes').insert([{ nombre_contacto: data.cliente, empresa: data.empresa, notas }]).select()
    if (e1) { setNotification({ type: 'error', msg: "Error al guardar cliente: " + e1.message }); setLoading(false); return }
    await supabase.from('reuniones').insert([{ cliente_id: cl[0].id, presupuesto_estimado: parseFloat(data.presupuesto)||0 }])
    setLoading(false)
    setNotification({ type: 'success', msg: "✅ Proyecto guardado exitosamente en la base de datos." })
    setStep(1)
    setData({...data, cliente:'', empresa:'', ruc:'', emailContacto:'', telefono:'', direccion:'', objetivo:'', soporte:'Ninguno', extras:[], problemas:[], tecnologias:[], descripcionProblema:''})
  }

  const generarPDF = (source = null) => {
    const doc = new jsPDF(); const finalData = source || data; const symbol = (source?.currency || currency) === 'USD' ? '$' : 'S/.'
    const COLOR_ACCENT = [255, 51, 51]; const COLOR_DARK = [20, 20, 20]; const COLOR_GRAY = [100, 100, 100]; const COLOR_LIGHT = [245, 245, 245]
    const logoCenterX = 27; doc.setFillColor(...COLOR_DARK); doc.roundedRect(20, 15, 14, 14, 2, 2, 'F'); doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(15); doc.text("as_", logoCenterX, 21.5, { align: 'center' }); doc.setTextColor(...COLOR_ACCENT); doc.setFont("courier", "bold"); doc.setFontSize(12); doc.text("</>", logoCenterX, 26.5, { align: 'center' })
    doc.setTextColor(...COLOR_DARK); doc.setFontSize(24); doc.setFont("helvetica", "bold"); doc.text("PROPUESTA", 190, 23, { align: 'right' }); doc.setTextColor(...COLOR_ACCENT); doc.setFontSize(10); doc.text("TECNOLÓGICA & CONSULTORÍA", 190, 28, { align: 'right' }); doc.setDrawColor(...COLOR_ACCENT); doc.setLineWidth(0.5); doc.line(20, 35, 190, 35)
    doc.setFillColor(...COLOR_LIGHT); doc.roundedRect(20, 42, 170, 28, 3, 3, 'F'); doc.setTextColor(...COLOR_GRAY); doc.setFontSize(9); doc.text("PREPARADO PARA:", 25, 50); doc.text("FECHA DE EMISIÓN:", 120, 50); doc.setTextColor(...COLOR_DARK); doc.setFontSize(11); doc.setFont("helvetica", "bold"); doc.text(finalData.cliente.toUpperCase(), 25, 56); doc.text(finalData.empresa || 'Empresa Privada', 25, 62); doc.setFont("helvetica", "normal"); doc.text(new Date(finalData.fecha).toLocaleDateString('es-PE', { year:'numeric', month:'long', day:'numeric' }), 120, 56); doc.setFontSize(9); doc.setTextColor(...COLOR_GRAY); doc.text(`RUC: ${finalData.ruc || 'N/A'}`, 120, 62)
    let y = 85
    const addSection = (title, content, isList = true) => {
      if (!content || content.length === 0) return
      if (y > 260) { doc.addPage(); y = 30; doc.setDrawColor(...COLOR_GRAY); doc.line(20, 20, 190, 20); }
      doc.setFillColor(...COLOR_ACCENT); doc.rect(20, y - 4, 1.5, 6, 'F'); doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.setTextColor(...COLOR_DARK); doc.text(title, 25, y); y += 8; doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(60, 60, 60)
      if (isList && Array.isArray(content)) { content.forEach(item => { if (y > 275) { doc.addPage(); y = 30; } doc.setTextColor(...COLOR_ACCENT); doc.text("•", 25, y); doc.setTextColor(60, 60, 60); doc.text(item, 30, y); y += 6 }); y += 4 } 
      else { const lines = doc.splitTextToSize(content, 165); doc.text(lines, 25, y); y += (lines.length * 5) + 8 }
    }
    if (finalData.objetivo) addSection("OBJETIVO ESTRATÉGICO", finalData.objetivo, false)
    addSection("PROBLEMÁTICA DETECTADA", finalData.problemas)
    addSection("STACK TECNOLÓGICO PROPUESTO", finalData.tecnologias)
    if (finalData.extras && finalData.extras.length > 0) addSection("GARANTÍA DE CALIDAD & SEGURIDAD (ITIL)", finalData.extras)
    if (finalData.descripcionProblema) addSection("ESPECIFICACIONES TÉCNICAS", finalData.descripcionProblema, false)
    addSection("ENTREGABLES DEL PROYECTO", finalData.entregables)
    if (y > 240) { doc.addPage(); y = 30; } y += 10
    doc.setFillColor(...COLOR_DARK); doc.roundedRect(100, y, 90, 35, 2, 2, 'F'); doc.setTextColor(200, 200, 200); doc.setFontSize(9); doc.text("INVERSIÓN TOTAL ESTIMADA", 110, y + 10); doc.setTextColor(255, 255, 255); doc.setFontSize(16); doc.setFont("helvetica", "bold"); const precioFormat = parseFloat(finalData.presupuesto || 0).toLocaleString('es-PE', { minimumFractionDigits: 2 }); doc.text(`${symbol} ${precioFormat}`, 110, y + 20); doc.setFontSize(8); doc.setTextColor(...COLOR_ACCENT); doc.text("+ IGV (Facturable)", 110, y + 28)
    doc.setTextColor(...COLOR_DARK); doc.setFontSize(10); doc.setFont("helvetica", "bold"); doc.text("PLAZOS & SOPORTE:", 20, y + 10); doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.text(`• Tiempo estimado: ${finalData.plazo || 'A definir'}`, 20, y + 18); doc.text(`• Plan de Soporte: ${finalData.soporte || 'No incluido'}`, 20, y + 24)
    const pageCount = doc.internal.getNumberOfPages(); for(let i = 1; i <= pageCount; i++) { doc.setPage(i); doc.setFontSize(8); doc.setTextColor(...COLOR_GRAY); doc.text(`Generado por Angel Salguero Systems Dev | FreelanceOS`, 20, 285); doc.text(`Pág ${i} de ${pageCount}`, 180, 285); doc.setFillColor(...COLOR_ACCENT); doc.rect(180, 288, 20, 1, 'F') }
    doc.save(`Propuesta_${finalData.empresa || 'Cliente'}_${finalData.fecha}.pdf`)
  }

  const descargarPDFHistorial = (item) => {
    const notas = item.clientes?.notas || ''; const ex = (k) => (notas.match(new RegExp(`${k}:\\s*(.*)`)) || [])[1]?.trim() || ''; const recData = { cliente: item.clientes?.nombre_contacto, empresa: item.clientes?.empresa, fecha: new Date(item.created_at).toLocaleDateString(), problemas: ex('PROBLEMAS').split(',').filter(Boolean), tecnologias: ex('STACK').split(',').filter(Boolean), presupuesto: item.presupuesto_estimado, currency: ex('MONEDA') || 'PEN', ruc: ex('RUC'), emailContacto: ex('EMAIL'), telefono: ex('TEL'), direccion: ex('DIR'), objetivo: ex('OBJETIVO'), soporte: ex('SOPORTE'), extras: ex('EXTRAS').split(',').filter(Boolean) }; generarPDF(recData)
  }

  const openModal = (c) => { setModalOpen(c); setCustomText('') }
  const saveCustom = () => { if(customText) setData({...data, [modalOpen]:[...data[modalOpen], customText]}); setModalOpen(null) }
  const toggleSel = (c, v) => { const l=data[c]; setData({...data, [c]: l.includes(v)?l.filter(i=>i!==v):[...l, v]}) }

  if (!session) {
    return (
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-logo"><Home size={28} color="var(--accent-color)"/> FreelanceOS</div>
          <form onSubmit={handleLogin}>
            <div className="login-input-group"><Mail className="login-icon" size={18} /><input className="login-input" type="email" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="username" /></div>
            <div className="login-input-group"><Lock className="login-icon" size={18} /><input className="login-input" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" /></div>
            <div className="login-options"><input type="checkbox" id="remember" checked={remember} onChange={(e) => setRemember(e.target.checked)} /><label htmlFor="remember">Recordar contraseña</label></div>
            <button className="btn-login" type="submit" disabled={authLoading}>{authLoading ? '...' : 'Iniciar Sesión'}</button>
          </form>
        </div>
        {notification && <div className="os-modal-overlay" style={{zIndex: 9999}}><div className="os-modal" style={{textAlign:'center', padding:'30px'}}><div style={{color:'#ef4444', marginBottom:'10px'}}><XCircle size={48}/></div><p>{notification.msg}</p><button className="btn-finish" style={{width:'100%', marginTop:'20px'}} onClick={() => setNotification(null)}>Intentar de nuevo</button></div></div>}
      </div>
    )
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
        
        {/* --- GRID DE 2 COLUMNAS PARA CATEGORÍAS --- */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px', alignItems: 'start' }}>
            {Object.entries(TECH_CATEGORIES).map(([catName, catData]) => (
               <div key={catName} style={{ 
                   background: 'var(--input-bg)', 
                   borderRadius: '12px', 
                   padding: '15px', 
                   border: '1px solid var(--border-color)',
                   marginBottom: '10px' // Espacio extra por si acaso
               }}>
                  <h3 style={{fontSize:'1rem', color:'var(--accent-color)', borderBottom:'1px solid var(--border-color)', paddingBottom:'8px', marginBottom:'15px', display:'flex', alignItems:'center', gap:'8px', marginTop: 0}}>
                     {catData.icon} {catName}
                  </h3>
                  <div className="os-grid" style={{ marginBottom: 0 }}>
                     {catData.items.map((t, i) => {
                        const icon = t.type === 'Integration' ? <Webhook size={32} color="#1f15da"/> : (t.type==='Payment'?<CreditCard size={32}/> : (t.logo ? <img src={t.logo} alt={t.label} className="tech-logo" /> : <div style={{fontSize:'1.8rem', marginBottom:'5px'}}>🚀</div>));
                        return (
                           <div key={i} className={`os-card ${data.tecnologias.includes(t.label)?'selected':''}`} onClick={()=>toggleSel('tecnologias', t.label)}>
                              <div className="tech-tooltip">{t.desc}</div>
                              {icon}
                              <div style={{fontSize:'0.8rem', marginTop: '5px'}}>{t.label}</div>
                           </div>
                        )
                     })}
                  </div>
               </div>
            ))}
        </div>

        {/* --- PERSONALIZADOS (FUERA DEL GRID PRINCIPAL) --- */}
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
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'20px'}}>{['Urgente (2 sem)', '1 Mes', '3 Meses', '6 Meses', '8 Meses'].map(p=><button key={p} onClick={()=>setData({...data, plazo:p})} style={{padding:'12px', borderRadius:'8px', border:'1px solid var(--border-color)', background:data.plazo===p?'var(--accent-color)':'var(--input-bg)', color:data.plazo===p?'white':'var(--text-color)', fontSize:'0.9rem', cursor:'pointer'}}>{p}</button>)}</div>
        <div style={{background:'var(--input-bg)', padding:'15px', borderRadius:'8px', border:'1px solid var(--border-color)', marginBottom:'20px'}}>
            <p style={{margin:'0 0 10px 0', fontWeight:'bold', fontSize:'0.9rem'}}>Soporte & Mantenimiento (Mensual):</p>
            <div style={{display:'flex', gap:'10px'}}>{['Ninguno', 'Básico (Monitorización)', 'Premium (Soporte 24/7)', 'Enterprise (SLA)'].map(s => (<button key={s} onClick={()=>setData({...data, soporte: s})} style={{flex:1, padding:'8px', borderRadius:'6px', border:'1px solid var(--border-color)', background: data.soporte===s?'#10b981':'white', color:data.soporte===s?'white':'black', cursor:'pointer', fontSize:'0.8rem'}}>{s}</button>))}</div>
        </div>
        <div className="os-grid">{[...ENTREGABLES_BASE, ...data.entregables.filter(x => !ENTREGABLES_BASE.includes(x))].map((e,i)=><div key={i} className={`os-card ${data.entregables.includes(e)?'selected':''}`} style={{minHeight:'60px'}} onClick={()=>toggleSel('entregables', e)}>{e}</div>)}<div className="os-card" style={{borderStyle:'dashed', opacity:0.6, minHeight:'60px'}} onClick={()=>openModal('entregables')}><Plus size={24}/><div style={{fontSize:'0.8rem'}}>Otro...</div></div></div>
        <div style={{display:'flex', gap:'10px'}}><input type="number" className="os-input" placeholder="Inversión Proyecto (Sin IGV)" value={data.presupuesto} onChange={e=>setData({...data, presupuesto:e.target.value})}/><div className="currency-toggle"><button onClick={()=>setCurrency('PEN')} style={{background:currency==='PEN'?'var(--accent-color)':'transparent', color:currency==='PEN'?'white':'#888'}}>S/.</button><button onClick={()=>setCurrency('USD')} style={{background:currency==='USD'?'var(--accent-color)':'transparent', color:currency==='USD'?'white':'#888'}}>$</button></div></div>
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

  return (
    <div className="os-container">
      {modalOpen && <div className="os-modal-overlay" onClick={()=>setModalOpen(null)}><div className="os-modal" onClick={e=>e.stopPropagation()}><h3>Agregar</h3><input autoFocus className="os-input" value={customText} onChange={e=>setCustomText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&saveCustom()}/><button className="btn-finish" style={{width:'100%'}} onClick={saveCustom}>Guardar</button></div></div>}
      {notification && (<div className="os-modal-overlay" style={{zIndex: 9999}} onClick={() => setNotification(null)}><div className="os-modal" style={{textAlign:'center', padding:'40px'}} onClick={e => e.stopPropagation()}><div style={{fontSize:'3rem', marginBottom:'15px'}}>{notification.type === 'success' ? <CheckCircle size={50} color="#10b981"/> : <AlertTriangle size={50} color="#ef4444"/>}</div><h3 style={{fontSize:'1.5rem', marginBottom:'10px'}}>{notification.type === 'success' ? '¡Excelente!' : 'Atención'}</h3><p style={{marginBottom:'25px', color:'var(--text-color)', lineHeight:'1.5'}}>{notification.msg}</p><button className="btn-finish" style={{width:'100%'}} onClick={() => setNotification(null)}>{notification.type === 'success' ? 'Continuar' : 'Entendido'}</button></div></div>)}

      <header className="os-header">
        <div className="os-logo" onClick={goHome}><Home size={20} color="var(--accent-color)"/> FreelanceOS</div>
        <div style={{display:'flex', gap:'10px'}}><button onClick={handleLogout} title="Cerrar Sesión" style={{background:'transparent', border:'none', cursor:'pointer', color:'#ef4444'}}><LogOut size={20}/></button><button onClick={()=>setView(view==='wizard'?'history':'wizard')} style={{background:'transparent', border:'none', cursor:'pointer', color:'var(--text-color)'}}><List size={22}/></button><button onClick={toggleTheme} style={{background:'transparent', border:'none', cursor:'pointer', color:'var(--text-color)'}}>{theme==='dark'?<Sun size={22}/>:<Moon size={22}/>}</button></div>
      </header>

      <div className="os-layout">
        <div className="os-workspace">
          <div className="os-scroll-area">
            {view === 'wizard' ? renderSteps() : (
              <div className="fade-in"><h2 className="os-title">Historial</h2>{historyData.map(item => (<div key={item.id} className="history-card"><div><strong style={{fontSize:'1.1rem'}}>{item.clientes?.nombre_contacto}</strong><div style={{color:'#888', fontSize:'0.9rem'}}>{item.clientes?.empresa}</div></div><div style={{display:'flex', gap:'10px'}}><button onClick={()=>descargarPDFHistorial(item)} style={{border:'none', background:'transparent', cursor:'pointer', color:'var(--text-color)'}}><Download/></button><button onClick={()=>borrarItem(item.id)} style={{border:'none', background:'transparent', cursor:'pointer', color:'#ef4444'}}><Trash2/></button></div></div>))}</div>
            )}
          </div>
          {view === 'wizard' && <div className="workspace-footer">{step > 1 ? <button className="btn-nav btn-back" onClick={()=>setStep(step-1)}><ArrowLeft size={18}/> Atrás</button> : <div/>}{step < 5 ? <button className="btn-nav btn-next" onClick={()=>setStep(step+1)}>Siguiente <ArrowRight size={18}/></button> : <button className="btn-nav btn-finish" onClick={guardarProyecto}>{loading?'...':'Finalizar'} <Save size={18}/></button>}</div>}
        </div>
        <aside className="os-chat-sidebar">
          <div className="chat-header-simple"><Star size={16} color="var(--accent-color)"/> Copiloto IA</div>
          <div className="chat-messages">{Array.isArray(messages) && messages.map((m, i) => (<div key={i} className={`chat-bubble ${m.role==='user'?'user':'ai'}`}><span dangerouslySetInnerHTML={{__html: (m.content || "").replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br/>')}} /></div>))}{isTyping && <div className="chat-bubble ai" style={{fontStyle:'italic', opacity:0.6}}>Escribiendo...</div>}<div ref={messagesEndRef} /></div>
          <div className="chat-input-area"><input className="os-input" style={{marginBottom:0}} placeholder="Pregunta algo..." value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleChatSubmit()}/><button onClick={handleChatSubmit} disabled={!chatInput.trim()} style={{background:'var(--text-color)', color:'var(--bg-color)', border:'none', borderRadius:'6px', width:'40px', height:'40px', cursor:'pointer', display:'flex', justifyContent:'center', alignItems:'center'}}><Send size={18}/></button></div>
        </aside>
      </div>
    </div>
  )
}