import { createClient } from '@supabase/supabase-js';

const supabaseUrl=String(import.meta.env.VITE_SUPABASE_URL||'').trim();
const supabaseKey=String(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY||import.meta.env.VITE_SUPABASE_ANON_KEY||'').trim();

export const supabaseConfigured=Boolean(supabaseUrl&&supabaseKey);

export const supabase=supabaseConfigured
  ? createClient(supabaseUrl,supabaseKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}})
  : null;

export const AUTH_REDIRECT_URL=()=>{
  if(typeof window==='undefined')return '';
  return `${window.location.origin}${window.location.pathname}?page=account`;
};
