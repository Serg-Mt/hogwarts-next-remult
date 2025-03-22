import { House } from '@/shared/entities/House'
import { notFound, redirect } from 'next/navigation';
import {  } from 'remult';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const
    slug = (await params)?.slug.trim();
  if (!slug) return notFound;
  console.log('/houses/', slug);
  if (String(+slug) === slug) {
    console.log('num house', +slug);
    const house = await repo(House).findFirst({
      id: +slug
    });
    console.log('num house=', house);
    // if (house) redirect(`/-houses/${house.name}`);
  }
  const house = await repo(House).findFirst({
    name: slug
  });
  console.log('str house=', house);
  // if (!house) return notFound();


  return <HouseInfo house={house} />
}


async function HouseInfo({ house}: { house: House }) {

  console.log(house);
  return <div>House: {JSON.stringify(house)}</div>
}