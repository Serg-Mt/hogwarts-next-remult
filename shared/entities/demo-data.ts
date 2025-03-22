import { repo, MembersOnly } from 'remult';
import { House } from './House';
import { Student } from './Student';
import { Teacher } from './Teacher';
import { Subject } from './Subject';


export const teachers: Teacher[] = [
  // { id: -1, name: 'Albus', surname: 'Dumbledore' },
  { id: 1, name: 'Minerva', surname: 'McGonagall', img: 'https://upload.wikimedia.org/wikipedia/en/e/ea/McGonagall_%28screenshot%29.jpg' },
  { id: 2, name: 'Pomona', surname: 'Pomona Sprout' },
  { id: 3, name: 'Filius', surname: 'Flitwick' },
  { id: 4, name: 'Severus', surname: 'Snape', img: 'https://static.wikia.nocookie.net/warner-bros-entertainment/images/c/c1/Severus-snape1.jpg/revision/latest?cb=20171112083156' },
  { id: 5, name: 'Aurora', surname: 'Sinistra' },
  { id: 6, name: 'Silvanus', surname: 'Kettleburn' },
  { id: 7, name: 'Sybill', surname: 'Trelawney' },
  { id: 8, name: 'Charity', surname: 'Burbage' },
  { id: 9, name: 'Septima', surname: 'Vector' },
  { id: 10, name: 'Bathsheda', surname: 'Babbling' },
  { id: 11, name: 'Libatius', surname: 'Borage' },
  { id: 12, name: 'Adalbert', surname: 'Waffling' },
  { id: 13, name: 'Rubeus', surname: 'Hagrid' }
]

const subjects: Subject[] = [
  { id: 1, name: 'Potions' },
  { id: 2, name: 'Transfiguration' }, // Minerva McGonagall
  { id: 3, name: 'Charms' }, // Filius Flitwick
  { id: 4, name: 'Defence Against the Dark Arts' }, // Severus Snape
  { id: 5, name: 'Herbology' }, // Pomona Sprout
  { id: 6, name: 'History of Magic' }, // Cuthbert Binns
  { id: 7, name: 'Astronomy' }, // Aurora Sinistra
  { id: 8, name: 'Care of Magical Creatures' }, // Silvanus Kettleburn
  { id: 9, name: 'Divination' }, // Sybill Trelawney
  { id: 10, name: 'Muggle Studies' }, // Charity Burbage
  { id: 11, name: 'Arithmancy' }, // Septima Vector
  { id: 12, name: 'Ancient Runes' }, // Bathsheda Babbling
  { id: 13, name: 'Study of Ancient Runes' }, // Bathsheda Babbling
  { id: 14, name: 'Alchemy' }, // Libatius Borage
  { id: 15, name: 'Magical Theory' }, // Adalbert Waffling
];

const houses: House[] = [
  { id: 1, name: 'Gryffindor', HeadId: 1, /* Minerva McGonagall */ img: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Blason_Gryffondor.svg' },
  { id: 2, name: 'Hufflepuff', HeadId: 2,  /* Pomona Sprout  */ img: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Coat_of_arms_Hufflepuff.svg' },
  { id: 3, name: 'Ravenclaw', HeadId: 3,  /* Filius Flitwick */ img: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Blason_Serdaigle.svg' },
  { id: 4, name: 'Slytherin', HeadId: 4,  /* Severus Snape */ img: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Blason_Serpentard.svg' },
]

const students: Partial<MembersOnly<Student>>[] = [
  { name: 'Harry', surname: 'Potter', houseId: 1, born: new Date('1980-07-31') },
  { name: 'Hermione', surname: 'Granger', houseId: 1, born: new Date('1979-09-19') },
  { name: 'Ron', surname: 'Weasley', houseId: 1, born: new Date('1980-03-01') },
  { name: 'Draco', surname: 'Malfoy', houseId: 4, born: new Date('1980-06-05') },
  { name: 'Luna', surname: 'Lovegood', houseId: 3, born: new Date('1981-02-13') },
  { name: 'Cedric', surname: 'Diggory', houseId: 2, born: new Date('1977-09-01') },
  { name: 'Neville', surname: 'Longbottom', houseId: 1, born: new Date('1980-07-30') },
  { name: 'Ginny', surname: 'Weasley', houseId: 1, born: new Date('1981-08-11') },
  { name: 'Cho', surname: 'Chang', houseId: 3, born: new Date('1979-10-01') },
  { name: 'Fred', surname: 'Weasley', houseId: 1, born: new Date('1978-04-01') },
  { name: 'George', surname: 'Weasley', houseId: 1, born: new Date('1978-04-01') },
  { name: 'Percy', surname: 'Weasley', houseId: 1, born: new Date('1976-08-22') },
  { name: 'Oliver', surname: 'Wood', houseId: 1, born: new Date('1976-09-01') },
  { name: 'Angelina', surname: 'Johnson', houseId: 1, born: new Date('1978-10-01') },
  { name: 'Katie', surname: 'Bell', houseId: 1, born: new Date('1979-01-01') },
  { name: 'Parvati', surname: 'Patil', houseId: 1, born: new Date('1980-04-01') },
  { name: 'Padma', surname: 'Patil', houseId: 1, born: new Date('1980-04-01') },
  { name: 'Seamus', surname: 'Finnigan', houseId: 1, born: new Date('1980-09-01') },
  { name: 'Dean', surname: 'Thomas', houseId: 1, born: new Date('1980-01-01') },
  { name: 'Lavender', surname: 'Brown', houseId: 1, born: new Date('1980-01-01') },
  { name: 'Colin', surname: 'Creevey', houseId: 1, born: new Date('1981-01-01') },
  { name: 'Dennis', surname: 'Creevey', houseId: 1, born: new Date('1982-01-01') },
  { name: 'Nigel', surname: 'Wespurt', houseId: 1, born: new Date('1982-01-01') },
  { name: 'Ernie', surname: 'Macmillan', houseId: 2, born: new Date('1980-01-01') },
  { name: 'Justin', surname: 'Finch-Fletchley', houseId: 2, born: new Date('1980-01-01') },
  { name: 'Hannah', surname: 'Abbott', houseId: 2, born: new Date('1980-01-01') },
  { name: 'Susan', surname: 'Bones', houseId: 2, born: new Date('1980-01-01') },
  { name: 'Zacharias', surname: 'Smith', houseId: 2, born: new Date('1980-01-01') },
  { name: 'Cedric', surname: 'Diggory', houseId: 2, born: new Date('1977-09-01') },
  { name: 'Ernie', surname: 'Macmillan', houseId: 2, born: new Date('1980-01-01') },
];



export async function createDemoData() {
  if ((await repo(House).count()) == 0)
    await repo(House).insert(houses);
  if ((await repo(Student).count()) == 0)
    await repo(Student).insert(students);
  if ((await repo(Teacher).count()) == 0)
    await repo(Teacher).insert(teachers);
  // if ((await repo(Subject).count()) == 0)
  //   await repo(Subject).insert(subjects);

}

