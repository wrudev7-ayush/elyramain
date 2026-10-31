/* Elyra Technologies logo, used exactly as supplied (public/assets/brand; untouched file in elyra-logo-original.webp). */
const BRAND = "/assets/brand";

/** Just the mark, cropped from the logo. */
export function LogoMark() {
  return <img className="logo-mark" src={`${BRAND}/elyra-mark.webp`} width={657} height={652} alt="" />;
}

/** The full logo: mark, ELYRA and TECHNOLOGIES. */
export function Logo() {
  return (
    <span className="logo-lockup">
      <img className="logo-img" src={`${BRAND}/elyra-logo.webp`} width={1867} height={652} alt="Elyra Technologies" />
    </span>
  );
}

export function Chev() {
  return <i className="chev" />;
}
