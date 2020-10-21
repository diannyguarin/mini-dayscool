-- Your SQL goes here
CREATE TABLE reuniones (
	Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	fecha TIMESTAMP NOT NULL,
	cursoId INT NOT NULL,
	FOREIGN KEY (cursoId)
		REFERENCES cursos (Id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
)