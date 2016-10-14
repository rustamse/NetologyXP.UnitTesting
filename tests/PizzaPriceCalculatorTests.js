import assert from 'assert'
import PizzaPriceCalculator from '../src/PizzaPriceCalculator'

suite('PizzaPriceCalculatorTests', function () {

    // Лучший вариант именования был бы WhenСalcPriceForPizzф.IfEnterPromoABCD_PriceDiscountIs100Roubles - т.к. алгоритм расчета цены - очень сложный и понадобится много тестов.
    test('CalcPriceForPizza_WhenEnterPromoABCD_PriceDiscountIs100Roubles', function () {
        var orderPriceCalculator = new PizzaPriceCalculator();
        var order = orderPriceCalculator.calcPriceForPizza(200, "ABCD");
        assert.equal(200 - 100, order.price);
    });

    test('CalcPriceForPizza_WhenEnterIncorrectPromo_PriceDiscountIsZero', function () {
        var orderPriceCalculator = new PizzaPriceCalculator();
        var order = orderPriceCalculator.calcPriceForPizza(200, "AAA");
        assert.equal(200 - 0, order.price);
    });

    // Лучший вариант именования был бы OrderPriceCalculatorShould.PriceDiscountIs20Percents_WhenOrdering2PizzaFrom10to16 - т.к. так короче и лаконичнее
    test('CalcPriceForPizzas_WhenOrdering2PizzaFrom10to16_PriceDiscountIs20Percents', function () {
        var orderPriceCalculator = new PizzaPriceCalculator();
        var price = orderPriceCalculator.calcPriceForPizzas([
            {name: "meatPizza", price: 100},
            {name: "meatPizza", price: 200}
        ], 15);
        assert.equal((100 + 200) * 0.8, price);
    });

    test('CalcPriceForPizzas_WhenOrdering2PizzaAfter16_PriceDiscountIsZero', function () {
        var orderPriceCalculator = new PizzaPriceCalculator();
        var price = orderPriceCalculator.calcPriceForPizzas([
            {name: "meatPizza", price: 100},
            {name: "meatPizza", price: 200}
        ], 18);
        assert.equal((100 + 200), price);
    });

    // Лучший вариант именования был бы OrderPriceCalculatorShould.ClientGet5PercentsBonusPoints_WhenOrderingPizza - т.к. так короче и лаконичнее
    test('CalcPriceForPizza_WhenOrderingPizza_ClientGet5PercentsBonusPoints', function () {
        var orderPriceCalculator = new PizzaPriceCalculator();
        var order = orderPriceCalculator.calcPriceForPizza(500, "");
        assert.equal(500 * 0.05, order.bonusPoints);
    });
});