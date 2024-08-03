

function compress(arg) {
    return arg === "-C" | arg === "--compress"

}
function dataXlsx(arg) {
    return arg === "-Df" | arg === "--data-file"

}
function DirImg(arg) {
    return arg === "-Id" | arg === "--img-dir"

}


module.exports = { compress, dataXlsx, DirImg }