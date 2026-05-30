import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

/** Brand lockup: gradient mark + two-line name. Used in Nav and Footer. */
export function Logo() {
  return (
    <a href="#hero" className="logo">
      <span className="logo-mark">
        <Icon name="logo" strokeWidth={2.2} stroke="#fff" />
      </span>
      <span className="logo-name">
        {site.logoMain}
        <br />
        <small>{site.logoSmall}</small>
      </span>
    </a>
  );
}
