import { useState, useEffect } from 'react';
import { Play, FileCode, Database, Terminal, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';


// --- DATOS MOCK PARA LA DEMO ---
const DIRTY_DATA = [
  { id: '1001', date: '2025/01/01', product: 'Laptop ', region: 'Norte', price: '1200', status: 'dirty' },
  { id: '1001', date: '2025/01/01', product: 'Laptop', region: 'Norte', price: '1200', status: 'error' }, // Duplicado
  { id: '1002', date: '02-01-25', product: null, region: 'Sur', price: null, status: 'error' }, // Nulos
  { id: '1003', date: '2025/01/03', product: 'mOuSe', region: 'este', price: '25.50', status: 'dirty' }, // Texto sucio
];

const CLEAN_DATA = [
  { id: '1001', date: '2025-01-01', product: 'Laptop', region: 'NORTE', price: 1200.00, total: 1200.00 },
  { id: '1003', date: '2025-01-03', product: 'Mouse', region: 'ESTE', price: 25.50, total: 25.50 },
];

const PYTHON_CODE = `
        import { useState, useEffect } from 'react';
        import { Play, FileCode, Database, Terminal, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

        class DataCleanerBot:
    def transform(self):
        """Limpieza y Normalización"""
        print("⚙️ Iniciando proceso...")
        
        # 1. Eliminar duplicados
        self.df.drop_duplicates(inplace=True)

        # 2. Manejo de Nulos
        self.df.dropna(subset=['Producto'], inplace=True)
        
        # 3. Normalización
        self.df['Producto'] = self.df['Producto'].str.title().strip()
        self.df['Region'] = self.df['Region'].str.upper()

        # 4. Cálculo de KPI
        self.df['Total'] = self.df['Cantidad'] * self.df['Precio']`;

export default function DataCleanerDemo() {
  const [activeTab, setActiveTab] = useState('code'); // code | run
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setFinished(false);
    setLogs([]);
    setProgress(0);
    setActiveTab('run');

    const steps = [
      { msg: "> python main.py", delay: 500 },
      { msg: "📥 Cargando dataset 'ventas_sucias.csv'...", delay: 1200 },
      { msg: "⚠️ Detectadas 4 filas con inconsistencias.", delay: 2000 },
      { msg: "⚙️ Eliminando duplicados...", delay: 2800 },
      { msg: "⚙️ Normalizando textos y fechas...", delay: 3500 },
      { msg: "⚙️ Calculando columnas calculadas (Power BI)...", delay: 4200 },
      { msg: "📤 Guardando 'ventas_limpias.csv'...", delay: 5000 },
      { msg: "✅ Proceso ETL finalizado con éxito.", delay: 5500, type: 'success' }
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setIsRunning(false);
        setFinished(true);
        return;
      }

      const step = steps[currentStep];
      setLogs(prev => [...prev, step]);
      setProgress(((currentStep + 1) / steps.length) * 100);
      currentStep++;

    }, 800);
  };

  return (
    <div style={{ 
      background: '#0f0f0f', 
      borderRadius: '12px', 
      border: '1px solid #333', 
      overflow: 'hidden', 
      fontFamily: 'monospace',
      width: '100%',
      maxWidth: '100%',
      // --- ALTURA FIJA REDUCIDA ---
      height: '340px',
      // ----------------------------
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* HEADER WINDOW (30px) */}
      <div style={{ background: '#1a1a1a', padding: '8px 15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #333', height: '35px', boxSizing:'border-box' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
        </div>
        <div style={{ color: '#888', fontSize: '0.75rem' }}>DataCleanerBot v1.0</div>
        <div></div>
      </div>

      {/* TABS (35px) */}
      <div style={{ display: 'flex', borderBottom: '1px solid #333', background: '#111', height: '35px' }}>
        <button onClick={() => setActiveTab('code')} style={{ padding: '0 20px', background: activeTab==='code'?'#1e1e1e':'transparent', color: activeTab==='code'?'#fff':'#666', border: 'none', borderRight:'1px solid #333', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.8rem' }}>
          <FileCode size={14} /> Fuente
        </button>
        <button onClick={() => setActiveTab('run')} style={{ padding: '0 20px', background: activeTab==='run'?'#1e1e1e':'transparent', color: activeTab==='run'?'#fff':'#666', border: 'none', borderRight:'1px solid #333', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.8rem' }}>
          <Terminal size={14} /> Consola
        </button>
      </div>

      {/* CONTENT (Resto del espacio) */}
      <div style={{ padding: '15px', flex: 1, background: '#0a0a0a', overflowY: 'auto' }}>
        
        {/* VISTA CÓDIGO */}
        {activeTab === 'code' && (
          <div style={{ position: 'relative' }}>
             <pre style={{ margin: 0, color: '#d4d4d4', fontSize: '0.8rem', lineHeight: '1.4' }}>
               {PYTHON_CODE.split('\n').slice(0, 10).map((line, i) => ( // Solo mostramos primeras 10 lineas para ahorrar espacio
                 <div key={i}>
                   <span style={{ color: '#444', marginRight: '15px' }}>{i + 1}</span>
                   <span dangerouslySetInnerHTML={{ __html: line.replace(/def |class /g, '<span style="color:#ff3333">$&</span>').replace(/self/g, '<span style="color:#569cd6">self</span>') }} />
                 </div>
               ))}
               <div style={{color:'#666', fontStyle:'italic', marginTop:'5px'}}>... (código completo abajo)</div>
             </pre>
             <button onClick={() => setActiveTab('run')} style={{ position: 'absolute', bottom: '0', right: '0', background: '#ff3333', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize:'0.8rem', display:'flex', gap:'5px', alignItems:'center' }}>
               <Play size={14} /> Probar Bot
             </button>
          </div>
        )}

        {/* VISTA EJECUCIÓN */}
        {activeTab === 'run' && (
          <div>
            {!isRunning && !finished && (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                 <Database size={32} color="#444" style={{marginBottom:'10px'}} />
                 <p style={{color:'#888', marginBottom:'15px', fontSize:'0.9rem'}}>Dataset cargado: 5k registros.</p>
                 <button onClick={runSimulation} style={{ background: '#ff3333', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem', display:'inline-flex', gap:'8px', alignItems:'center' }}>
                    <Play size={16} /> Iniciar ETL
                 </button>
              </div>
            )}

            {(isRunning || finished) && (
              <div>
                {/* TERMINAL COMPACTA */}
                <div style={{ background: '#1e1e1e', padding: '10px', borderRadius: '6px', marginBottom: '10px', fontFamily: 'monospace', fontSize: '0.75rem', height: '110px', overflowY: 'auto' }}>
                  {logs.map((log, i) => <div key={i} style={{ marginBottom: '3px', color: log.type === 'success' ? '#4ade80' : '#ccc' }}>{log.msg}</div>)}
                  {isRunning && <span className="blink">_</span>}
                </div>

                {isRunning && <div style={{ width: '100%', height: '4px', background: '#333', borderRadius: '2px', overflow: 'hidden' }}><div style={{ width: `${progress}%`, height: '100%', background: '#ff3333', transition: 'width 0.3s' }}></div></div>}

                {finished && (
                  <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div style={{ border: '1px solid #ef4444', borderRadius: '6px', padding: '8px', background: 'rgba(239,68,68,0.05)' }}>
                         <div style={{color:'#ef4444', fontSize:'0.7rem', fontWeight:'bold', marginBottom:'5px'}}>ANTES</div>
                         {DIRTY_DATA.slice(0,2).map((row, i) => <div key={i} style={{fontSize:'0.65rem', color:'#888'}}>{row.product || 'NULL'} | {row.price || 'NULL'}</div>)}
                      </div>
                      <div style={{ border: '1px solid #4ade80', borderRadius: '6px', padding: '8px', background: 'rgba(74,222,128,0.05)' }}>
                         <div style={{color:'#4ade80', fontSize:'0.7rem', fontWeight:'bold', marginBottom:'5px'}}>DESPUÉS</div>
                         {CLEAN_DATA.slice(0,2).map((row, i) => <div key={i} style={{fontSize:'0.65rem', color:'#ddd'}}>{row.product} | ${row.total}</div>)}
                      </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
);
}