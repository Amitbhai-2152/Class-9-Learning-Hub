import React,{useEffect,useMemo,useState}from'react';
import {AUTH_REDIRECT_URL,supabase,supabaseConfigured}from'../lib/supabaseClient.js';
import {useAuth}from'./AuthContext.jsx';
import './auth.css';

const friendlyError=(error)=>{
  const message=String(error?.message||'').trim();
  const lower=message.toLowerCase();
  if(!message)return 'कुछ गलत हो गया। कृपया फिर से प्रयास करें।';
  if(lower.includes('invalid login credentials'))return 'ईमेल या पासवर्ड सही नहीं है।';
  if(lower.includes('email not confirmed'))return 'पहले अपने ईमेल की पुष्टि करें, फिर लॉग इन करें।';
  if(lower.includes('user already registered'))return 'यह ईमेल पहले से पंजीकृत है। लॉग इन करें या पासवर्ड रीसेट करें।';
  if(lower.includes('password')&&lower.includes('weak'))return 'पासवर्ड थोड़ा मजबूत रखें।';
  if(lower.includes('rate limit'))return 'बहुत अधिक प्रयास हुए हैं। थोड़ी देर बाद फिर प्रयास करें।';
  return message.length>140?`${message.slice(0,137)}…`:message;
};

const strength=(password)=>{
  if(!password)return {score:0,label:'पासवर्ड दर्ज करें'};
  let score=0;
  if(password.length>=8)score++;
  if(password.length>=12)score++;
  if(/[A-Z]/.test(password)&&/[a-z]/.test(password))score++;
  if(/\d/.test(password))score++;
  if(/[^A-Za-z0-9]/.test(password))score++;
  if(score<=1)return{score,label:'कमज़ोर'};
  if(score<=3)return{score,label:'ठीक'};
  return{score,label:'मज़बूत'};
};

function goHome(){
  if(typeof window==='undefined')return;
  const url=new URL(window.location.href);url.search='';url.hash='';window.history.pushState({},'',url);window.dispatchEvent(new PopStateEvent('popstate'));
}

export function AccountNavControl(){
  const{user,loading,configured}=useAuth();
  if(loading)return <button className="auth-nav-chip auth-nav-loading" aria-label="खाता लोड हो रहा है"><span className="auth-orb"/><span>खाता</span></button>;
  return <button className="auth-nav-chip" onClick={()=>{const url=new URL(window.location.href);url.search='?page=account';window.history.pushState({},'',url);window.dispatchEvent(new PopStateEvent('popstate'))}}>
    <span className="auth-nav-avatar">{user?(user.user_metadata?.full_name||user.email||'U').slice(0,1).toUpperCase():'◉'}</span>
    <span>{user?'मेरा खाता':configured?'लॉग इन':'खाता'}</span>
  </button>;
}

function ConfigNotice(){return <div className="auth-config-note"><div className="auth-config-icon">⚙</div><div><strong>Supabase अभी कनेक्ट नहीं है</strong><p><code>VITE_SUPABASE_URL</code> और <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> configure करने के बाद यह स्क्रीन live authentication के साथ काम करेगी।</p></div></div>}

export default function AuthPage(){
  const{user,loading}=useAuth();
  const[view,setView]=useState('signin');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[confirm,setConfirm]=useState('');
  const[name,setName]=useState('');
  const[busy,setBusy]=useState(false);
  const[notice,setNotice]=useState(null);
  const[showPassword,setShowPassword]=useState(false);
  const pwd=useMemo(()=>strength(password),[password]);

  useEffect(()=>{
    if(typeof window==='undefined'||!supabase)return;
    const onRecovery=()=>setView('reset');
    const{data}=supabase.auth.onAuthStateChange(event=>{if(event==='PASSWORD_RECOVERY')onRecovery()});
    if(window.location.hash.includes('type=recovery'))onRecovery();
    return()=>data?.subscription?.unsubscribe?.();
  },[]);

  useEffect(()=>{
    if(user&&view!=='reset')setView('account');
  },[user]);

  const execute=async()=>{
    setNotice(null);
    if(!supabaseConfigured||!supabase){setNotice({type:'info',text:'पहले Supabase environment variables configure करें।'});return;}
    if(view==='signin'&&!email.trim())return setNotice({type:'error',text:'अपना ईमेल दर्ज करें।'});
    if(['signin','signup','reset'].includes(view)&&!password)return setNotice({type:'error',text:'पासवर्ड दर्ज करें।'});
    if(view==='signup'&&name.trim().length<2)return setNotice({type:'error',text:'अपना नाम दर्ज करें।'});
    if(view==='signup'&&password!==confirm)return setNotice({type:'error',text:'दोनों पासवर्ड समान होने चाहिए।'});
    if(view==='reset'&&pwd.score<2)return setNotice({type:'error',text:'नया पासवर्ड थोड़ा मजबूत रखें।'});
    setBusy(true);
    try{
      if(view==='signin'){
        const{error}=await supabase.auth.signInWithPassword({email:email.trim(),password});
        if(error)throw error;
      }else if(view==='signup'){
        const{data,error}=await supabase.auth.signUp({email:email.trim(),password,options:{data:{full_name:name.trim()},emailRedirectTo:AUTH_REDIRECT_URL()}});
        if(error)throw error;
        if(data.session){setNotice({type:'success',text:'खाता तैयार है। आपका learning profile शुरू हो गया।'});}else{setNotice({type:'success',text:'Verification email भेजा गया है। ईमेल confirm करके वापस आएँ।'});setPassword('');setConfirm('');}
      }else if(view==='reset'){
        const{error}=await supabase.auth.updateUser({password});
        if(error)throw error;
        setNotice({type:'success',text:'पासवर्ड अपडेट हो गया। अब आपका खाता सुरक्षित है।'});setPassword('');setConfirm('');setView('account');
      }
    }catch(error){setNotice({type:'error',text:friendlyError(error)})}
    finally{setBusy(false)}
  };

  const sendReset=async()=>{
    setNotice(null);
    if(!supabaseConfigured||!supabase)return setNotice({type:'info',text:'पहले Supabase environment variables configure करें।'});
    if(!email.trim())return setNotice({type:'error',text:'पासवर्ड रीसेट के लिए ईमेल दर्ज करें।'});
    setBusy(true);
    try{const{error}=await supabase.auth.resetPasswordForEmail(email.trim(),{redirectTo:AUTH_REDIRECT_URL()});if(error)throw error;setNotice({type:'success',text:'Password reset link आपके ईमेल पर भेज दिया गया है।'});}catch(error){setNotice({type:'error',text:friendlyError(error)})}finally{setBusy(false)}
  };

  const signOut=async()=>{if(!supabase)return;setBusy(true);try{await supabase.auth.signOut();setView('signin');setNotice({type:'success',text:'आप सुरक्षित रूप से लॉग आउट हो गए।'});}finally{setBusy(false)}};

  if(loading)return <main className="auth-page auth-page-loading"><div className="auth-loader-orbit"><span/><span/><span/></div><strong>आपका secure account लोड हो रहा है…</strong></main>;

  if(view==='account'&&user)return <main className="auth-page"><div className="auth-shell auth-account-shell"><button className="auth-back" onClick={goHome}>← होम पर जाएँ</button><section className="account-hero"><div className="account-glow"/><div className="account-avatar">{(user.user_metadata?.full_name||user.email||'U').slice(0,1).toUpperCase()}</div><div><span className="auth-kicker">SECURE LEARNING ACCOUNT</span><h1>{user.user_metadata?.full_name||'नमस्ते, learner!'}</h1><p>{user.email}</p></div><span className="verified-pill">● Signed in</span></section><section className="account-grid"><article className="account-card account-card-primary"><span className="card-icon">☁</span><div><small>SYNC READY</small><h2>आपकी पढ़ाई cloud-ready है</h2><p>अगले चरण में canonical progress, quiz attempts और achievements को सुरक्षित तरीके से account के साथ sync किया जाएगा।</p></div></article><article className="account-card"><span className="card-icon">✦</span><div><small>IDENTITY</small><h2>स्थायी learner ID</h2><p className="mono">{user.id}</p></div></article><article className="account-card"><span className="card-icon">✉</span><div><small>EMAIL</small><h2>Email verified flow</h2><p>Verification और recovery links Supabase Auth से handle होते हैं।</p></div></article><article className="account-card"><span className="card-icon">⌁</span><div><small>SECURITY</small><h2>Session protected</h2><p>Session persistence और automatic token refresh client layer में enabled हैं।</p></div></article></section><button className="auth-danger-button" onClick={signOut} disabled={busy}>{busy?'Logging out…':'↪ सुरक्षित लॉग आउट'}</button></div></main>;

  return <main className="auth-page"><div className="auth-bg-shape auth-bg-shape-a"/><div className="auth-bg-shape auth-bg-shape-b"/><div className="auth-shell"><button className="auth-back" onClick={goHome}>← वापस</button><section className="auth-showcase"><div className="auth-brand-mark"><span>प</span></div><span className="auth-kicker">CLASS 9 • LEARNING HUB</span><h1>आपकी पढ़ाई,<br/><em>आपके account</em> के साथ।</h1><p>Progress, practice और achievements को एक secure learning identity के साथ जोड़ें।</p><div className="auth-feature-row"><span>✓ Secure session</span><span>✓ Email recovery</span><span>✓ Cloud-ready</span></div><div className="auth-visual-card"><div className="auth-mini-bar"><span/><span/><span/></div><div className="auth-mini-chart"><i/><i/><i/><i/><i/></div><strong>Learning progress</strong><small>Ready for your next session</small></div></section><section className="auth-card"><div className="auth-card-top"><span className="auth-status-dot"/><small>{view==='signin'?'WELCOME BACK':view==='signup'?'CREATE ACCOUNT':view==='forgot'?'ACCOUNT RECOVERY':'SET NEW PASSWORD'}</small></div>{view!=='forgot'&&view!=='reset'&&<div className="auth-tabs"><button className={view==='signin'?'active':''} onClick={()=>{setView('signin');setNotice(null)}}>लॉग इन</button><button className={view==='signup'?'active':''} onClick={()=>{setView('signup');setNotice(null)}}>नया खाता</button></div>}{view==='forgot'?<><h2>पासवर्ड भूल गए?</h2><p className="auth-muted">अपना registered email दें। हम reset link भेजेंगे।</p><label>ईमेल<input value={email} onChange={e=>setEmail(e.target.value)} type="email" autoComplete="email" placeholder="you@example.com"/></label><button className="auth-primary-button" onClick={sendReset} disabled={busy}>{busy?'लिंक भेज रहे हैं…':'Reset link भेजें →'}</button><button className="auth-link-button" onClick={()=>{setView('signin');setNotice(null)}}>← लॉग इन पर वापस</button></>:view==='reset'?<><h2>नया पासवर्ड सेट करें</h2><p className="auth-muted">आपका recovery link valid है। नया secure password चुनें।</p><label>नया पासवर्ड<div className="password-wrap"><input value={password} onChange={e=>setPassword(e.target.value)} type={showPassword?'text':'password'} autoComplete="new-password" placeholder="कम से कम 8 characters"/><button type="button" onClick={()=>setShowPassword(v=>!v)}>{showPassword?'छुपाएँ':'दिखाएँ'}</button></div></label><PasswordStrength value={pwd}/><label>पासवर्ड फिर से लिखें<input value={confirm} onChange={e=>setConfirm(e.target.value)} type={showPassword?'text':'password'} autoComplete="new-password" placeholder="पासवर्ड दोबारा लिखें"/></label><button className="auth-primary-button" onClick={execute} disabled={busy}>{busy?'अपडेट हो रहा है…':'पासवर्ड अपडेट करें →'}</button></>:<><h2>{view==='signin'?'स्वागत है 👋':'अपना learner account बनाएँ'}</h2><p className="auth-muted">{view==='signin'?'अपने learning journey पर वापस आएँ।':'एक account से आपकी future cloud sync journey शुरू होगी।'}</p>{view==='signup'&&<label>पूरा नाम<input value={name} onChange={e=>setName(e.target.value)} autoComplete="name" placeholder="आपका नाम"/></label>}<label>ईमेल<input value={email} onChange={e=>setEmail(e.target.value)} type="email" autoComplete="email" placeholder="you@example.com"/></label><label>पासवर्ड<div className="password-wrap"><input value={password} onChange={e=>setPassword(e.target.value)} type={showPassword?'text':'password'} autoComplete={view==='signin'?'current-password':'new-password'} placeholder="आपका password"/><button type="button" onClick={()=>setShowPassword(v=>!v)}>{showPassword?'छुपाएँ':'दिखाएँ'}</button></div></label>{view==='signup'&&<><PasswordStrength value={pwd}/><label>पासवर्ड फिर से लिखें<input value={confirm} onChange={e=>setConfirm(e.target.value)} type={showPassword?'text':'password'} autoComplete="new-password" placeholder="पासवर्ड दोबारा लिखें"/></label></>}{notice&&<div className={`auth-alert ${notice.type}`}>{notice.type==='success'?'✓':notice.type==='error'?'!':'i'}<span>{notice.text}</span></div>}<button className="auth-primary-button" onClick={execute} disabled={busy}>{busy?(view==='signin'?'लॉग इन हो रहा है…':'account तैयार हो रहा है…'):view==='signin'?'लॉग इन करें →':'खाता बनाएँ →'}</button>{view==='signin'&&<button className="auth-link-button" onClick={()=>{setView('forgot');setNotice(null)}}>पासवर्ड भूल गए?</button>}</>}{!supabaseConfigured&&<ConfigNotice/>}<p className="auth-footnote">Supabase Auth • secure identity layer • local-first learning stays intact</p></section></div></main>;
}

function PasswordStrength({value}){return <div className="password-strength"><div className="strength-line">{[0,1,2,3,4].map(i=><span key={i} className={i<value.score?'on':''}/>)}</div><small>{value.label}</small></div>}
