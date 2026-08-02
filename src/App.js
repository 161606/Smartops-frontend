import React, { useState, useEffect } from 'react';

function App() {
  const [stats, setStats] = useState(null);
  const [builds, setBuilds] = useState([]);
  const [code, setCode] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    fetch('http://localhost:8000/stats')
      .then(res => res.json())
      .then(data => setStats(data));
    fetch('http://localhost:8000/builds')
      .then(res => res.json())
      .then(data => setBuilds(data));
  }, []);

  const reviewCode = async () => {
    setLoading(true);
    setReview('');
    const res = await fetch('http://localhost:8000/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    const data = await res.json();
    setReview(data.review);
    setLoading(false);
  };

  return (
    <div style={{display:'flex', minHeight:'100vh', backgroundColor:'#0a0f1e', fontFamily:"'Segoe UI', Arial, sans-serif"}}>
      
      {/* Sidebar */}
      <div style={{width:'220px', background:'#0d1526', borderRight:'1px solid #1e2d45', padding:'1.5rem 0', display:'flex', flexDirection:'column'}}>
        <div style={{padding:'0 1.5rem', marginBottom:'2rem'}}>
          <h2 style={{color:'#38bdf8', margin:0, fontSize:'1.3rem'}}>⚡ SmartOps</h2>
          <p style={{color:'#475569', margin:'4px 0 0', fontSize:'12px'}}>DevOps Platform</p>
        </div>
        {['dashboard', 'builds', 'ai-review'].map(tab => (
          <div key={tab} onClick={() => setActiveTab(tab)}
            style={{padding:'0.75rem 1.5rem', cursor:'pointer', color: activeTab === tab ? '#38bdf8' : '#64748b',
              background: activeTab === tab ? '#1e3a5f22' : 'transparent',
              borderLeft: activeTab === tab ? '3px solid #38bdf8' : '3px solid transparent',
              fontSize:'14px', fontWeight: activeTab === tab ? '600' : '400', transition:'all 0.2s'}}>
            {tab === 'dashboard' ? '📊 Dashboard' : tab === 'builds' ? '🔧 Builds' : '🤖 AI Review'}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div style={{flex:1, padding:'2rem', overflowY:'auto'}}>
        
        {/* Header */}
        <div style={{marginBottom:'2rem'}}>
          <h1 style={{color:'#f1f5f9', margin:0, fontSize:'1.8rem'}}>
            {activeTab === 'dashboard' ? '📊 Dashboard' : activeTab === 'builds' ? '🔧 Recent Builds' : '🤖 AI Code Review'}
          </h1>
          <p style={{color:'#64748b', margin:'4px 0 0', fontSize:'14px'}}>AI-powered DevOps Monitoring</p>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && stats && (
          <>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.25rem', marginBottom:'2rem'}}>
              {[
                {label:'Total Builds', value: stats.total_builds, color:'#38bdf8', icon:'🏗️'},
                {label:'Success Rate', value: stats.success_rate + '%', color:'#4ade80', icon:'✅'},
                {label:'AI Reviews', value: stats.ai_reviews, color:'#f59e0b', icon:'🤖'},
              ].map((item, i) => (
                <div key={i} style={{background:'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius:'16px', padding:'1.5rem', border:'1px solid #1e3a5f'}}>
                  <div style={{fontSize:'2rem', marginBottom:'0.5rem'}}>{item.icon}</div>
                  <p style={{color:'#64748b', margin:0, fontSize:'13px', textTransform:'uppercase', letterSpacing:'0.05em'}}>{item.label}</p>
                  <h2 style={{color: item.color, fontSize:'2.5rem', margin:'0.25rem 0 0', fontWeight:'700'}}>{item.value}</h2>
                </div>
              ))}
            </div>

            <div style={{background:'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius:'16px', padding:'1.5rem', border:'1px solid #1e3a5f'}}>
              <h3 style={{color:'#f1f5f9', marginTop:0}}>📈 Build Overview</h3>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
                <div style={{background:'#0f172a', borderRadius:'12px', padding:'1rem', textAlign:'center'}}>
                  <p style={{color:'#64748b', margin:0, fontSize:'12px'}}>Failed Builds</p>
                  <h3 style={{color:'#f87171', margin:'0.25rem 0 0', fontSize:'1.8rem'}}>{stats.failed_builds}</h3>
                </div>
                <div style={{background:'#0f172a', borderRadius:'12px', padding:'1rem', textAlign:'center'}}>
                  <p style={{color:'#64748b', margin:0, fontSize:'12px'}}>Avg Deploy Time</p>
                  <h3 style={{color:'#a78bfa', margin:'0.25rem 0 0', fontSize:'1.8rem'}}>{stats.avg_deploy_time}</h3>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Builds Tab */}
        {activeTab === 'builds' && (
          <div style={{display:'flex', flexDirection:'column', gap:'0.75rem'}}>
            {builds.map(build => (
              <div key={build.id} style={{background:'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius:'16px', padding:'1.25rem 1.5rem', border:'1px solid #1e3a5f', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                  <div style={{width:'40px', height:'40px', borderRadius:'10px', background: build.status === 'success' ? '#052e1622' : '#2d0a0a', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem'}}>
                    {build.status === 'success' ? '✅' : '❌'}
                  </div>
                  <div>
                    <p style={{color:'#f1f5f9', margin:0, fontWeight:'600'}}>{build.name}</p>
                    <p style={{color:'#64748b', margin:0, fontSize:'13px'}}>{build.commit}</p>
                  </div>
                </div>
                <div style={{textAlign:'right'}}>
                  <p style={{margin:0, color: build.status === 'success' ? '#4ade80' : '#f87171', fontWeight:'600', fontSize:'14px'}}>{build.status.toUpperCase()}</p>
                  <p style={{color:'#64748b', margin:'2px 0 0', fontSize:'13px'}}>⏱ {build.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI Review Tab */}
        {activeTab === 'ai-review' && (
          <div>
            <div style={{background:'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius:'16px', padding:'1.5rem', border:'1px solid #1e3a5f', marginBottom:'1.25rem'}}>
              <p style={{color:'#64748b', margin:'0 0 1rem', fontSize:'14px'}}>Paste your code below and get instant AI feedback on bugs, security issues, and improvements.</p>
              <textarea value={code} onChange={e => setCode(e.target.value)}
                placeholder="Paste your code here..."
                style={{width:'100%', height:'180px', background:'#0a0f1e', color:'#e2e8f0', border:'1px solid #1e3a5f', borderRadius:'10px', padding:'1rem', fontSize:'14px', fontFamily:'monospace', resize:'vertical', outline:'none'}}/>
              <button onClick={reviewCode} disabled={loading || !code}
                style={{marginTop:'1rem', background: loading ? '#1e3a5f' : 'linear-gradient(135deg, #38bdf8, #0ea5e9)', color:'#0a0f1e', border:'none', borderRadius:'10px', padding:'0.85rem 2rem', fontSize:'15px', fontWeight:'700', cursor: loading ? 'not-allowed' : 'pointer', transition:'all 0.2s'}}>
                {loading ? '⏳ Reviewing...' : '🤖 Review My Code'}
              </button>
            </div>
            {review && (
              <div style={{background:'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius:'16px', padding:'1.5rem', border:'1px solid #38bdf833'}}>
                <h3 style={{color:'#38bdf8', marginTop:0, display:'flex', alignItems:'center', gap:'8px'}}>🤖 AI Review Result</h3>
                <p style={{color:'#e2e8f0', lineHeight:'1.8', whiteSpace:'pre-wrap', fontSize:'14px'}}>{review}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;