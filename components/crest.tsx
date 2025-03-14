import Link from 'next/link';
export function Crest() {
  return <div
    className={`aspect-1/1
      bg-[url(/hogwarts-coat.svg)] bg-contain bg-center bg-no-repeat
      w-full max-w-[80vmin]
      grid grid-cols-2 grid-rows-[5fr_5fr_3fr] 
      items-center justify-items-center
      crest-house-div
      `}>
    <Link href="/houses/gryffindor">
      <div>
        Gryffindor
      </div>
    </Link>
    <Link href="/houses/slytherin">
      <div >
        Slytherin
      </div>
    </Link>
    <Link href="/houses/hufflepuff">
      <div >
        Hufflepuff
      </div>
    </Link>
    <Link href="/houses/ravenclaw">
      <div >
        Ravenclaw
      </div>
    </Link>
    <div></div>
    <div></div>

  </div>
}