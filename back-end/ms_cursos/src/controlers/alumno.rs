use crate::models::alumno;
use crate::CourseDB;
use crate::database::querys::alumno as query;
use rocket::http::Status;
use crate::diesel::QueryResult;
use rocket_contrib::json::Json;

#[post("/alumnos", format = "application/json", data = "<alums>")]
pub fn create_alumnos(conn: CourseDB, alums: Json<Vec<alumno::Insert::Persona>>) -> Result<Status, diesel::result::Error> {
    match query::insert_alumnos(alums.into_inner(), &conn) {
        Ok(_) => Ok(Status::Ok),
        Err(E) => Err(E)
    }
}

pub fn delete(id_alumno: i32, id_curso: i32,conn: CourseDB) -> Result<Status, diesel::result::Error> {
    match query::delete_alumno(id_alumno, id_curso, conn) {
        Ok(_) => Ok(Status::Ok),
        Err(E) => Err(E)
    }
}

pub fn read(id_alumno :i32, conn: CourseDB) -> QueryResult<alumno::Persona> {
    query::get_alumno(id_alumno, conn)
}