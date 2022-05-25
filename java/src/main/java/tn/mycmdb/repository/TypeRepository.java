package tn.mycmdb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.mycmdb.model.Type;

public interface TypeRepository extends MongoRepository<Type, String> {
}
