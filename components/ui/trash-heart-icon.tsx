'use client';

import { useId, type SVGProps } from 'react';

const HEART_D =
  'M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5';
const HEART_TRANSFORM = 'translate(7.2 9.003) scale(0.4)';

/** Feine, unregelmäßige Rissline von der oberen Kerbe bis zur unteren Spitze des Herzens. */
const CRACK_POINTS = '12,10.6 11.3,12 12.6,13 11.1,14.3 12.4,15.6 12,17.3';

/**
 * Papierkorb-Icon (Lucide-Umriss) mit einem kleinen Herz statt der beiden Linien im Inneren.
 * Das Herz ist entlang eines feinen Risses geteilt; beim Hover (Klasse `group` am
 * Elternelement) klappen beide Hälften um die untere Spitze herum leicht und ungleichmäßig
 * auseinander — oben öffnet es sich mehr, unten bleibt es zusammen.
 *
 * Default-Icon für Lösch-Aktionen in DAYONE Anwendungen. Die statischen Alternativen
 * (`trash`, `trashcan`) liegen in der Icon-Bibliothek unter /public/icons/.
 */
export default function TrashHeartIcon(props: SVGProps<SVGSVGElement>) {
  const uid = useId();
  const leftClip = `th-left-${uid}`;
  const rightClip = `th-right-${uid}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />

      <defs>
        <clipPath id={leftClip}>
          <polygon points={`0,9 ${CRACK_POINTS} 0,20`} />
        </clipPath>
        <clipPath id={rightClip}>
          <polygon points={`24,9 ${CRACK_POINTS} 24,20`} />
        </clipPath>
      </defs>

      <g
        clipPath={`url(#${leftClip})`}
        className="origin-[12px_17.3px] transition-transform duration-200 ease-out group-hover:-rotate-[8deg] group-hover:-translate-x-[0.2px]"
      >
        <path d={HEART_D} fill="currentColor" stroke="none" transform={HEART_TRANSFORM} />
      </g>
      <g
        clipPath={`url(#${rightClip})`}
        className="origin-[12px_17.3px] transition-transform duration-200 ease-out group-hover:rotate-[6deg] group-hover:translate-x-[0.2px]"
      >
        <path d={HEART_D} fill="currentColor" stroke="none" transform={HEART_TRANSFORM} />
      </g>
    </svg>
  );
}
