const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../utils/Database');
const User = require('../../models/UserModel');

describe('User model', () => {
  let db;

  beforeAll(async () => {
    db = new Sequelize('sqlite::memory:');
    await db.authenticate();
  });

  afterAll(async () => {
    await db.close();
  });

  beforeEach(async () => {
    await User.sync({ force: true });
  });

  test('should create a new user', async () => {
    const userData = {
      username: 'abcd',
      email: 'abc@fake.com',
      password: '123456789',
      sustainability_score: 100,
      global_score: 50,
    };
    const user = await User.create(userData);
    expect(user.username).toBe(userData.username);
    expect(user.email).toBe(userData.email);
    expect(user.password).toBe(userData.password);
    expect(user.sustainability_score).toBe(userData.sustainability_score);
    expect(user.goal).toBeNull();
    expect(user.last_login).toBeNull();
    expect(user.global_score).toBe(userData.global_score);
  });

  test('should not allow duplicate email addresses', async () => {
    const userData = {
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: 'password123',
      sustainability_score: 100,
      global_score: 50,
    };
    await User.create(userData);
    await expect(User.create(userData)).rejects.toThrow(Sequelize.UniqueConstraintError);
  });

  test('should not allow null username', async () => {
    const userData = {
      email: 'john.doe@example.com',
      password: 'password123',
      sustainability_score: 100,
      global_score: 50,
    };
    await expect(User.create(userData)).rejects.toThrow(Sequelize.ValidationError);
  });
});
