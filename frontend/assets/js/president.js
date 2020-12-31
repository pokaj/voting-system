$(document).ready(()=> {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });


    $.ajax({
        type: 'POST',
        url: 'https://voters-application.herokuapp.com/api/user/presidents',
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
        success: ((response) => {
            let results = '';
            response.forEach(item => {
                results += `<div class='card hover' style='margin-left: 10px; float: left; width: 15rem;'>
                        <img class="card-img-top" src="assets/images/user.png">
                <div class="card-body">
                    <h5 class="card-title">${item.firstname} ${item.lastname}</h5>
                    <button id='id${item._id}' class="btn btn-primary hide_button" onclick="cast_vote(this.id)">Vote</button>
                </div>
        </div>`
            });
            $('#presidents').html(results);
        }),
    });

    $.ajax({
        type: 'POST',
        url: 'https://voters-application.herokuapp.com/api/user/vice-presidents',
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
        success: ((response) => {
            let results = '';
            response.forEach(item => {
                results += `<div class='card hover' style='margin-left: 10px; float: left; width: 15rem;'>
                        <img class="card-img-top" src="assets/images/user.png">
                <div class="card-body">
                    <h5 class="card-title">${item.firstname} ${item.lastname}</h5>
                    <button id='id${item._id}' class="btn btn-primary hide_button" onclick="cast_vote(this.id)">Vote</button>
                </div>
        </div>`
            });
            $('#vice').html(results);
        }),
    });


    $.ajax({
        type: 'POST',
        url: 'https://voters-application.herokuapp.com/api/user/parliamentary',
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
        success: ((response) => {
            let results = '';
            response.forEach(item => {
                results += `<div class='card hover' style='margin-left: 10px; float: left; width: 15rem;'>
                        <img class="card-img-top" src="assets/images/user.png">
                <div class="card-body">
                    <h5 class="card-title">${item.firstname} ${item.lastname}</h5>
                    <button id='id${item._id}' class="btn btn-primary hide_button" onclick="cast_vote(this.id)">Vote</button>
                </div>
        </div>`
            });
            $('#parliamentary').html(results);
        }),
    });
});



let cast_vote = (id) =>{
    const token = JSON.parse(localStorage.getItem('token'));
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    $.ajax({
        type: 'POST',
        url: 'https://voters-application.herokuapp.com/api/user/vote',
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
        data:{
            userId: JSON.parse(jsonPayload).userId,
            candidateId:  id.split('id')[1]
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
    })
}
