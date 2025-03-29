package com.careersite.jobservice.repository;

import com.careersite.jobservice.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
} 