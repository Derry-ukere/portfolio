/*!
 * Item: Kitzu
 * Description: Personal Portfolio Template
 * Author/Developer: Exill
 * Author/Developer URL: https://themeforest.net/user/exill
 * Version: v1.1.0
 * License: Themeforest Standard Licenses: https://themeforest.net/licenses
 */

/*----------- CUSTOM JS SCRIPTS -----------*/

(function($) {
  'use strict';
  $(function() {
    // Code here executes When the DOM is loaded...
    
  $(window).on('load', function() {
    
    // Code here executes When the page is loaded
    $('#contact-form').on('submit', (e)=>{
      e.preventDefault()
      var form =$('#contact-form')
      var message =$('#contact-submit')
  
        $.ajax({
          url: "/send",
          type: 'POST',
          data: form.serialize(),
        })
      form[0].reset();
      message.addClass('success').html('Thank you for your message. It has been sent').fadeIn(200)


        $.post("/send", data)
          console.log('server received data')
      });
  
  });
  });
}(jQuery));