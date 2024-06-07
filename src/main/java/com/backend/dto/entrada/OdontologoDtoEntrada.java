package com.backend.dto.entrada;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OdontologoDtoEntrada {

    private Long id;
    private Long numMatricula;
    private String nombre;
    private String apellido;

    public OdontologoDtoEntrada(Long id, Long numMatricula, String nombre, String apellido) {
        this.id = id;
        this.numMatricula = numMatricula;
        this.nombre = nombre;
        this.apellido = apellido;
    }
}
