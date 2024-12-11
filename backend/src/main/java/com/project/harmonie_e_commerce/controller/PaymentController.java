
package com.project.harmonie_e_commerce.controller;

import com.project.harmonie_e_commerce.dto.PaymentDTO;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    public ResponseObject<String> pay(HttpServletRequest request) {
        return new ResponseObject<>(HttpStatus.OK, "Success",
                paymentService.createVnPayPayment(request, 1000000.2F, 1L));
    }

    @GetMapping("/vn-pay-callback")
    public ResponseObject<PaymentDTO.VNPayResponse> payCallbackHandler(HttpServletRequest request) {
        try {
            String status = request.getParameter("vnp_ResponseCode");
            if (status.equals("00")) {
                Long orderId = Long.parseLong(request.getParameter("vnp_OrderInfo"));
                paymentService.handlePaymentOrder(orderId);
                return new ResponseObject<>(HttpStatus.OK, "Success",
                        new PaymentDTO.VNPayResponse("00", "Payment success for order " + orderId));
            } else {
                return new ResponseObject<>(HttpStatus.BAD_REQUEST, "Failed", null);
            }
        } catch (Exception e) {
            return new ResponseObject<>(HttpStatus.BAD_REQUEST, "This URL is not valid", null);
        }
    }
}
