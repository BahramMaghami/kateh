import type { ReactNode } from "react";
type IconName = "arrow" | "down" | "up" | "pin" | "clock" | "phone" | "menu" | "info";
export function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="M19 12H5m6-6-6 6 6 6" />,
    down: <path d="M12 4v16m-6-6 6 6 6-6" />,
    up: <path d="M12 20V4m-6 6 6-6 6 6" />,
    pin: <><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    phone: <path d="m8 3 3 5-3 2c1 3 3 5 6 6l2-3 5 3c-1 5-4 6-8 4C7 17 3 13 3 7c0-3 2-4 5-4Z" />,
    menu: <path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5" />,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7v.1" /></>,
  };
  return <svg className="icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
export function RiceSprig() {
  return <svg className="rice-sprig" width="48" height="60" viewBox="0 0 48 60" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M24 55V15M24 36C8 36 8 25 8 25c13 0 16 11 16 11Zm0-10C12 26 12 15 12 15c10 2 12 11 12 11Zm0 20C5 46 5 35 5 35c14 0 19 11 19 11Zm0-10c16 0 16-11 16-11-13 0-16 11-16 11Zm0-10c12 0 12-11 12-11-10 2-12 11-12 11Zm0 20c19 0 19-11 19-11-14 0-19 11-19 11Zm0-29c-9-7 0-14 0-14s9 7 0 14Z" /></svg>;
}
