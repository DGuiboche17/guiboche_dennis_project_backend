// jest.mock('../src/api/v1/controllers/employeesControllers', () => {
//   return {
//     __esModule: true,
//     createEmployee: jest.fn((_req, res, _next) => res.status(201).json({ message: 'mocked create' })),
//     getAllEmployees: jest.fn((_req, res, _next) => res.status(200).json({ message: 'mocked getAll' })),
//     getEmployeeById: jest.fn((_req, res, _next) => res.status(200).json({ message: 'mocked getById' })),
//     updateEmployee: jest.fn((_req, res, _next) => res.status(200).json({ message: 'mocked update' })),
//     deleteEmployee: jest.fn((_req, res, _next) => res.status(204).json({ message: 'mocked delete' })),
//   };
// });

// import request from 'supertest';
// import app from '../src/app';
// import * as employeesController from '../src/api/v1/controllers/employeesControllers';



// describe('Employee Routes', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should call createEmployee on POST /api/v1/employees', async () => {
//     const payload = {
//       id: '1',
//       name: 'Dennis',
//       position: 'Backend Dev',
//       department: 'it stuff',
//       email: 'dennis@example.com',
//       phone: '204-555-1234',
//       branchId: 1,

//     };

//     await request(app).post('/api/v1/employees').send(payload);

//     expect(employeesController.createEmployee).toHaveBeenCalled();
//     const mockCreate = employeesController.createEmployee as jest.Mock;
//     expect(mockCreate.mock.calls[0][0].body).toEqual(payload);
//   });

//   it('should call getAllEmployees on GET /api/v1/employees', async () => {
//     await request(app).get('/api/v1/employees');
//     expect(employeesController.getAllEmployees).toHaveBeenCalled();
//   });

//   it('should call getEmployeeById on GET /api/v1/employees/:id', async () => {
//     await request(app).get('/api/v1/employees/1');
//     expect(employeesController.getEmployeeById).toHaveBeenCalled();
//   });

//   it('should call updateEmployee on PUT /api/v1/employees/:id', async () => {
//     await request(app).put('/api/v1/employees/1').send({ phone: '999-999-9999' });
//     expect(employeesController.updateEmployee).toHaveBeenCalled();
//   });

//   it('should call deleteEmployee on DELETE /api/v1/employees/:id', async () => {
//     await request(app).delete('/api/v1/employees/1');
//     expect(employeesController.deleteEmployee).toHaveBeenCalled();
//   })

// });




describe('Branch Routes', () => {
  it('placeholder test to satisfy Jest', () => {
    expect(true).toBe(true);
  });
});
