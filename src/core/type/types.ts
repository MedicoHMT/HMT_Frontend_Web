import type { Role } from "../../config/constants";

export interface AppRoute {
  path: string;
  element?: React.ComponentType<any> | React.ReactElement;
  public?: boolean;
  roles?: Role[];
  permission?: string;
  children?: AppRoute[];
  layout?: React.ComponentType<any> | null;
}
