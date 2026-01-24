import { useState, useEffect, useRef } from 'react';
import { Utensils, Clock, CheckCircle, Flame, Bell, PlusCircle, ChefHat } from 'lucide-react';

export default function GastroAppDemo() {
  const [orders, setOrders] = useState([
    { id: 101, table: 'Mesa 4', items: ['2x Hamburguesa Royal', '1x Papas Fritas'], status: 'cooking', time: '14:30' },
    { id: 102, table: 'Mesa 1', items: ['1x Ceviche Clásico', '1x Inka Cola'], status: 'pending', time: '14:32' },
  ]);

  const [isAutoMode, setIsAutoMode] = useState(false);
  const ordersEndRef = useRef(null);

  // Auto-scroll suave
  useEffect(() => {
    ordersEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [orders]);

  // Simulador de pedidos entrantes
  useEffect(() => {
    if (!isAutoMode) return;
    
    const interval = setInterval(() => {
        const newId = Math.floor(Math.random() * 900) + 100;
        const tables = ['Mesa 2', 'Mesa 5', 'Barra 1', 'Delivery'];
        const menus = [
            ['1x Lomo Saltado', '1x Chicha'],
            ['1x Pizza Americana', '2x Cerveza'],
            ['1x Ají de Gallina'],
            ['1x Maki Acevichado', '1x Limonada']
        ];
        const randomMenu = menus[Math.floor(Math.random() * menus.length)];
        
        const newOrder = {
            id: newId,
            table: tables[Math.floor(Math.random() * tables.length)],
            items: randomMenu,
            status: 'pending',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setOrders(prev => [...prev, newOrder]);
    }, 4000); // Nuevo pedido cada 4 segundos

    return () => clearInterval(interval);
  }, [isAutoMode]);

  // Avanzar estado del pedido
  const advanceStatus = (id) => {
    setOrders(prev => prev.map(order => {
        if (order.id !== id) return order;
        if (order.status === 'pending') return { ...order, status: 'cooking' };
        if (order.status === 'cooking') return { ...order, status: 'ready' };
        return order; // Si está ready, se queda ahí (o podría archivarse)
    }));
  };

  const getStatusColor = (status) => {
    switch(status) {
        case 'pending': return { bg: '#fee2e2', text: '#ef4444', icon: <Bell size={14}/>, label: 'Pendiente' };
        case 'cooking': return { bg: '#ffedd5', text: '#f97316', icon: <Flame size={14}/>, label: 'Cocinando' };
        case 'ready': return { bg: '#dcfce7', text: '#16a34a', icon: <CheckCircle size={14}/>, label: 'Listo' };
        default: return {};
    }
  };

  return (
    <div style={{ 
      background: '#1f2937', // Fondo oscuro (Ticketera moderna)
      borderRadius: '12px', 
      overflow: 'hidden', 
      fontFamily: "'Inter', sans-serif",
      width: '100%',
      maxWidth: '100%',
      height: '340px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #374151'
    }}>
      
      {/* HEADER POS */}
      <div style={{ background: '#111827', padding: '10px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #374151', height: '45px', boxSizing:'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white' }}>
            <ChefHat color="#f59e0b" size={20} />
            <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Kitchen Display System</span>
        </div>
        <button 
            onClick={() => setIsAutoMode(!isAutoMode)}
            style={{ 
                background: isAutoMode ? '#ef4444' : '#10b981', 
                color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', 
                fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px'
            }}
        >
            {isAutoMode ? '⏹ Detener Servicio' : '▶ Simular Turno'}
        </button>
      </div>

      {/* GRID DE TICKETS */}
      <div style={{ padding: '15px', overflowY: 'auto', flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px', alignContent: 'start' }}>
        
        {orders.map((order) => {
            const style = getStatusColor(order.status);
            return (
                <div key={order.id} className="fade-in" 
                    onClick={() => advanceStatus(order.id)}
                    style={{ 
                        background: 'white', 
                        borderRadius: '8px', 
                        padding: '10px',
                        cursor: order.status === 'ready' ? 'default' : 'pointer',
                        borderLeft: `4px solid ${style.text}`,
                        display: 'flex', flexDirection: 'column', gap: '8px',
                        opacity: order.status === 'ready' ? 0.8 : 1,
                        transition: 'transform 0.1s',
                        position: 'relative'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    {/* Header Ticket */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #e5e7eb', paddingBottom: '5px' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#111' }}>#{order.id}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#666' }}>
                            <Clock size={10} /> {order.time}
                        </div>
                    </div>
                    
                    {/* Mesa */}
                    <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#374151' }}>{order.table}</div>
                    
                    {/* Items */}
                    <div style={{ fontSize: '0.75rem', color: '#4b5563', flex: 1 }}>
                        {order.items.map((item, i) => <div key={i}>• {item}</div>)}
                    </div>

                    {/* Botón Estado */}
                    <div style={{ 
                        marginTop: 'auto', 
                        background: style.bg, 
                        color: style.text, 
                        padding: '6px', 
                        borderRadius: '4px', 
                        fontSize: '0.75rem', 
                        fontWeight: 'bold', 
                        textAlign: 'center',
                        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px'
                    }}>
                        {style.icon} {style.label}
                    </div>
                </div>
            );
        })}
        <div ref={ordersEndRef} />
      </div>

    </div>
  );
}