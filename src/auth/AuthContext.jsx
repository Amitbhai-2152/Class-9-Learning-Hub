import React,{createContext,useContext,useEffect,useMemo,useState}from'react';
import {supabase,supabaseConfigured}from'../lib/supabaseClient.js';
import {scheduleAuthenticatedSync,syncAuthenticatedUser}from'../engines/progress/supabaseSync.js';

const AuthContext=createContext(null);
const AUTH_OPTIONS={persistSession:true,autoRefreshToken:true,detectSessionInUrl:true};

export function AuthProvider({children}){
  const[session,setSession]=useState(null);
  const[loading,setLoading]=useState(supabaseConfigured);
  const[syncStatus,setSyncStatus]=useState(supabaseConfigured?'idle':'offline');
  const[syncError,setSyncError]=useState('');

  useEffect(()=>{
    if(!supabase){setLoading(false);setSyncStatus('offline');return undefined;}
    let active=true;
    supabase.auth.getSession().then(({data})=>{
      if(!active)return;
      const next=data.session||null;
      setSession(next);setLoading(false);setSyncStatus(next?'syncing':'idle');
      if(next)syncAuthenticatedUser(next.user).then(()=>active&&setSyncStatus('synced')).catch(error=>{if(active){setSyncStatus('error');setSyncError(String(error?.message||error||'Cloud sync failed'))}});
    }).catch(error=>{if(active){setLoading(false);setSyncStatus('error');setSyncError(String(error?.message||error||'Session load failed'))}});
    const{data:subscription}=supabase.auth.onAuthStateChange((_event,nextSession)=>{
      if(!active)return;
      setSession(nextSession||null);setSyncError('');
      if(nextSession){
        setSyncStatus('syncing');
        scheduleAuthenticatedSync(nextSession.user,250)();
      }else setSyncStatus('idle');
    });
    const onDone=()=>active&&setSyncStatus('synced');
    const onError=event=>{if(active){setSyncStatus('error');setSyncError(String(event?.detail?.message||'Cloud sync failed'))}};
    window.addEventListener('class9-cloud-sync-complete',onDone);
    window.addEventListener('class9-cloud-sync-error',onError);
    return()=>{active=false;subscription?.subscription?.unsubscribe?.();window.removeEventListener('class9-cloud-sync-complete',onDone);window.removeEventListener('class9-cloud-sync-error',onError)};
  },[]);

  useEffect(()=>{
    if(!user?.id)return undefined;
    const onProgress=()=>{setSyncStatus('syncing');scheduleAuthenticatedSync(user)()};
    const onXP=()=>{setSyncStatus('syncing');scheduleAuthenticatedSync(user)()};
    window.addEventListener('class9-progress-updated',onProgress);
    window.addEventListener('class9-xp-updated',onXP);
    return()=>{window.removeEventListener('class9-progress-updated',onProgress);window.removeEventListener('class9-xp-updated',onXP)};
  },[session]);

  const user=session?.user||null;
  const value=useMemo(()=>({...AUTH_OPTIONS,session,user,loading,configured:supabaseConfigured,syncStatus,syncError}),[session,user,loading,syncStatus,syncError]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(){
  const value=useContext(AuthContext);
  if(!value)throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
