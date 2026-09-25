import type { ReactNode, SVGProps } from 'react';

export type IconName =
  | 'database' | 'file' | 'chart' | 'sparkle' | 'bolt' | 'report' | 'users' | 'shield'
  | 'layers' | 'code' | 'lock' | 'key' | 'activity' | 'arrow-right' | 'arrow-up-right'
  | 'check' | 'menu' | 'close' | 'send' | 'search' | 'plug' | 'alert' | 'clock'
  | 'trend-up' | 'trend-down' | 'home' | 'folder' | 'inbox';

const paths: Record<IconName, ReactNode> = {
  database: (<><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>),
  file: (<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h4" /></>),
  chart: (<><path d="M3 3v18h18" /><path d="M8 16v-3M12.5 16V8M17 16v-5" /></>),
  sparkle: (<><path d="M11 3l1.9 5.4L18 10l-5.1 1.6L11 17l-1.9-5.4L4 10l5.1-1.6z" /><path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" /></>),
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  report: (<><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 16v-3M12 16V8M16 16v-5" /></>),
  users: (<><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17" cy="9" r="2.5" /><path d="M17 14c2.5 0 4.5 2 4.5 4.5" /></>),
  shield: (<><path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z" /><path d="M9 12l2 2 4-4" /></>),
  layers: (<><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>),
  code: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
  lock: (<><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>),
  key: (<><circle cx="8" cy="15" r="4" /><path d="M11 12l9-9M16 7l3 3" /></>),
  activity: <path d="M3 12h4l3-8 4 16 3-8h4" />,
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
  'arrow-up-right': <path d="M7 17L17 7M8 7h9v9" />,
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  send: <path d="M4 12l16-8-6 17-3-7z" />,
  search: (<><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></>),
  plug: (<><path d="M9 3v5M15 3v5" /><path d="M6 8h12v3a6 6 0 0 1-12 0z" /><path d="M12 17v4" /></>),
  alert: (<><path d="M12 4l9 16H3z" /><path d="M12 10v4M12 17h.01" /></>),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  'trend-up': (<><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>),
  'trend-down': (<><path d="M3 7l6 6 4-4 8 8" /><path d="M15 17h6v-6" /></>),
  home: (<><path d="M4 11l8-7 8 7" /><path d="M6 10v10h12V10" /></>),
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  inbox: (<><path d="M4 13l2-8h12l2 8" /><path d="M4 13v6h16v-6h-5l-1 2h-4l-1-2z" /></>),
};

type Props = { name: IconName; size?: number; strokeWidth?: number } & Omit<SVGProps<SVGSVGElement>, 'name'>;

export function Icon({ name, size = 20, strokeWidth = 1.6, className, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
