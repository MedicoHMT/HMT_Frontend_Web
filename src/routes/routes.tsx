import { Role } from "../config/constants";
import type { AppRoute } from "../core/type/types";
import { OpdAssessment, OpdEdit, OpdHome, OpdRegistration, OpdView, OpdVitals } from "../modules/opd";
import OpdExamine from "../modules/opd/pages/OpdExamine";
import OpdVisitDetails from "../modules/opd/pages/OpdVisitDetails";
import OpdVisitList from "../modules/opd/pages/OpdVisitList";
import DashboardPage from "../pages/DashboardPage";
import Login from "../pages/Login";
import Patients from "../modules/patient/pages/Patients";
import Doctors from "../modules/doctor/pages/Doctors";


export const routes: AppRoute[] = [
  { path: '/login', element: Login, public: true },

  { path: '/dashboard', element: DashboardPage, roles: [Role.ADMIN, Role.DOCTOR, Role.STAFF] },


  {
    path: '/patients',
    element: Patients,
    roles: [Role.ADMIN, Role.DOCTOR, Role.STAFF] 
  },
  {
    path: '/doctors',
    element: Doctors,
    roles: [Role.ADMIN, Role.DOCTOR, Role.STAFF] 
  },

  
    /* ------- OPD MODULE ROUTES ------- */
  { 
    path: '/opd', 
    element: OpdHome , 
    roles: [Role.ADMIN, Role.DOCTOR, Role.STAFF] 
  },
  { 
    path: '/opd/registration', 
    element: OpdRegistration, 
    roles: [Role.ADMIN, Role.STAFF, Role.DOCTOR] 
  },
  { 
    path: '/opd/vitals', 
    element: OpdVitals, 
    roles: [Role.ADMIN, Role.STAFF, Role.DOCTOR] 
  },
  { 
    path: '/opd/assessment', 
    element: OpdAssessment, 
    roles: [Role.ADMIN, Role.DOCTOR] 
  },
  { 
    path: '/opd/edit', 
    element: OpdEdit, 
    roles: [Role.ADMIN] 
  },
  { 
    path: '/opd/view', 
    element: OpdView, 
    roles: [Role.ADMIN, Role.DOCTOR, Role.STAFF, Role.NURSE] 
  },
  { 
    path: '/opd/visits', 
    element: OpdVisitList, 
    roles: [Role.ADMIN, Role.DOCTOR, Role.STAFF] 
  },
  { 
    path: '/opd/visit-details/:patientUHID', 
    element: OpdVisitDetails, 
    roles: [Role.ADMIN, Role.DOCTOR, Role.STAFF] 
  },
  { 
    path: '/opd/examine/:visitId', 
    element: OpdExamine, 
    roles: [Role.ADMIN, Role.DOCTOR] 
  }


];
