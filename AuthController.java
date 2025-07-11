@PostMapping("/facebook")
public ResponseEntity<?> facebookLogin(@RequestBody SignUpRequest facebookUser) {
    // This logic is identical to our googleLogin method
    Optional<User> existingUserOptional = userRepository.findByEmail(facebookUser.getEmail());

    User user;
    if (existingUserOptional.isPresent()) {
        user = existingUserOptional.get();
    } else {
        // If user does not exist, create a new one
        user = new User();
        user.setName(facebookUser.getName());
        user.setEmail(facebookUser.getEmail());
        user.setPassword(passwordEncoder.encode(java.util.UUID.randomUUID().toString())); // Random password
        userRepository.save(user);
    }

    // Authenticate the user and create a response
    // NOTE: This part needs a proper JWT generation logic for full functionality
    return ResponseEntity.ok(new JwtAuthenticationResponse("DUMMY_JWT_TOKEN_FOR_" + user.getEmail()));
}
