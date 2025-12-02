export interface Doctor {
  id: number;
  hospitalId: number;
  firstName: string;
  lastName: string;
  specialization?: string;
  department: string;
  contactNumber: string;
}
