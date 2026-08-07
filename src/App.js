import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function App() {
  const [stats, setStats] = useState(null);
  const [builds, setBuilds] = useState([]);
  const [code, setCode] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/stats`)
      .then(res => res.json())
      .then(data => setStats(data));

    fetch(`${API_URL}/builds`)
      .then(res => res.json())
      .then(data => setBuilds(data));
  }, []);

  const reviewCode = async () => {
    setLoading(true);
    setReview('');
    const res = await fetch(`${API_URL}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    const data = await res.json();
    setReview(data.review);
    setLoading(false);
  };

  return (
    <div style={{backgroundColor:'#0f172a', minHeight:'100vh', padding:'2rem', fontFamily:'Arial'}}>
      <h1 style={{color:'#38bdf8', fontSize:'2rem', marginBottom:'0.5rem'}}>SmartOps Dashboard</h1>
      <p style={{color:'#94a3b8', marginBottom:'2rem'}}>AI-powered DevOps Monitoring</p>

      {stats && (
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem', marginBottom:'2rem'}}>
          <div style={{background:'#1e293b', borderRadius:'12px', padding:'1.5rem'}}>
            <p style={{color:'#94a3b8', margin:0}}>Total Builds</p>
            <h2 style={{color:'#fff', fontSize:'2rem', margin:'0.5rem 0'}}>{stats.total_builds}</h2>
          </div>
          <div style={{background:'#1e293b', borderRadius:'12px', padding:'1.5rem'}}>
            <p style={{color:'#94a3b8', margin:0}}>Success Rate</p>
            <h2 style={{color:'#4ade80', fontSize:'2rem', margin:'0.5rem 0'}}>{stats.success_rate}%</h2>
          </div>
          <div style={{background:'#1e293b', borderRadius:'12px', padding:'1.5rem'}}>
            <p style={{color:'#94a3b8', margin:0}}>AI Reviews</p>
            <h2 style={{color:'#f59e0b', fontSize:'2rem', margin:'0.5rem 0'}}>{stats.ai_reviews}</h2>
          </div>
        </div>
      )}

      <h2 style={{color:'#fff', marginBottom:'1rem'}}>Recent Builds</h2>
      <div style={{display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'2rem'}}>
        {builds.map(build => (
          <div key={build.id} style={{background:'#1e293b', borderRadius:'12px', padding:'1rem 1.5rem', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <p style={{color:'#fff', margin:0, fontWeight:'500'}}>{build.name}</p>
              <p style={{color:'#94a3b8', margin:0, fontSize:'13px'}}>{build.commit}</p>
            </div>
            <div style={{textAlign:'right'}}>
              <p style={{margin:0, color: build.status === 'success' ? '#4ade80' : '#f87171', fontWeight:'500'}}>{build.status}</p>
              <p style={{color:'#94a3b8', margin:0, fontSize:'13px'}}>{build.time}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{color:'#fff', marginBottom:'1rem'}}>🤖 AI Code Review</h2>
      <div style={{background:'#1e293b', borderRadius:'12px', padding:'1.5rem', marginBottom:'1rem'}}>
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="Paste your code here and click Review..."
          style={{width:'100%', height:'150px', background:'#0f172a', color:'#fff', border:'1px solid #334155', borderRadius:'8px', padding:'1rem', fontSize:'14px', fontFamily:'monospace', resize:'vertical'}}
        />
        <button
          onClick={reviewCode}
          disabled={loading || !code}
          style={{marginTop:'1rem', background:'#38bdf8', color:'#0f172a', border:'none', borderRadius:'8px', padding:'0.75rem 2rem', fontSize:'15px', fontWeight:'600', cursor:'pointer'}}
        >
          {loading ? 'Reviewing...' : '🤖 Review Code'}
        </button>
      </div>

      {review && (
        <div style={{background:'#1e293b', borderRadius:'12px', padding:'1.5rem'}}>
          <h3 style={{color:'#38bdf8', marginTop:0}}>AI Review Result</h3>
          <p style={{color:'#e2e8f0', lineHeight:'1.7', whiteSpace:'pre-wrap'}}>{review}</p>
        </div>
      )}
    </div>
  );
}

export default App;