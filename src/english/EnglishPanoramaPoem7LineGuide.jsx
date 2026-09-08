import React from 'react';

const sections=[
 {title:'Stanza 1 — Grass as resilience',lines:[
  ['Line 1','The speaker compares himself with grass and establishes resilience as the central image.'],
  ['Line 2','He says that an outside force can cut him down, just as grass can be cut.'],
  ['Line 3','After being cut, he will return and begin growing again.'],
  ['Line 4','Growth will continue after the setback.'],
  ['Line 5','He will recover from the damage and regain strength.']
 ]},
 {title:'Stanza 2 — Destruction cannot erase identity',lines:[
  ['Line 6','Visible signs or markers can be completely destroyed.'],
  ['Line 7','The poem imagines universities being attacked and destroyed.'],
  ['Line 8','Hostels may be reduced to broken ruins.'],
  ['Line 9','Even slum communities may suffer severe destructive force.'],
  ['Line 10','Despite physical destruction, the speaker’s identity cannot be wiped out.'],
  ['Line 11','He again explains this survival through the image of grass.'],
  ['Line 12','He will return and grow again after the destruction.'],
  ['Line 13','His renewed growth will spread as a green covering over the damaged place.']
 ]},
 {title:'Stanza 3 — Recovery after destruction',lines:[
  ['Line 14','The poem extends its destructive imagery to Bangla.'],
  ['Line 15','Sangrur is also imagined as suffering destruction.'],
  ['Line 16','The destructive image expands to the whole district of Ludhiana.'],
  ['Line 17','The district is imagined as being reduced to ashes.'],
  ['Line 18','The speaker insists that such destruction will not last forever.'],
  ['Line 19','He allows a broad span of time for recovery before the greenery returns.'],
  ['Line 20','After that period, the green covering will again spread over everything.']
 ]},
 {title:'Stanza 4 — From grass to a green jungle',lines:[
  ['Line 21','The speaker imagines his return becoming as vast as a green jungle.'],
  ['Line 22','He associates that future green jungle with Bangala.'],
  ['Line 23','The renewed landscape will become a place that tourists can visit.'],
  ['Line 24','The visitors will come specifically to see the speaker’s regenerated green landscape.'],
  ['Line 25','The poem returns once more to the grass comparison.'],
  ['Line 26','The speaker accepts that he can again be cut at the surface level.'],
  ['Line 27','Even mowing him down cannot permanently end his growth.'],
  ['Line 28','He will sprout again after repeated cutting.'],
  ['Line 29','The final image is complete regeneration: new growth eventually covers everything.']
 ]}
];

export function EnglishPanoramaPoem7LineGuide(){
 return <section className="poem-panel" style={{marginTop:20}}>
  <div className="poem-section-heading"><div><span className="poem-section-label">COMPLETE POEM GUIDE</span><h2>Every source line, in order</h2></div><span>4 sections • 29 line meanings</span></div>
  <p style={{marginTop:0}}>The textbook poem is covered below line-by-line in the exact source order. Each entry gives the line’s meaning rather than reproducing the complete copyrighted poem.</p>
  <div style={{display:'grid',gap:16}}>{sections.map(section=><article key={section.title} style={{padding:'18px',border:'1px solid rgba(127,127,127,.25)',borderRadius:16}}>
   <h3 style={{marginTop:0}}>{section.title}</h3>
   <div style={{display:'grid',gap:10}}>{section.lines.map(([label,meaning])=><div key={`${section.title}-${label}`} style={{display:'grid',gridTemplateColumns:'minmax(120px,.5fr) minmax(280px,3fr)',gap:12,alignItems:'start',padding:'10px 0',borderBottom:'1px solid rgba(127,127,127,.16)'}}><b>{label}</b><span>{meaning}</span></div>)}</div>
  </article>)}</div>
 </section>;
}
