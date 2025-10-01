jest.mock('../src/api/v1/controllers/branchesControllers', () => {
  return {
    __esModule: true,
    createBranch: jest.fn((_req, res) => res.status(201).json({ message: 'mocked create' })),
    getAllBranches: jest.fn((_req, res) => res.status(200).json({ message: 'mocked getAll' })),
    getBranchById: jest.fn((_req, res) => res.status(200).json({ message: 'mocked getById' })),
    updateBranch: jest.fn((_req, res) => res.status(200).json({ message: 'mocked update' })),
    deleteBranch: jest.fn((_req, res) => res.status(204).json({ message: 'mocked delete' })),
  };
});

import request from 'supertest';
import app from '../src/app';
import * as branchesController from '../src/api/v1/controllers/branchesControllers';

describe('Branch Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

    it('should call createBranch on POST /api/v1/branches', async () => {   
        const payload = {
      name: 'scanton branch',
      location: 'scranton',
      phone: '555-5555',
    };

    await request(app).post('/api/v1/branches').send(payload);

    expect(branchesController.createBranch).toHaveBeenCalled();
    const mockCreate = branchesController.createBranch as jest.Mock;
    expect(mockCreate.mock.calls[0][0].body).toEqual(payload);
  });

  it('should call getAllBranches on GET /api/v1/branches', async () => {
    await request(app).get('/api/v1/branches');
    expect(branchesController.getAllBranches).toHaveBeenCalled();
  });

  it('should call getBranchById on GET /api/v1/branches/:id', async () => {
    await request(app).get('/api/v1/branches/1');
    expect(branchesController.getBranchById).toHaveBeenCalled();
  });

  it('should call updateBranch on PUT /api/v1/branches/:id', async () => {
    await request(app).put('/api/v1/branches/1').send({ phone: '999-999-9999' });
    expect(branchesController.updateBranch).toHaveBeenCalled();
  });

  it('should call deleteBranch on DELETE /api/v1/branches/:id', async () => {
    await request(app).delete('/api/v1/branches/1');
    expect(branchesController.deleteBranch).toHaveBeenCalled();
  });
});