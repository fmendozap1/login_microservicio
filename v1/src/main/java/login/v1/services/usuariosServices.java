package login.v1.services;

import login.v1.entities.usuarios;

import java.util.List;
import java.util.Optional;

public interface usuariosServices {
    List<usuarios> findAll();
    Optional<usuarios> findById(int id);
    usuarios save(usuarios x);
    usuarios update(int id, usuarios x);
    Optional<usuarios> delete(int id);
}
