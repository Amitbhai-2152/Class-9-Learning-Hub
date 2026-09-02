import React from 'react';
import './science-chapter-sidebar.css';

export function ScienceChapterSidebar({lessons=[],chapter}){
 const items=lessons.filter(Boolean);
 if(!items.length)return null;
 return <aside className="science-chapter-sidebar" aria-label="अध्याय विषय सूची">
   <div className="science-sidebar-head">
     <span>अध्याय की रूपरेखा</span>
     <strong>इस अध्याय में</strong>
     <small>{items.length} सीखने के चरण</small>
   </div>
   <nav className="science-sidebar-list">
     {items.map((lesson,index)=><div className="science-sidebar-item" key={`${lesson.title||'lesson'}-${index}`}>
       <span>{String(index+1).padStart(2,'0')}</span>
       <div><strong>{lesson.title||`चरण ${index+1}`}</strong></div>
     </div>)}
   </nav>
 </aside>;
}

export default ScienceChapterSidebar;
