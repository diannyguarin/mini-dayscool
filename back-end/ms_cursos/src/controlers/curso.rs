use crate::models::curso;
use crate::CourseDB;
use crate::database::querys::curso as query;
use rocket::http::Status;
use rocket_contrib::json::Json;

#[post("/crear", format = "application/json", data = "<cur>")]
pub fn create(conn: CourseDB, cur: Json<curso::Insert::Curso>) -> Result<Status, diesel::result::Error> {
    match query::insert_curso(cur.into_inner(), conn) {
        Ok(_) => Ok(Status::Created),
        Err(E) => Err(E)
    }
}

#[put("/modificar/<id>", format = "application/json", data="<nuevo_curso>")]
pub fn update(conn: CourseDB, nuevo_curso: Json<curso::Insert::Curso>, id: i32) -> Result<Status, Status> {
    match query::actualizar_curso(nuevo_curso.into_inner(), id, conn) {
        Ok(_) => Ok(Status::Accepted),
        Err(_) => Err(Status::NotModified)
    }
}

#[get("/<id_dueno>")]
pub fn read_cursos(conn: CourseDB, id_dueno: i32) -> Result<Json<Vec<curso::Curso>>, diesel::result::Error> {
    query::get_cursos(id_dueno, conn).map(|grupo| Json(grupo))
}
 
pub fn delete(id_curso: i32, conn: CourseDB) -> Result<Status, diesel::result::Error> {
    match query::eliminar_curso(id_curso, conn) {
        Ok(_) => Ok(Status::Ok),
        Err(e) => Err(e)
    }
}

#[get("/alumnos/<id>")]
pub fn read_cursos_alumno(conn: CourseDB, id: i32) -> Result<Json<Vec<curso::Curso>>, diesel::result::Error> {
    query::get_cursos_alumno(id, &conn).map(|grupo| Json(grupo))
}