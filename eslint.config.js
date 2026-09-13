import eslint from '@eslint/js';

export default [
  eslint.configs.recommended,

  {
    languageOptions: {
      sourceType: 'module',

      globals: {
        console: 'readonly',
        document: 'readonly',
        window: 'readonly',
        localStorage: 'readonly',
        setTimeout: 'readonly',
        clearInterval: 'readonly',
        setInterval: 'readonly'
      }
    },

    rules: {
      'no-empty': ['error', { allowEmptyCatch: true }],

      'no-unused-vars': ['error', {
        args: 'after-used',
        caughtErrors: 'none',
        varsIgnorePattern: '^(startGame|enterRound|useHint|showRoundSummary|proceedFromSummary|lockAccusation)$'
      }]
    }
  }
];