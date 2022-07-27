package com.surge.userManagement.service.Impl;

import com.surge.userManagement.dao.User;
import com.surge.userManagement.dto.UserDTO;
import com.surge.userManagement.enums.UserTypes;
import com.surge.userManagement.exceptions.UserNotFoundException;
import com.surge.userManagement.repository.UserRepository;
import com.surge.userManagement.service.UserService;
import org.bson.types.ObjectId;
import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserRepository userRepository;

    private final DozerBeanMapper modelMapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, DozerBeanMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(email);
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        if (!user.isPresent()) {
            throw new UserNotFoundException("User not found");
        } else if (user.get().getAccountType().equals(UserTypes.STUDENT.getUserValue())) {
            authorities.add(new SimpleGrantedAuthority(UserTypes.STUDENT.getUserValue()));
        } else {
            authorities.add(new SimpleGrantedAuthority(UserTypes.ADMIN.getUserValue()));
        }
        return new org.springframework.security.core.userdetails.User(user.get().getEmail(), user.get().getPassword(), authorities);
    }


    @Override
    public UserDTO addUser(UserDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);
        if(user.getAccountType().equals(UserTypes.ADMIN.getUserValue())){
            user.setAccountType(UserTypes.ADMIN.getUserValue());
        }else{
            user.setAccountType(UserTypes.STUDENT.getUserValue());
        }
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        user.setStatus(true);
        user.setCreatedDate(LocalDateTime.now());
        User userResponse = userRepository.save(user);
        return (modelMapper.map(userResponse, UserDTO.class));
    }

    @Override
    public List<UserDTO> getAllUsers(Integer offset, Integer limit) {
        Pageable pageable = PageRequest
                .of(offset, limit);
        Page<User> userList = userRepository.findAll(pageable);
        return (userList.stream()
                .map(entity -> modelMapper.map(entity, UserDTO.class))
                .collect(Collectors.toList()));
    }

    @Override
    public UserDTO getUserById(String id) {
        Optional<User> optionalUser = userRepository.findById(new ObjectId(id));
        if (optionalUser.isPresent()) {
            return (modelMapper.map(optionalUser.get(), UserDTO.class));
        } else {
            throw new UserNotFoundException("user not found");
        }
    }

    @Override
    public UserDTO updateUser(UserDTO userDTO) {
        Optional<User> optionalUser = userRepository.findById(new ObjectId(userDTO.getId()));
        if (optionalUser.isPresent()) {
            User user = modelMapper.map(userDTO, User.class);
            user.setAccountType(optionalUser.get().getAccountType());
            user.setLastModifiedDate(LocalDateTime.now());
            User userResponse = userRepository.save(user);
            return (modelMapper.map(userResponse, UserDTO.class));
        } else {
            throw new UserNotFoundException("user not found");
        }
    }

    @Override
    public void deleteUser(String id) {
        Optional<User> optionalUser = userRepository.findById(new ObjectId(id));
        if (optionalUser.isPresent()) {
            userRepository.deleteById(new ObjectId(id));
        } else {
            throw new UserNotFoundException("user not found");
        }
    }
}
