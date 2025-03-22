import type { NextConfig } from "next";

import createMDX from '@next/mdx';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const
  withMDX = createMDX({ // https://nextjs.org/docs/app/building-your-application/configuring/mdx#configure-nextconfigmjs
    // options: {
    //   remarkPlugins: [],
    //   rehypePlugins: [],
    // },
  }),
  withVanillaExtract = createVanillaExtractPlugin(),

  nextConfig: NextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'], 
    images:{
      remotePatterns:[
        {
          protocol: 'https',
          hostname: 'upload.wikimedia.org',
          port: '',
          pathname: '/**',
          search: '',
        },
      ]
    }
  };

export default withVanillaExtract(withMDX(nextConfig)); // https://vanilla-extract.style/documentation/integrations/next/#setup

// вообще говоря, конфиг  работающий и для webpack и для turbopack,
// не всегда можно написать
// см https://nextjs.org/docs/app/building-your-application/configuring/mdx#using-plugins-with-turbopack
// и https://nextjs.org/docs/app/api-reference/turbopack#configuration
// в крайнем случае, можно отключить turbopack

