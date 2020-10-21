pub mod curso {
    use crate::schema::cursos;
    use crate::schema::cursos::dsl::*; 
    use crate::models::curso;
    use crate::CourseDB;
    use diesel::*;

    pub fn insert_curso(curs: curso::Insert::Curso, connection: CourseDB) -> QueryResult<usize> {
        diesel::insert_into(cursos::table)
        .values(curs)
        .execute(&*connection)
    }

    pub fn actualizar_curso(curs: curso::Insert::Curso,id: i32,conn: CourseDB) -> QueryResult<usize> {
        diesel::update(cursos.filter(Id.eq(id))).
        set(curs).
        execute(&*conn)
    }  

    pub fn get_cursos(id: i32, conn:CourseDB) -> QueryResult<Vec<curso::Curso>> {
        cursos.filter(duenoid.eq(id))
        .load::<curso::Curso>(&*conn)
    }

    pub fn eliminar_curso(id:i32, conn: CourseDB) -> QueryResult<usize> {
        diesel::delete(
            cursos.filter(Id.eq(id))
        )
        .execute(&*conn)
    }

    pub fn get_cursos_alumno(id: i32, conn: &CourseDB) -> QueryResult<Vec<curso::Curso>> {
        match super::alumno::get_cursos_alumno(id, &conn) {
            Ok(vector) => {
                cursos::table.filter(Id.eq_any(vector)).get_results(&conn.0)
            }
            Err(mistake) => {
                Err(mistake)
            }
        }
    } 
} 

pub mod reunion {
    use crate::schema::reuniones::dsl::*;
    use crate::schema::reuniones; 
    use chrono::naive::NaiveDateTime;
    use crate::models::reunion;
    use crate::CourseDB;
    use diesel::*;

    pub fn recordatorio_curso(id_curso: i32, conn: CourseDB) -> QueryResult<Vec<reunion::Reunion>> {
        reuniones.filter(cursoId.eq(id_curso)).load::<reunion::Reunion>(&*conn)
    }

    pub fn recordatorio_estudiante(id_estudiante: i32, conn: CourseDB) -> QueryResult<Vec<reunion::Reunion>> {
        match super::alumno::get_cursos_alumno(id_estudiante, &conn) {
            Ok(vector) => {
                reuniones::table.filter(cursoId.eq_any(vector)).get_results(&*conn)
            }
            Err(m) => {
                Err(m)
            }
        }
    }

    pub fn actualizar(id_reunion: i32, date: i64, conn: CourseDB) -> QueryResult<usize> {
        diesel::update(reuniones.filter(Id.eq(id_reunion)))
        .set(fecha.eq(NaiveDateTime::from_timestamp(date, 0)))
        .execute(&*conn)
    }

    pub fn crear_reunion(rec: reunion::insert::Reunion, conn: CourseDB) ->QueryResult<usize> {
        diesel::insert_into(reuniones)
        .values(&rec)
        .execute(&*conn)
    }
}

pub mod alumno {
    use crate::CourseDB;
    use crate::models::alumno;
    use crate::schema::personas::dsl::*;
    use crate::diesel::RunQueryDsl;
    use crate::diesel::QueryResult;
    use crate::schema::personas;
    use crate::diesel::*;

    pub fn insert_alumnos(alums :Vec<alumno::Insert::Persona>, conn: &CourseDB) -> QueryResult<usize> {
        diesel::insert_into(personas)
        .values(&alums)
        .execute(&conn.0)
    }

    pub fn delete_alumno(id: i32, id_curso: i32, conn: CourseDB) -> QueryResult<usize> {
        diesel::delete(personas.filter(personaId.eq(id).and(cursoId.eq(id_curso))))
        .execute(&*conn)
    }

    pub fn get_alumno(id: i32, conn: CourseDB) -> QueryResult<alumno::Persona> {
        personas::table.find(id).get_result(&*conn)
    }

    pub fn get_cursos_alumno(id: i32, conn: &CourseDB) -> QueryResult<Vec<i32>> {
        personas::table.select(cursoId)
        .filter(personaId.eq(id)).
        get_results(&conn.0)
    }
}
