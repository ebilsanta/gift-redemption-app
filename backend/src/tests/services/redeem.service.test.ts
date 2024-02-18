import prisma from '../../prisma/prisma-client';
import HttpException from '../../app/models/http-exception.model'
import redemptionMapper from '../../app/routes/redeem/redemption.mapper';
import { createRedemption } from '../../app/routes/redeem/redemption.service';

jest.mock('../../prisma/prisma-client', () => ({
  staff: {
    findUnique: jest.fn(),
  },
  redemption: {
    count: jest.fn(),
    create: jest.fn(),
  },
}));

describe('RedemptionService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createRedemption', () => {
    test('should create redemption successfully', async () => {
      // Given
      const body = {
        staffPassId: 'pass1',
      };

      const mockStaff = {
        id: 1,
        staffPassId: 'pass1',
        teamName: 'team1',
        createdAt: new Date(),
      };

      const mockRedemption = {
        id: 1,
        teamName: 'team1',
        redeemedAt: new Date(),
      };

      (prisma.staff.findUnique as jest.Mock).mockResolvedValue(mockStaff);
      (prisma.redemption.count as jest.Mock).mockResolvedValue(0);
      (prisma.redemption.create as jest.Mock).mockResolvedValue(mockRedemption);

      // When
      const result = await createRedemption(body);

      // Then
      expect(result).toEqual(redemptionMapper(mockRedemption));
      expect(prisma.staff.findUnique).toHaveBeenCalledWith({
        where: {
          staffPassId: 'pass1',
        },
      });
      expect(prisma.redemption.count).toHaveBeenCalledWith({
        where: {
          teamName: 'team1',
        },
      });
      expect(prisma.redemption.create).toHaveBeenCalledWith({
        data: {
          teamName: 'team1',
          redeemedAt: expect.any(Date),
        },
      });
    });

    test('should throw an error when staffPassId is not provided', async () => {
      // Given
      const body = {};

      // When/Then
      await expect(createRedemption(body)).rejects.toThrow(HttpException);
      expect(prisma.staff.findUnique).not.toHaveBeenCalled();
      expect(prisma.redemption.count).not.toHaveBeenCalled();
      expect(prisma.redemption.create).not.toHaveBeenCalled();
    });

    test('should throw an error when staff does not exist', async () => {
      // Given
      const body = {
        staffPassId: 'pass1',
      };

      (prisma.staff.findUnique as jest.Mock).mockResolvedValue(null);

      // When/Then
      await expect(createRedemption(body)).rejects.toThrow(HttpException);
      expect(prisma.staff.findUnique).toHaveBeenCalledWith({
        where: {
          staffPassId: 'pass1',
        },
      });
      expect(prisma.redemption.count).not.toHaveBeenCalled();
      expect(prisma.redemption.create).not.toHaveBeenCalled();
    });

    test('should throw an error when team has already redeemed their gift', async () => {
      // Given
      const body = {
        staffPassId: 'pass1',
      };

      const mockStaff = {
        id: 1,
        staffPassId: 'pass1',
        teamName: 'team1',
        createdAt: new Date(),
      };

      (prisma.staff.findUnique as jest.Mock).mockResolvedValue(mockStaff);
      (prisma.redemption.count as jest.Mock).mockResolvedValue(1);

      // When/Then
      await expect(createRedemption(body)).rejects.toThrow(HttpException);
      expect(prisma.staff.findUnique).toHaveBeenCalledWith({
        where: {
          staffPassId: 'pass1',
        },
      });
      expect(prisma.redemption.count).toHaveBeenCalledWith({
        where: {
          teamName: 'team1',
        },
      });
      expect(prisma.redemption.create).not.toHaveBeenCalled();
    });
  });
});
