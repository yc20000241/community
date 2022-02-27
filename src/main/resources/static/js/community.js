function post() {
    var questionId = $("#question_id").val();
    var content = $("#comment_content").val();
    comment2target(questionId, 1, content);
}

function comment2target(targetId, type, content) {
    debugger;
    if(!content){
        alert("不能回复空内容");
        return;
    }
    $.ajax({
        data:JSON.stringify({
            "parentId": targetId,
            "content": content,
            "type": type
        }),
        contentType: "application/json ",
        url: "/comment",
        success: function(response){
            if (response.code == 200){
                window.location.reload();
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
}


function comment(e) {
    debugger;
    var commentId = e.getAttribute("data-id");
    var content = $("#input-"+commentId).val();
    comment2target(commentId, 2, content);
}

function collapseComments(e) {
    var id = e.getAttribute("data-id");
    var comments = $("#comment-"+id);
    // debugger;
    var collapse = e.getAttribute("data-collapse");
    if(collapse){
        comments.removeClass("in");
        e.removeAttribute("data-collapse");
        e.classList.remove("active")
    }else{
        var subCommentContainer = $("#comment-"+id);
        // debugger
        if(subCommentContainer.children().length != 1 ){
            comments.addClass("in");
            e.setAttribute("data-collapse", "in");
            e.classList.add("active");
        }else{
            $.getJSON("/comment/"+id, function (data) {
                $.each(data.data.reverse(), function (index, comment) {
                    var mediaLeftElement = $("<div/>",{
                        "class":"media-left"
                    }).append($("<img/>",{
                        "class":"media-object img-rounded",
                        "src": comment.user.avatarUrl
                    }));

                    var mediaBodyElememt = $("<div/>",{
                        "class": "media-body"
                    }).append($("<h5/>",{
                        "class": "media-heading",
                        html:comment.user.name
                    })).append($("<div/>",{
                        html: comment.content
                    })).append($("<div/>",{
                        "class": "menu"
                    })).append($("<div/>",{
                        "class": "pull-right",
                        html: moment(comment.gmtCreate).format('YYYY-MM-DD')
                    })) ;


                    var mediaElement = $("<div/>",{
                        "class": "media"
                    });
                    var commentElement = $("<div/>", {
                        class: "col-lg-12 col-md-12 col-sm-12 col-xs-12 comments",
                    }).append(mediaElement);

                    mediaElement.append(mediaLeftElement);
                    mediaElement.append(mediaBodyElememt);
                    subCommentContainer.prepend(commentElement);
                })
            });
            comments.addClass("in");
            e.setAttribute("data-collapse", "in");
            e.classList.add("active");
        }




        }
}