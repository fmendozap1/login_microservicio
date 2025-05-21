package login.v1.services;

import login.v1.entities.usuarios;
import login.v1.repositories.usuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class implementacionserviciousuarios implements usuariosServices {

   @Autowired
   private usuariosRepository repositorio;

    @Override
    @Transactional(readOnly = true)
    public List<usuarios> findAll() {
        return (List<usuarios>) repositorio.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<usuarios> findById(int id) {
        Optional<usuarios> x=repositorio.findById(id);
        if(x.isPresent()){
            return x;
        }
        else {
            return null;
        }
    }

    @Override
    @Transactional
    public usuarios save(usuarios x) {
        Optional<usuarios> dato= repositorio.findById(x.getId());
        if(dato.isPresent()){
            return dato.get();
        }
        else {
            return repositorio.save(x);
        }
    }

    @Override
    public usuarios update(int id, usuarios x) {
        Optional<usuarios> dato= repositorio.findById(id);
        if(dato.isPresent()){
            usuarios actualizado=dato.get();
            actualizado.setNombre(x.getNombre());
            actualizado.setTipo(x.getTipo());
            actualizado.setNumIdentificacion(x.getNumIdentificacion());
            actualizado.setEmail(x.getEmail());
            actualizado.setPassword(x.getPassword());
            actualizado.setRol(x.getRol());
            actualizado.setEstado(x.getEstado());
            repositorio.save(actualizado);
            return repositorio.save(actualizado);
        }
        else{
            return save(x);
        }
    }

    @Override
    public Optional<usuarios> delete(int id) {
        Optional<usuarios> dato= repositorio.findById(id);
        if (dato.isPresent()){
            repositorio.delete(dato.get());
            return dato;
        }
        else{
            return  null;
        }
    }
}
