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
});