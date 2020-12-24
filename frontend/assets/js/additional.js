$(document).ready(()=> {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });


    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/api/user/categories',
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
        success: ((response)=>{
            localStorage.setItem('categories', JSON.stringify(response));
        })
    });


    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/api/user/standings',
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
        success: ((response)=>{
            localStorage.setItem('candidates', JSON.stringify((response)));
        })
    });

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });


    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/api/user/categories',
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
        success: ((response) => {
            let results = '';
            response.results.forEach(item => {
                results += `<option value="${item._id}">${item.name}</option>`
            });
            $('#category').html(results);
        }),
    });


    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/api/user/standings',
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
        success: ((response) => {
            let results = '';
            response.results.forEach(item => {
                results += `<div class='card' style='margin-left: 10px; margin-top: 10px; float: left; width: 15rem; '>
                        <img class="card-img-top" src="assets/images/user.png">
                <div class="card-body">
                    <h5 class="card-title">${item.firstname} ${item.lastname}</h5>
                    <h5>Votes: ${item.votes.length}</h5>
                </div>
        </div>`
            });
            $('#stats').html(results);
        }),
    });


    $('#admin_login').on('click', (e)=> {
        e.preventDefault();
        let phone = $('#admin_phone').val();
        let password = $('#password').val();

        $.ajax({
           type: 'post',
           url: 'http://localhost:3000/api/admin/login',
           data: {
               phone: phone,
               password: password,
           },
           success: ((response)=>{
               if(response.status === true){
                   localStorage.setItem('token', JSON.stringify(response.token));
                   window.location.replace("admin-dashboard.html");
               }else {
                   Swal.fire(
                       "Sorry",
                       `${response.message}`,
                       "error"
                   );
               }
           })
       });
    });


    $('#add_user').on('click', ()=> {
       let firstname = $('#firstname').val();
       let lastname = $('#lastname').val();
       let phone = $('#phone').val();

       $.ajax({
           type: 'post',
           url: 'http://localhost:3000/api/admin/add-user',
           headers: {
               "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
           },
           data: {
               firstname: firstname,
               lastname: lastname,
               phone: phone
           },
           success: ((response)=>{
               if(response.status === true){
                   Swal.fire(
                       "Great",
                       `${response.message}`,
                       "success"
                   );
               }else {
                   Swal.fire(
                       "Sorry",
                       `${response.message}`,
                       "error"
                   );
               }
           })
       });
    });


    $('#add_candidate').on('click', ()=> {
       let firstname = $('#cand_fname').val();
       let lastname = $('#cand_lname').val();
       let phone = $('#cand_phone').val();
       let category = $('#category').val();

       $.ajax({
           type: 'post',
           url: 'http://localhost:3000/api/admin/add-candidate',
           headers: {
               "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
           },
           data: {
               firstname: firstname,
               lastname: lastname,
               phone: phone,
               category: category
           },
           success: ((response)=>{
               if(response.status === true){
                   Swal.fire(
                       "Great",
                       `${response.message}`,
                       "success"
                   );
               }else {
                   Swal.fire(
                       "Sorry",
                       `${response.message}`,
                       "error"
                   );
               }
           })
       });
    });


    $('#add_category').on('click', ()=>{
        let name = $('#name').val();

        $.ajax({
            type: 'post',
            url: 'http://localhost:3000/api/admin/add-category',
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
            data: {
                name: name,
            },
            success: ((response)=> {
                if(response.status === true){
                    Swal.fire(
                        "Great",
                        `${response.message}`,
                        "success"
                    );
                }else {
                    Swal.fire(
                        "Sorry",
                        `${response.message}`,
                        "error"
                    );
                }
            })
        });
    });


    $('.logout').on('click', ()=>{
        window.location.replace("index.html");
       localStorage.removeItem('token');
    });
});

