package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.component.JwtTokenUtil;
import com.project.harmonie_e_commerce.dto.*;
import com.project.harmonie_e_commerce.exception.DataNotFoundException;
import com.project.harmonie_e_commerce.model.Order;
import com.project.harmonie_e_commerce.model.User;
import com.project.harmonie_e_commerce.repository.OrderRepository;
import com.project.harmonie_e_commerce.repository.UserRepository;
import com.project.harmonie_e_commerce.response.ExpenseResponse;
import com.project.harmonie_e_commerce.response.GetUserResponse;
import com.project.harmonie_e_commerce.response.RestResponse;
import com.project.harmonie_e_commerce.response.StringResponse;
import com.project.harmonie_e_commerce.util.JwtUtils;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final AuthenticationManager authenticationManager;
        private final JwtTokenUtil jwtTokenUtil;
        private final OrderRepository orderRepository;
        private final EmailService emailService;

        @Override
        public User createUser(UserDTO userDTO) {

                if (userRepository.existsByEmail(userDTO.getEmail())) {
                        throw new DataIntegrityViolationException("Email already exists");
                }
                String encodedPassword = passwordEncoder.encode(userDTO.getPassword());
                User newUser = User.builder()
                                .fullName(userDTO.getFullName())
                                .email(userDTO.getEmail())
                                .phone(userDTO.getPhone())
                                .sex(userDTO.getSex().name())
                                .role(User.Role.USER)
                                .password(encodedPassword)
                                .dob(userDTO.getDob())
                                .build();
                return userRepository.save(newUser);

        }

        @Override
        public String login(String email, String password) throws DataNotFoundException {
                User existingUser = userRepository.findByEmail(email)
                                .orElseThrow(() -> new DataNotFoundException("Email or password is incorrect"));

                // TODO: CHECK PASSWORD BY ENCODER
                if (!passwordEncoder.matches(password, existingUser.getPassword())) {
                        throw new BadCredentialsException("Email or password is incorrect");
                }
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                                email, password, existingUser.getAuthorities());
                authenticationManager.authenticate(authenticationToken);
                return jwtTokenUtil.generateToken(existingUser);
        }

        @Override
        public String loginSocial(String email, String name, String sub) throws DataNotFoundException {
                Optional<User> optionalUser = userRepository.findByEmail(email);
                String encodedPassword = passwordEncoder.encode(sub);
                User existingUser;
                if (optionalUser.isEmpty()) {
                        User newUser = User.builder()
                                        .email(email)
                                        .fullName(name)
                                        .password(encodedPassword)
                                        .role(User.Role.USER)
                                        .build();
                        optionalUser = Optional.of(newUser);
                        userRepository.save(newUser);
                }
                User user = optionalUser.get();
                // UsernamePasswordAuthenticationToken authenticationToken =
                // new UsernamePasswordAuthenticationToken(
                // email, sub, user.getAuthorities()
                // );
                // authenticationManager.authenticate(authenticationToken);
                return jwtTokenUtil.generateToken(user);
        }

        @Override
        public GetUserResponse getUser(String token) {
                String email = JwtUtils.decodeWebToken(token).get("email");
                System.out.println(email);
                User user = userRepository.findByEmail(email).orElseThrow(
                                () -> new DataNotFoundException("User not found with email " + email));
                return GetUserResponse.builder()
                                .full_name(user.getFullName())
                                .role(user.getRole())
                                .build();
        }

        @Override
        public User getProfile(String token) {
                String email = JwtUtils.decodeWebToken(token).get("email");
                return userRepository.findByEmail(email).orElseThrow(
                                () -> new DataNotFoundException("User not found with email " + email));
        }

        @Override
        public StringResponse updateProfile(ProfileDTO profileDTO, String token) {
                String email = JwtUtils.decodeWebToken(token).get("email");
                User user = userRepository.findByEmail(email).orElseThrow(
                                () -> new DataNotFoundException("User not found with email " + email));
                user.setDob(profileDTO.getDob());
                user.setPhone(profileDTO.getPhone());
                user.setFullName(profileDTO.getFull_name());
                user.setSex(profileDTO.getSex());

                userRepository.save(user);

                return new StringResponse("Cap nhat thanh cong");
        }

        @Override
        public StringResponse updatePassword(ResetPasswordDTO resetPasswordDTO, String token) {
                String email = JwtUtils.decodeWebToken(token).get("email");
                User user = userRepository.findByEmail(email).orElseThrow(
                                () -> new DataNotFoundException("User not found with email " + email));

                if (!passwordEncoder.matches(resetPasswordDTO.getOldPassword(), user.getPassword())) {
                        throw new BadCredentialsException("OldPassword is incorrect");
                }

                user.setPassword(passwordEncoder.encode(resetPasswordDTO.getNewPassword()));

                userRepository.save(user);
                return new StringResponse("Cap nhat mat khau thanh cong");
        }

        @Override
        public StringResponse forgotPassword(ForgotPasswordDTO forgotPasswordDTO) {
                User user = userRepository.findByEmail(forgotPasswordDTO.getUsername()).orElseThrow(
                                () -> new DataNotFoundException(
                                                "User not found with email " + forgotPasswordDTO.getUsername()));
                Random random = new Random();
                String code_verify = String.format("%06d", random.nextInt(1000000));
                user.setCodeVerify(code_verify);
                userRepository.save(user);
                EmailDTO newEmail = new EmailDTO(user.getUsername(),
                                "[Harmonie - E Commerce System] Reset your password",
                                "Dear " + user.getFullName() + ",\n\n"
                                                + "We noticed that you forgot your login password and you are requesting a new password for the account associated with "
                                                + user.getUsername() + ".\n\n"
                                                + "Your code verify is: " + code_verify + "\n\n"
                                                + "Please use this code to reset your password. If you did not request this, please ignore this email.\n\n"
                                                + "\n\n"
                                                + "Best regards,\n"
                                                + "Harmonie - E Commerce System");
                this.emailService.sendEmail(newEmail);

                return new StringResponse("Send code verify to email successfully");
        }

        @Override
        public StringResponse updatePasswordByCode(UpdatePasswordDTO updatePasswordDTO) {
                User user = getUserByUsernameAndCodeVerify(updatePasswordDTO.getUsername(),
                                updatePasswordDTO.getCodeVerify());
                String hashPassword = this.passwordEncoder.encode(updatePasswordDTO.getNewPassword());
                user.setPassword(hashPassword);
                user.setCodeVerify(null);
                userRepository.save(user);
                return new StringResponse("Update password successfully");
        }

        public User getUserByUsernameAndCodeVerify(String username, String codeVerify) {
                return userRepository.findByEmailAndCodeVerify(username, codeVerify).orElseThrow(
                                () -> new DataNotFoundException("User not found with username " + username
                                                + " and code verify " + codeVerify));
        }

        @Override
        public List<ExpenseResponse> getUserExpenses(String token) {
                String email = JwtUtils.decodeWebToken(token).get("email");
                User user = userRepository.findByEmail(email).orElseThrow(
                                () -> new DataNotFoundException("User not found with email " + email));
                List<ExpenseResponse> expenses = new ArrayList<>();
                List<Order> orders = orderRepository.findByUserIdThroughConsigneeInfomation(user.getId());
                for (Order order : orders) {
                        Float total = order.getTotalPrice();
                        expenses.add(ExpenseResponse.builder()
                                        .id(order.getId())
                                        .amount(new BigDecimal(Float.toString(total)))
                                        // .date(order.getCreationDate().getTime())
                                        .date(LocalDateTime.ofInstant(
                                                        Instant.ofEpochMilli(order.getCreationDate().getTime()),
                                                        ZoneId.systemDefault()).toLocalDate())

                                        .build());
                }
                return expenses;
        }

}
