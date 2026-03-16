package com.example.qly_kho.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.qly_kho.entity.ActivityLog;
import com.example.qly_kho.entity.User;
import com.example.qly_kho.repository.ActivityLogRespository;
import com.example.qly_kho.repository.UserRepository;
import com.example.qly_kho.service.ActivityLogService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ActivityLogServiceImpl implements ActivityLogService{

    private final ActivityLogRespository activityLogRespository;
    private final UserRepository userRepository;

    @Override
    public void logActivity(Long userId, String action, String entityType, long entityId, String description, String ipAddress) {

        try {
            User user = userRepository.findById(userId)
                            .orElseThrow(() -> new RuntimeException());
            
            ActivityLog newActivityLog = ActivityLog.createActivityLog(
                                                        user, 
                                                        action.toUpperCase().replace(" ", "_"), 
                                                        entityType, 
                                                        entityId, 
                                                        description, 
                                                        ipAddress);
            
            activityLogRespository.save(newActivityLog);                                            
        } catch (Exception e) {
        }
    }
    
}
