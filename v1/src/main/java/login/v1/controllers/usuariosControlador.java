package login.v1.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import login.v1.entities.usuarios;
import login.v1.services.usuariosServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/usuarios")
public class usuariosControlador {

    @Autowired
    private usuariosServices servicio;

    //obtener roles
    @GetMapping("/listar")
    public ResponseEntity<List<usuarios>> ListarUsuarios(){
        List<usuarios> x=servicio.findAll();
        return ResponseEntity.ok(x);
    }

    //obtener por id
    @GetMapping("/buscar/{id}")
    public ResponseEntity<usuarios> BuscarId(@PathVariable int id)
    {
        Optional<usuarios> buscado= servicio.findById(id);
        if(buscado.isPresent()){
            return ResponseEntity.ok(buscado.get());
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    //crear rol
    @PostMapping("/crear")
    public ResponseEntity<usuarios> CrearUsuario(@Valid @RequestBody usuarios dato)
    {
        usuarios x=servicio.save(dato);
        return ResponseEntity.ok(x);
    }

    //actualizar Rol
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<usuarios> ActualizarUsuario(@PathVariable int id, @Valid @RequestBody usuarios dato)
    {
        usuarios x= servicio.update(id,dato);
        return ResponseEntity.ok(x);
    }

    //eliminar Rol
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> EliminarUsuario(@PathVariable int id)
    {
        Optional<usuarios> x= servicio.delete(id);
        if(x.isPresent()){
            return ResponseEntity.ok("Usuario Eliminado Exitosamente");
        }
        else{
            return ResponseEntity.status(404).body("El Usuario que intenta eliminar no existe.");
        }
    }
}
