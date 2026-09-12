const goToHome=(event)=>{
  const button=event.target?.closest?.('.auth-back');
  if(!button||typeof window==='undefined')return;
  event.preventDefault();
  event.stopPropagation();
  window.location.assign(`${window.location.origin}${window.location.pathname}`);
};

document.addEventListener('click',goToHome,true);
