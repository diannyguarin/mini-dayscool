use crate::CourseDB;
use crate::diesel::*;
use crate::schema::archivos::dsl::*;
use crate::models::archivo;

pub fn crear_archivo(file: archivo::Insert::Archivo, conn: CourseDB) -> QueryResult<usize>{
    diesel::insert_into(archivos).values(file).execute(&*conn)
}