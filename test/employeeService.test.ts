import * as employeeService from "../src/api/v1/services/employeeService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Employee Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create an employee successfully", async () => {
        // Arrange
        const mockEmployeeData = {
            name: "Dennis Test",
            position: "IT position",
            email: "Dgui@hotmail.com",
            branchId: 1

        };
        const mockDocumentId = "test-employee-id";

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
            mockDocumentId
        );

        // Act
        const result = await employeeService.createEmployee(mockEmployeeData);

        // Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "employees",
            expect.objectContaining({
                name: mockEmployeeData.name,
                position: mockEmployeeData.position,
                email: mockEmployeeData.email,
                branchId: mockEmployeeData.branchId,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            })
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.name).toBe(mockEmployeeData.name);
    });
});
