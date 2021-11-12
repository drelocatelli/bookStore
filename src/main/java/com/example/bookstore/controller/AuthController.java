package com.example.bookstore.controller;

import com.example.bookstore.dto.UserDTO;
import com.example.bookstore.model.User;
import com.example.bookstore.security.config.JwtUtil;
import com.example.bookstore.security.dto.AuthenticationRequest;
import com.example.bookstore.security.dto.AuthenticationResponse;
import com.example.bookstore.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.regex.Pattern;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth/")
public class AuthController {

	@Autowired
	private final AuthenticationManager authenticationManager;

	@Autowired
	private final UserDetailsService userDetailsService;

	@Autowired
	private final JwtUtil jwtUtil;

	@Autowired
	private UserService userService;

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody UserDTO dto) {

		if(dto.getEmail().isEmpty() || dto.getName().isEmpty() || dto.getPassword().isEmpty()) {
			return new ResponseEntity("Fields cannot be null", HttpStatus.UNPROCESSABLE_ENTITY);
		}

		// regex email
		String regexEmail = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
				+ "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
		if(!Pattern.compile(regexEmail).matcher(dto.getEmail()).matches()) {
			return new ResponseEntity("Write a valid email.", HttpStatus.UNPROCESSABLE_ENTITY);
		}

		User user = User.builder()
				.name(dto.getName())
				.email(dto.getEmail())
				.password(dto.getPassword())
				.build();

		try {
			User userSaved = userService.create(user);
			return new ResponseEntity(userSaved, HttpStatus.CREATED);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}

	}

	@PostMapping("/login")
	public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request) throws Exception {

		try{
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
		} catch(Exception ex) {
			throw new Exception("Exception: ", ex);
		}

		UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
		String token = jwtUtil.generateToken(userDetails);

		return ResponseEntity.ok(token);

	}

}
