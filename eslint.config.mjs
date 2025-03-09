import mdxPlugin from 'eslint-plugin-mdx';
import prettierPlugin from 'eslint-plugin-prettier';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"), // Converts old extends into flat config format
  {
    plugins: {
      prettier: prettierPlugin,
      mdx: mdxPlugin,
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules, // Prettier rules
      ...mdxPlugin.configs.recommended.rules, // MDX rules
    },
  },
];

export default eslintConfig;
