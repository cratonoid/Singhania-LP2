(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('fast');
        } else {
            $('.back-to-top').fadeOut('fast');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 10, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    const scriptURL = "https://script.google.com/macros/s/AKfycbylnH5_GvQgOMIObtYf-RzaPBtzR4bicwzI9KZ4dI_bUXCdOeYVU4MzRr7mA7GUQmZS/exec";
    let GlobalOtp = 0;
    const coupons = ['SUFIRST25', 'SUGOHALF', 'SUDEAL75', 'SUTOTALWAIVE', 'MERITSU100', 'FASTSU50', 'SUFEST25', 'SUSHEROES50'];
    const couponKeyAndValue = {
        SUFIRST25 : 'SUFIRST25 - Get 25% off on your application fee',
        SUGOHALF : 'SUGOHALF - Avail 50% application fee waiver',
        SUDEAL75 : 'SUDEAL75 - Enjoy 75% off, limited-time offer',
        SUTOTALWAIVE : 'SUTOTALWAIVE - 100% waiver',
        MERITSU100 : 'MERITSU100 - Full waiver for merit-based applicants',
        FASTSU50 : 'FASTSU50 - 50% off for the first 50 applicants',
        SUFEST25 : 'SUFEST25 - 25% festive season offer',
        SUSHEROES50 : 'SUSHEROES50 - 50% off for girl applicants'
    }
    $("#popupOtp").click(function (event){
        event.preventDefault();
        let phoneRegex = /^[6-9]\d{9}$/;
        let whatsappNumber = $("#whatsappNumber").val().trim();
        if (whatsappNumber === "" || !phoneRegex.test(whatsappNumber)) {
            swal("Invalid Number", "Please enter a valid 10-digit WhatsApp number.", "error");
            return;
        }
        let otp = Math.floor(1000 + Math.random() * 9000);
        GlobalOtp = otp;
        let otpURL = "https://api2.nexgplatforms.com/sms/1/text/query?" +
        "username=SinghaniaUni&password=Lotus@1965&from=SINUNV" +
        "&to=91" + whatsappNumber + // Use the entered number
        "&indiaDltContentTemplateId=1707174668414758386" +
        "&indiaDltPrincipalEntityId=1501426470000025315" +
        "&indiaDltTelemarketerId=1702171328200125899" +
        "&text=" + encodeURIComponent(otp + " is your mobile verification code for Singhania University");
        $.ajax({
            url: otpURL,
            type: "GET",
            success: function (response) {
                if (response.messages && response.messages[0].status.id === 7) {
                    console.log("OTP sent");
                    $('#submitForm').prop('disabled', false);
                    $('#otpMessage').css('display', 'block');
                } else {
                    swal("Invalid Number", "Please verify the number entered in WhatsApp Number", "error");
                }
            },
            error: function (xhr, status, error) {
                console.error("AJAX Error:", error);
            }
        });

    });
        $("#submitForm").click(function (event) {
            event.preventDefault();

            // Get input values
            let fullName = $("#fullName").val().trim();
            let whatsappNumber = $("#whatsappNumber").val().trim();
            let email = $("#email").val().trim();
            let city = $("#city").val();
            // let connectTime = $("#connectTime").val();
            let url = sessionStorage.getItem("url");
            let utm_source = sessionStorage.getItem('utm_source');
            let utm_medium = sessionStorage.getItem('utm_medium');
            let utm_campaign = sessionStorage.getItem('utm_campaign');
            let otp = $("#otpPopup").val().trim();
            let programs = $("#programSelect").val();
            let coupon = "";
            let coupon_value = "";
            let usergrpid = "GRP1iped2p093cme0"
            let segid = "SEG8jtr2wwqnne1d1746615195237"
           

            // Validation Regex
            let nameRegex = /^[a-zA-Z\s]+$/; 
            let phoneRegex = /^[6-9]\d{9}$/;
            let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 

            // Validation Checks
            if (fullName === "" || !nameRegex.test(fullName)) {
                swal("Invalid Name", "Please enter a valid full name (letters only).", "error");
                return;
            }
            if (whatsappNumber === "" || !phoneRegex.test(whatsappNumber)) {
                swal("Invalid Number", "Please enter a valid 10-digit WhatsApp number.", "error");
                return;
            }
            if (email === "" || !emailRegex.test(email)) {
                swal("Invalid Email", "Please enter a valid email address.", "error");
                return;
            }
            if(utm_source && (utm_source.toLowerCase() == 'partnerotp' || utm_source.toLowerCase() == 'partner')){
                usergrpid = "GRP1iped2p093cme0"
                segid = "SEGvqhkwzu90rr501746776094352"
                city = $("#citySelect").val().trim();
                coupon = $("#popupCoupon").val().trim();
                if (city === "" || !nameRegex.test(city)) {
                    swal("Invalid City", "Please Select the city", "error");
                    return;
                }
                if(coupons.includes(coupon)) {
                    coupon_value = couponKeyAndValue[coupon];
                }
                else if(coupon !== ""){
                    swal("Invalid Coupon Code", "Please Enter Valid Coupon", "error");
                    return;
                }
            }
            else if(city === "" || !nameRegex.test(city)) {
                swal("Invalid City", "Please enter a valid city name (letters only).", "error");
                return;
            }
            // if (connectTime === "") {
            //     swal("Invalid Time", "Please select a convenient time to connect.", "error");
            //     return;
            // }
            if (programs === "") {
                swal("Invalid Program", "Please select a Program and Degree.", "error");
                return;
            }
            if(utm_source && utm_source.toLowerCase() == 'partnerotp'){
                if(GlobalOtp != parseInt(otp)){
                    swal("Invalid OTP", "Please Enter Valid Otp", "error");
                    return;
                }
            }

            // Hide Modal on successful validation
            $("#detailsModal").modal("hide");

            let formData = {
                "Full Name": fullName,
                "WhatsApp Number": whatsappNumber,
                "Email ID": email,
                "City of Residence": city,
                // "Convenient Time to Connect": connectTime,
                "Program Name": programs,
                "Url" : url,
                "Lp name" : "Singhania_Law_2",
                "coupon" : coupon_value
            };

            $.ajax({
				url: scriptURL,
				type: "POST",
				data: formData,
				contentType: "application/x-www-form-urlencoded",
				success: function (response) {
					console.log("Form submitted successfully", response);
				},
				error: function (xhr, status, error) {
					console.error("AJAX Error:", error);
				}
			});
            //Second: Submit to your API
            $.ajax({
                url: 'https://platformapi.teleforce.in/api/v1/api/createlead/181743',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    name: fullName,
                    email: email,
                    mobile: whatsappNumber,
                    city: city,
                    source: utm_medium,
                    usergroupid: usergrpid, 
                    segmentid: segid, 
                    otherparams: [                        
                        { "meta_key": "coupon_code", "meta_value": coupon },
                        { "meta_key": "utm_source", "meta_value": utm_source },
                        { "meta_key": "utm_medium", "meta_value": utm_medium },
                        { "meta_key": "utm_campaign", "meta_value": utm_campaign }
                        // ,
                        // { "meta_key": "convenient_time", "meta_value": connectTime }
                    ]
                }),
                success: function (response) {
                    console.log("API lead created successfully", response);
                },
                error: function (xhr, status, error) {
                    console.error("Lead API Error:", error);
                }
            });

            $.ajax({
                url: 'http://65.0.217.228/validateAndSaveApplicantUserRegistrationData.json',
                type: 'POST',
                contentType: 'application/json',
                headers: {
                    'Authorization': '123456',
                },
                data: JSON.stringify({
                    name: fullName,
                    email: email,
                    mobile: whatsappNumber,
                    sourceName: utm_medium,
                    campignName: utm_campaign,
                    promocode: coupon
                }),
                success: function (response) {
                    console.log("Third API call successful", response);
                },
                error: function (xhr, status, error) {
                    console.error("Third API Error:", error);
                }
            });
            
            
			
			// Redirect without waiting for the server
			setTimeout(() => {
				window.location.href = "thankyou.html";
			}, 500); // Redirect after 0.5 second
			
        });

        $("#heroOtp").click(function (event){
            event.preventDefault();
            let phoneRegex = /^[6-9]\d{9}$/;
            let whatsappNumber = $("#mobile").val().trim();
            if (whatsappNumber === "" || !phoneRegex.test(whatsappNumber)) {
                swal("Invalid Number", "Please enter a valid 10-digit WhatsApp number.", "error");
                return;
            }
            let otp = Math.floor(1000 + Math.random() * 9000);
            GlobalOtp = otp;
            let otpURL = "https://api2.nexgplatforms.com/sms/1/text/query?" +
            "username=SinghaniaUni&password=Lotus@1965&from=SINUNV" +
            "&to=91" + whatsappNumber + // Use the entered number
            "&indiaDltContentTemplateId=1707174668414758386" +
            "&indiaDltPrincipalEntityId=1501426470000025315" +
            "&indiaDltTelemarketerId=1702171328200125899" +
            "&text=" + encodeURIComponent(otp + " is your mobile verification code for Singhania University");
            $.ajax({
                url: otpURL,
                type: "GET",
                success: function (response) {
                    if (response.messages && response.messages[0].status.id === 7) {
                        console.log("OTP sent");
                        $('#submit-btn').prop('disabled', false);
                        $('#otpHeroMessage').css('display', 'block');
                    } else {
                        swal("Invalid Number", "Please verify the number entered in WhatsApp Number", "error");
                    }
                },
                error: function (xhr, status, error) {
                    console.error("AJAX Error:", error);
                }
            });
    
        });
            $("#submit-btn").click(function (event) {
                event.preventDefault();
               
                // Get input values
                let fullName = $("#heroName").val().trim();
                let whatsappNumber = $("#mobile").val().trim();
                let email = $("#heroEmail").val().trim();
                let city = $("#heroCity").val();
                // let connectTime = $("#connectHeroTime").val();
                let url = sessionStorage.getItem("url");
                let utm_source = sessionStorage.getItem('utm_source');
                let utm_medium = sessionStorage.getItem('utm_medium');
                let utm_campaign = sessionStorage.getItem('utm_campaign');
                let otp = $("#otp-input").val().trim();
                let programs = $("#programHeroSelect").val();
                let coupon = "";
                let coupon_value = "";
                let usergrpid = "GRP1iped2p093cme0"
                let segid = "SEG8jtr2wwqnne1d1746615195237"
    
                // Validation Regex
                let nameRegex = /^[a-zA-Z\s]+$/; 
                let phoneRegex = /^[6-9]\d{9}$/;
                let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    
                // Validation Checks
                if (fullName === "" || !nameRegex.test(fullName)) {
                    swal("Invalid Name", "Please enter a valid full name (letters only).", "error");
                    return;
                }
                if (whatsappNumber === "" || !phoneRegex.test(whatsappNumber)) {
                    swal("Invalid Number", "Please enter a valid 10-digit WhatsApp number.", "error");
                    return;
                }
                if (email === "" || !emailRegex.test(email)) {
                    swal("Invalid Email", "Please enter a valid email address.", "error");
                    return;
                }
                if(utm_source && (utm_source.toLowerCase() == 'partnerotp' || utm_source.toLowerCase() == 'partner')){
                    usergrpid = "GRP1iped2p093cme0"
                    segid = "SEGvqhkwzu90rr501746776094352"
                    city = $("#cityHeroSelect").val().trim();
                    coupon = $("#heroCoupon").val().trim();
                    if (city === "" || !nameRegex.test(city)) {
                        swal("Invalid City", "Please Select the city", "error");
                        return;
                    }
                    if(coupons.includes(coupon)) {
                        coupon_value = couponKeyAndValue[coupon];
                    }
                    else if(coupon !== ""){
                        swal("Invalid Coupon Code", "Please Enter Valid Coupon", "error");
                        return;
                    }
                }
                else if(city === "" || !nameRegex.test(city)) {
                    swal("Invalid City", "Please enter a valid city name (letters only).", "error");
                    return;
                }
                // if (connectTime === "") {
                //     swal("Invalid Time", "Please select a convenient time to connect.", "error");
                //     return;
                // }
                if (programs === "") {
                    swal("Invalid Program", "Please select a Program and Degree.", "error");
                    return;
                }
                if(utm_source && utm_source.toLowerCase() == 'partnerotp'){
                    if(GlobalOtp != parseInt(otp)){
                        swal("Invalid OTP", "Please Enter Valid Otp", "error");
                        return;
                    }
                }
    
                let formData = {
                    "Full Name": fullName,
                    "WhatsApp Number": whatsappNumber,
                    "Email ID": email,
                    "City of Residence": city,
                    // "Convenient Time to Connect": connectTime,
                    "Program Name": programs,
                    "Url" : url,
                    "Lp name" : "Singhania_Law_2",
                    "coupon" : coupon_value
                };
    
                $.ajax({
                    url: scriptURL,
                    type: "POST",
                    data: formData,
                    contentType: "application/x-www-form-urlencoded",
                    success: function (response) {
                        console.log("Form submitted successfully", response);
                    },
                    error: function (xhr, status, error) {
                        console.error("AJAX Error:", error);
                    }
                });
                //paidgrp:GRP1iped2p093cme0
                //paidseg:SEG8jtr2wwqnne1d1746615195237


                //partnergrp:GRP1iped2p093cme0
                //partnerseg:SEGvqhkwzu90rr501746776094352


                //Second: Submit to your API
                $.ajax({
                    url: 'https://platformapi.teleforce.in/api/v1/api/createlead/181743',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({
                    name: fullName,
                    email: email,
                    mobile: whatsappNumber,
                    city: city,
                    source:utm_medium,
                    usergroupid: usergrpid, 
                    segmentid: segid, 
                    otherparams: [
                        { "meta_key": "coupon_code", "meta_value": coupon },
                        { "meta_key": "utm_source", "meta_value": utm_source },
                        { "meta_key": "utm_medium", "meta_value": utm_medium },
                        { "meta_key": "utm_campaign", "meta_value": utm_campaign }
                        // ,
                        // { "meta_key": "convenient_time", "meta_value": connectTime }
                    ]
                    }),
                    success: function (response) {
                        console.log("API lead created successfully", response);
                    },
                    error: function (xhr, status, error) {
                        console.error("Lead API Error:", error);
                    }
                });

                $.ajax({
                    url: 'http://65.0.217.228/validateAndSaveApplicantUserRegistrationData.json',
                    type: 'POST',
                    contentType: 'application/json',
                    headers: {
                        'Authorization': '123456',
                    },
                    data: JSON.stringify({
                        name: fullName,
                        email: email,
                        mobile: whatsappNumber,
                        sourceName: utm_medium,
                        campignName: utm_campaign,
                        promocode: coupon
                    }),
                    success: function (response) {
                        console.log("Third API call successful", response);
                    },
                    error: function (xhr, status, error) {
                        console.error("Third API Error:", error);
                    }
                });
                
                
                // Redirect without waiting for the server
                setTimeout(() => {
                    window.location.href = "thankyou.html";
                }, 500); // Redirect after 0.5 second
                
            });       

        
    
})(jQuery);

