const timer = (id, deadline) => {
    const addZero = (num) => {
        if (num <= 9) {
            return '0' + num;
        } else {
            return num;
        }
    };

    const numWord = (value, words) => {
        value = Math.abs(value) % 100;
        const lastNum = value % 10;
        if (value > 10 & value < 20) return words[2];
        if (lastNum > 1 && lastNum < 5) return words[1];
        if (lastNum === 1) return words[0];
        return words[2];

    };


    const getTimeRemaining = (endtime) => {
        const t = Date.parse(endtime) - Date.parse(new Date()) - 10800000,
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            days = Math.floor((t / (1000 * 60 * 60 * 24)));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector(".seconds"),
            timeInterval = setInterval(updateClock, 500);


        daysText = timer.querySelector('#days__text'),
            hoursText = timer.querySelector('#hours__text'),
            minutesText = timer.querySelector('#minutes__text'),
            secondsText = timer.querySelector('#seconds__text');

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            daysText.textContent = numWord(t.days, ['день', 'дня', 'дней']);
            hoursText.textContent = numWord(t.hours, ['час', 'часа', 'часов']);
            minutesText.textContent = numWord(t.minutes, ['минута', 'минуты', 'минут']);
            secondsText.textContent = numWord(t.seconds, ['секунда', 'секунды', 'секунд']);


            if (t.total <= 0) {
                days.textContent = "00";
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";

                clearInterval(timeInterval);
            }
        }
    };

    setClock(id, deadline);
};

let deadLine = '2022-8-15';

timer('.timer', deadLine);