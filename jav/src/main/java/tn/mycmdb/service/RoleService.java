package tn.mycmdb.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tn.mycmdb.model.Role;
import tn.mycmdb.repository.RoleRepository;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
@Slf4j
public class RoleService implements Service<Role> {
    private final RoleRepository roleRepository;

    @Override
    public List<Role> getAll() {
        log.info("Fetching all roles");
        return roleRepository.findAll();
    }

    @Override
    public Optional<Role> get(String id) {
        log.info("Fetching role");
        return roleRepository.findById(id);
    }

    @Override
    public Role save(Role role) {
        log.info("Inserting new role {} to the database", role);
        return roleRepository.insert(role);
    }

    @Override
    public Role update(Role role) {
        log.info("Updating role {}", role);
        return roleRepository.save(role);
    }

    @Override
    public void delete(Role role) {
        log.info("Deleting role {} from the database", role);
        roleRepository.delete(role);
    }

    @Override
    public List<Role> filter(String filter) throws JsonProcessingException {
        return null;
    }

}
