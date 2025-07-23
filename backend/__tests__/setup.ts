// Test setup for PostgreSQL-based HealthSync backend
// For now, we'll use mocked database operations

jest.setTimeout(30000); // 30 seconds for all tests

// Mock the database pool to avoid requiring a real database for tests
jest.mock('../config/db', () => ({
  pool: {
    connect: jest.fn().mockResolvedValue({
      query: jest.fn().mockResolvedValue({ rows: [], rowCount: 0 }),
      release: jest.fn(),
    }),
  },
  default: jest.fn().mockResolvedValue(undefined),
}));

beforeAll(async () => {
  // Setup test environment
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-secret';
});

afterEach(async () => {
  // Clear all mocks after each test
  jest.clearAllMocks();
});

afterAll(async () => {
  // Cleanup after all tests
});