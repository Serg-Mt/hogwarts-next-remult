import { Entity, Fields, Relations } from "remult"
import { Student } from "./Student"
import { Teacher } from './Teacher'

@Entity<House>("house", {
  allowApiCrud: true,
  defaultOrderBy: { id: "asc" },
})
export class House {
  @Fields.number()
  id = 0

  @Fields.string()
  name!: string

  @Fields.string()
  img!: string

  // Relations toMany
  @Relations.toMany(() => Student)
  Student?: Student[]

  @Fields.string({ allowNull: true })
  HeadId?: number

  @Relations.toOne(() => Teacher, { field: "HeadId" })
  Head?: Teacher
}
