#!/usr/bin/env node
const cwd = process.cwd();
if (cwd.includes('/sdcard/')) { console.error('❌ Move to ~/deploycore'); process.exit(1); }
console.log('✅ Safe location');