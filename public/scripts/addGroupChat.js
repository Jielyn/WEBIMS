function initAddGroupChat(account) {
    queryFriends(account);
}

// 查询当前账户的好友(用于创建群聊，所以不查询群聊)
function queryFriends(account) {
    $.ajax({
        url: "/queryFriends",
        data: {
            account: account
        },
        type: "POST",
        dataType: "JSON",
        success: function(data) {
            console.log(data);
        }
    })
}

// 美化复选框样式
function changeState(el) {
    if (el.readOnly) el.checked=el.readOnly=false;
    else if (!el.checked) el.readOnly=el.indeterminate=true;
}