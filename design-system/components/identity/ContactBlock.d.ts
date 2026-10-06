import * as React from "react";
/**
 * Large underlined email link plus a row of channel-colored buttons (GitHub, LinkedIn, X, Resume).
 * @startingPoint section="Identity" subtitle="Email + channel buttons" viewport="800x200"
 */
export interface ContactBlockProps {
  email?: string;
  github?: string;
  resume?: string;
  x?: string;
  linkedin?: string;
  showEmail?: boolean;
  /** Hide the channel button row (when channels are listed elsewhere) */
  channels?: boolean;
}
export declare function ContactBlock(props: ContactBlockProps): JSX.Element;
