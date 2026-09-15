import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('WorkSphere render error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:24,background:'#f8fafc',fontFamily:'Inter,system-ui,sans-serif'}}>
          <div style={{width:'min(680px,100%)',background:'#fff',border:'1px solid #e2e8f0',borderRadius:18,padding:28,boxShadow:'0 20px 50px rgba(15,23,42,.08)'}}>
            <div style={{fontSize:34,marginBottom:10}}>⚠️</div>
            <h1 style={{margin:'0 0 8px',fontSize:24,color:'#0f172a'}}>WorkSphere could not start</h1>
            <p style={{color:'#64748b',lineHeight:1.6}}>The React app reached the browser, but a runtime error stopped the page. The exact error is shown below so it does not stay on an endless loading screen.</p>
            <pre style={{whiteSpace:'pre-wrap',wordBreak:'break-word',background:'#0f172a',color:'#e2e8f0',padding:16,borderRadius:12,fontSize:13,overflow:'auto'}}>{String(this.state.error?.message || this.state.error)}</pre>
            <button onClick={()=>window.location.reload()} style={{border:0,borderRadius:10,padding:'11px 16px',background:'#2563eb',color:'#fff',fontWeight:700,cursor:'pointer'}}>Reload App</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
