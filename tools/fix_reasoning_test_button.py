from pathlib import Path

p = Path('src/ReasoningHubPremium.jsx')
s = p.read_text(encoding='utf-8')

old = "<button key={k} className={k==='learn'?'active':''} onClick={()=>setMode(k)}><b>{m.icon} {m.label}</b>"
new = "<button type=\"button\" key={k} className={k==='learn'?'active':''} onClick={e=>{e.preventDefault();e.stopPropagation();setMode(k)}}><b>{m.icon} {m.label}</b>"
if old not in s:
    raise SystemExit('modebar button pattern not found')
s = s.replace(old, new, 1)

# Make the chapter start button equally explicit.
old2 = "<button onClick={()=>setMode('practice')}>Practice शुरू करें →</button>"
new2 = "<button type=\"button\" onClick={e=>{e.preventDefault();e.stopPropagation();setMode('practice')}}>Practice शुरू करें →</button>"
if old2 in s:
    s = s.replace(old2, new2, 1)

p.write_text(s, encoding='utf-8')
print('reasoning test button patched')
