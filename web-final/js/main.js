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

  // Fixed Navbar
  $(window).scroll(function () {
      if ($(window).width() < 992) {
          if ($(this).scrollTop() > 45) {
              $('.fixed-top').addClass('bg-white shadow');
          } else {
              $('.fixed-top').removeClass('bg-white shadow');
          }
      } else {
          if ($(this).scrollTop() > 45) {
              $('.fixed-top').addClass('bg-white shadow').css('top', -45);
          } else {
              $('.fixed-top').removeClass('bg-white shadow').css('top', 0);
          }
      }
  });
  
  
  // Back to top button
  $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
          $('.back-to-top').fadeIn('slow');
      } else {
          $('.back-to-top').fadeOut('slow');
      }
  });
  $('.back-to-top').click(function () {
      $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
      return false;
  });


  // Review
  $(".testimonial-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      margin: 25,
      loop: true,
      center: true,
      dots: false,
      nav: true,
      navText : [
          '<i class="bi bi-chevron-left"></i>',
          '<i class="bi bi-chevron-right"></i>'
      ],
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

  
})(jQuery);

function submitReview() {
    // Get values from the form
    var reviewerName = document.getElementById("reviewerName").value;
    var reviewerProfession = document.getElementById("reviewerProfession").value;
    var reviewText = document.getElementById("reviewText").value;

    // Create a new review item
    var newTestimonial = document.createElement("div");
    newTestimonial.className = "testimonial-item position-relative bg-white p-5 mt-4";
    newTestimonial.innerHTML = `
        <i class="fa fa-quote-left fa-3x text-primary position-absolute top-0 start-0 mt-n4 ms-5"></i>
        <p class="mb-4">${reviewText}</p>
        <div class="d-flex align-items-center">
            <img class="flex-shrink-0 rounded-circle" src="https://f2.toyhou.se/file/f2-toyhou-se/images/34089533_GLNI7cdYOd33n7B.png" style="max-width: 90px" alt="${reviewerName}">
            <div class="ms-3">
                <h5 class="mb-1">${reviewerName}</h5>
                <span>${reviewerProfession}</span>
            </div>
        </div>
    `;

    var testimonialCarousel = document.querySelector(".testimonial-carousel");
    testimonialCarousel.appendChild(newTestimonial);
    document.getElementById("reviewForm").reset();
}