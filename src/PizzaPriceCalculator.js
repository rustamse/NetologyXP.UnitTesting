"use strict";

export default class PizzaPriceCalculator {
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