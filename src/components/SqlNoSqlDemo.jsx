import { useState } from 'react';
import { Database, Server, Play, RotateCcw, Activity } from 'lucide-react';

export default function SqlNoSqlDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [round, setRound] = useState(0); 
  const [logs, setLogs] = useState([]);
  const [sqlProgress, setSqlProgress] = useState(0);
  const [noSqlProgress, setNoSqlProgress] = useState(0);
  const [sqlTime, setSqlTime] = useState(0);
  const [noSqlTime, setNoSqlTime] = useState(0);

  const addLog = (msg) => setLogs(prev => [...prev.slice(-2), msg]); // Solo guarda 3 últimos logs

  const runBenchmark = () => {
    if (isRunning) return;
    setIsRunning(true);
    setRound(1);
    setLogs([]);
    setSqlProgress(0); setNoSqlProgress(0);
    setSqlTime(0); setNoSqlTime(0);

    addLog("> Init Benchmark 1M records...");

    setTimeout(() => {
        addLog("⚡ TEST 1: Write Speed");
        simulateRace(2000, 1200, () => {
            setRound(2);
            setSqlProgress(0); setNoSqlProgress(0);
            addLog("🔄 TEST 2: Complex JOIN");
            simulateRace(1500, 3000, () => {
                setIsRunning(false);
                setRound(3);
                addLog("✅ Done.");
            });
        });
    }, 1000);
  };

  const simulateRace = (durationSql, durationNoSql, onComplete) => {
    const interval = 50;
    let elapsed = 0;
    const maxDuration = Math.max(durationSql, durationNoSql);

    const timer = setInterval(() => {
        elapsed += interval;
        if (elapsed <= durationSql) {
            setSqlProgress((elapsed / durationSql) * 100);
            setSqlTime(prev => prev + interval);
        }
        if (elapsed <= durationNoSql) {
            setNoSqlProgress((elapsed / durationNoSql) * 100);
            setNoSqlTime(prev => prev + interval);
        }
        if (elapsed >= maxDuration + 200) {
            clearInterval(timer);
            onComplete();
        }
    }, interval);
  };

  return (
    <div style={{ 
      background: '#0a0a0a', 
      borderRadius: '12px', 
      border: '1px solid #333', 
      overflow: 'hidden', 
      fontFamily: "'JetBrains Mono', monospace",
      width: '100%',
      // QUITAMOS LA ALTURA FIJA PARA QUE SE ADAPTE
      height: 'auto', 
      margin: '0 auto',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* HEADER ULTRA FINO (35px) */}
      <div style={{ padding: '0 15px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111', height: '35px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity color="#e11d48" size={14} />
            <span style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>DB Benchmark</span>
        </div>
        <div style={{ fontSize: '0.7rem', color: '#666' }}>1M Rows</div>
      </div>

      <div style={{ padding: '15px' }}>
        
        {/* PISTAS (GRILLA COMPACTA) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            {/* POSTGRES */}
            <div style={{ border: '1px solid #336791', borderRadius: '6px', padding: '10px', background: 'rgba(51, 103, 145, 0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#336791', fontWeight: 'bold', fontSize: '0.8rem' }}>
                        <Database size={14} /> SQL
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{sqlTime}ms</div>
                </div>
                <div style={{ height: '4px', background: '#222', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${sqlProgress}%`, height: '100%', background: '#336791', transition: 'width 0.1s linear' }}></div>
                </div>
            </div>

            {/* MONGO */}
            <div style={{ border: '1px solid #47A248', borderRadius: '6px', padding: '10px', background: 'rgba(71, 162, 72, 0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#47A248', fontWeight: 'bold', fontSize: '0.8rem' }}>
                        <Server size={14} /> NoSQL
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{noSqlTime}ms</div>
                </div>
                <div style={{ height: '4px', background: '#222', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${noSqlProgress}%`, height: '100%', background: '#47A248', transition: 'width 0.1s linear' }}></div>
                </div>
            </div>
        </div>

        {/* LOGS (REDUCIDO A 60px) */}
        <div style={{ background: '#111', padding: '8px', borderRadius: '6px', fontSize: '0.7rem', height: '100px', overflowY: 'hidden', border: '1px solid #333', marginBottom: '10px', color: '#aaa' }}>
            {logs.map((log, i) => (
                <div key={i} style={{ marginBottom: '2px' }}>{log}</div>
            ))}
            {isRunning && <span className="blink">_</span>}
        </div>

        {/* BOTONES */}
        <div style={{ textAlign: 'center' }}>
            {!isRunning && round === 0 && (
                <button onClick={runBenchmark} style={{ background: '#e11d48', color: '#fff', border: 'none', padding: '6px 20px', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                    <Play size={14} /> RUN TEST
                </button>
            )}
             {!isRunning && round === 3 && (
                 <button onClick={() => setRound(0)} style={{ background: 'transparent', color: '#fff', border: '1px solid #555', padding: '6px 15px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <RotateCcw size={12} /> RESET
                </button>
            )}
        </div>
      </div>
    </div>
  );
}