const checkUser=()=>{
    const user=document.getElementById('userName')
    const userValue =user.value;

    const password=document.getElementById('password')
    const passwordValue=password.value;

    // console.log(userValue, passwordValue)

    if(userValue === 'admin' && passwordValue == 'admin123'){
        alert('success login')
        window.location.href = './home.html';
    }
    else{
        // console.log('invalid user')
        alert('invalid user')
    }
   
}