package com.backend.parcial.dbConeccion;

import com.backend.parcial.model.Odontologo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class OdontologoDAOH2 {
    private final String url = "jdbc:h2:~/test"; // URL de la base de datos H2

    @Override
    public void guardarOdontologo(Odontologo odontologo) {
        try (Connection conn = DriverManager.getConnection(url);
             PreparedStatement stmt = conn.prepareStatement("INSERT INTO odontologos(numero_matricula, nombre, apellido) VALUES(?, ?, ?)")) {
            stmt.setInt(1, odontologo.getNumeroMatricula());
            stmt.setString(2, odontologo.getNombre());
            stmt.setString(3, odontologo.getApellido());
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<Odontologo> listarOdontologos() {
        List<Odontologo> odontologos = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(url);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM odontologos")) {
            while (rs.next()) {
                Odontologo odontologo = new Odontologo(
                        rs.getInt("numero_matricula"),
                        rs.getString("nombre"),
                        rs.getString("apellido")
                );
                odontologos.add(odontologo);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return odontologos;
    }
}



}
