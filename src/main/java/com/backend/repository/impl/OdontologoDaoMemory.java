package com.backend.repository.impl;

import com.backend.entity.Odontologo;
import com.backend.repository.IDao;
import org.apache.log4j.Logger;

import java.util.ArrayList;
import java.util.List;

public class OdontologoDaoMemory implements IDao<Odontologo> {

    private static final Logger LOGGER = Logger.getLogger(OdontologoDaoMemory.class);
    List<Odontologo> listaOdontologos = new ArrayList<>();

    public OdontologoDaoMemory() {
        Odontologo odontologo1 = new Odontologo(1L, 123654L, "Pablo", "RubiLes");
        Odontologo odontologo2 = new Odontologo(2L, 124654L, "Salvador", "Lima");
        Odontologo odontologo3 = new Odontologo(3L, 125654L, "Olga", "Diaz");
        Odontologo odontologo4 = new Odontologo(4L, 126654L, "Felipe", "Silvera");

        listaOdontologos.add(odontologo1);
        listaOdontologos.add(odontologo2);
        listaOdontologos.add(odontologo3);
        listaOdontologos.add(odontologo4);
    }


    @Override
    public Odontologo buscar(Long id) {
        return null;
    }

    @Override
    public Odontologo guardar(Odontologo odontologo) {
        Long id = Long.valueOf(listaOdontologos.size() + 1);
        Odontologo odontologoAGuardar = new Odontologo(id, odontologo.getNumMatricula(), odontologo.getNombre(), odontologo.getApellido());
        LOGGER.info("Guardado con éxito: " + odontologoAGuardar);
        return odontologoAGuardar;
    }

    @Override
    public List<Odontologo> listarTodos() {
        LOGGER.info("Odontólogos obtenidos exitosamente: " + listaOdontologos);
        return listaOdontologos;
    }
}
