import React, { useState, useEffect } from 'react';

function App() {
  const [stats, setStats] = useState(null);
  const [builds, setBuilds] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/stats')
      .then(res => res.json())
      .then(data => setStats(data));

    fetch('http://localhost:8000/builds')
      .then(res => res.json())
      .then(data => setBuilds(data));
  }, []);

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
      <div style={{display:'flex', flexDirection:'column', gap:'0.75rem'}}>
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
    </div>
  );
}

export default App;