import fs from 'node:fs';

const gradlePath = 'android/app/build.gradle';
if (!fs.existsSync(gradlePath)) {
  throw new Error(`Expected ${gradlePath} after 'npx cap add android'.`);
}

const required = [
  'ANDROID_KEYSTORE_PATH',
  'ANDROID_KEYSTORE_PASSWORD',
  'ANDROID_KEY_ALIAS',
  'ANDROID_KEY_PASSWORD',
];
for (const name of required) {
  if (!process.env[name]) throw new Error(`Missing required release secret: ${name}`);
}

const versionCode = Number.parseInt(process.env.ANDROID_VERSION_CODE || '1', 10);
if (!Number.isInteger(versionCode) || versionCode < 1) {
  throw new Error('ANDROID_VERSION_CODE must be a positive integer.');
}
const versionName = process.env.ANDROID_VERSION_NAME || '1.0.0';

let gradle = fs.readFileSync(gradlePath, 'utf8');

if (!gradle.includes('signingConfigs {')) {
  const marker = '    buildTypes {';
  const signingBlock = `    signingConfigs {\n        release {\n            storeFile file(System.getenv('ANDROID_KEYSTORE_PATH'))\n            storePassword System.getenv('ANDROID_KEYSTORE_PASSWORD')\n            keyAlias System.getenv('ANDROID_KEY_ALIAS')\n            keyPassword System.getenv('ANDROID_KEY_PASSWORD')\n        }\n    }\n\n`;
  if (!gradle.includes(marker)) throw new Error('Could not locate Android buildTypes block.');
  gradle = gradle.replace(marker, signingBlock + marker);
}

gradle = gradle.replace(
  /defaultConfig\s*\{([\s\S]*?)\n\s*\}/m,
  (match, body) => {
    let updated = body;
    if (/\bversionCode\s+/.test(updated)) updated = updated.replace(/\bversionCode\s+[^\n]+/, `versionCode ${versionCode}`);
    else updated += `\n        versionCode ${versionCode}`;
    if (/\bversionName\s+/.test(updated)) updated = updated.replace(/\bversionName\s+[^\n]+/, `versionName "${versionName}"`);
    else updated += `\n        versionName "${versionName}"`;
    return `defaultConfig {${updated}\n    }`;
  },
);

gradle = gradle.replace(
  /buildTypes\s*\{\s*release\s*\{([\s\S]*?)\n\s*\}/m,
  (match, body) => {
    if (/signingConfig\s+signingConfigs\.release/.test(body)) return match;
    return match.replace(/(release\s*\{)/, '$1\n            signingConfig signingConfigs.release');
  },
);

fs.writeFileSync(gradlePath, gradle);
console.log(`Configured signed Android release: versionCode=${versionCode}, versionName=${versionName}`);
