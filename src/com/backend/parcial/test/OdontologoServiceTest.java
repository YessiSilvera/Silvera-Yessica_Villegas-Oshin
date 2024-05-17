package com.backend.parcial.test;

import com.backend.parcial.entity.Odontologo;
import com.backend.parcial.repository.impl.OdontologoDaoH2;
import com.backend.parcial.repository.impl.OdontologoDaoMemory;
import com.backend.parcial.service.impl.OdontologoService;
import org.junit.jupiter.api.Test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;

public class OdontologoServiceTest {
    private OdontologoService odontologoService;

    @Test
    void GuardaUnOdontologoYRetornarId() {
        odontologoService = new OdontologoService(new OdontologoDaoH2());
        Odontologo odontologoAGuardar = new Odontologo(98L, "Salvador", "Tse");

        Odontologo odontologoGuardado = odontologoService.guardarOdontologo(odontologoAGuardar);
        assertNotNull(odontologoGuardado.getId());
    }

    @Test
    void RetornaUnaListaNoVaciaEnH2() {
        odontologoService = new OdontologoService(new OdontologoDaoH2());
        assertFalse(odontologoService.listarTodosLosOdontologos().isEmpty());
    }

    @Test
    void GuardaUnOdontologoYRetornarElIdEnMemoria() {
        odontologoService = new OdontologoService(new OdontologoDaoMemory());
        Odontologo odontologoAGuardar = new Odontologo(98L, "Salvador", "Tse");

        Odontologo odontologoGuardado = odontologoService.guardarOdontologo(odontologoAGuardar);
        assertNotNull(odontologoGuardado.getId());
    }

    @Test
    void RetornaUnaListaNoVaciaEnMemoria() {
        odontologoService = new OdontologoService(new OdontologoDaoMemory());
        assertFalse(odontologoService.listarTodosLosOdontologos().isEmpty());
    }
}
