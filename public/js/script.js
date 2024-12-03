// (() => {
//     'use strict'
  
//     // Fetch all the forms we want to apply custom Bootstrap validation styles to
//     const forms = document.querySelectorAll('.needs-validation')
  
//     // Loop over them and prevent submission
//     Array.from(forms).forEach(form => {
//       form.addEventListener('submit', event => {
//         if (!form.checkValidity()) {
//           event.preventDefault()
//           event.stopPropagation()
//         }
  
//         form.classList.add('was-validated')
//       }, false)
//     });
//   })();


//   document.querySelector('form').addEventListener('submit', function (e) {
//     e.preventDefault(); // Prevent the form from submitting to test validation

//     const inputs = document.querySelectorAll('.form-control');

//     inputs.forEach((input) => {
//         // Remove existing validation classes
//         input.classList.remove('is-valid', 'is-invalid');

//         // Check if the input is valid
//         if (input.checkValidity()) {
//             input.classList.add('is-valid'); // Add valid class
//         } else {
//             input.classList.add('is-invalid'); // Add invalid class
//         }
//     });

//     // Check if the form as a whole is valid
//     if (this.checkValidity()) {
//         alert('Form is valid! Submitting...');
//         this.submit(); // Submit the form if valid
//     } else {
//         alert('Form has errors. Please correct them.');
//     }
// });