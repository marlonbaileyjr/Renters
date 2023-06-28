const signupForm = document.getElementById('signupForm');
const urlParams = new URLSearchParams(window.location.search);
const decodedData = decodeURIComponent(urlParams.get('data'));

// Fill in the form fields with decoded data
const { fname, lname, email, selected } = JSON.parse(decodedData);
console.log(fname, lname);
document.getElementById('firstnm').value = fname;
document.getElementById('lastnm').value = lname;
document.getElementById('email').value = email;

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(signupForm);
  const data = Object.fromEntries(formData.entries());

  const { password, confirm_password, ssn, confirm_ssn } = data;

  // Perform password and SSN confirmation validations
  if (password !== confirm_password) {
    alert('Password and Confirm Password must match');
    return;
  }

  if (ssn !== confirm_ssn) {
    alert('SSN and Confirm SSN must match');
    return;
  }

  // Send API request
  fetch('http://localhost/addUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.ok) {
        alert('User created successfully');
      } else {
        alert('Error creating user');
      }
    })
    .catch(error => {
      console.error(error);
      alert('An error occurred');
    });
});
