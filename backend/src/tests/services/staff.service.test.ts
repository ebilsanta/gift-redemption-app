import prisma from '../../prisma/prisma-client';
import HttpException from '../../app/models/http-exception.model';
import { buildPrismaGetQuery, getStaff, addStaff } from '../../app/routes/staff/staff.service';

jest.mock('../../prisma/prisma-client', () => ({
  staff: {
    findMany: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
  },
  $queryRaw: jest.fn(),
}));

describe('StaffService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('buildPrismaGetQuery', () => {
    test('should build Prisma query object with provided prefix, offset, and limit', () => {
      // Given
      const query = {
        prefix: 'prefix',
        offset: '5',
        limit: '20',
      };
  
      // When
      const prismaQuery = buildPrismaGetQuery(query);
  
      // Then
      expect(prismaQuery).toEqual({
        where: {
          staffPassId: {
            startsWith: 'prefix',
          },
        },
        skip: 5,
        take: 20,
      });
    });
  
    test('should use default values for offset and limit when not provided in query', () => {
      // Given
      const query = {
        prefix: 'prefix',
      };
  
      // When
      const prismaQuery = buildPrismaGetQuery(query);
  
      // Then
      expect(prismaQuery).toEqual({
        where: {
          staffPassId: {
            startsWith: 'prefix',
          },
        },
        skip: 0, // Default value for offset
        take: 10, // Default value for limit
      });
    });
  });

  describe('getStaff', () => {
    test('should return staff with redeemed information when include_redeemed is true', async () => {
      // Given
      const mockOffset = '0';
      const mockLimit = '10';
      const mockPrefix = 'prefix';

      const query = {
        include_redeemed: 'true',
        offset: mockOffset,
        limit: mockLimit,
        prefix: mockPrefix,
      };

      const mockDate = new Date();

      const mockStaffInDb = [
        {
          id: 1,
          staff_pass_id: 'pass1',
          team_name: 'team1',
          created_at: mockDate,
          redeemed_at: mockDate,
        },
        {
          id: 2,
          staff_pass_id: 'pass2',
          team_name: 'team2',
          created_at: mockDate,
          redeemed_at: mockDate,
        },
      ];
      const mockStaffResponse = [
        {
          id: 1,
          staffPassId: 'pass1',
          teamName: 'team1',
          createdAt: mockDate.getTime(),
          redeemedAt: mockDate.getTime(),
        },
        {
          id: 2,
          staffPassId: 'pass2',
          teamName: 'team2',
          createdAt: mockDate.getTime(),
          redeemedAt: mockDate.getTime(),
        },
      ];

      (prisma.$queryRaw as jest.Mock).mockResolvedValue(mockStaffInDb);

      // When
      const result = await getStaff(query);

      // Then
      expect(result).toEqual(mockStaffResponse);
      expect(prisma.$queryRaw).toHaveBeenCalledWith(
        expect.anything(),
        `${mockPrefix}%`,
        Number(mockLimit),
        Number(mockOffset)
      );
    });
  });

  describe('getStaff', () => {
    test('should return staff without redeemed information when include_redeemed is false', async () => {
      // Given
      const query = {
        include_redeemed: 'false',
        offset: '0',
        limit: '10',
        prefix: 'prefix',
      };

      const mockDate = new Date();
      const mockStaffInDb = [
        { id: 1, staffPassId: 'pass1', teamName: 'team1', createdAt: mockDate },
        { id: 2, staffPassId: 'pass2', teamName: 'team2', createdAt: mockDate },
      ];
      const mockStaffResponse = [
        {
          id: 1,
          staffPassId: 'pass1',
          teamName: 'team1',
          createdAt: mockDate.getTime(),
        },
        {
          id: 2,
          staffPassId: 'pass2',
          teamName: 'team2',
          createdAt: mockDate.getTime(),
        },
      ];

      (prisma.staff.findMany as jest.Mock).mockResolvedValue(mockStaffInDb);

      // When
      const result = await getStaff(query);

      // Then
      expect(result).toEqual(mockStaffResponse);
      expect(prisma.staff.findMany).toHaveBeenCalledWith({
        where: {
          staffPassId: { startsWith: 'prefix' },
        },
        skip: 0,
        take: 10,
      });
    });
  });

  describe('addStaff', () => {
    test('should add staff successfully', async () => {
      // Given
      const input = {
        staffPassId: 'pass3',
        teamName: 'team3',
        createdAt: new Date().getTime(),
      };

      (prisma.staff.count as jest.Mock).mockResolvedValue(0);
      (prisma.staff.create as jest.Mock).mockResolvedValue({
        id: 3,
        staffPassId: 'pass3',
        teamName: 'team3',
        createdAt: new Date(input.createdAt),
      });

      // When
      const result = await addStaff(input);

      // Then
      expect(result).toEqual({
        id: 3,
        staffPassId: 'pass3',
        teamName: 'team3',
        createdAt: input.createdAt,
      });
      expect(prisma.staff.count).toHaveBeenCalledWith({
        where: {
          staffPassId: 'pass3',
        },
      });
      expect(prisma.staff.create).toHaveBeenCalledWith({
        data: {
          staffPassId: 'pass3',
          teamName: 'team3',
          createdAt: expect.any(Date),
        },
      });
    });

    test('should throw an error when staff already exists', async () => {
      // Given
      const input = {
        staffPassId: 'pass3',
        teamName: 'team3',
        createdAt: new Date().getTime(),
      };

      (prisma.staff.count as jest.Mock).mockResolvedValue(1);

      // When/Then
      await expect(addStaff(input)).rejects.toThrow(HttpException);
      expect(prisma.staff.count).toHaveBeenCalledWith({
        where: {
          staffPassId: 'pass3',
        },
      });
      expect(prisma.staff.create).not.toHaveBeenCalled();
    });
  });
});
