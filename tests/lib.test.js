const lib = require("../lib");

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