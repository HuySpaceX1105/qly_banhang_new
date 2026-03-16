package com.example.qly_kho.service;

public interface ActivityLogService {
    void logActivity(Long userId, String action, String entityType, long entityId, String description, String ipAddress);
}
