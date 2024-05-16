package com.backend.parcial.services;


import com.backend.parcial.repository.dbConeccion.H2;

import static com.backend.parcial.repository.dbConeccion.H2.createTable;

public class Application {
    public static void main(String[] args) {
        createTable();
    }
};