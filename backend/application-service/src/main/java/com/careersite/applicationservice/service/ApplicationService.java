package com.careersite.applicationservice.service;

import com.careersite.applicationservice.model.Application;
import com.careersite.applicationservice.repository.ApplicationRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationService {
    private final ApplicationRepository applicationRepository;

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public Application getApplicationById(Long id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Application not found with id: " + id));
    }

    public List<Application> getApplicationsByJobId(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    public Application createApplication(Application application) {
        return applicationRepository.save(application);
    }

    public Application updateApplicationStatus(Long id, String status) {
        Application application = getApplicationById(id);
        application.setStatus(status);
        return applicationRepository.save(application);
    }
} 