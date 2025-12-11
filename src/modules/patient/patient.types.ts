export interface PatientResponseType {
  uhid: string;
  firstName: string;
  middleName: string;
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
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  email: string,
  emergencyContactName: string,
  emergencyContactNumber: string
}
