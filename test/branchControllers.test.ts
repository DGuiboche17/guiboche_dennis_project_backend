import * as branchService from '../src/api/v1/services/branchesService';
import { createBranch } from '../src/api/v1/controllers/branchesControllers';
import { branches } from '../src/data/branches';

describe('Branch Controller', () => {

  let req: any;
  let res: any;

  beforeEach(() => {

    branches.length = 0;

    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('createBranch', () => {
    it('should return 201 and created branch', () => {
      req.body = {
        name: 'scanton branch',
        address: 'scranton',
        phone: '555-5555',
      };

      const newBranch = { id: 1, ...req.body };
      jest.spyOn(branchService, 'createBranch').mockReturnValue(newBranch);

      createBranch(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Branch created successfully.',
        data: newBranch,
      });
    });

    it('should return 400 if required fields are missing', () => {
      req.body = { name: 'scranton branch' }; 

      createBranch(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Missing required fields.' });
    });
  });

});
