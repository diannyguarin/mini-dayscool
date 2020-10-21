table! {
    archivos (Id) {
        Id -> Integer,
        cursoId -> Integer,
        contenido -> Nullable<Mediumblob>,
    }
}

table! {
    cursos (Id) {
        Id -> Integer,
        nombre -> Text,
        duenoid -> Integer,
    }
}

table! {
    personas (Id) {
        Id -> Integer,
        personaId -> Integer,
        cursoId -> Integer,
    }
}

table! {
    reuniones (Id) {
        Id -> Integer,
        fecha -> Timestamp,
        cursoId -> Integer,
    }
}

joinable!(archivos -> cursos (cursoId));
joinable!(personas -> cursos (cursoId));
joinable!(reuniones -> cursos (cursoId));

allow_tables_to_appear_in_same_query!(
    archivos,
    cursos,
    personas,
    reuniones,
);
