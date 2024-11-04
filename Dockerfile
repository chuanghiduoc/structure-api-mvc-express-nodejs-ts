# Chọn hình ảnh Node.js làm hình ảnh gốc
FROM node:20

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json vào trong hình ảnh
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép mã nguồn vào trong hình ảnh
COPY . .

# Biên dịch mã TypeScript
RUN npm run build

# Expose port (cổng mà ứng dụng sẽ chạy)
EXPOSE 4000

# Chạy ứng dụng
CMD [ "node", "dist/index.js" ]
