import { handlerPath } from '@libs/handler-resolver';

export const getAllCustomers = {
  handler: `${handlerPath(__dirname)}/handler.getAllCustomers`,
  events: [
    {
      http: {
        method: 'get',
        path: 'customers/',
      },
    },
  ],
};

export const searchCustomers = {
  handler: `${handlerPath(__dirname)}/handler.searchCustomers`,
  events: [
    {
      http: {
        method: 'get',
        path: 'customers/search/'
      },
    },
  ],
};

export const createCustomer = {
  handler: `${handlerPath(__dirname)}/handler.createCustomer`,
  events: [
    {
      http: {
        method: 'post',
        path: 'customer',
      },
    },
  ],
};

export const getCustomer = {
  handler: `${handlerPath(__dirname)}/handler.getCustomer`,
  events: [
    {
      http: {
        method: 'get',
        path: 'customer/{id}',
      },
    },
  ],
};

export const updateCustomer = {
  handler: `${handlerPath(__dirname)}/handler.updateCustomer`,
  events: [
    {
      http: {
        method: 'put',
        path: 'customer/{id}',
      },
    },
  ],
};

export const deleteCustomer = {
  handler: `${handlerPath(__dirname)}/handler.deleteCustomer`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'customer/{id}',
      },
    },
  ],
};
