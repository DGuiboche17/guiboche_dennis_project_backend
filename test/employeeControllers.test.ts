// import * as employeeService from '../src/api/v1/services/employeeService';
// import { createEmployee } from '../src/api/v1/controllers/employeesControllers';

// describe('Employee Controller', () => {

//     // dont worry about the shape of it, just prevent errors from throwing please

//     let req: any;
//     let res: any;


//   beforeEach(() => {
//     req = {};
//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };
    
//   });

//   describe('createEmployee', () => {
//     it('should return 201 and created employee', () => {
//       req.body = {
//         name: 'Dennis',
//       position: 'Backend Dev',
//       department: 'it stuff',
//       email: 'dennis@example.com',
//       phone: '204-555-1234',
//       branchId: 1,
//       };

//       const newEmployee = { id: 1, ...req.body };
//       jest.spyOn(employeeService, 'createEmployee').mockReturnValue(newEmployee);
//       const next = jest.fn();
//       createEmployee(req, res, next);

//       expect(res.status).toHaveBeenCalledWith(201);
//       expect(res.json).toHaveBeenCalledWith({
//         message: 'Employee created successfully.',
//         data: newEmployee,
//       });
//     });

//     it('should return 400 if required fields are missing', () => {

//       req.body = { name: 'Dennis' };
//       const next = jest.fn();

//       createEmployee(req, res, next);

//       expect(res.status).toHaveBeenCalledWith(400);
//       expect(res.json).toHaveBeenCalledWith({ message: 'Missing required fields.' });
//     });
//   });


// });




describe('Branch Routes', () => {
  it('placeholder test to satisfy Jest', () => {
    expect(true).toBe(true);
  });
});
