package com.example.bookstore.service;

import com.example.bookstore.model.User;
import com.example.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
	private UserRepository repository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public User create(User user) {
		String passwordEncrypted = passwordEncoder.encode(user.getPassword());
		user.setPassword(passwordEncrypted);

		return repository.save(user);
	}

	public User findByEmail(String email) {
		return repository.findByEmail(email);
	}

}
