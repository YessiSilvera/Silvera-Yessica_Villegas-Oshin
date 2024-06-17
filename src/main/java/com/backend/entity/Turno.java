package com.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@Table(name = "TURNOS")
public class Turno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column (length = 20)
    private Object fechaYHora;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "odontologo_id")
    private Odontologo odontologo;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    public Turno(Long id, LocalDateTime fechaYHora, Odontologo odontologo, Paciente paciente) {
        this.id = id;
        this.fechaYHora = fechaYHora;
        this.odontologo = odontologo;
        this.paciente = paciente;
    }

    public Turno(LocalDateTime fechaYHora, Odontologo odontologo, Paciente paciente) {
        this.fechaYHora = fechaYHora;
        this.odontologo = odontologo;
        this.paciente = paciente;
    }

    @Override
    public String toString() {
        return "Turno{" +
                "id=" + id +
                ", fechaYHora=" + fechaYHora +
                ", odontologo=" + odontologo +
                ", paciente=" + paciente +
                '}';
    }

    public void setFechaYHora(Object fechaYHora) {
        this.fechaYHora = fechaYHora;
    }

    public Object getFechaYHora() {
        return fechaYHora;
    }

    public void setOdontologo(Odontologo odontologo) {
        this.odontologo = odontologo;
    }

    public Odontologo getOdontologo() {
        return odontologo;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Paciente getPaciente() {
        return paciente;
    }
}
