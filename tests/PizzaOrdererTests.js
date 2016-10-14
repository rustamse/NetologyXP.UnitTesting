import assert from 'assert'
import PizzaOrderer from '../src/pizzaOrderer'

suite('PizzaOrdererTests', function () {

    // Лучший вариант именования был бы OrderingAvailable.UsingWebsite - т.к. скорее всего несколько доступных типов заказа и будет уметсен еще и OrderingAvailable.UsingPhone (и будет 2-3 подтеста)
    test('OrderPizza_UsingWebsite_OrderingAvailable', function () {
        var pizza = new PizzaOrderer();
        var orderingAvailable = pizza.orderingAvailable("site");
        assert.equal(true, orderingAvailable);
    });

    test('OrderPizza_UsingPhone_OrderingAvailable', function () {
        var pizza = new PizzaOrderer();
        var orderingAvailable = pizza.orderingAvailable("phone");
        assert.equal(true, orderingAvailable);
    });

    test('OrderPizza_UsingMobileApp_OrderingNOTAvailable', function () {
        var pizza = new PizzaOrderer();
        var orderingAvailable = pizza.orderingAvailable("mobileApp");
        assert.equal(false, orderingAvailable);
    });

    // Лучший вариант именования был бы PizzaShould.OrderIncludesGiftSweetPizza_WhenClientBirthday - т.к. так короче и лаконичнее
    test('OrderPizza_WhenClientBirthday_OrderIncludesGiftSweetPizza', function () {
        var pizza = new PizzaOrderer();
        var orderResult = pizza.orderPizza("meatPizza", true);
        assert.equal("SweetPizza", orderResult.orderItems[1]);
    });

    test('OrderPizza_WhenOrderPizza_OrderIncludesThisPizza', function () {
        var pizza = new PizzaOrderer();
        var orderResult = pizza.orderPizza("meatPizza", true);
        assert.equal("meatPizza", orderResult.orderItems[0]);
    });

    test('OrderPizza_PayOrderUsingBonusPoints_OrderingAvailable', function () {
        var pizza = new PizzaOrderer();
        var orderingAvailable = pizza.orderingAvailableCurrency("bonusPoints");
        assert.equal(true, orderingAvailable);
    });

    test('OrderPizza_PayOrderUsingRoubles_OrderingAvailable', function () {
        var pizza = new PizzaOrderer();
        var orderingAvailable = pizza.orderingAvailableCurrency("roubles");
        assert.equal(true, orderingAvailable);
    });

    test('OrderPizza_PayOrderUsingDollars_OrderingNOTAvailable', function () {
        var pizza = new PizzaOrderer();
        var orderingAvailable = pizza.orderingAvailableCurrency("dollars");
        assert.equal(false, orderingAvailable);
    });
});