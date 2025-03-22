Учебный проект


Стек проекта:
* NextJS (App router) `next@latest react@latest react-dom@latest`
* TS `typescript`
* Remult - для создания API и генерации запросов `remult`
  * `pg` - dataProvider 
  * `bcryptjs` - для хеширования паролей
* NextAuth.js `next-auth@beta`
* MDX[^1] (развитие markdown) - для статического контента  `@next/mdx @mdx-js/loader @mdx-js/react @types/mdx`
* ESLint `eslint`

В учебных целях, для стилей в проекте используется одновременно несколько подходов:
* Tailwind CSS (через postcss-плагин) `tailwindcss @tailwindcss/postcss postcss`
  * с плагином Typography `@tailwindcss/typography` 
* CSS Modules [см. комментарии разработчиков Tailwind](#tailwind-css-modules) 
* SASS [см. комментарии разработчиков Tailwind](#tailwind-sass)  `sass`
* Vanilla-extract (Zero-runtime CSS-in-TS) `@vanilla-extract/next-plugin`
  



[^1]: MDX https://nextjs.org/docs/app/building-your-application/configuring/mdx

#### Комментарии разработчиков Tailwind про SASS и CSS modules 
<a name="tailwind-css-modules"></a>
https://tailwindcss.com/docs/compatibility#css-modules
> Tailwind совместим с модулями CSS и может сосуществовать с ними, если вы внедряете Tailwind в проект, который уже использует их, но мы не рекомендуем использовать модули CSS и Tailwind вместе, если этого можно избежать.

<a name="tailwind-sass"></a>
https://tailwindcss.com/docs/compatibility#sass-less-and-stylus
> Думайте о Tailwind CSS как о своем препроцессоре — вам не следует использовать Tailwind с Sass по той же причине, по которой вы не стали бы использовать Sass со Stylus.

> [!TIP]
> в качестве пакетного менеджера  рекомендуется bun или pnpm, но можно использовать и npm (и, видимо, yarn) 

> [!IMPORTANT]
> при добавлении remult в проект не забывайте добавлять `"experimentalDecorators": true` в tsconfig.json https://remult.dev/tutorials/react-next/#enable-typescript-decorators