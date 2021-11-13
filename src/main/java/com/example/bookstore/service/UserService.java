package com.example.bookstore.service;

import com.example.bookstore.model.User;
import com.example.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

	@Autowired
	private UserRepository repository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public User findByEmail(String email) throws Exception {
		return repository.findByEmail(email).orElseThrow(() -> new Exception("Email doenst exists"));
	}

	public User create(User user) {
		String passwordEncrypted = passwordEncoder.encode(user.getPassword());
		user.setPassword(passwordEncrypted);

		return repository.save(user);
	}

}
