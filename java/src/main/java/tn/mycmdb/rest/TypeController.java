package tn.mycmdb.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tn.mycmdb.model.Type;
import tn.mycmdb.service.Service;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class TypeController {

    private final Service<Type> typeService;

    @GetMapping(path = "/types", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<List<Type>> getItems() {
        return ResponseEntity.ok().body(typeService.getAll());
    }

    @GetMapping("/type")
    ResponseEntity<Optional<Type>> getItem(@RequestParam String id) {
        return ResponseEntity.ok().body(typeService.get(id));
    }

    @PostMapping("/type/save")
    ResponseEntity<Type> saveItem(@RequestBody Type type) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/type/save").toUriString());
        return ResponseEntity.created(uri).body(typeService.save(type));
    }

    @PutMapping("/type/update")
        ResponseEntity<Type> putItem(@RequestBody Type type) {
        return ResponseEntity.ok().body(typeService.update(type));
    }

    @DeleteMapping("/type/delete")
    ResponseEntity<?> deleteItem(@RequestBody Type type) {
        typeService.delete(type);
        return ResponseEntity.ok().build();
    }
}
