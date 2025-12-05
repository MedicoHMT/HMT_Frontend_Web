import api from "../../../core/api/api";
import type { CreateUserRequest } from "../types/user.types";

export const createUser = async (userData: CreateUserRequest) => {
  const response = await api.post('/api/v1/admin/register', userData);
  return response.data;
};