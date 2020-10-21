use serde::Serialize;
use diesel::Queryable;
use chrono::naive::NaiveDateTime;

#[derive(Queryable)]
pub struct Reunion {
    pub Id: i32,
    pub fecha: NaiveDateTime,
    pub cursoId: i32
}

#[derive(Serialize)]
pub struct ReunionJson {
    pub Id: i32,
    pub fecha: i64,
    pub cursoId: i32
}

impl Reunion {
    pub fn to_seriable (&self) -> ReunionJson{
        ReunionJson {
            Id: self.Id,
            fecha: self.fecha.timestamp(),
            cursoId: self.cursoId
        }
    }
}



pub mod insert {
    use serde::Deserialize;
    use crate::schema::reuniones;
    use chrono::naive::NaiveDateTime;

    #[derive(Insertable)]
    #[table_name = "reuniones"]
    pub struct Reunion {
        pub fecha: NaiveDateTime,
        pub cursoId: i32
    }

    #[derive(Deserialize)]
    pub struct ReunionJson {
        pub fecha: i64,
        pub cursoId: i32
    }
    impl ReunionJson {
        pub fn to_sql(&self) -> Reunion {
            Reunion {
                fecha: chrono::naive::NaiveDateTime::from_timestamp(self.fecha, 0),
                cursoId: self.cursoId
            }
        }
    }
}