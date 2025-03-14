// mdx-components.tsx необходим для использования @next/mdx с App Router и без него работать не будет.
// https://nextjs.org/docs/app/building-your-application/configuring/mdx#add-an-mdx-componentstsx-file

import type { MDXComponents } from 'mdx/types';
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}

