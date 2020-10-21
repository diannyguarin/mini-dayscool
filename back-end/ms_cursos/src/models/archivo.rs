use diesel::Queryable;
use serde::{Serialize};

extern crate base64;
use base64::{STANDARD};
base64_serde_type!(Base64Standard, STANDARD);

#[derive(Queryable, Serialize)]
pub struct Archivo {
    pub Id: i32,
    pub cursoId: i32,
    #[serde(with = "Base64Standard")]
    pub contenido: Vec<u8>
}

pub mod Insert {
    use serde::Deserialize;
    use crate::schema::archivos;

    #[derive(Insertable, Deserialize)]
    pub struct Archivo {
        pub cursoId: i32,
        pub contenido: Vec<u8>
    }
}
