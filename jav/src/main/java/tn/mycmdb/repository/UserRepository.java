package tn.mycmdb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.mycmdb.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);
}
