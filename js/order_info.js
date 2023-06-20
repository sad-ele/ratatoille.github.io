let city, adress, del_date, del_time, rat_class, rat_color, kitchen, wishes;
let id = 0;

function check() {
    id = id + 1;
    event.preventDefault();
    city = document.querySelector('[name="city"]').value;
    adress = document.querySelector('[name="adress"]').value;
    del_date = document.querySelector('[name="delivery_date"]').value;
    del_time = document.querySelector('[name="delivery_time"]').value;
    rat_class = document.querySelector('[name="rat_class"]').value;
    rat_color = document.querySelector('[name="rat_color"]').value;
    kitchen = Array.from(document.querySelectorAll('[name="kitchen"]')).filter(v => v.checked).map(v => v.value);
    wishes = document.querySelector('[name="wishes"]').value;

    const order = {id, city, adress, del_date, del_time, rat_class, rat_color, kitchen, wishes};
    localStorage.setItem('order', JSON.stringify(order));
    window.location.href = '/order_confirm.html';
}

// alert(city);

// const model = [{type: "id", value: "no"},
//                {type: "order_info", value: [rat_class, rat_color]},
//                {type: "adress_info", value: [city, adress]},
//                {type: "delivery_info", value: [del_date, del_time]},
//                {type: "wishes", value: wishes},
//                {type: "price", value: "no"}]


function load_order() {
    const order = JSON.parse(localStorage.getItem('order'));
    // console.log(order);
    // alert(JSON.stringify(order));
    const orderEl = document.querySelector('.order_column');
    const html = `
        <div><h2>№ Заказа</h2><p>${order.id}</p></div>
        <div><h2>Состав заказа</h2><p>${order.rat_class}, ${order.rat_color} крыса. ${order.kitchen} кухня</p></div>
        <div><h2>Адрес доставки</h2><p>${order.city}, ${order.adress}</p></div>
        <div><h2>Дата и время доставки</h2><p>${order.del_date}, ${order.del_time}</p></div>
        <div><h2>Пожелания клиента</h2><p>${order.wishes}</p></div>
        <div><h2>Стоимость</h2><p>${price_count(order)} монет</p></div>
    `;
    orderEl.innerHTML = html;
}


function price_count(order) {
    let price = 0;
    if (order.rat_color === "белая") {
        price = price + 50;
    } else if (order.rat_color === "серая") {
        price = price + 30;
    } else if (order.rat_color === "цветная") {
        price = price + 70;
    } else { price = price + 50; }

    if (order.rat_class === "Редкая") {
        price = price + 30;
    } else if (order.rat_class === "Мифическая") {
        price = price + 50;
    } else if (order.rat_class === "Легендарная") {
        price = price + 70;
    } else { price = price + 0; }

    if (order.city === "Санкт-Петербург") {
        price = price + 50;
    } else { price = price + 30; }

    return price;
}
