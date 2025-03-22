import { Entity, Fields } from "remult"
// import { Relations } from "remult"
// import { StudentSubject } from "./StudentSubject.js"
// import { TeacherSubject } from "./TeacherSubject.js"

@Entity<Subject>("Subject", {
  allowApiCrud: true,
  defaultOrderBy: { name: "asc" },
})
export class Subject {
  @Fields.autoIncrement()
  id = 0

  @Fields.string()
  name!: string

  // // Relations toMany
  // @Relations.toMany(() => StudentSubject)
  // _StudentSubjects?: StudentSubject[]

  // @Relations.toMany(() => TeacherSubject)
  // _TeacherSubjects?: TeacherSubject[]
}
