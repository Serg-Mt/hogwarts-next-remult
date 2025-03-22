import { promises as fs } from 'fs';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>
    <Navbar />
    <hr />
    <section>{children}</section>
  </>
}

export async function Navbar() {
  const dirs = (await fs.readdir('./app/%5F', { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  return <nav>
    <ul>
      {dirs.map(dir => <li key={dir}>
        <Link href={'/_/' + dir}>
          {dir}</Link>
      </li>)}
    </ul>
  </nav>;

}