const phoneWidth = 500


function menuWidthAdaption() {
    if (document.body.clientWidth < phoneWidth) {
        return 'auto'
    }
    else {
        return '250px'
    }
}

export default menuWidthAdaption