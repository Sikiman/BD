package tn.mycmdb.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import tn.mycmdb.model.Item;

import java.util.List;
import java.util.Optional;

public interface Service<T> {

    List<T> getAll();

    Optional<T> get(String id);

    T save(T t);

    T update(T t);

    void delete(T t);

    List<T> filter(String filter) throws JsonProcessingException;
}
