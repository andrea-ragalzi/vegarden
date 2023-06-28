package com.vegarden.backend.interfaces;

import com.vegarden.backend.dtos.LoginDto;
import com.vegarden.backend.dtos.RegisterDto;

public interface AuthServiceInterface {

    String login(LoginDto loginDto);

    String register(RegisterDto registerDto);

}
