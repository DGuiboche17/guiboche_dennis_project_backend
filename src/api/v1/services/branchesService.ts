import { Branch, branches } from "../../../data/branches";

// Get all branches
export const getAllBranches = (): Branch[] => {
  return branches;
};

// Get a branch by ID
export const getBranchById = (id: number): Branch | undefined => {
  return branches.find(branch => branch.id === id);
};

// Create a new branch
export const createBranch = (data: {
  name: string;
  address: string;
  phone: string;
}): Branch => {
  const newBranch: Branch = {
    id: branches.length > 0 ? branches[branches.length - 1].id + 1 : 1,
    // ... remember this will copy contents of data into newBranch
    ...data,
  };
  branches.push(newBranch);
  return newBranch;
};

// Update an existing branch
export const updateBranch = (
  id: number,
  data: {
    name?: string;
    address?: string;
    phone?: string;
  }
): Branch | undefined => {
  const branch = branches.find(branch => branch.id === id);
  if (!branch) return undefined;
  Object.assign(branch, data);
  return branch;
};

// Delete a branch
export const deleteBranch = (id: number): boolean => {
  const index = branches.findIndex(branch => branch.id === id);
  if (index === -1) return false;
  branches.splice(index, 1);
  return true;
};
