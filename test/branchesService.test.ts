import * as branchesService from "../src/api/v1/services/branchesService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Branches Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // test for createBranch
    it("should create a branch successfully", async () => {
        // Arrange
        const mockBranchData = {
            name: "Scranton Branch",
            location: "Scranton",
            phone: "123-456-7890",
        };
        const mockDocumentId = "test-branch-id";

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
            mockDocumentId
        );

        // Act
        const result = await branchesService.createBranch(mockBranchData);

        // Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "branches",
            expect.objectContaining({
                name: mockBranchData.name,
                location: mockBranchData.location,
                phone: mockBranchData.phone,
            })
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.name).toBe(mockBranchData.name);
    });

    // test for getAllBranches
    it("should retrieve all branches successfully", async () => {
        // Arrange
        const mockBranches = [
            {
            id: "branch-1",
            data: () => ({
                name: "Scranton Branch",
                location: "Scranton",
                phone: "123-456-7890",
            }),
            },
        ];

        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue({ docs: mockBranches });

        // Act
        const result = await branchesService.getAllBranches();

        // Assert
        expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("branches");
        expect(result).toMatchObject([
            {
            id: "branch-1",
            name: "Scranton Branch",
            location: "Scranton",
            phone: "123-456-7890",
            },
        ]);
    });

    // test for getBranchById
    it("should retrieve a branch by ID successfully", async () => {
        // Arrange
        const branchId = "12345";
        const mockBranchData = {
            name: "Scranton Branch",
            location: "Scranton",
            phone: "123-456-7890"
        };

        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue({
            data: () => mockBranchData
        });

        // Act
        const result = await branchesService.getBranchById(branchId);

        // Assert
        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith(
            "branches",
            branchId
        );

        // toMatchObject checks only for fields i care about not the optional ones. 
        expect(result).toMatchObject(mockBranchData);
    });

    // test for deleteBranch
    it("should delete a branch successfully", async () => {
        // Arrange
        const branchId = "test-branch-id";

        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);

        // Act
        const result = await branchesService.deleteBranch(branchId);

        // Assert
        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
            "branches",
            branchId
        );
        // expecting the result to be undefined means the variable is unassigned
        // void and null are different from undefined
        // void would be used in a situation where the function returns nothing
        // null would be used in a situation where the function returns an intentional absence of value
        expect(result).toBeUndefined();
    });

    // test for updateBranch
    it("should update a branch successfully", async () => {
        // Arrange
        const branchId = "test-branch-id";
        const mockUpdateData = {
            name: "Not scranton Branch",
            location: "Not scranton",
            phone: "123-456-7890",
        };

        // Mock updateDocument to resolve with undefined or else it will try to talk to firestore
        (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(undefined);

        // Mock getDocumentById to return a fake Firestore document
        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue({
            data: () => ({
                name: mockUpdateData.name,
                location: mockUpdateData.location,
                phone: mockUpdateData.phone,
            }),
        });
   

        // Act actually calls the function we are testing
        const result = await branchesService.updateBranch(branchId, mockUpdateData);

        // Assert
        expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
            "branches",
            branchId,
            expect.objectContaining({
                name: mockUpdateData.name,
                location: mockUpdateData.location,
                phone: mockUpdateData.phone,
            })
        );

        // check the final returned result
        expect(result.name).toBe(mockUpdateData.name);
        expect(result.location).toBe(mockUpdateData.location);
        expect(result.phone).toBe(mockUpdateData.phone);
    });
});
