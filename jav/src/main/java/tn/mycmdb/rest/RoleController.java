package tn.mycmdb.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tn.mycmdb.model.Role;
import tn.mycmdb.service.Service;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class RoleController {
    private final Service<Role> roleService;

    @GetMapping("/roles")
    ResponseEntity<List<Role>> getRoles() {
        return ResponseEntity.ok().body(roleService.getAll());
    }

    @GetMapping("/role")
    ResponseEntity<Optional<Role>> getRole(@RequestParam String id) {
        return ResponseEntity.ok().body(roleService.get(id));
    }

    @PostMapping("/role/save")
    ResponseEntity<Role> saveRole(@RequestBody Role role) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/role/save").toUriString());
        return ResponseEntity.created(uri).body(roleService.save(role));
    }

    @PutMapping("/role/update")
    ResponseEntity<Role> putRole(@RequestBody Role role) {
        return ResponseEntity.ok().body(roleService.update(role));
    }

    @DeleteMapping("/role/delete")
    ResponseEntity<?> deleteRole(@RequestBody Role role) {
        roleService.delete(role);
        return ResponseEntity.ok().build();
    }
}
