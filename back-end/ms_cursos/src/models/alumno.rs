use diesel::Queryable;
use serde::{Serialize};

#[derive(Serialize, Queryable)]
pub struct Persona {
    pub Id: i32,
    pub personaId: i32,
    pub cursoId: i32
}

pub mod Insert {
    use crate::schema::personas;
    use serde::{Deserialize};
    #[derive(Insertable, Deserialize)]
    pub struct Persona {
        pub personaId: i32,
        pub cursoId: i32
    }
}