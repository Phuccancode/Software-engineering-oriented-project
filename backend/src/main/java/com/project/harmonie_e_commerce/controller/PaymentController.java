
package com.project.harmonie_e_commerce.controller;

import com.project.harmonie_e_commerce.dto.PaymentDTO;
import com.project.harmonie_e_commerce.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.prefix}/payment")
@RequiredArgsConstructor

// Thông tin tài khoản dùng để test nhé
// Ngân hàng NCB
// Số thẻ 9704198526191432198
// Tên chủ thẻ NGUYEN VAN A
// Ngày phát hành 07/15
// Mật khẩu OTP 123456
public class PaymentController {
    private final PaymentService paymentService;

    @GetMapping("/vn-pay")
    public ResponseEntity<?> pay(HttpServletRequest request) {
//        return new ResponseObject<>(HttpStatus.OK, "Success",
//                paymentService.createVnPayPayment(request, 1000000.2F, 1L));
        return ResponseEntity.ok(paymentService.createVnPayPayment(request, 1000000.2F, 1));
    }

    @GetMapping("/vn-pay-callback")
    public ResponseEntity<PaymentDTO.VNPayResponse> payCallbackHandler(HttpServletRequest request) {
        String status = request.getParameter("vnp_ResponseCode");
        if (status.equals("00")) {
            Integer orderId = Integer.parseInt(request.getParameter("vnp_OrderInfo"));
            paymentService.handlePaymentOrder(orderId);
//                return new ResponseObject<>(HttpStatus.OK, "Success",
//                        new PaymentDTO.VNPayResponse("00", "Payment success for order " + orderId));
            String redirectUrl = "http://localhost:5173/success";
            return ResponseEntity.status(HttpStatus.FOUND)
                    .header("Location", redirectUrl)
                    .body(null);
        } else {
            throw new RuntimeException("Payment failed");
        }
    }
}
