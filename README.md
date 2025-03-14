Учебный проект


Стек проекта:
* NextJS (App router) `next@latest react@latest react-dom@latest`
* TS `typescript`
* Remult - для создания API и генерации запросов `remult`
* NextAuth.js 
* MDX[^1] (развитие markdown) - для статического контента  `@next/mdx @mdx-js/loader @mdx-js/react @types/mdx`
* ESLint `eslint`

В учебных целях, для стилей в проекте используется одновременно несколько подходов:
* Tailwind CSS (через postcss-плагин) `tailwindcss @tailwindcss/postcss postcss`
  1. с плагином Typography `@tailwindcss/typography` 
* CSS Modules[^2] [см. комментарии разработчиков Tailwind](#tailwind-css-modules) 
* SASS [^3] [см. комментарии разработчиков Tailwind](#tailwind-sass)  `sass`
* Vanilla-extract (Zero-runtime CSS-in-TS) `@vanilla-extract/next-plugin`
  



[^1]: https://nextjs.org/docs/app/building-your-application/configuring/mdx

### Комментарии разработчиков Tailwind про SASS и CSS modules 
<a name="tailwind-css-modules"></a>
[^2]: https://tailwindcss.com/docs/compatibility#css-modules

> Tailwind совместим с модулями CSS и может сосуществовать с ними, если вы внедряете Tailwind в проект, который уже > использует их, но мы не рекомендуем использовать модули CSS и Tailwind вместе, если этого можно избежать.

<a name="tailwind-sass"></a>
[^3]: https://tailwindcss.com/docs/compatibility#sass-less-and-stylus

> Думайте о Tailwind CSS как о своем препроцессоре — вам не следует использовать Tailwind с Sass по той же причине, > по которой вы не стали бы использовать Sass со Stylus.

в качестве пакетного менеджера  рекомендуется bun или pnpm, но можно использовать и npm (и, видимо, yarn) 