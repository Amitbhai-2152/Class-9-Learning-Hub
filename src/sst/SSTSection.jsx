import React from 'react';
import {SST_TRACKS,sstTotalChapters} from './sstChapterRegistry';

export function SSTSection({openChapter}){
  return <section className="sst-section">
    <div className="sst-hero">
      <div>
        <span className="sst-eyebrow">कक्षा 9 • SOCIAL SCIENCE</span>
        <h2>समाज, इतिहास और भारत को समझें।</h2>
        <p>चार अध्ययन क्षेत्रों में chapter-wise learning, practice, challenge और test के लिए तैयार foundation.</p>
      </div>
      <div className="sst-total"><strong>{sstTotalChapters}</strong><span>कुल अध्याय</span></div>
    </div>
    <div className="sst-track-grid">
      {SST_TRACKS.map(track=><article className="sst-track-card" key={track.id}>
        <div className="sst-track-top"><span className={`sst-track-icon sst-${track.id}`}>{track.icon}</span><span className="sst-tag">{track.tag}</span></div>
        <h3>{track.name}</h3>
        <p>{track.description}</p>
        <div className="sst-track-count">{track.chapters.length} अध्याय</div>
        <div className="sst-chapter-list">
          {track.chapters.map((chapter,index)=><button type="button" className="sst-chapter-row pressable" key={chapter} onClick={()=>openChapter?.(track,index,chapter)}>
            <span>{String(index+1).padStart(2,'0')}</span><strong>{chapter}</strong><b>→</b>
          </button>)}
        </div>
      </article>)}
    </div>
    <div className="sst-learning-note"><strong>अध्ययन flow</strong><span>पहले Learn से concept समझें, फिर Practice → Challenge → Test से mastery जाँचें।</span></div>
  </section>;
}
