const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

describe('absolute', () => {
    it('should return positive number if the input is positive.', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });

    it('should return positive number if the input is negative.', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it('should return zero if the input is zero.', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('should return the greeting message.', () => {
        const result = lib.greet("Ubaid");
        expect(result).toMatch(/Ubaid/);
        expect(result).toContain("Ubaid");
    });
});

describe('getCurrencies', () => {
    it('should return the supported currencies.', () => {
        const result = lib.getCurrencies();
        /*
        // To genreal
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        // To specific
        expect(result[0]).toBe('USD');
        expect(result[1]).toBe('AUD');
        expect(result[2]).toBe('EUR');
        expect(result.length).toBe(3);

        // Proper way
        expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');
        */
        // Ideal way
        expect(result).toEqual(expect.arrayContaining(['EUR', 'AUD', 'USD']));
    });

});

describe('getProduct', () => {
    it('should return the product with the given id.', () => {
        const result = lib.getProduct(1);
        //expect(result).toEqual({ id: 1, price: 10 });
        expect(result).toMatchObject({ id: 1, price: 10 });
        expect(result).toHaveProperty('id', 1);
    });
});

describe('registerUser', () => {
    it('should throw if username is falsy.', () => {
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(a => {
            expect(() => { lib.registerUser(a) }).toThrow()
        });
    });

    it('should return a valid object if valid username is passed.', () => {
        const result = lib.registerUser("Ubaid");
        expect(result).toMatchObject({ username: "Ubaid" });
        expect(result.id).toBeGreaterThan(0);
    });
});

describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points.', () => {
        // Create a mock function to remove the dependency from db
        console.log("Fake reading customer to apply the discount...");
        db.getCustomerSync = function(customerId) {
            return { id: customerId, points: 20 };
        }
        const order = { customerId: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

describe('notifyCustomer', () => {
    it('should send an email to the customer.', () => {
        // Create a mock function to remove the dependency from db
        console.log("Fake reading customer to send an email...");
        /*db.getCustomerSync = function(customerId) {
            return { email: 'a' };
        }*/
        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });

        /*let mailSent = false;
        mail.send = function(email, message) {
            mailSent = true;
        }*/
        mail.send = jest.fn();

        lib.notifyCustomer({ customerId: 1 });
        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
});