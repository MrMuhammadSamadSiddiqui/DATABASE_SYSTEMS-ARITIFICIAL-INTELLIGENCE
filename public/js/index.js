
const teacher=JSON.parse(localStorage.getItem('teacher'));
if (teacher) {
    document.getElementById('login_button').textContent='ENTER'
    document.getElementById('login_button').href='/public/teacher.html'
  }
  else{
    document.getElementById('login_button').textContent='LOGIN'
    document.getElementById('login_button').href='/public/login.html'
}
