const js = require('@eslint/js');
const prettier = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const globals = require('globals');

module.exports = [
    {
        ignores: [
            'node_modules/**',
            'dist/**',
            'build/**',
            'coverage/**',
            'test-results/**',
            'playwright-report/**',
            '.context/shards/**',
            'BMAD-METHOD-RESEARCH/**',
            'package-lock.json',
        ],
    },
    js.configs.recommended,
    {
        files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
                describe: 'readonly',
                test: 'readonly',
                expect: 'readonly',
                it: 'readonly',
                beforeAll: 'readonly',
                afterAll: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
            },
        },
        plugins: {
            prettier,
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off',
            'no-undef': 'warn',
            'prettier/prettier': 'error',
        },
    },
    prettierConfig,
];
