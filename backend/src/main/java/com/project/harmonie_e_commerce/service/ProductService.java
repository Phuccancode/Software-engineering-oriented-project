 package com.project.harmonie_e_commerce.service;


 import com.project.harmonie_e_commerce.dto.ProductDTO;
 import com.project.harmonie_e_commerce.dto.ProductImageDTO;
 import com.project.harmonie_e_commerce.exception.DataNotFoundException;

 import com.project.harmonie_e_commerce.model.*;
 import com.project.harmonie_e_commerce.repository.*;
 import com.project.harmonie_e_commerce.response.ProductInBoxRespone;
 import com.project.harmonie_e_commerce.exception.FileTooLargeException;
 import com.project.harmonie_e_commerce.exception.UnsupportMediaException;

 import com.project.harmonie_e_commerce.response.ProductResponse;
 import lombok.RequiredArgsConstructor;
 import org.springframework.data.domain.Page;
 import org.springframework.data.domain.PageRequest;
 import org.springframework.stereotype.Service;
 import org.springframework.util.StringUtils;
 import org.springframework.web.multipart.MultipartFile;


 import java.util.ArrayList;
 import java.io.File;
 import java.io.IOException;
 import java.nio.file.Files;
 import java.nio.file.Paths;
 import java.nio.file.StandardCopyOption;
 import java.util.List;
 import java.util.Optional;

 @Service
 @RequiredArgsConstructor
 public class ProductService implements IProductService {
     private final ProductRepository productRepository;
     private final CategoryRepository categoryRepository;
     private final ProductImageRepository productImageRepository;
     private final StoreRepository storeRepository;
     private final BoxRepository boxRepository;

     @Override
     public ProductResponse createProduct(ProductDTO productDTO,Integer store_id) throws DataNotFoundException {
         Category existingCategory = categoryRepository
                 .findById(productDTO.getCategoryId())
                 .orElseThrow(() -> new DataNotFoundException(
                         "Cannot find category with id: " + productDTO.getCategoryId()));
         Store existingStore = storeRepository.findById(store_id)
                 .orElseThrow(() -> new DataNotFoundException(
                         "Cannot find store with id: " + store_id));
         Product newProduct = Product.builder()
                 .store(existingStore)
                 .name(productDTO.getName())
                 .brand(productDTO.getBrand())
                 .price(productDTO.getPrice())
                 .quantity(productDTO.getQuantity())
                 .description(productDTO.getDescription())
                 .buyingCount(0)
                 .ratingCount(0)
                 .avgRating(0f)
                 .category(existingCategory)
                 .productStatus(Product.ProductStatus.enable)
                 .build();
         productRepository.save(newProduct);
         return ProductResponse.fromProduct(newProduct);
     }
    private void updateNumImage(Product existingProduct){
        String folderPath = "./src/main/resources/public/images/"+String.valueOf(existingProduct.getId()); // Thay bằng đường dẫn tới folder của bạn
        File folder = new File(folderPath);
        if (!folder.isDirectory()) {
            existingProduct.setNumImage(0);
        }else {
            File[] imageFiles = folder.listFiles(file -> {
                String fileName = file.getName().toLowerCase();
                return file.isFile() && (fileName.endsWith(".jpg") || fileName.endsWith(".png") || fileName.endsWith(".jpeg"));
            });
            if(imageFiles!=null){
                existingProduct.setNumImage(imageFiles.length);
            }
            else{
                existingProduct.setNumImage(0);
            }
        }
        productRepository.save(existingProduct);
    }
     @Override
     public Product getProductById(int productId)  {
         Product existingProduct = productRepository.findById(productId).orElseThrow(() -> new DataNotFoundException(
                 "Cannot find product with id =" + productId));
         updateNumImage(existingProduct);
         return existingProduct;
     }

     @Override
     public Page<ProductResponse> getAllProducts(PageRequest pageRequest) {
         // Lấy danh sách sản phẩm theo trang(page) và giới hạn(limit)
         return productRepository.findAll(pageRequest)
                 .map(ProductResponse::fromProduct);
     }

     @Override
     public String uploadImages(Integer id, List<MultipartFile> files) throws Exception {
         for (MultipartFile file : files) {
             if (file.getSize() == 0)
                 continue;
             // check the size and format of file
             if (file.getSize() > 10 * 1024 * 1024) {
                 throw new FileTooLargeException("File is too large! Max size is 10MB");
             }
             // Get the format of file
             String contentType = file.getContentType();
             if (contentType == null || !contentType.startsWith("image/")) {
                 throw new UnsupportMediaException("File must be an image");
             }
             String filename = storeFile(file, id);
         }
         updateNumImage(getProductById(id));
         return "Upload successfully!";
     }
     // store file to public/images/{product id} folder
     private String storeFile(MultipartFile file, long productId) throws IOException {
         String filename = StringUtils.cleanPath(file.getOriginalFilename());
         // Add UUID in forward of file name to make it unique
         // Path to folder storing file
         java.nio.file.Path uploadDir = Paths.get("./src/main/resources/public/images/" + String.valueOf(productId));
         // Check and create folder if it doesnt exist
         if (!Files.exists(uploadDir)) {
             Files.createDirectories(uploadDir);
         }
         // path to destination file
         java.nio.file.Path destination = Paths.get(uploadDir.toString(), filename);
         Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
         return filename;
     }

     @Override
     public ProductResponse updateProduct(
             int id,
             ProductDTO productDTO
     )
             throws Exception {
         Product existingProduct = getProductById(id);
             // copy các thuộc tính từ DTO -> Product
             // Có thể sử dụng ModelMapper
             Category existingCategory = categoryRepository
                     .findById(productDTO.getCategoryId())
                     .orElseThrow(() -> new DataNotFoundException(
                             "Cannot find category with id: " + productDTO.getCategoryId()));

                existingProduct.setStore(existingProduct.getStore());
                existingProduct.setCategory(existingCategory);
                existingProduct.setName(productDTO.getName());
                existingProduct.setBrand(productDTO.getBrand());
                existingProduct.setPrice(productDTO.getPrice());
                existingProduct.setQuantity(productDTO.getQuantity());
                existingProduct.setDescription(productDTO.getDescription());
                existingProduct.setProductStatus(Product.ProductStatus.valueOf(productDTO.getStatus()));
                existingProduct.setBuyingCount(productDTO.getBuyingCount());
                existingProduct.setRatingCount(productDTO.getRatingCount());
                existingProduct.setAvgRating(productDTO.getAvgRating());
             return ProductResponse.fromProduct(productRepository.save(existingProduct));
     }

     @Override
     public void deleteProduct(int id) {
         Optional<Product> optionalProduct = productRepository.findById(id);
         optionalProduct.ifPresent(productRepository::delete);
     }

     @Override
     public boolean existsByName(String name) {
         return productRepository.existsByName(name);
     }

     @Override
     public ProductImage createProductImage(ProductImageDTO productImageDTO) throws Exception {
         Product existingProduct = productRepository
                 .findById(productImageDTO.getProductId())
                 .orElseThrow(() -> new DataNotFoundException(
                         "Cannot find product with id: " + productImageDTO.getProductId()));
         ProductImage newProductImage = ProductImage.builder()
                 .product(existingProduct)
                 .url(productImageDTO.getUrl())
                 .build();
         return productImageRepository.save(newProductImage);
     }

     @Override
     public List<ProductImage> getProductImagesByProductId(int productId) {
         return productImageRepository.findByProductId(productId);
     }

     @Override
     public List<ProductResponse> getProductsByCategoryId(Integer category_id) {
         Category category = categoryRepository.findById(category_id).orElseThrow(
                () -> new DataNotFoundException("Cannot find category with id: " + category_id)
         );
         List<Product> productList = productRepository.findAllByCategoryId(category_id);
         List<ProductResponse> responseList = new ArrayList<>();

         for (Product p : productList){
             responseList.add(ProductResponse.fromProduct(p));
         }

         return responseList;
     }


 }
