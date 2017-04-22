function openAddFriend(socket, account) {

    toastr.options = {
        "timeOut": "3000",
        "positionClass": "toast-top-center"
    }
    queryUnhandleRequest(socket);
    $('.userInfo').hide();
    $('.userInfo .btn-success').hide();
    $('.userInfo .btn-danger').hide();
    hideUserEmpty();
    $('#friend_add').on({
        click: function() {
            $('#addFriendModel').modal();
        }
    });

    // 查找好友
    $('#findUserBtn').on({
        click: function() {
            var account = $('#queryInfo input').val();
            $.ajax({
                url:'/findUser',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    account: account
                },
                success: function(user) {
                    if(user) {
                        hideUserEmpty();
                        showUser(user);
                        if(user.type == 0) {
                            $('.userInfo .btn-success').hide();
                            $('.userInfo .btn-danger').show();
                        } else if(user.type == 1) {
                            $('.userInfo .btn-success').show();
                            $('.userInfo .btn-danger').hide();
                        }
                    } else {
                        showUserEmpty();
                        $('.userInfo').hide();
                    }
                }
            })
        }
    });
/**********************************************添加好友*****************************************************/

    // 添加好友
    $('.userInfo .btn-success').on('click', function() {
        socket.emit('addUser', {addAccount: $('.userInfo tr:first td:last').text()});
    });

    socket.on('err_addUser', function(info) {
        toastr.info(info, '提示');
    });

    socket.on('success_addUser', function(info) {
        toastr.success(info, '提示');
    });

    socket.on('addUser',function(data) {
        showUnhandleRequest(data, socket);
    });

    socket.on('acceptAddUser_add', function(account_friend) {
        // 提示添加好友成功
        toastr.success('您已成功添加账户为'+account_friend+'的用户', '提示');
        // 刷新好友列表
        $('#listBox').html('');
        loadFriendList(account);

        // 刷新未处理请求
        if($('.checkInfo table tbody tr').length) {
            $('.checkInfo table tbody').html('');
        }
        queryUnhandleRequest(socket);
    });

    socket.on('acceptAddUser_beAdd', function(argeeAccount) {
        // 提示对方同意添加你为好友
        toastr.success('账户为'+argeeAccount+'的用户同意添加您为好友', '提示');
        // 刷新好友列表
        $('#listBox').html('');
        loadFriendList(account);
    });

}

function showUser(user) {
    $('.userInfo img').attr('src', user.avator);
    $('.userInfo tr:first td:last').text(user.account);
    $('.userInfo tr:nth-child(2) td:last').text(user.username);
    $('.userInfo').show();
}

function showUserEmpty() {
    $('.userEmpty').show();
}

function hideUserEmpty() {
    $('.userEmpty').hide();
}

// 查询未处理的添加好友请求
function queryUnhandleRequest(socket) {
    $.ajax({
        url: '/queryUnhandleRequest',
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            showUnhandleRequest(data, socket);
        }
    });
}

function showUnhandleRequest(data, socket) {
    // 小红点
    if(data.length) {
        if($('.menu span[class="redPoint"]').length) {
            $('.menu span[class="redPoint"]').remove();
            $('.menu').append('<span class="redPoint" >'+ data.length +'</span>');
        } else {
            $('.menu').append('<span class="redPoint" >'+ data.length +'</span>');
        }
    } else {
        $('.menu span[class="redPoint"]').remove();
    }

    // 验证消息
    var $tbody = $('.checkInfo table tbody');
    data.forEach(function(item) {
        $tbody.append("<tr><td>"+"<img class='img-circle' src="+item.avator+">"+"</td>" +
            "<td>"+item.account+"</td>" +
            "<td>"+item.username+"</td>" +
            "<td><a href='#' class='btn btn-success' role='button'>同意</a></td>" +
            "<td><a href='#' class='btn btn-danger' role='button'>拒绝</a></td></tr>");
    });

    // 接受请求
    $('#checkInfo .btn-success').on('click', function() {
        socket.emit('acceptAddUser', {account: $(this).parent().prevAll('td:nth-child(2)').text()});
    });

    // 拒绝请求
    $('#checkInfo .btn-danger').on('click', function() {

    });

}




