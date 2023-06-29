package com.vegarden.backend.repositories;

import java.util.Optional;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.vegarden.backend.models.Blog;
import com.vegarden.backend.models.Zenyte;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    
    public List<Blog> findByTitle(String title);

    public Optional<Blog> findByOwner(Zenyte owner);

}
