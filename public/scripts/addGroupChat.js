function initAddGroupChat(socket, account) {

    // 查询当前账户的好友(用于创建群聊，所以不查询群聊)
    $("#createGroupChatModel").on("show.bs.modal", function() {
        $('.leftFriendList').html('');
        $.ajax({
            url: "/queryFriends",
            data: {
                account: account
            },
            type: "POST",
            dataType: "JSON",
            success: function(friends) {
                createLeftFriends(friends);
            }
        });
    });

    $('#confirmBtn').on('click', function() {
        var friends = [];
        $(".leftFriendList input[type='checkbox']:checked")
            .parent()
            .prevAll("input[name=account]").each(function() {
               friends.push($(this).val());
        });
        friends.push(account);
        if(friends.length > 2) {
            $.ajax({
                url: "/createGroupChat",
                data: {
                    account: account,
                    friends: friends
                },
                dataType: "text",
                type: "POST",
                success: function() {
                    $("#createGroupChatModel").modal('hide');
                    toastr.success('创建群聊成功，快去聊天吧！', '提示');
                    $('#listBox').html('');
                    loadFriendList(account);
                }
            });
        } else {
            toastr.warning ('至少选中2人才能发起群聊！', '提示');
        }
    });

    socket.on('newGroupChat', function() {
        toastr.success('您已被拉入群聊，快去聊天吧！', '提示');
        $('#listBox').html('');
        loadFriendList(account);
    });
}

function createLeftFriends(friends) {
    var $leftFriendList = $('.leftFriendList');
    friends.forEach(function(friend, index) {
        var id = "checkbox" + index;
        var nickName = friend.friend_remark == '' ? friend.username : friend.friend_remark;
        $leftFriendList.append('<div class="leftFriend">' +
                               '<img class="img-circle leftFriendImg" src='+friend.avator+'>' +
                               '<span class="leftFriendUsername">'+nickName+'</span>' +
                               '<input name="account" type="hidden" value='+friend.account+'>' +
                               '<div class="checkbox checkbox-success checkbox-circle">' +
                               '<input type="checkbox" id='+id+' >' +
                               '<label for='+id+'></label>' +
                               '</div>' +
                               '</div>' +
                               '<hr>');
    });
}

// 美化复选框样式
function changeState(el) {
    if (el.readOnly) el.checked=el.readOnly=false;
    else if (!el.checked) el.readOnly=el.indeterminate=true;
}