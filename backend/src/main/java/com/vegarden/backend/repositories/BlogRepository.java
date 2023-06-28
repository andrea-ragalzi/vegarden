package com.vegarden.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vegarden.backend.models.Blog;
import com.vegarden.backend.models.Zenyte;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    
    public Blog findByTitle(String title);

    public Blog findByOwner(Zenyte owner);

}
