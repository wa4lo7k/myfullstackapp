const axios = require('axios');
const assert = require('assert');

const API_URL = 'http://localhost:3000/api/auth';

const testUser = {
  name: 'Test User',
  email: `testuser_${Date.now()}@example.com`,
  password: 'TestPass123',
  role: 'patient',
};

async function runTests() {
  let token;
  // Register
  try {
    const res = await axios.post(`${API_URL}/register`, testUser);
    assert.strictEqual(res.status, 201);
    console.log('✅ Register: Passed');
  } catch (err) {
    console.error('❌ Register: Failed', err.response?.data || err.message);
    return;
  }

  // Login
  try {
    const res = await axios.post(`${API_URL}/login`, {
      email: testUser.email,
      password: testUser.password,
    });
    assert.strictEqual(res.status, 200);
    assert.ok(res.data.token);
    token = res.data.token;
    console.log('✅ Login: Passed');
  } catch (err) {
    console.error('❌ Login: Failed', err.response?.data || err.message);
    return;
  }

  // Get Profile
  try {
    const res = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.email, testUser.email);
    console.log('✅ Get Profile: Passed');
  } catch (err) {
    console.error('❌ Get Profile: Failed', err.response?.data || err.message);
    return;
  }
}

runTests(); 