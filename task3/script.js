$(document).ready(function () {

```
let opacity = 1;

$("#fire").click(function () {

    opacity -= 0.1;

    // if opacity is very small, force it to zero
    if (opacity <= 0.05) {
        opacity = 0;
    }

   $("#fire").fadeTo(300, opacity);

    // when fully extinguished
    if (opacity === 0) {
        $("#msg").text("Fire extinguished! ✅");
        $(this).fadeOut(500);
    }

});
```

});
