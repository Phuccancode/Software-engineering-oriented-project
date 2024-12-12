package com.project.harmonie_e_commerce.controller;

import com.github.javafaker.Faker;
import com.project.harmonie_e_commerce.dto.*;
import com.project.harmonie_e_commerce.response.ProductListResponse;
import com.project.harmonie_e_commerce.response.ProductResponse;
import com.project.harmonie_e_commerce.model.Product;
import com.project.harmonie_e_commerce.model.ProductImage;
import com.project.harmonie_e_commerce.service.ExtractToken;
import com.project.harmonie_e_commerce.service.IProductService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@RestController
@RequestMapping("${api.prefix}/products")
@RequiredArgsConstructor
public class ProductController {
    private final IProductService productService;

    private final ExtractToken extractToken;

    @PostMapping("")
    public ResponseEntity<?> createProduct(@Valid @RequestBody ProductDTO productDTO,
                                           HttpServletRequest request,
                                           BindingResult result) {
            Integer store_id = extractToken.getIdFromToken(request);
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }
            ProductResponse newProduct = productService.createProduct(productDTO,store_id);
            return ResponseEntity.ok(newProduct);

    }

    @PostMapping(value = "uploads/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImages(@PathVariable Integer id,
                                          @RequestParam("files") List<MultipartFile> files) throws Exception{
            List<ProductImage> productImages = new ArrayList<>();
            return ResponseEntity.ok(productService.uploadImages(id, files));
    }



//     private String storeFile(MultipartFile file) throws IOException {
//         String filename = StringUtils.cleanPath(file.getOriginalFilename());
//         // Add UUID in forward of file name to make it unique
//         String uniqueFilename = UUID.randomUUID().toString() + " " + filename;
//         // Path to folder storing file
//         java.nio.file.Path uploadDir = Paths.get("upload");
//         // Check and create folder if it doesnt exist
//         if (!Files.exists(uploadDir)) {
//             Files.createDirectories(uploadDir);
//         }
//         // path to destination file
//         java.nio.file.Path destination = Paths.get(uploadDir.toString(), uniqueFilename);
//         Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
//         return uniqueFilename;
//     }

    @Deprecated
    @GetMapping("/images/{imageName}")
    public ResponseEntity<?> viewImage(@PathVariable String imageName) {
        try {
            java.nio.file.Path imagePath = Paths.get("upload/" + imageName);
            UrlResource resource = new UrlResource(imagePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(new UrlResource(Paths.get("upload/notfound.jpeg").toUri()));
                //return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // http://localhost:9090/api/v1/products?page=1&limit=10
    @GetMapping("")
    public ResponseEntity<ProductListResponse> getProducts(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit) {
        PageRequest pageRequest = PageRequest.of(page, limit, Sort.by("id").descending());
        Page<ProductResponse> productPage = productService.getAllProducts(pageRequest);
        int totalPages = productPage.getTotalPages();
        return ResponseEntity.ok(new ProductListResponse(productPage.getContent(), totalPages));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable("id") int productId) {
//        try {
            Product product = productService.getProductById(productId);
            return ResponseEntity.ok(ProductResponse
                    .fromProduct(product));
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted with id " + id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable int id,
                                           @Valid @RequestBody ProductDTO productDTO
    ) throws Exception{
        productService.updateProduct(id, productDTO);
        return ResponseEntity.ok("Product with id " + id + " is updated");
    }

//    @PostMapping("/generateFakeProducts")
//    public ResponseEntity<String> generateFakeProducts() {
//        Faker faker = new Faker();
//        for (int i = 0; i < 5000; i++) {
//            String productName = faker.commerce().productName();
//            if (productService.existsByName(productName)) {
//                continue;
//            }
//            ProductDTO productDTO = ProductDTO.builder()
//                    .name(productName)
//                    .price((float) faker.number().numberBetween(50_000, 50_000_000))
//                    .description(faker.lorem().sentence())
//                    .build();
//            try {
//                productService.createProduct(productDTO);
//            } catch (Exception e) {
//                return ResponseEntity.badRequest().body(e.getMessage());
//            }
//        }
//        return ResponseEntity.ok("Fake products generated successfully");
//    }

    @GetMapping("/category/{category_id}")
    public ResponseEntity<?> getAllProductsByCategoryId(
            @PathVariable Integer category_id
    ){
        return ResponseEntity.ok(productService.getProductsByCategoryId(category_id));
    }
}
