import { useState } from "react";

type IconProps = { className?: string; strokeWidth?: number };

export const BeanIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M12 3c5 0 8.5 3.6 8.5 9s-3.5 9-8.5 9S3.5 17.4 3.5 12 7 3 12 3Z"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="M12 3.5c-2.2 2.6-2 5.4-.3 8.2 1.6 2.6 1.6 5.6.3 8.6"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

export const FlameIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M12 21c3.9 0 6.5-2.5 6.5-6.2 0-2.6-1.4-4.4-2.8-6C14.2 7 13 5.2 13 3c-3 1.5-4 4.4-3.4 7-1-.4-1.6-1.2-1.9-2.3-1.4 1.6-2.2 3.6-2.2 5.6C5.5 17.5 8.1 21 12 21Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="M12 21c-1.8 0-3-1.4-3-3.1 0-1.7 1.3-2.7 3-4.4 1.7 1.7 3 2.7 3 4.4 0 1.7-1.2 3.1-3 3.1Z"
      stroke="currentColor"
      strokeWidth="1.7"
    />
  </svg>
);

export const BasketIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M4 9h16l-1.6 10.2a2 2 0 0 1-2 1.8H7.6a2 2 0 0 1-2-1.8L4 9Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 9V7a3.5 3.5 0 0 1 7 0v2"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <path d="M9.5 13v3.5M14.5 13v3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const SearchIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <circle cx="10.5" cy="10.5" r="6.2" stroke="currentColor" strokeWidth="1.7" />
    <path d="m15.4 15.4 5.1 5.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const PlusIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const MinusIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CloseIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const CheckIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="m4.5 12.5 5 5 10-11" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M4 12h15m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TruckIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M2.5 6.5h11v10h-11zM13.5 10h4.2l3 3.2v3.3h-3" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <circle cx="6.7" cy="17.5" r="1.9" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="16.6" cy="17.5" r="1.9" stroke="currentColor" strokeWidth="1.7" />
    <path d="M8.6 16.5h6" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

export const StarIcon = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path
      d="m12 3.4 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L12 3.4Z"
      fill="currentColor"
    />
  </svg>
);

export const LeafIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M19.5 4.5C10 4.5 5 9.5 5 15.2c0 2.6 1.6 4.3 3.9 4.3 6 0 10.6-6 10.6-15Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path d="M5.5 19.5C9 14 13 10.5 17 8.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const DropIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M12 3.5c3.4 4.3 6 7.6 6 11a6 6 0 0 1-12 0c0-3.4 2.6-6.7 6-11Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path d="M9.5 14.5a2.6 2.6 0 0 0 2.3 2.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const CupSteam = ({ className = "w-10 h-10" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
    <path
      className="steam-line"
      d="M17 14c-1.5-2 1.5-3.5 0-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      className="steam-line"
      style={{ animationDelay: "0.5s" }}
      d="M24 14c-1.5-2 1.5-3.5 0-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      className="steam-line"
      style={{ animationDelay: "1s" }}
      d="M31 14c-1.5-2 1.5-3.5 0-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M10 20h24v8a12 12 0 0 1-12 12h0a12 12 0 0 1-12-12v-8Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M34 22h4a4 4 0 0 1 0 8h-5" stroke="currentColor" strokeWidth="2" />
    <path d="M8 44h32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/** Image with a warm gradient + bean fallback if the remote asset fails. */
export function SmartImg({
  src,
  alt,
  className = "",
  imgClassName = "",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`${className} bg-[radial-gradient(120%_100%_at_50%_0%,#3b291b_0%,#241811_55%,#1b120b_100%)]`}
    >
      {failed ? (
        <div className="flex h-full w-full items-center justify-center">
          <BeanIcon className="h-12 w-12 text-espresso-500" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
}
