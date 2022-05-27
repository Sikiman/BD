package tn.mycmdb.dao;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface DAO<T> {

    List<T> getAll();

    Optional<T> get(String id);

    T save(T t);

    boolean update(String id, T t);

    boolean delete(String id);
}
