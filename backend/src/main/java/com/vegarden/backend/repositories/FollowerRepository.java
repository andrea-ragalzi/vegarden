package com.vegarden.backend.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.vegarden.backend.models.Follower;
import com.vegarden.backend.models.Zenyte;

import jakarta.transaction.Transactional;

public interface FollowerRepository extends JpaRepository<Follower, Long> {

    public List<Zenyte> findByFollower(Zenyte follower);

    public List<Zenyte> findByFollowed(Zenyte followed);

    public boolean existsByFollowerAndFollowed(Zenyte follower, Zenyte followed);

    @Transactional
    public void deleteByFollowerAndFollowed(Zenyte follower, Zenyte followed);

    public long countByFollower(Zenyte follower);

    public long countByFollowed(Zenyte followed);
}
