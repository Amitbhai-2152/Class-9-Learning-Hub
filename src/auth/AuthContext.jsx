import React,{createContext,useContext,useEffect,useMemo,useState}from'react';
import {supabase,supabaseConfigured}from'../lib/supabaseClient.js';

const AuthContext=createContext(null);

export function AuthProvider({children}){
  const[session,setSession]=useState(null);
  const[loading,setLoading]=useState(supabaseConfigured);

  useEffect(()=>{
    if(!supabase){setLoading(false);return undefined;}
    let active=true;
    supabase.auth.getSession().then(({data})=>{if(active){setSession(data.session||null);setLoading(false);}}).catch(()=>{if(active)setLoading(false);});
    const{data:subscription}=supabase.auth.onAuthStateChange((_event,nextSession)=>{
      if(active)setSession(nextSession||null);
    });
    return()=>{active=false;subscription?.subscription?.unsubscribe?.()};
  },[]);

  const value=useMemo(()=>({session,user:session?.user||null,loading,configured:supabaseConfigured}),[session,loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(){
  const value=useContext(AuthContext);
  if(!value)throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
