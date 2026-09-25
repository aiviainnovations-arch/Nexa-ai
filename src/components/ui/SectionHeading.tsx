import { Reveal } from './Reveal';

type Props = { title: string[]; body?: string; align?: 'left' | 'center'; className?: string };

export function SectionHeading({ title, body, align = 'left', className = '' }: Props) {
  const center = align === 'center';
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''} ${className}`}>
      <Reveal>
        <h2 className="font-display text-[clamp(1.7rem,4.4vw,3.6rem)] font-semibold uppercase leading-[0.98] tracking-[-0.03em] text-white">
          {title.map((t) => (
            <span key={t} className="block">{t}</span>
          ))}
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={0.08}>
          <p className={`mt-5 max-w-xl text-[15px] leading-relaxed text-steel md:text-base ${center ? 'mx-auto' : ''}`}>{body}</p>
        </Reveal>
      )}
    </div>
  );
}
