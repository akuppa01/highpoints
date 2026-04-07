declare module "react-simple-maps" {
  import type { ReactNode, MouseEvent, SVGProps } from "react";

  export interface Geography {
    rsmKey: string;
    id: string;
    properties: Record<string, unknown>;
  }

  export interface GeographiesProps {
    geography: string | object;
    children: (props: { geographies: Geography[] }) => ReactNode;
  }

  export interface GeographyProps extends SVGProps<SVGPathElement> {
    geography: Geography;
    style?: {
      default?: React.CSSProperties & { fill?: string; stroke?: string; strokeWidth?: number; outline?: string; cursor?: string };
      hover?: React.CSSProperties & { fill?: string; stroke?: string; strokeWidth?: number; outline?: string; cursor?: string };
      pressed?: React.CSSProperties & { fill?: string; stroke?: string; outline?: string };
    };
    onMouseEnter?: (event: MouseEvent<SVGElement>) => void;
    onMouseLeave?: (event: MouseEvent<SVGElement>) => void;
    onClick?: (event: MouseEvent<SVGElement>) => void;
  }

  export interface ComposableMapProps {
    projection?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: ReactNode;
  }

  export function ComposableMap(props: ComposableMapProps): JSX.Element;
  export function Geographies(props: GeographiesProps): JSX.Element;
  export function Geography(props: GeographyProps): JSX.Element;
  export function ZoomableGroup(props: { children?: ReactNode; [key: string]: unknown }): JSX.Element;
  export function Sphere(props: { id?: string; fill?: string; stroke?: string; strokeWidth?: number }): JSX.Element;
  export function Graticule(props: { stroke?: string; strokeWidth?: number }): JSX.Element;
}
