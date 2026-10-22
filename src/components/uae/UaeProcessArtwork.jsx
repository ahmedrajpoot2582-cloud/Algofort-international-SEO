const orange = '#f47a1f';
const paper = '#f4f4f2';
const line = '#dededb';

// Native vector artwork: crisp at every size, with no player or asset download.
export function UaeProcessArtwork({ step }) {
  const scenes = {
    '01': <>
      <path d="M112 60 140 78M208 60 180 78M160 116v20" stroke={line} strokeDasharray="4 5" className="art-flow" data-art-motion="" />
      <rect x="36" y="38" width="82" height="40" rx="10" fill={paper} stroke={line} />
      <rect x="202" y="38" width="82" height="40" rx="10" fill={paper} stroke={line} />
      <rect x="112" y="134" width="96" height="30" rx="10" fill={paper} stroke={line} />
      <g fill="currentColor" stroke="none" fontFamily="Mona Sans, sans-serif" fontSize="10" textAnchor="middle"><text x="77" y="62">RESEARCH</text><text x="243" y="62">GOALS</text><text x="160" y="153">PROJECT PLAN</text></g>
      <circle cx="160" cy="88" r="31" fill="#fff7ef" stroke={orange} />
      <g stroke={orange} className="art-turn" data-art-motion=""><path d="M160 70v36M142 88h36M147 75l26 26M147 101l26-26" /></g>
      <circle cx="160" cy="88" r="5" fill={orange} stroke="none" />
    </>,
    '02': <>
      <rect x="42" y="22" width="236" height="138" rx="12" fill="white" stroke={line} />
      <path d="M42 47h236" stroke={line} />
      <g fill={line} stroke="none"><circle cx="57" cy="35" r="3" /><circle cx="68" cy="35" r="3" /><circle cx="79" cy="35" r="3" /></g>
      <rect x="57" y="62" width="43" height="82" rx="5" fill={paper} stroke="none" />
      <path d="M67 76h23M67 87h16M67 98h20" stroke="#b4b4b0" />
      <rect x="114" y="62" width="89" height="55" rx="5" fill="#fff7ef" stroke={orange} />
      <path d="m127 105 17-18 14 11 20-24 14 15" stroke={orange} />
      <rect x="216" y="62" width="45" height="55" rx="5" fill={paper} stroke="none" />
      <path d="M114 131h147M114 142h110" stroke={line} />
      <g className="art-cursor" data-art-motion=""><path d="m197 99 1 27 8-8 10 4 3-6-11-5 7-6-18-6Z" fill="white" stroke="currentColor" /><circle cx="197" cy="99" r="4" fill={orange} stroke="none" /></g>
    </>,
    '03': <>
      <rect x="42" y="26" width="236" height="132" rx="12" fill="#05080c" stroke="none" />
      <path d="M42 51h236" stroke="#ffffff26" />
      <g stroke="none"><circle cx="58" cy="39" r="3" fill={orange} /><circle cx="69" cy="39" r="3" fill="#666" /><circle cx="80" cy="39" r="3" fill="#666" /></g>
      <path d="m87 79-16 16 16 16M109 79l16 16-16 16M103 73l-11 44" stroke={orange} />
      <g stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M151 77h92" className="art-code" data-art-motion="" /><path d="M151 94h61" className="art-code art-delay-1" data-art-motion="" /><path d="M151 111h80" className="art-code art-delay-2" data-art-motion="" /></g>
      <path d="M62 141h196" stroke="#ffffff26" strokeWidth="3" />
      <path d="M62 141h196" stroke={orange} strokeWidth="3" className="art-progress" data-art-motion="" />
    </>,
    '04': <>
      <rect x="50" y="22" width="220" height="140" rx="12" fill="white" stroke={line} />
      <path d="M50 47h220" stroke={line} />
      <path d="M67 35h58" stroke={orange} strokeWidth="3" />
      {[70, 102, 134].map((y, i) => <g key={y}><rect x="69" y={y - 9} width="18" height="18" rx="5" stroke={line} /><path d={`m73 ${y} 3 3 7-7`} stroke={orange} className={`art-check art-delay-${i}`} data-art-motion="" /><path d={`M101 ${y - 3}h144M101 ${y + 5}h105`} stroke={line} /></g>)}
      <rect x="62" y="57" width="196" height="29" rx="5" fill="#f47a1f0a" stroke={orange} strokeOpacity=".25" className="art-scan" data-art-motion="" />
    </>,
    '05': <>
      <ellipse cx="160" cy="104" rx="99" ry="38" stroke={line} strokeDasharray="3 6" />
      <circle cx="249" cy="88" r="5" fill={orange} stroke="none" />
      <path d="M72 48v12M66 54h12M246 38v10M241 43h10" stroke={line} />
      <g className="art-launch" data-art-motion=""><path d="M150 113q10 42 20 0" fill="#f47a1f28" stroke={orange} className="art-flame" data-art-motion="" /><path d="m137 88-20 29 22-8M183 88l20 29-22-8" fill={paper} /><path d="M160 29c-22 21-25 49-23 75l23 11 23-11c2-26-1-54-23-75Z" fill="white" /><circle cx="160" cy="69" r="12" stroke={orange} /><path d="M145 95h30" stroke={orange} /></g>
      <path d="M100 163h120" stroke={line} />
    </>,
    '06': <>
      <rect x="42" y="24" width="224" height="124" rx="12" fill="white" stroke={line} />
      <path d="M42 49h224M76 148v15h151v-15" stroke={line} />
      <path d="M60 35h43" stroke={orange} strokeWidth="3" />
      <path d="M65 125h124M65 114l23-15 21 5 24-26 22 7 26-18" stroke={orange} />
      <rect x="117" y="55" width="91" height="43" rx="9" fill={paper} stroke="none" />
      <path d="m132 98-4 10 17-10" fill={paper} stroke="none" />
      {[144, 162, 180].map((x, i) => <circle key={x} cx={x} cy="77" r="3" fill={orange} stroke="none" className={`art-dot art-delay-${i}`} data-art-motion="" />)}
      <circle cx="242" cy="127" r="29" fill="white" stroke={line} /><circle cx="242" cy="127" r="34" stroke={orange} strokeOpacity=".3" className="art-ring" data-art-motion="" />
      <path d="M226 130v-6a16 16 0 0 1 32 0v6M226 125h5v12h-5zM253 125h5v12h-5zM253 139q-4 5-11 4" stroke={orange} />
    </>,
  };

  return <svg className="uae-process-art" viewBox="0 0 320 180" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{scenes[step] || scenes['01']}</svg>;
}
