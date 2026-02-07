import { useState, useEffect, useRef } from 'react';
import { Wallet, TrendingUp, TrendingDown, Plus, CreditCard, Home, PieChart, LogOut } from 'lucide-react';
import '../App.css';

// --- CONFIGURACIÓN COMPACTA ---
const INITIAL_INCOME = 3200.00; 

// LISTA REORDENADA: 2 Gastos primero, 1 Ingreso al final
const DEMO_TRANSACTIONS = [
  { id: 1, title: 'Supermercado Metro', category: 'Comida', amount: 150.50, type: 'expense' },
  { id: 2, title: 'Spotify Premium', category: 'Entretenimiento', amount: 18.90, type: 'expense' },
  { id: 3, title: 'Cobro Alquiler Depa', category: 'Vivienda', amount: 800.00, type: 'income' }, // <--- AHORA ES INGRESO
];

export default function FinanceHubDemo() {
  const [balance, setBalance] = useState(INITIAL_INCOME);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState(INITIAL_INCOME); // Nuevo estado para ingresos
  
  const [transactions, setTransactions] = useState([
    { id: 0, title: 'Sueldo Mensual', category: 'Ingreso', amount: INITIAL_INCOME, type: 'income', date: '2026-01-23' }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [highlightBalance, setHighlightBalance] = useState(false);

  const listEndRef = useRef(null);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transactions]);

  const runSimulation = () => {
    if (isSimulating) return;
    
    // Obtenemos la transacción actual cíclicamente
    const currentTx = DEMO_TRANSACTIONS[simStep % DEMO_TRANSACTIONS.length];
    
    setIsSimulating(true);
    let text = currentTx.title;
    let index = 0;

    const typingInterval = setInterval(() => {
      setInputValue(text.slice(0, index + 1));
      index++;

      if (index === text.length) {
        clearInterval(typingInterval);
        
        setTimeout(() => {
          addTransaction(currentTx);
          setInputValue("");
          setIsSimulating(false);
          setSimStep(prev => prev + 1);
        }, 400);
      }
    }, 40); 
  };

  // Lógica inteligente: Suma o Resta según el tipo
  const addTransaction = (tx) => {
    const newTx = {
      id: Date.now(),
      title: tx.title,
      category: tx.category,
      amount: tx.amount,
      type: tx.type, // 'income' o 'expense'
      date: 'Hoy'
    };

    setTransactions(prev => [...prev, newTx]);

    if (tx.type === 'expense') {
        setExpenseTotal(prev => prev + tx.amount);
        setBalance(prev => prev - tx.amount);
    } else {
        setIncomeTotal(prev => prev + tx.amount);
        setBalance(prev => prev + tx.amount); // ¡Aquí suma!
    }
    
    // Efecto visual
    setHighlightBalance(true);
    setTimeout(() => setHighlightBalance(false), 800);
  };

  const formatMoney = (amount) => {
    return `S/ ${amount.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`;
  };

  // ... (Los imports y constantes DEMO_TRANSACTIONS siguen igual) ...

// BUSCA EL RETURN Y REEMPLÁZALO POR ESTE:
return (
    <div style={{ 
      background: '#f3f4f6', 
      borderRadius: '12px', 
      overflow: 'hidden', 
      fontFamily: "'Inter', sans-serif",
      width: '100%',
      maxWidth: '100%',
      // --- CAMBIO CLAVE: ALTURA FIJA REDUCIDA ---
      height: '340px', 
      // ------------------------------------------
      margin: '0 auto',
      border: '1px solid #e5e7eb',
      display: 'flex',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
    }}>
      
      {/* SIDEBAR MÁS ANGOSTA */}
      <div style={{ width: '45px', background: '#0f0f0f', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0', gap: '15px', flexShrink: 0 }}>
        <div style={{ width: '28px', height: '28px', background: '#e11d48', borderRadius: '6px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'5px' }}>
            <Wallet color="white" size={14} />
        </div>
        <Home color="#666" size={16} />
        <CreditCard color="#fff" size={16} />
        <PieChart color="#666" size={16} />
        <div style={{ marginTop: 'auto' }}>
            <LogOut color="#ef4444" size={16} />
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* HEADER SUPER COMPACTO */}
        <div style={{ padding: '12px 15px', background: '#fff', borderBottom: '1px solid #e5e7eb', zIndex: 10 }}>
            
            {/* CARDS MÁS PEQUEÑAS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                {/* Ingresos */}
                <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    <div style={{ color: '#64748b', fontSize: '0.65rem', textTransform: 'uppercase' }}>Ingresos</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#16a34a' }}>{formatMoney(incomeTotal)}</div>
                </div>
                {/* Gastos */}
                <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    <div style={{ color: '#64748b', fontSize: '0.65rem', textTransform: 'uppercase' }}>Gastos</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#e11d48' }}>{formatMoney(expenseTotal)}</div>
                </div>
                {/* Balance */}
                <div style={{ background: highlightBalance?'#e0f2fe':'#f0fdf4', padding: '8px 10px', borderRadius: '6px', border: '1px solid', borderColor: highlightBalance?'#7dd3fc':'#bbf7d0', transition: 'all 0.3s' }}>
                    <div style={{ color: '#64748b', fontSize: '0.65rem', textTransform: 'uppercase' }}>Disponible</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#16a34a' }}>{formatMoney(balance)}</div>
                </div>
            </div>

            {/* INPUT */}
            <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                    type="text" value={inputValue} placeholder="Esperando..." readOnly
                    style={{ flex: 1, padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f1f5f9', color:'#334155', fontSize: '0.8rem' }}
                />
                <button onClick={runSimulation} disabled={isSimulating} style={{ background: isSimulating ? '#94a3b8' : (DEMO_TRANSACTIONS[simStep % DEMO_TRANSACTIONS.length].type === 'income' ? '#16a34a' : '#e11d48'), color: 'white', border: 'none', padding: '0 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    {isSimulating ? '...' : <><Plus size={14}/> Simular</>}
                </button>
            </div>
        </div>

        {/* LISTA */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px', background: '#f8fafc' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {transactions.map((tx) => (
                    <div key={tx.id} className="fade-in" style={{ background: 'white', padding: '8px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #e2e8f0', borderLeft: `3px solid ${tx.type === 'income' ? '#16a34a' : '#e11d48'}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: tx.type === 'income' ? '#dcfce7' : '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {tx.type === 'income' ? <TrendingUp size={14} color="#16a34a"/> : <TrendingDown size={14} color="#e11d48"/>}
                            </div>
                            <div>
                                <div style={{ fontWeight: '600', fontSize: '0.8rem', color: '#334155' }}>{tx.title}</div>
                            </div>
                        </div>
                        <div style={{ fontWeight: '600', fontSize: '0.8rem', color: tx.type === 'income' ? '#16a34a' : '#e11d48' }}>
                            {tx.type === 'expense' ? '-' : '+'} {Math.abs(tx.amount)}
                        </div>
                    </div>
                ))}
                <div ref={listEndRef} />
            </div>
        </div>
      </div>
    </div>
);
}