class Notification{

    show(msg, type='success') {
        Toast.fire({
            icon: type,
            title: msg
        })
    }
}