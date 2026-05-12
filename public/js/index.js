
const teacher=JSON.parse(localStorage.getItem('teacher'));
const student=JSON.parse(localStorage.getItem('student'));
if (teacher) {
  document.getElementById('login_button').textContent='ENTER'
  document.getElementById('login_button').href='/public/teacher.html'
}
else if(student){
  
  document.getElementById('login_button').textContent='ENTER'
  document.getElementById('login_button').href='/public/student.html'
  }
  else{
    document.getElementById('login_button').textContent='LOGIN'
    document.getElementById('login_button').href='/public/login.html'
}
