-- إدخال بيانات أولية للتجربة

-- إدخال مستخدمين
INSERT INTO users (name, email, password, role, status) VALUES
('مدير النظام', 'admin@example.com', '$2b$10$1XpzxM7XY3KEDYJbAZRA/OcJQrlCyexQOQjy1ZZDl.YnXcJxJ3vIi', 'admin', 'active'), -- password: password
('بائع كتب', 'vendor@example.com', '$2b$10$1XpzxM7XY3KEDYJbAZRA/OcJQrlCyexQOQjy1ZZDl.YnXcJxJ3vIi', 'vendor', 'active'), -- password: password
('عميل', 'customer@example.com', '$2b$10$1XpzxM7XY3KEDYJbAZRA/OcJQrlCyexQOQjy1ZZDl.YnXcJxJ3vIi', 'customer', 'active'), -- password: password
('أمين المخزن', 'store@example.com', '$2b$10$1XpzxM7XY3KEDYJbAZRA/OcJQrlCyexQOQjy1ZZDl.YnXcJxJ3vIi', 'storekeeper', 'active'); -- password: password

-- إدخال كتب
INSERT INTO books (title, author, price, image, category, quantity, vendor_id, description, publish_date, pages, language, isbn, threshold) VALUES
('رواية الأمير الصغير', 'أنطوان دو سانت إكزوبيري', 45.00, '/placeholder.svg?height=300&width=200', 'روايات', 25, 2, 'رواية فلسفية للكاتب الفرنسي أنطوان دو سانت إكزوبيري، تحكي قصة طيار تعطلت طائرته في الصحراء ويلتقي بأمير صغير من كوكب آخر.', '1943', 96, 'العربية', '9789776171718', 10),
('مئة عام من العزلة', 'غابرييل غارسيا ماركيز', 60.00, '/placeholder.svg?height=300&width=200', 'روايات', 15, 2, 'رواية ملحمية تحكي قصة عائلة بوينديا على مدى سبعة أجيال في قرية ماكوندو الخيالية.', '1967', 417, 'العربية', '9789776180085', 10),
('البرمجة بلغة جافاسكريبت', 'محمد أحمد', 85.00, '/placeholder.svg?height=300&width=200', 'تقنية', 30, 2, 'كتاب شامل لتعلم لغة البرمجة جافاسكريبت من الصفر حتى الاحتراف.', '2022', 450, 'العربية', '9789776180092', 15),
('علم النفس الإيجابي', 'سارة الحسن', 55.00, '/placeholder.svg?height=300&width=200', 'تنمية ذاتية', 20, 2, 'كتاب يشرح مبادئ علم النفس الإيجابي وكيفية تطبيقها في الحياة اليومية.', '2021', 320, 'العربية', '9789776180108', 5);

-- إدخال طلبات
INSERT INTO orders (customer_id, total, status) VALUES
(3, 320.00, 'pending'),
(3, 150.00, 'shipped'),
(3, 420.00, 'completed');

-- إدخال عناصر الطلبات
INSERT INTO order_items (order_id, book_id, quantity, price) VALUES
(1, 1, 2, 45.00),
(1, 3, 1, 85.00),
(1, 4, 2, 55.00),
(2, 2, 1, 60.00),
(2, 4, 1, 55.00),
(3, 1, 2, 45.00),
(3, 2, 2, 60.00),
(3, 3, 2, 85.00);

-- إدخال تقييمات
INSERT INTO reviews (book_id, user_id, rating, comment) VALUES
(1, 3, 5, 'من أجمل الروايات التي قرأتها، أنصح بها بشدة.'),
(1, 3, 4, 'رواية جميلة ومؤثرة، استمتعت بقراءتها كثيراً.'),
(2, 3, 5, 'تحفة أدبية حقيقية، من أفضل ما قرأت في حياتي.'),
(3, 3, 5, 'كتاب رائع للمبتدئين في عالم البرمجة، شرح مبسط وأمثلة عملية.');
