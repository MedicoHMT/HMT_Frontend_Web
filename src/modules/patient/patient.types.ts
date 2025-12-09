export interface PatientResponseType {
  uhid: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  address: string;
  email: string,
  photoURL: string,
  emergencyContactName: string,
  emergencyContactNumber: string
}

export interface PatientRequestType {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  address: string;
  email: string,
  emergencyContactName: string,
  emergencyContactNumber: string
}
