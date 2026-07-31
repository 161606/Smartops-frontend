import React from 'react';

function App() {
  return (
    <div style={{backgroundColor:'#0f172a', minHeight:'100vh', padding:'2rem', fontFamily:'Arial'}}>
      <h1 style={{color:'#38bdf8', fontSize:'2rem', marginBottom:'0.5rem'}}>
        SmartOps Dashboard
      </h1>
      <p style={{color:'#94a3b8', marginBottom:'2rem'}}>
        AI-powered DevOps Monitoring
      </p>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem'}}>
        <div style={{background:'#1e293b', borderRadius:'12px', padding:'1.5rem'}}>
          <p style={{color:'#94a3b8', margin:0}}>Total Builds</p>
          <h2 style={{color:'#fff', fontSize:'2rem', margin:'0.5rem 0'}}>24</h2>
        </div>
        <div style={{background:'#1e293b', borderRadius:'12px', padding:'1.5rem'}}>
          <p style={{color:'#94a3b8', margin:0}}>Success Rate</p>
          <h2 style={{color:'#4ade80', fontSize:'2rem', margin:'0.5rem 0'}}>87%</h2>
        </div>
        <div style={{background:'#1e293b', borderRadius:'12px', padding:'1.5rem'}}>
          <p style={{color:'#94a3b8', margin:0}}>AI Reviews</p>
          <h2 style={{color:'#f59e0b', fontSize:'2rem', margin:'0.5rem 0'}}>12</h2>
        </div>
      </div>
    </div>
  );
}

export default App;