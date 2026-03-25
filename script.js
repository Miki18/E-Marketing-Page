// Basic interactions and tracking hooks
(function(){
  // Track CTA click
  var cta = document.getElementById('cta-main');
  if(cta){
    cta.addEventListener('click', function(e){
      console.log('[track] cta-main clicked');
      dataLayer.push({ event: 'cta_click' });
    });
  }

  // Ensure nav-pricing exists (tracking)
  var navPricing = document.getElementById('nav-pricing');
  if(navPricing){
    navPricing.addEventListener('click', function(){
      console.log('[track] nav-pricing clicked');
    });
  }

  // Signup form handling with role awareness
  var form = document.getElementById('signup-form');
  var message = document.getElementById('signup-message');
  var roleSelect = document.getElementById('role-select');
  var messageLabel = document.getElementById('message-label');

  // Show message textarea for tutors and managers
  if(roleSelect && messageLabel){
    var toggleMessage = function(){
      var r = roleSelect.value;
      if(r === 'tutor' || r === 'manager'){
        messageLabel.style.display = 'block';
      } else {
        messageLabel.style.display = 'none';
      }
    };
    roleSelect.addEventListener('change', toggleMessage);
    toggleMessage();
  }

  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var fd = new FormData(form);
      var name = fd.get('name');
      var email = fd.get('email');
      var role = fd.get('role');
      var msg = fd.get('message');
      console.log('[signup] submitted', {name: name, email: email, role: role, message: msg});

      if(!name || !email){
        message.textContent = 'Proszę uzupełnić wszystkie obowiązkowe pola.';
        message.style.color = 'crimson';
        return;
      }

      // For student/employee/parent — consider this an account signup
      if(role === 'student' || role === 'employee' || role === 'parent'){
        message.textContent = 'Dziękujemy! Twoje konto zostało zgłoszone. Sprawdź skrzynkę email.';
        message.style.color = 'green';
      } else {
        // For tutor or manager — treat as collaboration request
        message.textContent = 'Dziękujemy! Twoje zgłoszenie współpracy zostało wysłane. Skontaktujemy się wkrótce.';
        message.style.color = 'green';
      }

      form.reset();
      // Persist small record for demo/testing
      try{localStorage.setItem('lastSignup', JSON.stringify({name:name,email:email,role:role,message:msg,date:new Date().toISOString()}))}catch(e){}
    });
  }
})();
