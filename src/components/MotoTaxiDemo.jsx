import { useState, useEffect } from 'react';
import { MapPin, Navigation, CheckCircle, User, Clock, Star, Map } from 'lucide-react';

export default function MotoTaxiDemo() {
  const [status, setStatus] = useState('idle'); // idle, searching, in_transit, completed
  const [progress, setProgress] = useState(0);

  // Simulación del viaje
  useEffect(() => {
    let interval;
    if (status === 'in_transit') {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus('completed');
            return 100;
          }
          return prev + 1; // Velocidad del viaje
        });
      }, 50); // ~5 segundos de viaje total
    }
    return () => clearInterval(interval);
  }, [status]);

  const requestRide = () => {
    setStatus('searching');
    setProgress(0);
    setTimeout(() => {
      setStatus('in_transit');
    }, 1500);
  };

  const resetRide = () => {
    setStatus('idle');
    setProgress(0);
  };

  // Cálculo exacto de la posición del mototaxi en las calles
  // Longitud total del path = 350 unidades
  const dist = (progress / 100) * 350;
  let taxiX = 40;
  let taxiY = 90;
  
  if (dist <= 120) {
      taxiX = 40 + dist;
      taxiY = 90;
  } else if (dist <= 170) {
      taxiX = 160;
      taxiY = 90 + (dist - 120);
  } else {
      taxiX = 160 + (dist - 170);
      taxiY = 140;
  }

  const pathData = "M 40 90 L 160 90 L 160 140 L 340 140";

  return (
    <div style={{ background: '#111827', borderRadius: '8px', overflow: 'hidden', fontFamily: "'Inter', sans-serif", width: '100%', height: '340px', display: 'flex', flexDirection: 'column', border: '1px solid #374151', position: 'relative' }}>
      
      {/* HEADER TIPO APP */}
      <div style={{ background: '#0a0a0a', padding: '12px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2a2a2a', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white' }}>
            <Map color="#10b981" size={18} />
            <span style={{ fontWeight: '600', fontSize: '0.9rem', letterSpacing: '0.5px' }}>MotoTracker App</span>
        </div>
        {status === 'completed' && (
            <button onClick={resetRide} style={{ background: 'transparent', color: '#9ca3af', border: '1px solid #374151', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.2s' }}>Nuevo Viaje</button>
        )}
      </div>

      {/* ÁREA DEL MAPA TOP-DOWN */}
      <div style={{ flex: 1, background: '#1f2937', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* Renderizado de calles y manzanas (SVG) */}
        <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
           
           {/* Grid de fondo sutil */}
           <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
             <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
           </pattern>
           <rect width="100%" height="100%" fill="url(#grid)" />

           {/* Manzanas (City Blocks) */}
           <rect x="10" y="10" width="130" height="60" fill="#111827" rx="4" stroke="#374151" strokeWidth="1" />
           <rect x="180" y="10" width="210" height="110" fill="#111827" rx="4" stroke="#374151" strokeWidth="1" />
           <rect x="10" y="110" width="130" height="80" fill="#111827" rx="4" stroke="#374151" strokeWidth="1" />
           <rect x="180" y="160" width="210" height="30" fill="#111827" rx="4" stroke="#374151" strokeWidth="1" />

           {/* Ruta y Calles */}
           {(status === 'in_transit' || status === 'completed') && (
             <>
               {/* Calle base */}
               <path d={pathData} fill="none" stroke="#374151" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
               {/* Línea de ruta activa */}
               <path d={pathData} fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - progress} />
               
               {/* Puntos A y B */}
               <circle cx="40" cy="90" r="4" fill="#ef4444" />
               <circle cx="340" cy="140" r="4" fill="#10b981" />

               {/* Icono de Mototaxi en movimiento */}
               <g style={{ transform: `translate(${taxiX}px, ${taxiY}px)`, transition: 'transform 0.05s linear' }}>
                  <circle cx="0" cy="0" r="10" fill="#f59e0b" />
                  {/* Vector personalizado de Mototaxi */}
                  <svg x="-7" y="-7" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12h1m16 0h1M5 12v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M7 12V8a4 4 0 0 1 8 0v4M12 8v4M7 18v2M17 18v2M4 12l-1 2v4M20 12l1 2v4" />
                  </svg>
               </g>
             </>
           )}
        </svg>

        {/* Tarjetas superpuestas de UI */}
        <div style={{ marginTop: 'auto', padding: '15px', zIndex: 5, width: '100%', boxSizing: 'border-box' }}>
            
            {status === 'idle' && (
                <div className="fade-in" style={{ background: '#111827', padding: '15px', borderRadius: '6px', border: '1px solid #374151' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#e5e7eb', fontSize: '0.9rem' }}>¿A dónde vamos?</h4>
                    <div style={{ background: '#1f2937', padding: '10px', borderRadius: '4px', marginBottom: '12px', color: '#9ca3af', fontSize: '0.8rem', border: '1px solid #374151' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}><div style={{width:'6px', height:'6px', background:'#ef4444', borderRadius:'50%'}}></div> Av. Central 123</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{width:'6px', height:'6px', background:'#10b981', borderRadius:'50%'}}></div> Óvalo Miraflores</div>
                    </div>
                    <button onClick={requestRide} style={{ width: '100%', background: '#f59e0b', color: '#111827', border: 'none', padding: '10px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer', transition: 'opacity 0.2s' }}>Solicitar Mototaxi (S/ 8.50)</button>
                </div>
            )}

            {status === 'searching' && (
                <div className="fade-in" style={{ background: '#111827', padding: '20px', borderRadius: '6px', textAlign: 'center', border: '1px solid #374151' }}>
                    <div className="spin" style={{ margin: '0 auto 10px auto', width: '24px', height: '24px', border: '2px solid #374151', borderTopColor: '#f59e0b', borderRadius: '50%' }}></div>
                    <p style={{ margin: 0, color: '#e5e7eb', fontSize: '0.85rem' }}>Asignando mototaxi cercano...</p>
                </div>
            )}

            {status === 'in_transit' && (
                <div className="fade-in" style={{ background: '#111827', padding: '15px', borderRadius: '6px', border: '1px solid #374151' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '50%', padding: '6px', color: '#f59e0b' }}><User size={16}/></div>
                            <div>
                                <div style={{ color: '#e5e7eb', fontWeight: '600', fontSize: '0.85rem' }}>Carlos Mendoza</div>
                                <div style={{ color: '#9ca3af', fontSize: '0.7rem', display: 'flex', alignItems: 'center' }}><Star size={10} fill="#f59e0b" color="#f59e0b" style={{marginRight: '2px'}}/> 4.9 • TVS King Roja</div>
                            </div>
                        </div>
                        <div style={{ background: '#1e3a8a', color: '#60a5fa', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>En Ruta</div>
                    </div>
                </div>
            )}

            {status === 'completed' && (
                <div className="fade-in" style={{ background: '#111827', padding: '15px', borderRadius: '6px', border: '1px solid #10b981' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#10b981', marginBottom: '15px' }}>
                        <CheckCircle size={18} />
                        <h3 style={{ margin: 0, fontSize: '1rem' }}>Viaje Terminado</h3>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.8rem' }}>
                        <div style={{ color: '#9ca3af', display: 'flex', alignItems:'center', gap:'5px' }}><Clock size={12}/> Tiempo: <strong style={{ color: '#e5e7eb' }}>12 min</strong></div>
                        <div style={{ color: '#9ca3af', display: 'flex', alignItems:'center', gap:'5px' }}><Navigation size={12}/> Distancia: <strong style={{ color: '#e5e7eb' }}>4.2 km</strong></div>
                        <div style={{ color: '#9ca3af', gridColumn: 'span 2', borderTop: '1px solid #374151', paddingTop: '8px', marginTop: '4px' }}>Cobro final: <strong style={{ color: '#10b981', fontSize: '1rem' }}>S/ 8.50</strong></div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}