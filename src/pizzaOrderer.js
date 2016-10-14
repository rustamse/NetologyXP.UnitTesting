"use strict";

export default class PizzaOrderer {
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