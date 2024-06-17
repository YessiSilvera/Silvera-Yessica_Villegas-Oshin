package com.backend.dto.salida;

import com.backend.entity.Odontologo;
import com.backend.entity.Paciente;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class TurnoDtoSalida {
    private Long id;
    private LocalDateTime fechaYHora;
    private Odontologo odontologo;
    private Paciente paciente;
    private com.backend.dto.salida.OdontologoDtoSalida OdontologoDtoSalida;
    private PacienteDtoSalida pacienteDtoSalida;

    public TurnoDtoSalida(Long id, LocalDateTime fechaYHora, Odontologo odontologo, Paciente paciente) {
        this.id = id;
        this.fechaYHora = fechaYHora;
        this.odontologo = odontologo;
        this.paciente = paciente;
    }

    public void setOdontologoDtoSalida(OdontologoDtoSalida odontologoDtoSalida) {
        this.OdontologoDtoSalida = odontologoDtoSalida;
    }

    public void setPacienteDtoSalida(PacienteDtoSalida pacienteDtoSalida) {
        this.pacienteDtoSalida = pacienteDtoSalida;
    }
}
