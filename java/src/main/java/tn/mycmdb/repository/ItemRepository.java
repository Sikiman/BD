package tn.mycmdb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.mycmdb.model.Item;

import java.util.List;

public interface ItemRepository extends MongoRepository<Item, String> {

    List<Item> findAllByTypeId(String typeId);
}
