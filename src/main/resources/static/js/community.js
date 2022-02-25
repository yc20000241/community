function post() {
    var questionId = $("#question_id").val();
    var content = $("#comment_content").val();
    $.ajax({
        data:JSON.stringify({
            "parentId": questionId,
            "content": content,
            "type": 1
        }),
        contentType: "application/json ",
        url: "/comment",
        success: function(response){
            if (response.code == 200){
                $("#comment_section").hide();
            }else{
                if(response.code == 2003){
                    var isAccepted = confirm(response.message);
                    if(isAccepted){
                        window.open("https://gitee.com/oauth/authorize?client_id=5b417dbbc69834432bfce9bf77f88b6de554c52f28f5d4599efbb02a25ff1e24&redirect_uri=http://127.0.0.1:8080/callback&response_type=code");
                        window.localStorage.setItem("closable", true);
                    }
                }else
                    alert(response.code);
            }
        },
        type:"POST",
        datatype:"json"
    })
    console.log(questionId);
    console.log(content);
}