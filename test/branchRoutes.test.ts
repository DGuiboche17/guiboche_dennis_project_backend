jest.mock('../src/api/v1/controllers/BranchesControllers', () => {
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
        