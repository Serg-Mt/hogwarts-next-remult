import { api } from '@/server/api';
import { House } from '@/shared/entities/House'
import { notFound, redirect } from 'next/navigation';
import { Student } from '@/shared/entities/Student'
import { Teacher } from '@/shared/entities/Teacher';
import Image from 'next/image';


const
  remult = await api.getRemult(), // !!!!!
  repoHouse = remult.repo(House),
  houses = await repoHouse.find(
    {
      include: {
        Head: true,
        Student: true
      }
    }
  );

function getHouseById(id: number) {
  return houses.find(h => id === h.id);
};

function getHouseByName(name: string) {
  return houses.find(h => name.toUpperCase() === h.name.toUpperCase());
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const
    slug = (await params)?.slug.trim();
  if (!slug) return notFound();
  console.log('/houses/', slug);
  if (String(+slug) === slug) {
    const
      house = getHouseById(+slug);
    console.log('num house=', house?.name);
    if (house)
      redirect(`/houses/${house.name}`);
    return notFound();
  }
  const
    house = getHouseByName(slug);
  console.log('str house=', house?.name);
  if (!house) return notFound();


  return <HouseInfo house={house} />
}


function HouseInfo({ house }: { house: House }) {
  return <div className="">
    <h1 className="text-4xl">{house.name}</h1>
    <Logo url={house.img} />
    {/* <HouseHead t={house.Head} /> */}
    <StudentsList students={house.Student} />
    {/* <div>House: {JSON.stringify(house)}</div> */}
  </div>
}

function HouseHead({ t }: { t: Teacher }) {
  return <>
    {t.img &&
      <figure>
        <Image
          fill={false}
          src={t.img}
          width={100}
          height={100}
          alt="head od house"
          className="round-[50%] float-right aspect-square"
        />
        <figcaption>
          {t.name} {t.surname}
        </figcaption>
      </figure>}

  </>
}

function Logo({ url }: { url: string }) {
  return <Image
    src={url}
    width={200}
    height={200}
    alt="logo"
    className=""
  />
}

function StudentsList({ students }: { students: Student[] }) {
  return <section>
    <h3>Our best students:</h3>
    {students.map(st => <StudentLi st={st} key={st.id} />)}
  </section>
}

function StudentLi({ st }: { st: Student }) {
  return <li>
    {st.name} {st.surname}
  </li>;
}