package tn.mycmdb.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tn.mycmdb.model.User;
import tn.mycmdb.service.Service;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final Service<User> userService;

    @GetMapping("/users")
    ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getAll());
    }

    @GetMapping("/user")
    ResponseEntity<Optional<User>> getUser(@RequestParam String id) {
        return ResponseEntity.ok().body(userService.get(id));
    }

    @PostMapping("/user/save")
    ResponseEntity<User> saveUser(@RequestBody User user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/save").toUriString());
        return ResponseEntity.created(uri).body(userService.save(user));
    }

    @PutMapping("/user/update")
    ResponseEntity<User> putUser(@RequestBody User user) {
        return ResponseEntity.ok().body(userService.update(user));
    }

    @DeleteMapping("/user/delete")
    ResponseEntity<?> deleteUser(@RequestBody User user) {
        userService.delete(user);
        return ResponseEntity.ok().build();
    }
}
