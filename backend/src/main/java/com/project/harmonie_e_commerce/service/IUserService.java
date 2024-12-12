package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.dto.*;
import com.project.harmonie_e_commerce.exception.DataNotFoundException;
import com.project.harmonie_e_commerce.model.User;
import com.project.harmonie_e_commerce.response.GetUserResponse;
import com.project.harmonie_e_commerce.response.StringResponse;

public interface IUserService {
    User createUser(UserDTO userDTO);
    String login(String email, String password) throws DataNotFoundException;
    String loginSocial(String email, String name, String sub) throws DataNotFoundException;

    GetUserResponse getUser(String token);

    User getProfile(String token);

    StringResponse updateProfile(ProfileDTO profileDTO, String token);

    StringResponse updatePassword(ResetPasswordDTO resetPasswordDTO,String token);

    StringResponse forgotPassword(ForgotPasswordDTO forgotPasswordDTO);

    StringResponse updatePasswordByCode(UpdatePasswordDTO updatePasswordDTO);
}
