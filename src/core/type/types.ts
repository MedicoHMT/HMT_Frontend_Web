export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'DOCTOR' | 'NURSE' | 'STAFF';

export interface UserPayload {
  sub: string;
  role: Role;
  permissions?: string[];
  hospitalId?: string | null;
  hospitalName?: string | null;
  exp?: number;
  iat?: number;
}

export interface CurrentUser {
  username: string;
  role: Role;
  permissions: string[];
  hospitalName?: string | null;
}

export interface AppRoute {
  path: string;
  element?: React.ComponentType<any> | React.ReactElement;
  public?: boolean;
  roles?: Role[];
  permission?: string;
  children?: AppRoute[];
  layout?: React.ComponentType<any> | null;
}
