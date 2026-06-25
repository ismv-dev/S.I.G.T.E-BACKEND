import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('token'),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('returns null when user is not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      const result = await service.validateUser('test@example.com', 'password');

      expect(result).toBeNull();
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    });

    it('returns user data without passwordHash when credentials are valid', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: '1',
        email: 'test@example.com',
        passwordHash: await bcrypt.hash('password', 10),
        name: 'Test User',
        role: 'USER',
      });

      const result = await service.validateUser('test@example.com', 'password');

      expect(result).toMatchObject({
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
      });
      expect((result as any).passwordHash).toBeUndefined();
    });
  });

  describe('login', () => {
    it('returns an access token with the signed payload', async () => {
      const payload = { id: '1', email: 'test@example.com', role: Role.USER };
      const result = await service.login(payload);

      expect(result).toEqual({ access_token: 'token' });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        email: 'test@example.com',
        sub: '1',
        role: Role.USER,
      });
    });
  });

  describe('register', () => {
    it('creates a new user with default role when role is not provided', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.user.create.mockResolvedValue({
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
        universityId: null,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.register({
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
      });

      expect(mockPrismaService.user.create).toHaveBeenCalled();
      expect(result).toMatchObject({
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
      });
    });
  });
});
