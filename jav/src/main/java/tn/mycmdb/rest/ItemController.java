package tn.mycmdb.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tn.mycmdb.model.Item;
import tn.mycmdb.repository.ItemRepository;
import tn.mycmdb.service.Service;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class ItemController {

    private final Service<Item> itemService;
    private final ItemRepository itemRepository;

    @GetMapping("/items")
    ResponseEntity<List<Item>> getItems() {
        return ResponseEntity.ok().body(itemService.getAll());
    }

    @GetMapping("/item")
    ResponseEntity<Optional<Item>> getItem(@RequestParam String id) {
        return ResponseEntity.ok().body(itemService.get(id));
    }

    @PostMapping("/item/save")
    ResponseEntity<Item> saveItem(@RequestBody Item item) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/item/save").toUriString());
        return ResponseEntity.created(uri).body(itemService.save(item));
    }

    @PutMapping("/item/update")
    ResponseEntity<Item> putItem(@RequestBody Item item) {
        return ResponseEntity.ok().body(itemService.update(item));
    }

    @DeleteMapping("/item/delete")
    ResponseEntity<?> deleteItem(@RequestBody Item item) {
        itemService.delete(item);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/items/type")
    ResponseEntity<List<Item>> getItemsByType(@RequestParam String id) {
        return ResponseEntity.ok().body(itemRepository.findAllByTypeId(id));
    }

    @GetMapping("/items/filter")
    ResponseEntity<List<Item>> getItemsByFilter(@RequestParam String filter) throws JsonProcessingException {
        System.out.println(filter);
        return ResponseEntity.ok().body(itemService.filter(filter));
    }
}
