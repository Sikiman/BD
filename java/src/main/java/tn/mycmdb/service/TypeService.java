package tn.mycmdb.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tn.mycmdb.model.Type;
import tn.mycmdb.repository.TypeRepository;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
@Slf4j
public class TypeService implements Service<Type> {

    private final TypeRepository typeRepository;

    @Override
    public List<Type> getAll() {
        log.info("Fetching all types");
        return typeRepository.findAll();
    }

    @Override
    public Optional<Type> get(String id) {
        log.info("Fetching type");
        return typeRepository.findById(id);
    }

    @Override
    public Type save(Type type) {
        log.info("Inserting new type {} to the database", type);
        return typeRepository.insert(type);
    }

    @Override
    public Type update(Type type) {
        log.info("Updating type {}", type);
        return typeRepository.save(type);
    }

    @Override
    public void delete(Type type) {
        log.info("Deleting type {} from the database", type);
        typeRepository.delete(type);
    }
}
