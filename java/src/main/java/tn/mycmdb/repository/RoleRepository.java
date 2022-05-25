package tn.mycmdb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.mycmdb.model.Role;

public interface RoleRepository extends MongoRepository<Role, String> {
}
