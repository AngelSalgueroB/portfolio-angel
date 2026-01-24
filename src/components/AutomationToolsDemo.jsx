import { useState, useEffect } from 'react';
import { FileSpreadsheet, FolderPlus, Scissors, Layers, Play, Check, FileText, ArrowRight, Loader2, HardDrive } from 'lucide-react';

// LISTA DE TUS HERRAMIENTAS REALES
const TOOLS = [
  { id: 'merge', name: 'Excel Merger', icon: <FileSpreadsheet size={18}/>, color: '#16a34a', desc: 'Unificar múltiples reportes .xlsx' },
  { id: 'folders', name: 'Folder Gen', icon: <FolderPlus size={18}/>, color: '#3b82f6', desc: 'Creación masiva de directorios' },
  { id: 'eraser', name: 'Img Eraser', icon: <Scissors size={18}/>, color: '#ef4444', desc: 'Recorte automático de imágenes' },
  { id: 'packing', name: 'Packing List', icon: <Layers size={18}/>, color: '#f59e0b', desc: 'Generador de Layouts y PL' },
];

export default function AutomationToolsDemo() {
  const [activeTool, setActiveTool] = useState(TOOLS[0]);
  const [status, setStatus] = useState('idle'); // idle, running, success
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);

  // Reset al cambiar de herramienta
  useEffect(() => {
    setStatus('idle');
    setLogs([]);
    setProgress(0);
  }, [activeTool]);

  const runTool = () => {
    if (status === 'running') return;
    setStatus('running');
    setLogs([`> Iniciando ${activeTool.name}...`]);
    setProgress(10);

    // SIMULACIÓN DE PROCESOS DIFERENTES
    let steps = [];
    
    if (activeTool.id === 'merge') {
        steps = [
            { p: 30, msg: 'Lectura: Reporte_Enero.xlsx (500 filas)' },
            { p: 60, msg: 'Lectura: Reporte_Febrero.xlsx (320 filas)' },
            { p: 80, msg: 'Fusionando datasets...' },
            { p: 100, msg: '¡Archivo MASTER_2026.xlsx generado! (820 filas)' }
        ];
    } else if (activeTool.id === 'folders') {
        steps = [
            { p: 20, msg: 'Leyendo lista: "proyectos.txt"' },
            { p: 50, msg: 'Creando: /OF-9000, /OF-9001, /OF-9002...' },
            { p: 80, msg: 'Verificando permisos de escritura...' },
            { p: 100, msg: '¡450 carpetas creadas exitosamente!' }
        ];
    } else {
        // Genérico para los otros
        steps = [
            { p: 40, msg: 'Analizando archivos de entrada...' },
            { p: 70, msg: 'Procesando lógica de negocio...' },
            { p: 100, msg: '¡Tarea completada con éxito!' }
        ];
    }

    // Ejecutar pasos con delay
    let currentStep = 0;
    const interval = setInterval(() => {
        if (currentStep >= steps.length) {
            clearInterval(interval);
            setStatus('success');
            return;
        }
        const step = steps[currentStep];
        setLogs(prev => [...prev, `> ${step.msg}`]);
        setProgress(step.p);
        currentStep++;
    }, 800);
  };

  return (
    <div style={{ 
      background: '#ffffff', 
      borderRadius: '12px', 
      overflow: 'hidden', 
      fontFamily: "'Inter', sans-serif",
      width: '100%',
      maxWidth: '100%',
      height: '340px',
      margin: '0 auto',
      display: 'flex',
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      
      {/* SIDEBAR DE HERRAMIENTAS */}
      <div style={{ width: '160px', background: '#f8fafc', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '15px', fontWeight: 'bold', fontSize: '0.85rem', color: '#475569', display:'flex', alignItems:'center', gap:'8px', borderBottom:'1px solid #e2e8f0' }}>
            <HardDrive size={16}/> WORKSPACE
        </div>
        <div style={{ flex: 1, padding: '10px' }}>
            {TOOLS.map(tool => (
                <button 
                    key={tool.id}
                    onClick={() => setActiveTool(tool)}
                    style={{ 
                        width: '100%', 
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px', marginBottom: '5px',
                        border: 'none', borderRadius: '6px',
                        background: activeTool.id === tool.id ? 'white' : 'transparent',
                        boxShadow: activeTool.id === tool.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                        color: activeTool.id === tool.id ? '#0f172a' : '#64748b',
                        fontWeight: activeTool.id === tool.id ? '600' : '400',
                        cursor: 'pointer', textAlign: 'left', fontSize: '0.8rem',
                        transition: 'all 0.2s'
                    }}
                >
                    <div style={{ color: tool.color }}>{tool.icon}</div>
                    {tool.name}
                </button>
            ))}
        </div>
      </div>

      {/* ÁREA DE TRABAJO */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
        
        {/* HEADER TOOL */}
        <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a', display:'flex', alignItems:'center', gap:'10px' }}>
                    <span style={{ color: activeTool.color }}>{activeTool.icon}</span> 
                    {activeTool.name}
                </h3>
                <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>{activeTool.desc}</p>
            </div>
            <button 
                onClick={runTool}
                disabled={status === 'running' || status === 'success'}
                style={{ 
                    background: status === 'success' ? '#22c55e' : '#0f172a', 
                    color: 'white', border: 'none', padding: '8px 20px', borderRadius: '6px', 
                    fontSize: '0.85rem', fontWeight: 'bold', cursor: status === 'running' ? 'wait' : 'pointer',
                    display: 'flex', alignItems: 'center', gap: '8px', opacity: status === 'running' ? 0.7 : 1
                }}
            >
                {status === 'running' ? <Loader2 size={16} className="spin"/> : status === 'success' ? <Check size={16}/> : <Play size={16}/>}
                {status === 'running' ? 'Procesando...' : status === 'success' ? 'Listo' : 'Ejecutar'}
            </button>
        </div>

        {/* VISUALIZACIÓN DE PROCESO */}
        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            
            {/* Si está inactivo */}
            {status === 'idle' && (
                <div style={{ textAlign: 'center', color: '#94a3b8', border: '2px dashed #e2e8f0', borderRadius: '8px', padding: '30px' }}>
                    <div style={{ margin: '0 auto 10px auto', width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '50%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <ArrowRight size={20} />
                    </div>
                    <p style={{ fontSize: '0.9rem' }}>Listo para iniciar. Haz clic en "Ejecutar".</p>
                </div>
            )}

            {/* Si está corriendo o terminó */}
            {(status === 'running' || status === 'success') && (
                <div className="fade-in">
                    {/* Barra de Progreso */}
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.8rem', fontWeight: '600', color: '#475569' }}>
                            <span>Progreso de tarea</span>
                            <span>{progress}%</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${progress}%`, height: '100%', background: activeTool.color, transition: 'width 0.5s ease' }}></div>
                        </div>
                    </div>

                    {/* Terminal de Logs */}
                    <div style={{ background: '#1e293b', borderRadius: '8px', padding: '15px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#e2e8f0', height: '120px', overflowY: 'auto', border: '1px solid #0f172a' }}>
                        {logs.map((log, i) => (
                            <div key={i} style={{ marginBottom: '4px', display:'flex', gap:'8px' }}>
                                <span style={{ color: activeTool.color }}>➜</span> {log}
                            </div>
                        ))}
                        {status === 'running' && <span className="blink">_</span>}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}