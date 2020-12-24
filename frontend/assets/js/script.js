$(document).ready(()=>{
    $('#login').on('click', (e)=>{
        e.preventDefault();
        const phone = $('#phone').val();
        localStorage.setItem('phone', phone);

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/user/login',
            data: {
                phone:phone
            },
            success: ((response)=>{
                window.location.replace("verify.html");
            })
        });
    });


    $('#verify').on('click', (e)=>{
        e.preventDefault();
        const phone = localStorage.getItem('phone');
        const code = $('#code').val();

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/user/verify-token',
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