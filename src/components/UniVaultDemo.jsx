import { useState } from 'react';
import { Folder, FileText, ChevronRight, ChevronDown, Search, Download, GraduationCap, FileCode, BookOpen } from 'lucide-react';

// --- DATA MOCK (Tus ciclos reales) ---
const ACADEMIC_DATA = [
  {
    id: 'c6', name: 'Ciclo VI (Software)', courses: [
      { id: 'sw1', name: 'Ingeniería de Software I', files: [
          { name: 'Syllabus_2024.pdf', size: '1.2 MB', type: 'pdf' },
          { name: 'Diagramas_UML_Final.pdf', size: '3.5 MB', type: 'pdf' },
          { name: 'Proyecto_Arquitectura.zip', size: '15 MB', type: 'zip' }
      ]},
      { id: 'bd2', name: 'Base de Datos II', files: [
          { name: 'Lab_StoredProcedures.sql', size: '24 KB', type: 'code' },
          { name: 'Modelo_ER_Negocio.png', size: '2.1 MB', type: 'img' }
      ]}
    ]
  },
  {
    id: 'c7', name: 'Ciclo VII (Inteligencia)', courses: [
      { id: 'ia1', name: 'Inteligencia Artificial', files: [
          { name: 'Redes_Neuronales_Intro.pdf', size: '4.1 MB', type: 'pdf' },
          { name: 'Dataset_Entrenamiento.csv', size: '55 MB', type: 'data' }
      ]},
      { id: 'tesis1', name: 'Taller de Tesis I', files: [
          { name: 'Plantilla_Tesis_Oficial.docx', size: '1.2 MB', type: 'doc' },
          { name: 'Estado_del_Arte_Borrador.pdf', size: '800 KB', type: 'pdf' }
      ]}
    ]
  },
  {
    id: 'c9', name: 'Ciclo IX (Actual)', courses: [
      { id: 'gp', name: 'Gestión de Proyectos', files: [
          { name: 'Acta_Constitucion.pdf', size: '1.5 MB', type: 'pdf' },
          { name: 'Cronograma_Gantt.mpp', size: '5 MB', type: 'proj' }
      ]}
    ]
  }
];

export default function UniVaultDemo() {
  // CAMBIO 1: El estado ahora es una lista de TODOS los ciclos abiertos por defecto
  const [expandedCycles, setExpandedCycles] = useState(['c6', 'c7', 'c9']);
  
  const [selectedCourse, setSelectedCourse] = useState(ACADEMIC_DATA[2].courses[0]);
  const [searchTerm, setSearchTerm] = useState('');

  // CAMBIO 2: La función ahora agrega o quita IDs del array
  const toggleCycle = (id) => {
    setExpandedCycles(prev => 
      prev.includes(id) 
        ? prev.filter(c => c !== id) // Si está, lo quita (Cierra)
        : [...prev, id]              // Si no está, lo agrega (Abre)
    );
  };

  const getIcon = (type) => {
    if (type === 'pdf') return <FileText size={16} color="#ef4444" />;
    if (type === 'code') return <FileCode size={16} color="#3b82f6" />;
    return <BookOpen size={16} color="#10b981" />;
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
      
      {/* SIDEBAR (Navegación) */}
      <div style={{ width: '220px', background: '#f8fafc', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '15px', borderBottom: '1px solid #e2e8f0', display:'flex', alignItems:'center', gap:'8px', color:'#0f172a', fontWeight:'bold', fontSize:'0.85rem' }}>
            <GraduationCap size={18} /> MIS CICLOS
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 0' }}>
            {ACADEMIC_DATA.map(cycle => {
                // Verificamos si este ciclo específico está en la lista de abiertos
                const isOpen = expandedCycles.includes(cycle.id);

                return (
                    <div key={cycle.id}>
                        {/* Ciclo Header */}
                        <div 
                            onClick={() => toggleCycle(cycle.id)}
                            style={{ 
                                padding: '8px 15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px',
                                fontSize: '0.8rem', fontWeight: '600', color: '#475569',
                                background: isOpen ? '#e2e8f0' : 'transparent',
                                transition: 'background 0.2s'
                            }}
                        >
                            {isOpen ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}
                            <Folder size={14} fill={isOpen ? "#94a3b8" : "none"} />
                            {cycle.name}
                        </div>

                        {/* Lista de Cursos (Se muestra si isOpen es true) */}
                        {isOpen && (
                            <div style={{ paddingLeft: '20px' }}>
                                {cycle.courses.map(course => (
                                    <div 
                                        key={course.id}
                                        onClick={() => setSelectedCourse(course)}
                                        style={{ 
                                            padding: '6px 15px', cursor: 'pointer', fontSize: '0.75rem',
                                            color: selectedCourse.id === course.id ? '#2563eb' : '#64748b',
                                            background: selectedCourse.id === course.id ? '#dbeafe' : 'transparent',
                                            borderRight: selectedCourse.id === course.id ? '3px solid #2563eb' : 'none',
                                            display: 'flex', alignItems: 'center', gap: '8px'
                                        }}
                                    >
                                        <div style={{width:'4px', height:'4px', borderRadius:'50%', background: selectedCourse.id === course.id ? '#2563eb' : '#cbd5e1'}}></div>
                                        {course.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL (Archivos) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff' }}>
        
        {/* Barra de Búsqueda */}
        <div style={{ padding: '15px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                    type="text" 
                    placeholder={`Buscar en ${selectedCourse.name}...`} 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ 
                        width: '100%', padding: '8px 10px 8px 30px', borderRadius: '6px', 
                        border: '1px solid #cbd5e1', fontSize: '0.8rem', background: '#f8fafc', boxSizing: 'border-box'
                    }}
                />
            </div>
        </div>

        {/* Lista de Archivos */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '1rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Folder size={18} color="#eab308" fill="#eab308" />
                {selectedCourse.name}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '15px' }}>
                {selectedCourse.files.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase())).map((file, i) => (
                    <div key={i} className="file-card" style={{ 
                        border: '1px solid #e2e8f0', borderRadius: '8px', padding: '15px', 
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
                        cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.background = '#eff6ff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = 'white'; }}
                    >
                        <div style={{ width: '40px', height: '40px', background: '#fff', borderRadius: '8px', border:'1px solid #f1f5f9', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 5px rgba(0,0,0,0.05)' }}>
                            {getIcon(file.type)}
                        </div>
                        <div style={{ width: '100%' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</div>
                            <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '2px' }}>{file.size}</div>
                        </div>
                        <button style={{ width: '100%', border: 'none', background: 'transparent', color: '#3b82f6', fontSize: '0.7rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer' }}>
                            <Download size={12} /> Descargar
                        </button>
                    </div>
                ))}
            </div>
            {selectedCourse.files.length === 0 && (
                <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '20px', fontSize: '0.8rem' }}>Carpeta vacía</div>
            )}
        </div>
      </div>
    </div>
  );
}