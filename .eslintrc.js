module.exports = {
  // Specify the environment for your project.
  env: {
    node: true, // This sets Node.js environment
  },
  // Specify the parser for TypeScript files.
  parser: '@typescript-eslint/parser',
  // Extend the recommended TypeScript ESLint configuration.
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  // Add any project-specific rules or overrides here.
  rules: {
    // Example: You can add custom rules here.
    semi: 'error',
    indent: ['error', 2, { SwitchCase: 1 }],
  },
};