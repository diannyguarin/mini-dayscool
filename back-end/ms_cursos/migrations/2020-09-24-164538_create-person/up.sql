-- Your SQL goes here
CREATE TABLE personas (
	Id INT NOT NULL AUTO_INCREMENT,
	personaId INT NOT NULL,
	cursoId INT NOT NULL,

	PRIMARY KEY(Id),
	INDEX (cursoId),

	FOREIGN KEY (cursoId)
		REFERENCES cursos(Id)
		ON UPDATE CASCADE ON DELETE CASCADE
)