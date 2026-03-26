package com.example.qly_kho.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.qly_kho.entity.ActivityLog;
import com.example.qly_kho.entity.User;
import com.example.qly_kho.exception.ErrorCode;
import com.example.qly_kho.exception.custom.AppException;
import com.example.qly_kho.exception.custom.NotFoundException;
import com.example.qly_kho.repository.ActivityLogRepository;
import com.example.qly_kho.repository.UserRepository;
import com.example.qly_kho.service.ActivityLogService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ActivityLogServiceImpl implements ActivityLogService{

    private final ActivityLogRepository activityLogRespository;
    private final UserRepository userRepository;

    @Override
    public void logActivity(Long userId, String action, String entityType, long entityId, String description, String ipAddress) {

        User user = userRepository.findById(userId)
                        .orElseThrow(() -> new NotFoundException(
                            String.format("User with (ID: %d) not found in ActivityLogService", userId)
                        ));
        
        ActivityLog newActivityLog = ActivityLog.createActivityLog(
                                                    user, 
                                                    action.toUpperCase().replace(" ", "_"), 
                                                    entityType, 
                                                    entityId, 
                                                    description, 
                                                    ipAddress);
        try{   
            activityLogRespository.save(newActivityLog);                                            
        } catch (Exception e) {
            throw new AppException(
                ErrorCode.INTERNAL_ERROR, 
                "Failed to save activity log: " + e.getMessage()
            );
        }
    }
    
}
