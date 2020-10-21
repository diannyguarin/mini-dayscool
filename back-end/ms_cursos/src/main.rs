#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate diesel;
#[macro_use]
extern crate base64_serde;


mod controlers;
mod models;
pub mod schema;
mod database;

//use rocket_contrib::databases::diesel;
use crate::controlers::{curso, alumno, archivo, reunion}; 
use crate::models::archivo::Insert::Archivo;
use rocket_contrib::json::Json;


#[post("/archivo", data = "<nuevo_archivo>")]
fn anadir_archivo(conn: CourseDB, nuevo_archivo: Json<Archivo>) -> String {
    match archivo::crear_archivo(nuevo_archivo.into_inner(), conn) {
        Ok(val) => format!("creado archivo {}", val),
        Err(_) => String::from("no se pudo crear el archivo")
    }
}

#[database("dbMsql")]
pub struct CourseDB(diesel::MysqlConnection);


fn main() {
    rocket::ignite().attach(CourseDB::fairing()).mount("/curso", routes![
        curso::create,
        alumno::create_alumnos,
        curso::update,
        curso::read_cursos,
        curso::read_cursos_alumno,
        reunion::crear,
        reunion::get,
        reunion::getByStudent
    ]).launch();
}