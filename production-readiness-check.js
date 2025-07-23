#!/usr/bin/env node

/**
 * HealthSync Production Readiness Check
 * Validates that the application is ready for Render deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 HealthSync Production Readiness Check\n');

let passed = 0;
let failed = 0;

function checkPassed(message) {
  console.log(`✅ ${message}`);
  passed++;
}

function checkFailed(message) {
  console.log(`❌ ${message}`);
  failed++;
}

function checkWarning(message) {
  console.log(`⚠️  ${message}`);
}

// 1. Check file structure
console.log('📁 Checking File Structure...');

const requiredFiles = [
  'package.json',
  'next.config.mjs',
  'render.yaml',
  'database-schema.sql',
  'backend/package.json',
  'backend/server.ts',
  'backend/.env.example',
  'backend/config/db.ts',
  'backend/models/User.ts',
  'RENDER_DEPLOYMENT_GUIDE.md'
];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    checkPassed(`${file} exists`);
  } else {
    checkFailed(`${file} missing`);
  }
});

// 2. Check package.json dependencies
console.log('\n📦 Checking Dependencies...');

try {
  const frontendPkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const backendPkg = JSON.parse(fs.readFileSync('backend/package.json', 'utf8'));

  // Frontend dependencies
  const frontendRequired = ['next', 'react', 'typescript', 'serve'];
  frontendRequired.forEach(dep => {
    if (frontendPkg.dependencies[dep] || frontendPkg.devDependencies[dep]) {
      checkPassed(`Frontend has ${dep}`);
    } else {
      checkFailed(`Frontend missing ${dep}`);
    }
  });

  // Backend dependencies
  const backendRequired = ['express', 'pg', 'bcryptjs', 'jsonwebtoken', 'cors'];
  backendRequired.forEach(dep => {
    if (backendPkg.dependencies[dep]) {
      checkPassed(`Backend has ${dep}`);
    } else {
      checkFailed(`Backend missing ${dep}`);
    }
  });

} catch (error) {
  checkFailed(`Error reading package.json files: ${error.message}`);
}

// 3. Check build scripts
console.log('\n🔨 Checking Build Configuration...');

try {
  const frontendPkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const backendPkg = JSON.parse(fs.readFileSync('backend/package.json', 'utf8'));

  if (frontendPkg.scripts && frontendPkg.scripts.build) {
    checkPassed('Frontend build script exists');
  } else {
    checkFailed('Frontend build script missing');
  }

  if (backendPkg.scripts && backendPkg.scripts.build) {
    checkPassed('Backend build script exists');
  } else {
    checkFailed('Backend build script missing');
  }

  if (backendPkg.scripts && backendPkg.scripts.start) {
    checkPassed('Backend start script exists');
  } else {
    checkFailed('Backend start script missing');
  }

} catch (error) {
  checkFailed(`Error checking build scripts: ${error.message}`);
}

// 4. Check Next.js configuration
console.log('\n⚙️  Checking Next.js Configuration...');

try {
  const nextConfig = fs.readFileSync('next.config.mjs', 'utf8');
  if (nextConfig.includes('output: "export"')) {
    checkPassed('Next.js configured for static export');
  } else {
    checkWarning('Next.js may not be configured for static export');
  }

  if (nextConfig.includes('trailingSlash: true')) {
    checkPassed('Trailing slash configuration found');
  } else {
    checkWarning('Consider adding trailingSlash: true for static hosting');
  }

} catch (error) {
  checkFailed(`Error reading next.config.mjs: ${error.message}`);
}

// 5. Check environment configuration
console.log('\n🔐 Checking Environment Configuration...');

try {
  const envExample = fs.readFileSync('backend/.env.example', 'utf8');
  
  const requiredEnvVars = [
    'NODE_ENV',
    'PORT',
    'DATABASE_URL',
    'JWT_SECRET',
    'CORS_ORIGIN'
  ];

  requiredEnvVars.forEach(envVar => {
    if (envExample.includes(envVar)) {
      checkPassed(`Environment variable ${envVar} documented`);
    } else {
      checkFailed(`Environment variable ${envVar} not documented`);
    }
  });

} catch (error) {
  checkFailed(`Error reading .env.example: ${error.message}`);
}

// 6. Check database schema
console.log('\n🗄️  Checking Database Schema...');

try {
  const schema = fs.readFileSync('database-schema.sql', 'utf8');
  
  const requiredTables = [
    'users',
    'appointments',
    'health_records',
    'notifications',
    'device_data',
    'ai_insights'
  ];

  requiredTables.forEach(table => {
    if (schema.includes(`CREATE TABLE IF NOT EXISTS ${table}`)) {
      checkPassed(`Database table ${table} defined`);
    } else {
      checkFailed(`Database table ${table} missing`);
    }
  });

  if (schema.includes('INSERT INTO users')) {
    checkPassed('Sample data included');
  } else {
    checkWarning('No sample data found');
  }

} catch (error) {
  checkFailed(`Error reading database-schema.sql: ${error.message}`);
}

// 7. Check render.yaml configuration
console.log('\n🚀 Checking Render Configuration...');

try {
  const renderConfig = fs.readFileSync('render.yaml', 'utf8');
  
  if (renderConfig.includes('healthsync-backend')) {
    checkPassed('Backend service configured');
  } else {
    checkFailed('Backend service not configured');
  }

  if (renderConfig.includes('healthsync-frontend')) {
    checkPassed('Frontend service configured');
  } else {
    checkFailed('Frontend service not configured');
  }

  if (renderConfig.includes('/api/health')) {
    checkPassed('Health check endpoint configured');
  } else {
    checkWarning('Health check endpoint not configured');
  }

} catch (error) {
  checkFailed(`Error reading render.yaml: ${error.message}`);
}

// 8. Test builds (if possible)
console.log('\n🧪 Testing Builds...');

try {
  console.log('Testing frontend build...');
  execSync('npm run build', { stdio: 'pipe', cwd: process.cwd() });
  checkPassed('Frontend builds successfully');
} catch (error) {
  checkFailed(`Frontend build failed: ${error.message}`);
}

try {
  console.log('Testing backend build...');
  execSync('npm run build', { stdio: 'pipe', cwd: path.join(process.cwd(), 'backend') });
  checkPassed('Backend builds successfully');
} catch (error) {
  checkFailed(`Backend build failed: ${error.message}`);
}

// Summary
console.log('\n📊 Production Readiness Summary');
console.log('================================');
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);

if (failed === 0) {
  console.log('\n🎉 Your HealthSync application is READY for Render deployment!');
  console.log('\nNext steps:');
  console.log('1. Push your code to GitHub');
  console.log('2. Follow the RENDER_DEPLOYMENT_GUIDE.md');
  console.log('3. Create PostgreSQL database on Render');
  console.log('4. Deploy backend and frontend services');
  console.log('\n🚀 Happy deploying!');
} else {
  console.log('\n⚠️  Please fix the failed checks before deploying.');
  console.log('Refer to the RENDER_DEPLOYMENT_GUIDE.md for detailed instructions.');
}

process.exit(failed === 0 ? 0 : 1);
