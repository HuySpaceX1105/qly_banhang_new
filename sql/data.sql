INSERT INTO roles(name, description)
VALUES 
('ADMIN', 'Quản trị hệ thống'),
('MANAGER', 'Quản lý'),
('EMPLOYEE', 'Nhân viên');

INSERT INTO permissions(name, description)
VALUES
-- USER
('USER_VIEW', 'Xem danh sách user'),
('USER_CREATE', 'Tạo user'),
('USER_UPDATE', 'Cập nhật user'),
('USER_DELETE', 'Xóa user'),

-- CATEGORY
('CATEGORY_VIEW', 'Xem danh mục'),
('CATEGORY_CREATE', 'Tạo danh mục'),
('CATEGORY_UPDATE', 'Cập nhật danh mục'),
('CATEGORY_DELETE', 'Xóa danh mục');



INSERT INTO role_permissions(role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.name LIKE 'USER_%'
WHERE r.name = 'ADMIN';



INSERT INTO role_permissions(role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.name NOT LIKE 'USER_%'
WHERE r.name = 'MANAGER';