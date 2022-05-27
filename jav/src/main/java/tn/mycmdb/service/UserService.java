package tn.mycmdb.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import tn.mycmdb.model.User;
import tn.mycmdb.repository.UserRepository;

import java.util.*;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements Service<User>, UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            log.error("User not found in the database");
            throw new UsernameNotFoundException("User not found in the database");
        } else {
            log.info("User found in the database {}", username);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        //user.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role)));
        authorities.add(new SimpleGrantedAuthority(user.getRole()));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

    @Override
    public List<User> getAll() {
        log.info("Fetching all users");
        return userRepository.findAll();
    }

    @Override
    public Optional<User> get(String id) {
        log.info("Fetching user {}", id);
        return userRepository.findById(id);
    }

    @Override
    public User save(User user) {
        log.info("Saving new user {} to the database", user.getUsername());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.insert(user);
    }

    @Override
    public User update(User user) {
        log.info("Updating user {}", user);
        return userRepository.save(user);
    }

    @Override
    public void delete(User user) {
        log.info("Deleting user {} from the database", user);
        userRepository.delete(user);
    }

    @Override
    public List<User> filter(String filter) throws JsonProcessingException {
        return null;
    }


}
