package tn.mycmdb.service;

import java.util.List;
import java.util.Optional;

public interface Service<T> {

    List<T> getAll();

    Optional<T> get(String id);

    T save(T t);

    T update(T t);

    void delete(T t);
}
