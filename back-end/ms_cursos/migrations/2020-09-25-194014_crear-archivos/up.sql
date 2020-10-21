-- Your SQL goes here

CREATE TABLE archivos (
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    cursoId INT NOT NULL,
    contenido MEDIUMBLOB,
    FOREIGN KEY (cursoId)
        REFERENCES cursos (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)