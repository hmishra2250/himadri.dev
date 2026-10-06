import * as React from "react";
/** Square portrait (fills its column up to `size` px), 4px radius, hairline inner outline, fixed crop. The only photograph in the system. */
export interface PortraitProps { src?: string; size?: number; alt?: string; }
export declare function Portrait(props: PortraitProps): JSX.Element;
