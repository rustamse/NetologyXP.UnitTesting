import assert from 'assert'

class Pizza {
    orderingAvailable(orderType) {
        if (orderType === "phone")
            return true;
        if (orderType === "site")
            return true;

        return false;
    }

    orderingAvailableCurrency(currency) {
        if (currency === "bonusPoints")
            return true;
        if (currency === "roubles")
            return true;

        return false;
    }

    orderPizza(pizzaName, isBirthday) {
        if (isBirthday) {
            return {orderItems: [pizzaName, "SweetPizza"]};
        }

        return {orderItems: [pizzaName]};
    }
}

class OrderPriceCalculator {
    calcPriceForPizza(initialPrice, promocode) {
        if (promocode === "ABCD")
            return {price: initialPrice - 100, bonusPoints: (initialPrice - 100) * 0.05};
        return {price: initialPrice, bonusPoints: initialPrice * 0.05};
    }

    calcPriceForPizzas(initialPrices, orderHour) {
        var sumPrice = initialPrices.reduce((sum, i) => sum + i.price, 0);
        if (initialPrices.length === 2 && orderHour >= 10 && orderHour <= 16)
            sumPrice = sumPrice * 0.8;
        return sumPrice;
    }
}

suite('PizzaTests', function () {

    // Лучший вариант именования был бы OrderingAvailable.UsingWebsite - т.к. скорее всего несколько доступных типов заказа и будет уметсен еще и OrderingAvailable.UsingPhone (и будет 2-3 подтеста)
    test('OrderPizza_UsingWebsite_OrderingAvailable', function () {
        var pizza = new Pizza();
        var orderingAvailable = pizza.orderingAvailable("site");
        assert.equal(true, orderingAvailable);
    });

    test('OrderPizza_UsingPhone_OrderingAvailable', function () {
        var pizza = new Pizza();
        var orderingAvailable = pizza.orderingAvailable("phone");
        assert.equal(true, orderingAvailable);
    });

    test('OrderPizza_UsingMobileApp_OrderingNOTAvailable', function () {
        var pizza = new Pizza();
        var orderingAvailable = pizza.orderingAvailable("mobileApp");
        assert.equal(false, orderingAvailable);
    });

    // Лучший вариант именования был бы PizzaShould.OrderIncludesGiftSweetPizza_WhenClientBirthday - т.к. так короче и лаконичнее
    test('OrderPizza_WhenClientBirthday_OrderIncludesGiftSweetPizza', function () {
        var pizza = new Pizza();
        var orderResult = pizza.orderPizza("meatPizza", true);
        assert.equal("SweetPizza", orderResult.orderItems[1]);
    });

    test('OrderPizza_WhenOrderPizza_OrderIncludesThisPizza', function () {
        var pizza = new Pizza();
        var orderResult = pizza.orderPizza("meatPizza", true);
        assert.equal("meatPizza", orderResult.orderItems[0]);
    });

    // Лучший вариант именования был бы WhenСalcPriceForPizzф.IfEnterPromoABCD_PriceDiscountIs100Roubles - т.к. алгоритм расчета цены - очень сложный и понадобится много тестов.
    test('CalcPriceForPizza_WhenEnterPromoABCD_PriceDiscountIs100Roubles', function () {
        var orderPriceCalculator = new OrderPriceCalculator();
        var order = orderPriceCalculator.calcPriceForPizza(200, "ABCD");
        assert.equal(200 - 100, order.price);
    });

    test('CalcPriceForPizza_WhenEnterIncorrectPromo_PriceDiscountIsZero', function () {
        var orderPriceCalculator = new OrderPriceCalculator();
        var order = orderPriceCalculator.calcPriceForPizza(200, "AAA");
        assert.equal(200 - 0, order.price);
    });

    // Лучший вариант именования был бы OrderPriceCalculatorShould.PriceDiscountIs20Percents_WhenOrdering2PizzaFrom10to16 - т.к. так короче и лаконичнее
    test('CalcPriceForPizzas_WhenOrdering2PizzaFrom10to16_PriceDiscountIs20Percents', function () {
        var orderPriceCalculator = new OrderPriceCalculator();
        var price = orderPriceCalculator.calcPriceForPizzas([
            {name: "meatPizza", price: 100},
            {name: "meatPizza", price: 200}
        ], 15);
        assert.equal((100 + 200) * 0.8, price);
    });

    test('CalcPriceForPizzas_WhenOrdering2PizzaAfter16_PriceDiscountIsZero', function () {
        var orderPriceCalculator = new OrderPriceCalculator();
        var price = orderPriceCalculator.calcPriceForPizzas([
            {name: "meatPizza", price: 100},
            {name: "meatPizza", price: 200}
        ], 18);
        assert.equal((100 + 200), price);
    });

    // Лучший вариант именования был бы OrderPriceCalculatorShould.ClientGet5PercentsBonusPoints_WhenOrderingPizza - т.к. так короче и лаконичнее
    test('CalcPriceForPizza_WhenOrderingPizza_ClientGet5PercentsBonusPoints', function () {
        var orderPriceCalculator = new OrderPriceCalculator();
        var order = orderPriceCalculator.calcPriceForPizza(500, "");
        assert.equal(500 * 0.05, order.bonusPoints);
    });

    test('OrderPizza_PayOrderUsingBonusPoints_OrderingAvailable', function () {
        var pizza = new Pizza();
        var orderingAvailable = pizza.orderingAvailableCurrency("bonusPoints");
        assert.equal(true, orderingAvailable);
    });

    test('OrderPizza_PayOrderUsingBonusPoints_OrderingAvailable', function () {
        var pizza = new Pizza();
        var orderingAvailable = pizza.orderingAvailableCurrency("roubles");
        assert.equal(true, orderingAvailable);
    });

    test('OrderPizza_PayOrderUsingBonusPoints_OrderingAvailable', function () {
        var pizza = new Pizza();
        var orderingAvailable = pizza.orderingAvailableCurrency("dollars");
        assert.equal(false, orderingAvailable);
    });
});