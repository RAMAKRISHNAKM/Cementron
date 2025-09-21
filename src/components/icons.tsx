import type { SVGProps } from 'react';

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8.1c.5 0 1-.4 1-1V4c0-.6-.4-1-1-1s-1 .4-1 1v3.1c0 .5.4 1 1 1Z" />
      <path d="M12 15.9c-.5 0-1 .4-1 1v3.1c0 .6.4 1 1 1s1-.4 1-1V16.9c0-.5-.4-1-1-1Z" />
      <path d="M15.9 12c0-.5.4-1 1-1h3.1c.6 0 1 .4 1 1s-.4 1-1 1H16.9c-.5 0-1-.4-1-1Z" />
      <path d="M8.1 12c0 .5-.4 1-1 1H4c-.6 0-1-.4-1-1s.4-1 1-1h3.1c.5 0 1 .4 1 1Z" />
      <path d="m14.5 9.5-.8-.8c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l.8.8c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4Z" />
      <path d="m8.3 15.7-.8-.8c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l.8.8c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4Z" />
      <path d="m9.5 14.5.8.8c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0l-.8-.8c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0Z" />
      <path d="m15.7 8.3.8.8c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0l-.8-.8c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0Z" />
    </svg>
  );
}
