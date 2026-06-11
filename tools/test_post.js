const https = require('https');

const url = 'https://script.google.com/macros/s/AKfycby4W5IyRGldtI-EDe6pt_mKegKDVwzxXWrChHQUXWU10WpERWR4U0nNtESt9JmzlWYb/exec';

const payloadObj = {
  action: 'register',
  email: 'test+node@local.test',
  category: 'reel',
  fullName: 'Node Test',
  phone: '9876543210',
  whatsapp: '9876543210',
  gender: 'Male',
  dob: '2000-01-01',
  organization: 'Test Org',
  courseClass: 'Test Course',
  city: 'Test City',
  state: 'Test State',
  country: 'India',
  eventSpecificData: {
    instagramLink: 'https://instagram.com/test',
    editingSoftware: 'CapCut',
    bestReelLink: 'https://youtu.be/example',
    experience: 'Beginner',
    motivation: 'testing'
  }
};

const payload = JSON.stringify(payloadObj);

const urlObj = new URL(url);

const options = {
  hostname: urlObj.hostname,
  path: urlObj.pathname + urlObj.search,
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = https.request(options, (res) => {
  let data = '';
  console.log('Status:', res.statusCode);
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('Response body:', data);
  });
});

req.on('error', (e) => {
  console.error('Request error:', e);
});

req.write(payload);
req.end();
