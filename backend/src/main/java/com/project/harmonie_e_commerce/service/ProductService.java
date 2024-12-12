 package com.project.harmonie_e_commerce.service;


 import com.project.harmonie_e_commerce.dto.ProductDTO;
 import com.project.harmonie_e_commerce.dto.ProductImageDTO;
 import com.project.harmonie_e_commerce.exception.DataNotFoundException;
 import com.project.harmonie_e_commerce.model.Category;
 import com.project.harmonie_e_commerce.model.Product;
 import com.project.harmonie_e_commerce.model.ProductImage;
 import com.project.harmonie_e_commerce.model.Store;
 import com.project.harmonie_e_commerce.repository.CategoryRepository;
 import com.project.harmonie_e_commerce.repository.ProductImageRepository;
 import com.project.harmonie_e_commerce.repository.ProductRepository;
 import com.project.harmonie_e_commerce.repository.StoreRepository;
 import com.project.harmonie_e_commerce.response.ProductResponse;
 import lombok.RequiredArgsConstructor;
 import org.springframework.data.domain.Page;
 import org.springframework.data.domain.PageRequest;
 import org.springframework.stereotype.Service;

 import java.util.List;
 import java.util.Optional;

 @Service
 @RequiredArgsConstructor
 public class ProductService implements IProductService {
     private final ProductRepository productRepository;
     private final CategoryRepository categoryRepository;
     private final ProductImageRepository productImageRepository;
     private final StoreRepository storeRepository;

     @Override
     public ProductResponse createProduct(ProductDTO productDTO) throws DataNotFoundException {
         Category existingCategory = categoryRepository
                 .findById(productDTO.getCategoryId())
                 .orElseThrow(() -> new DataNotFoundException(
                         "Cannot find category with id: " + productDTO.getCategoryId()));
         Store existingStore = storeRepository.findById(productDTO.getStoreId())
                 .orElseThrow(() -> new DataNotFoundException(
                         "Cannot find store with id: " + productDTO.getStoreId()));
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

     @Override
     public Product getProductById(int productId) throws Exception {
         return productRepository.findById(productId).orElseThrow(() -> new DataNotFoundException(
                 "Cannot find product with id =" + productId));
     }

     @Override
     public Page<ProductResponse> getAllProducts(PageRequest pageRequest) {
         // Lấy danh sách sản phẩm theo trang(page) và giới hạn(limit)
         return productRepository.findAll(pageRequest)
                 .map(ProductResponse::fromProduct);
     }

     @Override
     public ProductResponse updateProduct(
             int id,
             ProductDTO productDTO)
             throws Exception {
         Product existingProduct = getProductById(id);
         if (existingProduct != null) {
             // copy các thuộc tính từ DTO -> Product
             // Có thể sử dụng ModelMapper
             Category existingCategory = categoryRepository
                     .findById(productDTO.getCategoryId())
                     .orElseThrow(() -> new DataNotFoundException(
                             "Cannot find category with id: " + productDTO.getCategoryId()));
//    .store(existingStore)
//                     .name(productDTO.getName())
//                     .brand(productDTO.getBrand())
//                     .price(productDTO.getPrice())
//                     .quantity(productDTO.getQuantity())
//                     .description(productDTO.getDescription())
//                     .buyingCount(0)
//                     .ratingCount(0)
//                     .avgRating(0f)
//                     .category(existingCategory)
//                     .productStatus(Product.ProductStatus.enable)
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
         return null;
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
 }
