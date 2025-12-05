/**
 * TELIS Knowledge Shard Generator
 * 
 * This script scans the source code and generates "Knowledge Shards" for the AI context.
 * It implements Layer 2 of the TELIS methodology.
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
    sourceDir: './src',
    outputDir: './.context/shards',
    shardSize: 'micro', // nano, micro, full
};

// Ensure output directory exists
if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
}

console.log('🧠 TELIS: Initializing Knowledge Shard Generation...');

// 1. Scan Source Files
function scanFiles(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            scanFiles(filePath, fileList);
        } else {
            if (file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.py')) {
                fileList.push(filePath);
            }
        }
    });
    return fileList;
}

const files = scanFiles(CONFIG.sourceDir);
console.log(`📂 Found ${files.length} source files.`);

// 2. Generate Shards (Mock Implementation for Template)
// In a full implementation, this would use an LLM or AST parser to extract patterns.
const shards = files.map(file => {
    return {
        id: path.basename(file),
        path: file,
        tier: 'micro',
        tokens: 150, // Estimated
        patterns: ['Function Definitions', 'Class Structure'],
        lastUpdated: new Date().toISOString()
    };
});

// 3. Write Shard Index
const indexPath = path.join(CONFIG.outputDir, 'shard-index.json');
fs.writeFileSync(indexPath, JSON.stringify(shards, null, 2));

console.log(`✅ Generated ${shards.length} knowledge shards in ${CONFIG.outputDir}`);
console.log('🚀 TELIS: Knowledge Layer Updated.');
