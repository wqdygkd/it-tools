/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  root: true,
  extends: ['@antfu', '@unocss', './.eslintrc-auto-import.json'],

  rules: {
    'curly': ['error', 'all'],
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    '@typescript-eslint/no-use-before-define': ['error', { allowNamedExports: true, functions: false }],
    'vue/no-empty-component-block': ['error'],
    'no-restricted-imports': ['error', {
      paths: [{
        name: '@vueuse/core',
        importNames: ['useClipboard'],
        message: 'Please use local useCopy from src/composable/copy.ts instead of useClipboard.'
      }]
    }],
    'vue/no-export-in-script-setup': 0
  }
}
