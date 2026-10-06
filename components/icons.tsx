// Ícones desenhados para o site, no mesmo traço fino e contínuo da logo.
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.6-1.2A8.8 8.8 0 1 0 12 3.2Z" />
      <path d="M9.3 8.2c-.6 1 0 3 1.7 4.7s3.7 2.300 4.700 1.700l.5-1.300-1.900-1-.800.800c-.800-.300-1.800-1.300-2.100-2.100l.800-.800-1-1.900-1.900-.100Z" />
    </Base>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="16.9" cy="7.1" r="0.5" fill="currentColor" />
    </Base>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6.6 3.6h2.900l1.500 3.900-2 1.300a11 11 0 0 0 6.200 6.200l1.300-2 3.900 1.500v2.900a2 2 0 0 1-2.200 2A16.400 16.400 0 0 1 4.600 5.800a2 2 0 0 1 2-2.200Z" />
    </Base>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="M4.600 7.600 12 13l7.400-5.400" />
    </Base>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 21s-6.500-5.600-6.500-10.600a6.500 6.500 0 0 1 13 0C18.500 15.400 12 21 12 21Z" />
      <circle cx="12" cy="10.300" r="2.300" />
    </Base>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.500" />
      <path d="M12 7.200V12l3.200 2" />
    </Base>
  );
}

/* Poltrona: atendimento presencial */
export function ArmchairIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6.600 11V8.200A3.200 3.200 0 0 1 9.800 5h4.400a3.200 3.200 0 0 1 3.200 3.200V11" />
      <path d="M6.600 15v-1.900a2.100 2.100 0 1 0-2.700 2v3.400h16.200v-3.400a2.100 2.100 0 1 0-2.700-2V15Z" />
      <path d="M6.600 18.500v2M17.400 18.500v2" />
    </Base>
  );
}

/* Tela com balão de conversa: atendimento online */
export function ScreenIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="4.500" y="4.800" width="15" height="10.700" rx="1.800" />
      <path d="M2.800 18.800h18.400" />
      <path d="M9.600 9.900a2.400 2.400 0 1 1 1.300 2.100l-1.500.500.500-1.400a2.400 2.400 0 0 1-.300-1.200Z" />
    </Base>
  );
}

/* Colo, ninho: acolhimento */
export function HoldIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="8.800" r="2.600" />
      <path d="M4.500 12.200c0 4.400 3.300 7.600 7.500 7.600s7.500-3.200 7.500-7.600" />
      <path d="M7.900 13.400c.400 2.100 2 3.500 4.100 3.500s3.700-1.400 4.100-3.500" />
    </Base>
  );
}

/* Orelha: escuta empática */
export function ListenIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7.800 10.200a4.600 4.600 0 1 1 8.500 2.400c-.900 1.400-2.100 2-2.300 3.800-.200 1.700-1.300 2.900-3 2.900-1.300 0-2.300-.800-2.600-2" />
      <path d="M10.200 10.500a2.200 2.200 0 0 1 4.300.500c0 1-.900 1.500-1.700 2" />
    </Base>
  );
}

/* Digital: singularidade de cada pessoa */
export function FingerprintIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6.900 18.800c-.900-1.900-1.400-4-1.400-6.300a6.500 6.500 0 0 1 13 0c0 1.500-.100 3-.400 4.300" />
      <path d="M9.300 20.300c-.800-2.300-1.100-4.800-1.100-7.400a3.800 3.800 0 0 1 7.600 0c0 2.600-.300 5-1 7.200" />
      <path d="M12 12.800c0 2.800-.200 5.300-.800 7.800" />
    </Base>
  );
}

/* Cadeado: ética e sigilo */
export function LockIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="5.500" y="10.500" width="13" height="9.500" rx="2.200" />
      <path d="M8.500 10.500V8a3.500 3.500 0 0 1 7 0v2.500" />
      <path d="M12 14v2.500" />
    </Base>
  );
}

export function ArrowIcon({ direction = "right", ...props }: IconProps & { direction?: "left" | "right" }) {
  return (
    <Base {...props}>
      <g transform={direction === "left" ? "rotate(180 12 12)" : undefined}>
        <path d="M4.500 12h14.500" />
        <path d="M13.500 6.500 19 12l-5.500 5.500" />
      </g>
    </Base>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Base>
  );
}

export function StarIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.800l2.700 5.800 6.300.800-4.600 4.400 1.200 6.300L12 17l-5.600 3.100 1.200-6.300L3 9.400l6.300-.800L12 2.800Z" />
    </svg>
  );
}
