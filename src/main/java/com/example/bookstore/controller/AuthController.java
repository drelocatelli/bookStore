package com.example.bookstore.controller;

import com.example.bookstore.dto.UserDTO;
import com.example.bookstore.model.User;
import com.example.bookstore.security.dto.JwtRequest;
import com.example.bookstore.security.dto.JwtResponse;
import com.example.bookstore.security.service.JwtUserDetailsService;
import com.example.bookstore.security.util.JwtTokenUtil;
import com.example.bookstore.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.token.TokenService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.regex.Pattern;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class AuthController {

	@Autowired
	private UserService userService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;

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
	public ResponseEntity<?> authenticate(@RequestBody JwtRequest request) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
		} catch(Exception e) {
			throw new Exception("Exception: ", e);
		}

		final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(token));

	}

}
