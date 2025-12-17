package com.raunak.FirstProject.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Data;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Data
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    /**
     * Username for normal login
     * (can be same as email if you want)
     */
    private String username;

    /**
     * Email is REQUIRED for Google OAuth
     */
    private String email;

    /**
     * Password is ONLY used for LOCAL users
     * Google users will have this as null
     */
    private String password;

    /**
     * Authentication provider
     * LOCAL or GOOGLE
     */
    private String provider;

    /* =========================
       UserDetails methods
       ========================= */

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // You can add roles later (ROLE_USER, ROLE_ADMIN)
        return List.of();
    }

    /**
     * Spring Security uses this as the "principal username"
     * We return email so BOTH Google & normal login work
     */
    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
