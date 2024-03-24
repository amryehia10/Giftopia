function updateTimera() {

    future = Date.parse("sept 2, 2025 11:30:00");
    now = new Date();
    diff = future - now;

    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    hours = Math.floor(diff / (1000 * 60 * 60));
    mins = Math.floor(diff / (1000 * 60));
    secs = Math.floor(diff / 1000);

    d = days;
    h = hours - days * 24;
    m = mins - hours * 60;
    s = secs - mins * 60;

    document.getElementById("dealend")
        .innerHTML =
        '<div class="dealend-timer"><div class="time-block"><div class="time">' + d + '</div><span class="day">Days</span></div>' +
        '<div class="time-block"><div class="time">' + h + '</div><span class="dots">:</span></div>' +
        '<div class="time-block"><div class="time">' + m + '</div><span class="dots">:</span></div>' +
        '<div class="time-block"><div class="time">' + s + '</div><span class="dots"></span></div></div>';
}

setInterval('updateTimera()', 1000);
