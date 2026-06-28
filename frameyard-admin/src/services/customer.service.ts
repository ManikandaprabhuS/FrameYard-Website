import api from './api';
import { Customer } from '../types';

export interface CustomerResponse {
  customers: Customer[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const customerService = {
  getCustomerById: async (
  id: string
) => {

  const response =
    await api.get(
      `/customers/${id}`
    );

  return response.data.customer;
},

  getCustomers: async (
    page: number = 1,
    limit: number = 10
    
  ): Promise<CustomerResponse> => {
    const response = await api.get(
      `/customers?page=${page}&limit=${limit}`
    );

    return response.data;
  },
};


export default customerService;
