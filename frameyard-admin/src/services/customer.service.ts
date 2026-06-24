import api from './api';
import { Customer } from '../types';

export const customerService = {
  getCustomers: async (): Promise<Customer[]> => {
    const response = await api.get('/customers');
    return response.data.data || [];
  },

  getCustomerById: async (id: string): Promise<Customer> => {
    const customers = await customerService.getCustomers();
    const customer = customers.find((item) => item.id === id);
    if (!customer) {
      throw new Error('Customer not found');
    }
    return customer;
  },
};

export default customerService;
