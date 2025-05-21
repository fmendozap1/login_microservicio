package login.v1.entities;

import jakarta.persistence.*;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "usuarios")
public class usuarios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idUsuarios")
    private int id;

    @Column(name = "nombres_usuario")
    private String nombre;

    @Column(name = "tipo_identificacion_usuario")
    private String tipo;

    @Column(name = "num_identificacion_usuario")
    private String numIdentificacion;

    @Column(name = "email_usuario")
    private String email;

    @Column(name = "password_usuario")
    private String password;

    @Column(name = "rol_usuario")
    private String rol;

    @Column(name = "estado_usuario")
    private String estado;

    public usuarios(){}

    public usuarios(int id, String nombre, String tipo, String numIdentificacion, String email, String password, String rol, String estado) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.numIdentificacion = numIdentificacion;
        this.email = email;
        this.password = password;
        this.rol = rol;
        this.estado = estado;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getNumIdentificacion() {
        return numIdentificacion;
    }

    public void setNumIdentificacion(String numIdentificacion) {
        this.numIdentificacion = numIdentificacion;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
