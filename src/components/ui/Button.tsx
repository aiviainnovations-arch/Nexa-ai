import type { MouseEventHandler, ReactNode } from 'react';
import { Icon } from './Icon';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  arrow?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  target?: string;
  'aria-label'?: string;
};

const base =
  'group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium uppercase tracking-[0.08em] transition-[transform,box-shadow,background-color,border-color] duration-300 active:translate-y-px disabled:pointer-events-none disabled:opacity-50';

const sizes = {
  sm: 'h-9 px-4 text-[11px]',
  md: 'h-11 px-6 text-[12px]',
  lg: 'h-[52px] px-8 text-[12.5px]',
};

const variants = {
  primary:
    'text-white bg-[linear-gradient(135deg,#2563EB_0%,#7C3AED_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_0_0_1px_rgba(255,255,255,0.12),0_10px_30px_-8px_rgba(96,90,255,0.7),0_2px_0_rgba(0,0,0,0.45)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_0_0_1px_rgba(255,255,255,0.18),0_14px_44px_-6px_rgba(110,100,255,0.9),0_2px_0_rgba(0,0,0,0.45)]',
  ghost:
    'text-mist bg-white/[0.04] border border-white/12 hover:bg-white/[0.08] hover:border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]',
};

export function Button({
  children, href, onClick, variant = 'primary', size = 'md', arrow = false,
  className = '', type = 'button', disabled, target, ...rest
}: Props) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {arrow && <Icon name="arrow-right" size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />}
    </>
  );
  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
        target={target ?? (external ? '_blank' : undefined)}
        rel={external ? 'noopener noreferrer' : undefined}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick as MouseEventHandler<HTMLButtonElement> | undefined} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}
