import type { Linter } from 'eslint';

import { interopDefault } from '../util';

export async function perfectionist(): Promise<Linter.Config[]> {
  const perfectionistPlugin = await interopDefault(
    import('eslint-plugin-perfectionist'),
  );

  return [
    perfectionistPlugin.configs['recommended-natural'],
    {
      rules: {
        'perfectionist/sort-exports': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-imports': [
          'error',
          {
            customGroups: [
              { groupName: 'vue-type', modifiers: ['type'], elementNamePattern: ['^vue$', '^vue-.+', '^@vue/.+'] },
              { groupName: 'x-monorepo-type', modifiers: ['type'], elementNamePattern: ['^@x-monorepo/.+'] },
              { groupName: 'x-monorepo-core-type', modifiers: ['type'], elementNamePattern: ['^@x-monorepo-core/.+'] },
              { groupName: 'vue', elementNamePattern: ['^vue$', '^vue-.+', '^@vue/.+'] },
              { groupName: 'x-monorepo', elementNamePattern: ['^@x-monorepo/.+'] },
              { groupName: 'x-monorepo-core', elementNamePattern: ['^@x-monorepo-core/.+'] },
            ],
            environment: 'node',
            groups: [
              ['external-type', 'builtin-type', 'type'],
              'vue-type',
              'x-monorepo-type',
              'x-monorepo-core-type',
              ['parent-type', 'sibling-type', 'index-type'],
              ['internal-type'],
              'builtin',
              'vue',
              'x-monorepo',
              'x-monorepo-core',
              'external',
              'internal',
              ['parent', 'sibling', 'index'],
              'side-effect',
              'side-effect-style',
              'style',
              'object',
              'unknown',
            ],
            internalPattern: ['^#/.+'],
            newlinesBetween: 'always',
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-modules': 'off',
        'perfectionist/sort-named-exports': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-objects': [
          'off',
          {
            customGroups: {
              items: 'items',
              list: 'list',
              children: 'children',
            },
            groups: ['unknown', 'items', 'list', 'children'],
            ignorePattern: ['children'],
            order: 'asc',
            type: 'natural',
          },
        ],
      },
    },
  ];
}
