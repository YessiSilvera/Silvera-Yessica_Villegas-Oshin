DROP TABLE IF EXISTS ODONTOLOGOS;
CREATE TABLE ODONTOLOGOS (ID LONG AUTO_INCREMENT PRIMARY KEY, NUMERO_MATRICULA LONG NOT NULL, NOMBRE VARCHAR(50) NOT NULL, APELLIDO VARCHAR(50) NOT NULL);

INSERT INTO ODONTOLOGOS(NUMERO_MATRICULA, NOMBRE, APELLIDO) VALUES (123456, 'Pedro', 'Soto');

INSERT INTO ODONTOLOGOS(NUMERO_MATRICULA, NOMBRE, APELLIDO) VALUES (654321, 'Daniel', 'Fernandez');

DROP TABLE IF EXISTS PACIENTES;
CREATE TABLE PACIENTES (ID LONG AUTO_INCREMENT PRIMARY KEY, DNI LONG NOT NULL, NOMBRE VARCHAR(50) NOT NULL, APELLIDO VARCHAR(50) NOT NULL, DOMICILIO VARCHAR(50), FECHA_ALTA DATE);

INSERT INTO PACIENTES (DNI, NOMBRE, APELLIDO,DOMICILIO, FECHA_ALTA) VALUES (98765432, 'Julia', 'Perez', 'Calle Cerezos 123', '2024-05-24');

INSERT INTO PACIENTES (DNI, NOMBRE, APELLIDO, DOMICILIO, FECHA_ALTA) VALUES (87654321, 'Juan', 'Galindo', 'Charles Sutton 742', '2024-05-21');