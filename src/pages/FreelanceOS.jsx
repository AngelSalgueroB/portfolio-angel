import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase' 
/* IMPORTANTE: Agregamos Webhook y PenTool a los imports */
import { 
  ArrowRight, ArrowLeft, Save, Sun, Moon, FileText, Plus, Download, List, Trash2, 
  Calendar, Home, Send, MessageSquare, Star, Lock, Mail, LogOut, Webhook, PenTool,
  // Iconos Diagnóstico
  TrendingDown, CreditCard, PackageX, Mountain, BarChart3, FileSpreadsheet, 
  Megaphone, Globe, AlertTriangle 
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

  // --- 2. ESTADOS APP ---
  const [view, setView] = useState('wizard') 
  const [historyData, setHistoryData] = useState([])
  const [step, setStep] = useState(1) 
  const [loading, setLoading] = useState(false)
  const [theme, setTheme] = useState('light')

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
    problemas: [], tecnologias: [], entregables: [],
    plazo: '', presupuesto: '', descripcionProblema: ''
  })

  // --- EFECTOS ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);

  useEffect(() => {
    if (messages.length === 0) setMessages([{ role: 'assistant', content: "Hola ingeniero. Soy tu copiloto IA. Pregúntame sobre stack, costos o estrategia." }])
  }, [])

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const goHome = () => { setStep(1); setView('wizard'); }

  // --- AUTH ---
  const handleLogin = async (e) => {
    e.preventDefault()
    setAuthLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert("❌ Error: " + error.message)
    setAuthLoading(false)
  }
  const handleLogout = async () => { await supabase.auth.signOut(); setSession(null) }

  // --- CATÁLOGOS ---
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

  const TECNOLOGIAS_BASE = [
    // MODERN WEB
    { label: 'React / Next.js', type: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { label: 'Vue / Nuxt.js', type: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
    
    // BACKEND
    { label: 'Node.js / Python', type: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { label: 'PHP / Laravel', type: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
    { label: 'Java / .NET', type: 'Enterprise', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },

    // DB & BAAS
    { label: 'Supabase / SQL', type: 'DB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
    { label: 'Firebase', type: 'DB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },

    // NUEVO: INTEGRACIONES & NEW TECH
    { label: 'Integración API', type: 'Integration' }, // Usará icono Webhook
    { label: 'Blockchain / Web3', type: 'NewTech', logo: 'https://cdn.worldvectorlogo.com/logos/ethereum-1.svg' },
    { label: 'Docker / K8s', type: 'DevOps', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { label: 'IA / OpenAI', type: 'AI', logo: 'https://cdn.worldvectorlogo.com/logos/openai-2.svg' },

    // CMS & ECOM
    { label: 'WordPress / Woo', type: 'CMS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg' },
    { label: 'Shopify', type: 'Ecom', logo: 'https://cdn.worldvectorlogo.com/logos/shopify.svg' },

    // EXTRAS
    { label: 'App Móvil', type: 'Mobile', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
    { label: 'Power BI / Data', type: 'Data', logo: 'https://cdn.worldvectorlogo.com/logos/power-bi-1.svg' },
    { label: 'AWS / Vercel', type: 'Cloud', logo: 'https://cdn.worldvectorlogo.com/logos/aws-2.svg' }
  ]

  const ENTREGABLES_BASE = [ 'Código Fuente', 'Manual Usuario', 'Capacitación', 'Despliegue', 'Soporte 30 días' ]

  // --- IA ---
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
      if (step === 1) contextTip = "Diagnóstico: Identifica el dolor real."
      if (step === 2) contextTip = "Stack: Recomienda tecnología basada en PROBLEMAS."
      if (step === 3) contextTip = "Negocio: Justifica precio o plazo."
      if (step === 4) contextTip = "Detalles: Redacta una descripción técnica formal del alcance."
      
      const systemPrompt = `
        ACTÚA COMO: CTO y Estratega de Negocios Senior para Angel Salguero (Full Stack Dev).
        CONTEXTO (${step}/5): ${contextTip}
        DATOS: Cliente: ${data.cliente} | Problemas: ${data.problemas.join(',')} | Stack: ${data.tecnologias.join(',')}
        REGLAS: Breve, técnico, usa negritas.
      `
      const completion = await groq.chat.completions.create({
        messages: [{ role: 'system', content: systemPrompt }, ...messages, userMsg],
        model: "llama-3.3-70b-versatile",
        temperature: 0.6,
      });
      setMessages(prev => [...prev, { role: 'assistant', content: completion.choices[0]?.message?.content || "Error IA." }])
    } catch (error) { setMessages(prev => [...prev, { role: 'assistant', content: "Error Groq." }]) } 
    finally { setIsTyping(false) }
  }

  // --- DB ---
  const cargarHistorial = async () => {
    setLoading(true)
    const { data: records, error } = await supabase.from('reuniones').select('*, clientes(*)').order('created_at', { ascending: false })
    if (!error) setHistoryData(records || [])
    setLoading(false); setView('history')
  }

  const borrarItem = async (id) => {
    if(confirm("¿Borrar registro?")) { await supabase.from('reuniones').delete().eq('id', id); setHistoryData(prev => prev.filter(i => i.id !== id)) }
  }

  const guardarProyecto = async () => {
    if (!data.cliente) return alert("⚠️ Falta Nombre Cliente")
    setLoading(true)
    const notas = `MONEDA:${currency}\nRUC:${data.ruc}\nEMAIL:${data.emailContacto}\nTEL:${data.telefono}\nDIR:${data.direccion}\nPROBLEMAS:${data.problemas}\nSTACK:${data.tecnologias}\nPLAZO:${data.plazo}`
    const { data: cl, error: e1 } = await supabase.from('clientes').insert([{ nombre_contacto: data.cliente, empresa: data.empresa, notas }]).select()
    if (e1) { alert(e1.message); setLoading(false); return }
    await supabase.from('reuniones').insert([{ cliente_id: cl[0].id, presupuesto_estimado: parseFloat(data.presupuesto)||0 }])
    setLoading(false); alert("✅ Guardado"); setStep(1); 
    setData({...data, cliente:'', empresa:'', ruc:'', emailContacto:'', telefono:'', direccion:'', problemas:[], tecnologias:[], descripcionProblema:''})
  }

  // --- PDF ---
  const generarPDF = (source = null) => {
    const doc = new jsPDF()
    const finalData = source || data
    const symbol = (source?.currency || currency) === 'USD' ? '$' : 'S/.'
    
    doc.setFontSize(22); doc.setTextColor(79, 70, 229); doc.text("Resumen de Proyecto", 20, 20)
    doc.setFontSize(10); doc.setTextColor(100); doc.text(`Consultor: Angel Salguero | Fecha: ${finalData.fecha}`, 20, 28)
    doc.line(20, 32, 190, 32)
    
    doc.setFontSize(14); doc.setTextColor(0); doc.text(`Cliente: ${finalData.cliente}`, 20, 45)
    doc.setFontSize(11); 
    doc.text(`Empresa: ${finalData.empresa}  |  RUC: ${finalData.ruc || 'N/A'}`, 20, 52)
    doc.setTextColor(80); doc.setFontSize(10);
    doc.text(`Contacto: ${finalData.emailContacto || '-'}  |  Tel: ${finalData.telefono || '-'}`, 20, 58)
    if(finalData.direccion) doc.text(`Dirección: ${finalData.direccion}`, 20, 64)

    let y = 75 
    const addSection = (title, content, isList = true) => {
      if (!content || content.length === 0) return
      if (y > 270) { doc.addPage(); y = 20; }
      doc.setFontSize(12); doc.setTextColor(79, 70, 229); doc.text(title, 20, y); y += 7
      doc.setFontSize(10); doc.setTextColor(0)
      let text = (isList && Array.isArray(content)) ? content.join(', ') : content
      const lines = doc.splitTextToSize(text, 170)
      doc.text(lines, 20, y); y += (lines.length * 5) + 10 
    }

    addSection("PROBLEMAS DETECTADOS:", finalData.problemas)
    if (finalData.descripcionProblema) addSection("DETALLE TÉCNICO:", finalData.descripcionProblema, false)
    addSection("SOLUCIÓN TÉCNICA:", finalData.tecnologias)
    addSection("ENTREGABLES:", finalData.entregables)
    
    if (y > 260) { doc.addPage(); y = 20; }
    doc.setFontSize(12); doc.setTextColor(79, 70, 229); doc.text("PLANIFICACIÓN:", 20, y); y += 7
    doc.setFontSize(10); doc.setTextColor(0); doc.text(`Tiempo Estimado: ${finalData.plazo || 'A definir'}`, 20, y); y += 8
    doc.setFontSize(14); doc.text(`Inversión Total: ${symbol} ${finalData.presupuesto || '0.00'}`, 20, y)
    doc.save(`Cotizacion_${finalData.empresa || 'Proyecto'}.pdf`)
  }

  const descargarPDFHistorial = (item) => {
    const notas = item.clientes?.notas || ''
    const ex = (k) => (notas.match(new RegExp(`${k}:\\s*(.*)`)) || [])[1]?.trim() || ''
    const recData = {
      cliente: item.clientes?.nombre_contacto, empresa: item.clientes?.empresa,
      fecha: new Date(item.created_at).toLocaleDateString(),
      problemas: ex('PROBLEMAS').split(',').filter(Boolean),
      tecnologias: ex('STACK').split(',').filter(Boolean),
      presupuesto: item.presupuesto_estimado, currency: ex('MONEDA') || 'PEN',
      ruc: ex('RUC'), emailContacto: ex('EMAIL'), telefono: ex('TEL'), direccion: ex('DIR')
    }
    generarPDF(recData)
  }

  // --- UI HELPERS ---
  const openModal = (c) => { setModalOpen(c); setCustomText('') }
  const saveCustom = () => { if(customText) setData({...data, [modalOpen]:[...data[modalOpen], customText]}); setModalOpen(null) }
  const toggleSel = (c, v) => { const l=data[c]; setData({...data, [c]: l.includes(v)?l.filter(i=>i!==v):[...l, v]}) }

  // --- LOGIN ---
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
          <p style={{fontSize:'0.8rem', color:'#888', marginTop:'20px'}}>Acceso restringido a Angel Salguero</p>
        </div>
      </div>
    )
  }

  // --- WIZARD ---
  const renderSteps = () => (
    <div className="fade-in">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
        <h2 className="os-title">
          {step===1 && "1. Diagnóstico"} {step===2 && "2. Tecnologías"} {step===3 && "3. Alcance"} {step===4 && "4. Detalles"} {step===5 && "5. Resumen"}
        </h2>
        <span style={{fontSize:'0.85rem', color:'#888', background:'var(--card-bg)', padding:'5px 10px', borderRadius:'6px', border:'1px solid var(--border-color)'}}>Paso {step}/5</span>
      </div>

      {step === 1 && <>
        <p className="os-subtitle">Datos del cliente y puntos de dolor.</p>
        <div className="form-row"><input className="os-input" placeholder="Empresa" value={data.empresa} onChange={e=>setData({...data, empresa:e.target.value})}/><input className="os-input" placeholder="RUC / Tax ID" value={data.ruc} onChange={e=>setData({...data, ruc:e.target.value})}/></div>
        <div className="form-row"><input className="os-input" placeholder="Nombre Cliente" value={data.cliente} onChange={e=>setData({...data, cliente:e.target.value})}/><input className="os-input" placeholder="Cargo" value={data.cargo} onChange={e=>setData({...data, cargo:e.target.value})}/></div>
        <div className="form-row"><input className="os-input" placeholder="Email Contacto" value={data.emailContacto} onChange={e=>setData({...data, emailContacto:e.target.value})}/><input className="os-input" placeholder="Teléfono" value={data.telefono} onChange={e=>setData({...data, telefono:e.target.value})}/></div>
        <input className="os-input" placeholder="Dirección Fiscal (Opcional)" value={data.direccion} onChange={e=>setData({...data, direccion:e.target.value})}/>

        <h3 style={{fontSize:'1rem', margin:'20px 0 15px'}}>Problemas Detectados</h3>
        <div className="os-grid">
          {[...PROBLEMAS_BASE, ...data.problemas.filter(x => !PROBLEMAS_BASE.find(y => y.label===x))].map((p,i) => {
            const isBase = typeof p === 'object'; const label = isBase ? p.label : p; const renderIcon = isBase ? p.icon : <AlertTriangle size={32} color="#888"/>
            return <div key={i} className={`os-card ${data.problemas.includes(label)?'selected':''}`} onClick={()=>toggleSel('problemas', label)}><div style={{marginBottom:'10px', display:'flex', justifyContent:'center'}}>{renderIcon}</div><div style={{fontSize:'0.85rem', fontWeight: '500'}}>{label}</div></div>
          })}
          <div className="os-card" style={{borderStyle:'dashed', opacity:0.6}} onClick={()=>openModal('problemas')}><Plus size={32}/><div style={{marginTop:'5px', fontSize:'0.8rem'}}>Otro...</div></div>
        </div>
      </>}

      {step === 2 && <>
        <p className="os-subtitle">Stack Tecnológico.</p>
        <button onClick={() => handleChatSubmit("Basado en los problemas del cliente que seleccioné, ¿qué tecnologías de esta lista me recomiendas y por qué?")} style={{marginBottom: '20px', padding: '12px 20px', background: 'linear-gradient(45deg, #4f46e5, #9333ea)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', fontSize: '0.9rem', boxShadow: '0 4px 15px rgba(79, 70, 229, 0.3)'}}><Star size={18} fill="white" /> Sugerir Stack con IA</button>
        <div className="os-grid">
          {[...TECNOLOGIAS_BASE, ...data.tecnologias.filter(x => !TECNOLOGIAS_BASE.find(y => y.label===x))].map((t,i) => {
            const label = t.label || t
            let icon = '🚀'
            if (t.type === 'NewTech') icon = '🧊'; if (t.type === 'DevOps') icon = '🐳'; 
            if (t.type === 'Integration') icon = <Webhook size={32} color="#4f46e5" /> // NUEVO ICONO API
            const renderIcon = t.logo ? <img src={t.logo} alt={label} className="tech-logo" /> : <div style={{fontSize:'1.8rem', marginBottom:'5px'}}>{icon}</div>
            return <div key={i} className={`os-card ${data.tecnologias.includes(label)?'selected':''}`} onClick={()=>toggleSel('tecnologias', label)}>{renderIcon}<div style={{fontSize:'0.85rem'}}>{label}</div></div>
          })}
          <div className="os-card" style={{borderStyle:'dashed', opacity:0.6}} onClick={()=>openModal('tecnologias')}><Plus/></div>
        </div>
      </>}

      {step === 3 && <>
        <p className="os-subtitle">Alcance y Precio.</p>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'20px'}}>{['Urgente (2 sem)', '1 Mes', '3 Meses', '6 Meses', '8 Meses'].map(p=><button key={p} onClick={()=>setData({...data, plazo:p})} style={{padding:'12px', borderRadius:'8px', border:'1px solid var(--border-color)', background:data.plazo===p?'var(--accent-color)':'var(--input-bg)', color:data.plazo===p?'white':'var(--text-color)', fontSize:'0.9rem', cursor:'pointer'}}>{p}</button>)}</div>
        <div className="os-grid">{[...ENTREGABLES_BASE, ...data.entregables.filter(x => !ENTREGABLES_BASE.includes(x))].map((e,i)=><div key={i} className={`os-card ${data.entregables.includes(e)?'selected':''}`} style={{minHeight:'60px'}} onClick={()=>toggleSel('entregables', e)}>{e}</div>)}<div className="os-card" style={{borderStyle:'dashed', opacity:0.6, minHeight:'60px'}} onClick={()=>openModal('entregables')}><Plus size={24}/><div style={{fontSize:'0.8rem'}}>Otro...</div></div></div>
        <div style={{display:'flex', gap:'10px'}}>
          <input type="number" className="os-input" placeholder="0.00" value={data.presupuesto} onChange={e=>setData({...data, presupuesto:e.target.value})}/>
          <div className="currency-toggle"><button onClick={()=>setCurrency('PEN')} style={{background:currency==='PEN'?'var(--accent-color)':'transparent', color:currency==='PEN'?'white':'#888'}}>S/.</button><button onClick={()=>setCurrency('USD')} style={{background:currency==='USD'?'var(--accent-color)':'transparent', color:currency==='USD'?'white':'#888'}}>$</button></div>
        </div>
      </>}

      {/* PASO 4: DETALLES CON BOTÓN IA */}
      {step === 4 && <>
        <p className="os-subtitle">Detalles técnicos.</p>
        <button 
          onClick={() => handleChatSubmit("Genera una descripción técnica detallada del proyecto en base a los problemas y tecnologías seleccionadas. Sé formal y directo.")}
          style={{
            marginBottom: '15px', padding: '10px 15px', 
            background: 'var(--card-bg)', color: 'var(--text-color)',
            border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem'
          }}
        >
          <PenTool size={16} /> Redactar Detalles con IA
        </button>
        <div style={{background:'var(--card-bg)', padding:'20px', borderRadius:'10px', border:'1px solid var(--border-color)'}}>
           <textarea className="os-textarea" placeholder="Escribe aquí notas técnicas, restricciones o detalles específicos..." value={data.descripcionProblema} onChange={e=>setData({...data, descripcionProblema:e.target.value})}/>
        </div>
      </>}

      {step === 5 && <div style={{background:'var(--card-bg)', padding:'30px', borderRadius:'12px', border:'1px solid var(--border-color)', boxShadow:'0 4px 20px rgba(0,0,0,0.05)'}}>
        <h3 style={{color:'var(--accent-color)', marginTop:0}}>{data.empresa}</h3>
        <p><strong>Cliente:</strong> {data.cliente}</p>
        <p><strong>Problemas:</strong> {data.problemas.join(', ')}</p>
        <p><strong>Stack:</strong> {data.tecnologias.join(', ')}</p>
        <p style={{fontSize:'1.2rem'}}><strong>Total:</strong> {currency==='USD'?'$':'S/.'} {data.presupuesto}</p>
        <button onClick={() => generarPDF()} style={{marginTop:'25px', width:'100%', padding:'15px', background:'var(--text-color)', color:'var(--bg-color)', border:'none', borderRadius:'8px', cursor:'pointer', display:'flex', justifyContent:'center', gap:'10px', fontWeight:'bold'}}><Download size={20}/> Descargar PDF</button>
      </div>}
    </div>
  )

  return (
    <div className="os-container">
      {modalOpen && <div className="os-modal-overlay" onClick={()=>setModalOpen(null)}><div className="os-modal" onClick={e=>e.stopPropagation()}><h3>Agregar</h3><input autoFocus className="os-input" value={customText} onChange={e=>setCustomText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&saveCustom()}/><button className="btn-finish" style={{width:'100%'}} onClick={saveCustom}>Guardar</button></div></div>}

      <header className="os-header">
        <div className="os-logo" onClick={goHome}><Home size={20} color="var(--accent-color)"/> FreelanceOS</div>
        <div style={{display:'flex', gap:'10px'}}>
          <button onClick={handleLogout} title="Cerrar Sesión" style={{background:'transparent', border:'none', cursor:'pointer', color:'#ef4444'}}><LogOut size={20}/></button>
          <button onClick={()=>setView(view==='wizard'?'history':'wizard')} style={{background:'transparent', border:'none', cursor:'pointer', color:'var(--text-color)'}}><List size={22}/></button>
          <button onClick={toggleTheme} style={{background:'transparent', border:'none', cursor:'pointer', color:'var(--text-color)'}}>{theme==='dark'?<Sun size={22}/>:<Moon size={22}/>}</button>
        </div>
      </header>

      <div className="os-layout">
        <div className="os-workspace">
          <div className="os-scroll-area">
            {view === 'wizard' ? renderSteps() : (
              <div className="fade-in">
                <h2 className="os-title">Historial</h2>
                {historyData.map(item => (
                   <div key={item.id} className="history-card">
                      <div><strong style={{fontSize:'1.1rem'}}>{item.clientes?.nombre_contacto}</strong><div style={{color:'#888', fontSize:'0.9rem'}}>{item.clientes?.empresa}</div></div>
                      <div style={{display:'flex', gap:'10px'}}>
                        <button onClick={()=>descargarPDFHistorial(item)} style={{border:'none', background:'transparent', cursor:'pointer', color:'var(--text-color)'}}><Download/></button>
                        <button onClick={()=>borrarItem(item.id)} style={{border:'none', background:'transparent', cursor:'pointer', color:'#ef4444'}}><Trash2/></button>
                      </div>
                   </div>
                ))}
              </div>
            )}
          </div>
          {view === 'wizard' && <div className="workspace-footer">
            {step > 1 ? <button className="btn-nav btn-back" onClick={()=>setStep(step-1)}><ArrowLeft size={18}/> Atrás</button> : <div/>}
            {step < 5 ? <button className="btn-nav btn-next" onClick={()=>setStep(step+1)}>Siguiente <ArrowRight size={18}/></button> : <button className="btn-nav btn-finish" onClick={guardarProyecto}>{loading?'...':'Finalizar'} <Save size={18}/></button>}
          </div>}
        </div>

        <aside className="os-chat-sidebar">
          <div className="chat-header-simple"><Star size={16} color="var(--accent-color)"/> Copiloto IA</div>
          <div className="chat-messages">
            {Array.isArray(messages) && messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.role==='user'?'user':'ai'}`}><span dangerouslySetInnerHTML={{__html: (m.content || "").replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br/>')}} /></div>
            ))}
            {isTyping && <div className="chat-bubble ai" style={{fontStyle:'italic', opacity:0.6}}>Escribiendo...</div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input-area">
            <input className="os-input" style={{marginBottom:0}} placeholder="Pregunta algo..." value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleChatSubmit()}/>
            <button onClick={handleChatSubmit} disabled={!chatInput.trim()} style={{background:'var(--text-color)', color:'var(--bg-color)', border:'none', borderRadius:'6px', width:'40px', height:'40px', cursor:'pointer', display:'flex', justifyContent:'center', alignItems:'center'}}><Send size={18}/></button>
          </div>
        </aside>
      </div>
    </div>
  )
}