import { useState } from 'react';
import { ShoppingCart, CreditCard, ArrowLeft, Trash2, CheckCircle, Store, Monitor, Watch, Headphones, Shirt } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: 'Monitor 4K 27"', price: 850, icon: <Monitor size={22}/> },
  { id: 2, name: 'Smartwatch Pro', price: 350, icon: <Watch size={22}/> },
  { id: 3, name: 'Audífonos Bass+', price: 120, icon: <Headphones size={22}/> },
  { id: 4, name: 'Casaca Denim', price: 150, icon: <Shirt size={22}/> }
];

export default function EcommerceDemo() {
  const [view, setView] = useState('store'); // store, cart, paying, success
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const processPayment = () => {
    setView('paying');
    setTimeout(() => {
      setView('success');
    }, 2000);
  };

  return (
    <div style={{ background: '#111827', borderRadius: '8px', overflow: 'hidden', fontFamily: "'Inter', sans-serif", width: '100%', height: '340px', display: 'flex', flexDirection: 'column', border: '1px solid #374151' }}>
      
      {/* NAVEGACIÓN SUPERIOR */}
      <div style={{ background: '#0a0a0a', padding: '12px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2a2a2a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e5e7eb' }}>
            {view !== 'store' && view !== 'success' && view !== 'paying' ? (
                <button onClick={() => setView('store')} style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: 0, display:'flex' }}><ArrowLeft size={16}/></button>
            ) : <Store color="#10b981" size={18} />}
            <span style={{ fontWeight: '600', fontSize: '0.9rem', letterSpacing: '0.5px' }}>Retail E-Commerce</span>
        </div>
        
        {view === 'store' && (
            <button onClick={() => setView('cart')} style={{ background: '#1f2937', color: '#e5e7eb', border: '1px solid #374151', padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}>
                <ShoppingCart size={14} color={cart.length > 0 ? '#10b981' : '#9ca3af'} /> 
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
            </button>
        )}
      </div>

      {/* VISTA 1: TIENDA (PRODUCTOS) */}
      {view === 'store' && (
        <div className="fade-in" style={{ padding: '15px', overflowY: 'auto', flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', alignContent: 'start', background: '#111827' }}>
            {PRODUCTS.map((p) => (
                <div key={p.id} style={{ background: '#1f2937', borderRadius: '6px', padding: '12px', display: 'flex', flexDirection: 'column', border: '1px solid #374151' }}>
                    <div style={{ color: '#9ca3af', marginBottom: '10px', display:'flex', justifyContent:'center' }}>{p.icon}</div>
                    <div style={{ color: '#e5e7eb', fontWeight: '500', fontSize: '0.8rem', textAlign: 'center' }}>{p.name}</div>
                    <div style={{ color: '#10b981', fontSize: '0.8rem', marginBottom: '12px', textAlign: 'center' }}>S/ {p.price}.00</div>
                    <button onClick={() => addToCart(p)} style={{ marginTop: 'auto', width: '100%', background: '#e5e7eb', color: '#111827', border: 'none', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer', fontWeight: '600', transition: 'opacity 0.2s' }}>Agregar</button>
                </div>
            ))}
        </div>
      )}

      {/* VISTA 2: CARRITO DE COMPRAS */}
      {view === 'cart' && (
        <div className="fade-in" style={{ padding: '15px', display: 'flex', flexDirection: 'column', flex: 1, background: '#111827' }}>
            <h3 style={{ color: '#e5e7eb', margin: '0 0 15px 0', fontSize: '0.9rem', fontWeight: '600' }}>Resumen de Orden</h3>
            <div style={{ flex: 1, overflowY: 'auto' }}>
                {cart.length === 0 ? (
                    <div style={{ color: '#6b7280', textAlign: 'center', marginTop: '40px', fontSize: '0.85rem' }}>El carrito está vacío</div>
                ) : (
                    cart.map((item, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1f2937', padding: '10px', borderRadius: '4px', marginBottom: '8px', border: '1px solid #374151' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ color: '#9ca3af' }}>{item.icon}</span>
                                <div>
                                    <div style={{ color: '#e5e7eb', fontSize: '0.8rem', fontWeight: '500' }}>{item.name}</div>
                                    <div style={{ color: '#10b981', fontSize: '0.75rem' }}>S/ {item.price}.00</div>
                                </div>
                            </div>
                            <button onClick={() => removeFromCart(index)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}><Trash2 size={14}/></button>
                        </div>
                    ))
                )}
            </div>
            {cart.length > 0 && (
                <div style={{ marginTop: '10px', paddingTop: '15px', borderTop: '1px solid #374151' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#e5e7eb', fontSize: '0.9rem', fontWeight: '600', marginBottom: '15px' }}>
                        <span>Total:</span>
                        <span>S/ {total}.00</span>
                    </div>
                    <button onClick={processPayment} style={{ width: '100%', background: '#10b981', color: '#111827', border: 'none', padding: '10px', borderRadius: '4px', fontWeight: '600', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                        <CreditCard size={16}/> Pagar Orden
                    </button>
                </div>
            )}
        </div>
      )}

      {/* VISTA 3: PROCESANDO PAGO */}
      {view === 'paying' && (
        <div className="fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#111827' }}>
             <div className="spin" style={{ width: '30px', height: '30px', border: '3px solid #374151', borderTopColor: '#10b981', borderRadius: '50%', marginBottom: '15px' }}></div>
             <h3 style={{ color: '#e5e7eb', margin: '0 0 5px 0', fontSize: '0.9rem' }}>Procesando Tarjeta...</h3>
             <p style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Cifrando conexión</p>
        </div>
      )}

      {/* VISTA 4: COMPRA EXITOSA */}
      {view === 'success' && (
        <div className="fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center', background: '#111827' }}>
             <div style={{ color: '#10b981', marginBottom: '15px' }}><CheckCircle size={40}/></div>
             <h3 style={{ color: '#e5e7eb', margin: '0 0 8px 0', fontSize: '1rem' }}>¡Pago Aprobado!</h3>
             <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: '25px', lineHeight: '1.5' }}>La orden <strong style={{color: '#e5e7eb'}}>#ORD-5023</strong> ha sido registrada en el sistema logístico.</p>
             <button onClick={() => { setCart([]); setView('store'); }} style={{ background: '#1f2937', color: '#e5e7eb', border: '1px solid #374151', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500', fontSize: '0.8rem' }}>Volver al catálogo</button>
        </div>
      )}

    </div>
  );
}