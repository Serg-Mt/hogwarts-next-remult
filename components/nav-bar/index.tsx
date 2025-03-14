import Link from 'next/link';
import { navigation } from '../navigation.js';
import ThemeSelector  from './theme-selector.mdx';
import { Hamburger } from './hamburger';
export function NavBar() {
  return <header>
    <Hamburger />
    <nav className="flex grow gap-2 justify-evenly">
      {navigation.map(({ href, label }) =>
        <Link href={href} key={href}>
          {label}
        </Link>)}
    </nav>
    <ThemeSelector/>
  </header>
}