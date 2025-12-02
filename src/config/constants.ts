export const API_BASE_URL = "http://localhost:8080";



export const Role = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  DOCTOR: 'DOCTOR',
  NURSE: 'NURSE',
  STAFF: 'STAFF'
} as const;

export type Role = (typeof Role)[keyof typeof Role];


export const UserPermission = {
  // Admin features
  ADMIN_DASHBOARD: 'ADMIN_DASHBOARD',
  MANAGE_USERS: 'MANAGE_USERS',

  // Doctor/Staff features
  PATIENT_READ: 'PATIENT_READ',
  PATIENT_WRITE: 'PATIENT_WRITE',
  APPOINTMENT_MANAGE: 'APPOINTMENT_MANAGE',
  APPOINTMENT_READ: 'APPOINTMENT_READ',
  APPOINTMENT_WRITE: 'APPOINTMENT_WRITE',
  LAB_RESULT_VIEW: 'LAB_RESULT_VIEW'
} as const;

export type UserPermission = (typeof UserPermission)[keyof typeof UserPermission];