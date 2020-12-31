$(document).ready(()=>{
    $('#login').on('click', (e)=>{
        e.preventDefault();
        const phone = $('#phone').val();
        if(phone.length !== 10) {
            return Swal.fire(
                "Sorry",
                `You entered a wrong number. Kindly confirm. Number Entered: ${phone}`,
                "error"
            );
        }
        localStorage.setItem('phone', phone);
 
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            type: 'POST',
            url: 'https://voters-application.herokuapp.com/api/user/login',
            data: {
                phone:phone
            },
            success: ((response)=>{
                if(response.status === true){
                    window.location.replace("verify.html");
                }else {
                    return Swal.fire(
                        "Sorry",
                        `${response.message}`,
                        "error"
                    );
                }
            })
        });
    });


    $('#verify').on('click', (e)=>{
        e.preventDefault();
        const phone = localStorage.getItem('phone');
        const code = $('#code').val();
        if(code === ''){
            return Swal.fire(
                "Sorry",
                "Please enter your code",
                "error"
            );
        }

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            type: 'POST',
            url: 'https://voters-application.herokuapp.com/api/user/verify-token',
            data: {
                phone:phone,
                code:code
            },
            success: ((response)=>{
                if(response.status === true){
                    localStorage.setItem('token', JSON.stringify(response.token));
                    localStorage.setItem('user', JSON.stringify(response.user));
                    window.location.replace("dashboard.html");
                }else{
                    Swal.fire(
                        "Sorry",
                        response.message,
                        "error"
                    );
                }
            })
        });
    });


});