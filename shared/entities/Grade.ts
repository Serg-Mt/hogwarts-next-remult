import { Entity,  Fields } from "remult"
import { Relations } from "remult"
import { Student } from "./Student"
import { Teacher } from "./Teacher"

@Entity<Grade>("grade", {
  allowApiCrud: true,
})
export class Grade {
  @Fields.autoIncrement()
  id = 0

  @Fields.integer()
  point!: number

  @Fields.integer()
  teacherId!: number

  @Relations.toOne(() => Teacher, { field: "teacherId" })
  teacher!: Teacher

  @Fields.integer()
  studentId!: number

  @Relations.toOne(() => Student, { field: "studentId" })
  student!: Student

  @Fields.date()
  date = new Date()
}
