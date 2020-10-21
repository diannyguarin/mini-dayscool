use crate::CourseDB;
use crate::models::reunion;
use rocket::http::Status;
use crate::database::querys::reunion::{recordatorio_curso, actualizar, crear_reunion, recordatorio_estudiante};
use rocket_contrib::json::Json;

#[get("/reunion/<id_curso>")]
pub fn get(id_curso: i32, conn: CourseDB) -> Result<Json<Vec<reunion::ReunionJson>>, diesel::result::Error>  {//arreglar 
    recordatorio_curso(id_curso, conn).map(|reunions| Json(reunions.iter().map(
        |reunion|  reunion.to_seriable()
    ).collect()))
}

#[get("/reunion/student/<id_estudiante>")]
pub fn getByStudent(id_estudiante: i32, conn: CourseDB) -> Result<Json<Vec<reunion::ReunionJson>>, diesel::result::Error> {
    recordatorio_estudiante(id_estudiante, conn).map(|reuniones| Json(reuniones.iter().map(
        |reunion| reunion.to_seriable()
    ).collect()))
}

pub fn update(id_reunion: i32, date: i64, conn: CourseDB) -> Result<usize, Status> {
    match actualizar(id_reunion, date, conn) {
        Ok(val) => Ok(val),
        Err(_) => Err(Status::NotFound)
    }
}

#[post("/reunion", format="application/json", data= "<reunion>")]
pub fn crear(conn:CourseDB, reunion: Json<reunion::insert::ReunionJson>) -> Result<Status, Status> {
    match crear_reunion(reunion.into_inner().to_sql(), conn) {
        Ok(_) => Ok(Status::Ok),
        Err(_) => Err(Status::NotFound)
    }
} 