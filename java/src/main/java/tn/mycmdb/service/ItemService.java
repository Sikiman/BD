package tn.mycmdb.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tn.mycmdb.model.Item;
import tn.mycmdb.repository.ItemRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
@Slf4j
public class ItemService implements Service<Item> {
    private final ItemRepository itemRepository;

    @Override
    public List<Item> getAll() {
        log.info("Fetching all items");
        return itemRepository.findAll();
    }

    @Override
    public Optional<Item> get(String id) {
        log.info("Fetching item");
        return itemRepository.findById(id);
    }

    @Override
    public Item save(Item item) {
        log.info("Inserting new item {} to the database", item);
        return itemRepository.insert(item);
    }

    @Override
    public Item update(Item item) {
        log.info("Updating item {}", item);
        return itemRepository.save(item);
    }

    @Override
    public void delete(Item item) {
        log.info("Deleting item {} from the database", item);
        itemRepository.delete(item);
    }

    public List<Item> getItems(String typeId) {
        log.info("Fetching all items by typeId: {}", typeId);
        return itemRepository.findAllByTypeId(typeId);
    }
}
