package com.surge.userManagement.dataseed;

import com.surge.userManagement.dao.User;
import com.surge.userManagement.enums.UserTypes;
import com.surge.userManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class UserDataLoader implements CommandLineRunner {

    @Autowired
    UserRepository userRepository;

    @Override
    public void run(String... args) {
        loadAdminUserData();
    }

    private void loadAdminUserData() {
        if (userRepository.count() == 0) {
            User adminUser = new User();
            adminUser.setFirstName("Arkam");
            adminUser.setLastName("Ahamed");
            adminUser.setEmail("arkamahamed88@gmail.com");
            adminUser.setPassword(new BCryptPasswordEncoder().encode("test123"));
            adminUser.setDateOfBirth("2000-05-20");
            adminUser.setMobileNo("0758343191");
            adminUser.setStatus(true);
            adminUser.setCreatedDate(LocalDateTime.now());
            adminUser.setAccountType(UserTypes.ADMIN.getUserValue());
            userRepository.save(adminUser);
        }
    }
}

