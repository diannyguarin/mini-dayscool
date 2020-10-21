use diesel::Queryable;
use serde::{Serialize, Deserialize};

#[derive(Queryable,Serialize)]
//#[table_name = "cursos"]
pub struct Curso {
    pub Id: i32,
    pub nombre: String,
    pub duenoid: i32
}

pub mod Insert {
    use crate::schema::cursos;
    use serde::{Deserialize};
    #[derive(Insertable, Deserialize, AsChangeset)]
    pub struct Curso {
        pub nombre: String,
        pub duenoid: i32
    }
}

