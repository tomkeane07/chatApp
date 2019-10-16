//### SignUp Form Ajax Request ###############################
$("#signUpForm").submit(function(e){
    e.preventDefault();
    let fields = $("#signUpForm").serializeArray();
    let form = "{"
    $.each(fields,function(index,field){
        form = form + '"' + field.name + '"' + ':' + '"' + field.value + '"' + ',';
    });
    form = form.substring(0,form.length-1) + "}";
    $.ajax({
        type: "POST",
        url: "/signUp",
        data: form,
        contentType:"application/json"
      }).done(function(data){
        document.write(data);
      })
});

//### Log In Form Ajax Request ###############################
$("#logInForm").submit(function(e){
    e.preventDefault();
    let fields = $("#logInForm").serializeArray();
    let form = "{"
    $.each(fields,function(index,field){
        form = form + '"' + field.name + '"' + ':' + '"' + field.value + '"' + ',';
    });
    form = form.substring(0,form.length-1) + "}";
    //console.log(form);
    $.ajax({
        type: "POST",
        url: "/logIn",
        data: form,
        contentType:"application/json"
      }).done(function(data){
        $(document).empty();
        document.write(data);
    });
});

