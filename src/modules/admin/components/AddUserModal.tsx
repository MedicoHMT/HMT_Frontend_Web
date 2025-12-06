import { User, X, Shield, Mail, Phone, Save, Building, Stethoscope } from "lucide-react";
import { useEffect, useState } from "react";
import { createDoctor, createUser } from "../api/userApi";
import type { CreateDoctorRequest, CreateUserRequest } from "../types/user.types";
import { Role } from "../../../config/constants";
import { getDepartments } from "../../departments/department.api";
import type { DepartmentResponse } from "../../departments/department.type";

interface AddUserModalProps {
  isOpen: boolean;
  createTypeDoctor: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const INITIAL_STATE_USER: CreateUserRequest = {
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  role: Role.STAFF,
};

const INITIAL_STATE_DOCTOR: CreateDoctorRequest = {
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  consultation_fee: 0,
  department_id: 0,
  specialization: '',
};

export const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, createTypeDoctor, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<CreateUserRequest>(INITIAL_STATE_USER);
  const [formDataDoctor, setFormDataDoctor] = useState<CreateDoctorRequest>(INITIAL_STATE_DOCTOR);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [departments, setDepartments] = useState<DepartmentResponse[]>([]);

  
  useEffect(() => {
    if (isOpen && createTypeDoctor) {
      getDepartments()
        .then((data) => setDepartments(data))
        .catch((err) => console.error("Failed to load departments", err));
    }
  }, [isOpen, createTypeDoctor]);


  useEffect(() => {
    if (isOpen) {
        setError('');
        setFormData(INITIAL_STATE_USER);
        setFormDataDoctor(INITIAL_STATE_DOCTOR);
    }
  }, [isOpen]);


  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (createTypeDoctor) {
      setFormDataDoctor(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (createTypeDoctor) {
        await createDoctor(formDataDoctor)
      } else {
        await createUser(formData);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        
        <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            {createTypeDoctor ? <Stethoscope className="w-5 h-5 text-blue-600" /> : <User className="w-5 h-5 text-blue-600" />}
            {createTypeDoctor ? 'Add New Doctor' : 'Add New User'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
              {error}
            </div>
          )}


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text" name="firstName" required placeholder="Ex: Anisha"
                value={createTypeDoctor ? formDataDoctor.firstName : formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text" name="lastName" required placeholder="Ex: Verma"
                value={createTypeDoctor ? formDataDoctor.lastName : formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="text" name="username" required placeholder="dr_anisha"
                  value={createTypeDoctor ? formDataDoctor.username : formData.username}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="email" name="email" required placeholder="email@hospital.com"
                  value={createTypeDoctor ? formDataDoctor.email : formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="number" name="phoneNumber" required placeholder="9876543210"
                  value={createTypeDoctor ? formDataDoctor.phoneNumber : formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {!createTypeDoctor && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option value="STAFF">Staff</option>
                  </select>
                </div>
              </div>
            )}
          </div>


          {createTypeDoctor && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee</label>
                <input
                  type="number"
                  name="consultation_fee"
                  value={formDataDoctor.consultation_fee}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="0"
                  required
                />
              </div>
              
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <div className="relative">
                    <Building className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <select
                    name="department_id"
                    value={formDataDoctor.department_id}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    >
                    <option value={0}>Select Dept</option>
                    {departments.map((dept) => (
                        <option key={dept.department_id} value={dept.department_id}>
                        {dept.name}
                        </option>
                    ))}
                    </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                <input
                  name="specialization"
                  value={formDataDoctor.specialization}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Cardiology"
                  required
                />
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : (
                <>
                  <Save className="w-4 h-4" /> Save {createTypeDoctor ? 'Doctor' : 'User'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};