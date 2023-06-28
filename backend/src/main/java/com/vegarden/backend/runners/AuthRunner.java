package com.vegarden.backend.runners;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.vegarden.backend.enumerates.RoleType;
import com.vegarden.backend.models.Blog;
import com.vegarden.backend.models.Profile;
import com.vegarden.backend.models.Role;
import com.vegarden.backend.models.Zenyte;
import com.vegarden.backend.repositories.RoleRepository;
import com.vegarden.backend.repositories.ZenyteRepository;
import com.vegarden.backend.services.AuthService;
import com.vegarden.backend.services.BlogService;
import com.vegarden.backend.services.ProfileService;

@Component
public class AuthRunner implements ApplicationRunner {

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	ZenyteRepository zenyteRepository;

	@Autowired
	ProfileService profileService;

	@Autowired
	BlogService blogService;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	AuthService authService;

	private Set<Role> adminRole;

	private Set<Role> moderatorRole;

	private Set<Role> userRole;

	private Timestamp now;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println("Run...");
		now = new Timestamp(System.currentTimeMillis());
		setRoleDefault();
		saveAdminDefault();
		saveModeratorDefault();
		saveUserDefault();
	}

	private void setRoleDefault() {
		Role admin = new Role();
		Role moderator = new Role();
		Role user = new Role();

		admin.setRole(RoleType.ROLE_ADMIN);
		moderator.setRole(RoleType.ROLE_MODERATOR);
		user.setRole(RoleType.ROLE_USER);

		if (!roleRepository.existsByRole(RoleType.ROLE_ADMIN)) {
			roleRepository.save(admin);
		}
		if (!roleRepository.existsByRole(RoleType.ROLE_MODERATOR)) {
			roleRepository.save(moderator);
		}

		if (!roleRepository.existsByRole(RoleType.ROLE_USER)) {
			roleRepository.save(user);
		}

		adminRole = new HashSet<Role>();
		adminRole.add(admin);
		adminRole.add(moderator);
		adminRole.add(user);

		moderatorRole = new HashSet<Role>();
		moderatorRole.add(moderator);
		moderatorRole.add(user);

		userRole = new HashSet<Role>();
		userRole.add(user);
	}

	public void saveAdminDefault() {
		if (zenyteRepository.findByEmail("andrea.ragalzi@vegarden.com").isEmpty()) {
			Zenyte admin = new Zenyte();
			Profile adminProfile = new Profile();
			Blog adminBlog = new Blog();

			admin.setUsername("andrea.ragalzi");
			admin.setEmail("andrea.ragalzi@epicode.com");
			admin.setPassword(passwordEncoder.encode("admin"));
			admin.setRoles(adminRole);
			admin.setCreatedAt(now);

			adminProfile.setFirstname("Andrea");
			adminProfile.setLastname("Ragalzi");
			adminProfile.setPronouns("He/Him");
			adminProfile.setBio("Hi, I'm Andrea");
			adminProfile.setLocation("Italy");
			adminProfile.setCreatedAt(now);
			adminProfile.setOwner(admin);

			adminBlog.setTitle("First blog on Vegarden :)");
			adminBlog.setDescription(
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
			adminBlog.setCreatedAt(now);
			adminBlog.setOwner(admin);

			zenyteRepository.save(admin);
			profileService.saveProfile(adminProfile);
			blogService.saveBlog(adminBlog);
		}

	}

	public void saveModeratorDefault() {
		if (zenyteRepository.findByEmail("emma.goldman@vegarden.com").isEmpty()) {

			Zenyte moderator = new Zenyte();
			Profile moderatorProfile = new Profile();
			Blog moderatorBlog = new Blog();

			moderator.setUsername("emma.goldman");
			moderator.setEmail("emma.goldman@epicode.com");
			moderator.setPassword(passwordEncoder.encode("moderator"));
			moderator.setRoles(moderatorRole);
			moderator.setCreatedAt(now);

			moderatorProfile.setFirstname("Moderator");
			moderatorProfile.setLastname("User");
			moderatorProfile.setPronouns("They/Them");
			moderatorProfile.setBio("Hi, I'm a moderator");
			moderatorProfile.setCreatedAt(now);
			moderatorProfile.setOwner(moderator);

			moderatorBlog.setTitle("Emma's Blog");
			moderatorBlog.setDescription("This is the blog of the Emma.");
			moderatorBlog.setCreatedAt(now);
			moderatorBlog.setOwner(moderator);

			zenyteRepository.save(moderator);
			profileService.saveProfile(moderatorProfile);
			blogService.saveBlog(moderatorBlog);

		}
	}

	public void saveUserDefault() {
		if (zenyteRepository.findByEmail("lucy.person@vegarden.com").isEmpty()) {

			Zenyte user = new Zenyte();
			Profile userProfile = new Profile();
			Blog userBlog = new Blog();

			user.setUsername("lucy.person");
			user.setEmail("lucy.person@epicode.com");
			user.setPassword(passwordEncoder.encode("user"));
			user.setRoles(userRole);
			user.setCreatedAt(now);

			userProfile.setFirstname("Lucy");
			userProfile.setLastname("Person");
			userProfile.setPronouns("She/Her");
			userProfile.setBio("Hi, I'm a Lucy");
			userProfile.setLocation("Italy");
			userProfile.setCreatedAt(now);
			userProfile.setOwner(user);

			userBlog.setTitle("Lucy's Blog");
			userBlog.setDescription("This is the blog of Lucy.");
			userBlog.setCreatedAt(now);
			userBlog.setOwner(user);

			zenyteRepository.save(user);
			profileService.saveProfile(userProfile);
			blogService.saveBlog(userBlog);
		}
	}

}
