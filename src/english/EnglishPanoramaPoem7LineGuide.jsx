import React from 'react';

const sections=[
 {title:'Stanza 1 — Grass as resilience',lines:[
  ['“I am like grass”','The speaker identifies himself with grass, choosing resilience as the central image.'],
  ['The speaker says grass can be cut or mown down.','External force can damage or suppress him temporarily.'],
  ['Yet he will sprout again.','He will return and begin growing again.'],
  ['He will grow.','Renewal will continue after destruction.'],
  ['He will bounce back.','He will recover after the setback.']
 ]},
 {title:'Stanza 2 — Destruction cannot erase identity',lines:[
  ['The speaker imagines his signposts being completely destroyed.','Visible markers of place and identity may be wiped out.'],
  ['He imagines the Universities being bombed.','Institutions can also be attacked and destroyed.'],
  ['He imagines hostels reduced to rubble.','Buildings may become ruins.'],
  ['He imagines the slums being scorched.','Even vulnerable neighbourhoods may suffer destruction.'],
  ['But his identity cannot be erased.','Physical destruction does not remove who he is.'],
  ['The reason is the grass comparison.','Like grass, identity survives attempts to suppress it.'],
  ['He will sprout again.','Regrowth remains certain.'],
  ['His green mantle will cover everything.','Renewed greenery will eventually spread across the damaged landscape.']
 ]},
 {title:'Stanza 3 — Recovery after destruction',lines:[
  ['The poem imagines Bangla being bombed.','A wider geographical destruction is introduced.'],
  ['It imagines Sangrur being destroyed.','The violence extends to another named place.'],
  ['The whole district of Ludhiana is imagined as reduced to ashes.','The destructive image reaches an entire district.'],
  ['But recovery is only a matter of time.','The destruction is presented as temporary, not final.'],
  ['The poem gives a broad period from two years to ten years.','Regrowth may require time, but it is expected.'],
  ['Then the green mantle will cover everything again.','Nature returns and covers the damaged land with greenery.']
 ]},
 {title:'Stanza 4 — From grass to a green jungle',lines:[
  ['The speaker imagines becoming a vast green jungle.','The final recovery grows from grass into something immense.'],
  ['He calls it the green jungle of Bangala.','The renewed landscape is linked to the place named in the poem.'],
  ['Tourists will visit that jungle.','The regenerated place becomes attractive and full of life.'],
  ['They will visit his green jungle.','The speaker’s renewal becomes a visible landscape.'],
  ['The grass comparison returns.','The speaker again identifies his endurance with grass.'],
  ['He can be chopped.','Destruction remains possible at the surface level.'],
  ['He can be mown down.','Even repeated cutting cannot end the process permanently.'],
  ['But he will sprout again and cover everything.','The final image is complete regeneration and survival.']
 ]}
];

export function EnglishPanoramaPoem7LineGuide(){
 return <section className="poem-panel" style={{marginTop:20}}>
  <div className="poem-section-heading"><div><span className="poem-section-label">COMPLETE POEM GUIDE</span><h2>Every source line, in order</h2></div><span>4 stanzas • 27 line-level explanations</span></div>
  <p style={{marginTop:0}}>The textbook poem is covered below line-by-line in the exact source order. Each entry gives the line’s meaning rather than reproducing the complete copyrighted poem.</p>
  <div style={{display:'grid',gap:16}}>{sections.map(section=><article key={section.title} style={{padding:'18px',border:'1px solid rgba(127,127,127,.25)',borderRadius:16}}>
   <h3 style={{marginTop:0}}>{section.title}</h3>
   <div style={{display:'grid',gap:10}}>{section.lines.map(([cue,meaning],i)=><div key={`${section.title}-${i}`} style={{display:'grid',gridTemplateColumns:'minmax(220px,1fr) minmax(280px,2fr)',gap:12,alignItems:'start',padding:'10px 0',borderBottom:'1px solid rgba(127,127,127,.16)'}}><b>{cue}</b><span>{meaning}</span></div>)}</div>
  </article>)}</div>
 </section>;
}
