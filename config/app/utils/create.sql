CREATE DATABASE web3;

use web3;

CREATE TABLE usuarios(
    id_usuario int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome varchar(50) NOT NULL,
    email varchar(50) NOT NULL
);

