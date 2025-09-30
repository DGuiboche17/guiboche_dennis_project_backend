import { Branch, branches } from "../../../data/branches";

export const getAllBranches = (): Branch[] => {
  return branches;
};

export const getBranchById = (id: number): Branch | undefined => {
  return branches.find(branch => branch.id === id);
};

export const createBranch = (data: {
  name: string;
  address: string;
  phone: string;
}): Branch => {
  const newBranch: Branch = {
    id: branches.length > 0 ? branches[branches.length - 1].id + 1 : 1,
    ...data,
  };
  branches.push(newBranch);
  return newBranch;
};

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

export const deleteBranch = (id: number): boolean => {
  const index = branches.findIndex(branch => branch.id === id);
  if (index === -1) return false;
  branches.splice(index, 1);
  return true;
};
