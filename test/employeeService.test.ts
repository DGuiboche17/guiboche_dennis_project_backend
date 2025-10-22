import * as employeeService from "../src/api/v1/services/employeeService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Employee Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // test for createEmployee
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


        // test for updateEmployee
    it("should update an employee successfully", async () => {
        // Arrange
        const employeeId = "test-employee-id";
        const mockUpdateData = {
            name: "rookie apprentice",
            position: "labourer",
            email: "timetogetbullied@gmail.com",
            branchId: 2,
        };

        // Mock updateDocument to resolve with undefined or else it will try to talk to firestore
        (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(undefined);

        // Mock getDocumentById to return a fake Firestore document
        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue({
            data: () => ({
                name: mockUpdateData.name,
                position: mockUpdateData.position,
                email: mockUpdateData.email,
                branchId: mockUpdateData.branchId
            }),
        });

        // Act actually calls the function we are testing
        const result = await employeeService.updateEmployee(employeeId, mockUpdateData);

        // Assert
        expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
            "employees",
            employeeId,
            expect.objectContaining({
                name: mockUpdateData.name,
                position: mockUpdateData.position,
                email: mockUpdateData.email,
                branchId: mockUpdateData.branchId,
            })
        );

        // check the final returned result
        expect(result.name).toBe(mockUpdateData.name);
        expect(result.branchId).toBe(mockUpdateData.branchId);
    });

    // test for deleteEmployee
    it("should delete an employee successfully", async () => {
        // Arrange
        const employeeId = "test-employee-id";

        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);

        // Act
        const result = await employeeService.deleteEmployee(employeeId);

        // Assert
        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
            "employees",
            employeeId
        );
        // expecting the result to be undefined means the variable is unassigned
        // void and null are different from undefined
        // void would be used in a situation where the function returns nothing
        // null would be used in a situation where the function returns an intentional absence of value
        expect(result).toBeUndefined();
    });

    // test for getEmployeeById
    it("should retrieve an employee by ID successfully", async () => {
        // Arrange
        const employeeId = "01010";
        const mockEmployeeData = {
            name: "Dennis Test",
            position: "IT position",
            email: "dgui@gmail.com",
            branchId: 1
        };

        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue({
            data: () => mockEmployeeData
        });

        // Act
        const result = await employeeService.getEmployeeById(employeeId);

        // Assert
        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith(
            "employees",
            employeeId
        );

        // toMatchObject checks only for fields i care about not the optional ones. 
        expect(result).toMatchObject(mockEmployeeData);
    });

        it("should retrieve all employees successfully", async () => {
    // Arrange
    const mockEmployees = [
        {
        id: "1",
        data: () => ({
            name: "Dennis Test",
            position: "IT position",
            email: "dgui@gmail.com",
            branchId: 1,
        }),
        },
    ];

    (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue({ docs: mockEmployees });

    // Act
    const result = await employeeService.getAllEmployees();

    // Assert
    expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("employees");
    expect(result).toMatchObject([
        {
        id: "1",
        name: "Dennis Test",
        position: "IT position",
        email: "dgui@gmail.com",
        branchId: 1,
        },
    ]);
    });

});
