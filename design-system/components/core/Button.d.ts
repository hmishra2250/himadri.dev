import * as React from "react";
/**
 * Square 44px button. primary = cobalt fill; secondary = graphite outline that inverts on hover; quiet = hairline outline.
 * @startingPoint section="Core" subtitle="Primary, secondary, quiet buttons" viewport="700x300"
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "primary" | "secondary" | "quiet";
  /** md 44px, sm 36px */
  size?: "md" | "sm";
  href?: string;
  /** Trailing unicode arrow (→ ↓ ↗). Nudges on hover. */
  icon?: string;
  /** "down" nudges the icon vertically instead of horizontally */
  iconDir?: "right" | "down";
  disabled?: boolean;
  target?: string;
  rel?: string;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
