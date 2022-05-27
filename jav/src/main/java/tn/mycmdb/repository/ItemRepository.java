package tn.mycmdb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import tn.mycmdb.model.Item;

import java.util.List;
import java.util.Map;

public interface ItemRepository extends MongoRepository<Item, String> {

    List<Item> findAllByTypeId(String typeId);
}
