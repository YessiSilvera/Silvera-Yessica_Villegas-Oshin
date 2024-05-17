package com.backend.parcial.repository;

import com.backend.parcial.model.Odontologo;

import java.util.List;

public interface OdontologoDAO {

    void guardarOdontologo(Odontologo odontologo);

    List<Odontologo> listarOdontologos();

}
