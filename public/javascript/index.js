// Expand more information
$(".more").click(function () {
    let id = $(this).attr('id');
    let article = document.getElementById(id);
    article.classList.toggle("expand");
    $(this).text(function (i, text) {
        return text === "Expand" ? "Collapse" : "Expand";
    })
})


