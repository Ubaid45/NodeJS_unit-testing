const lib = require("../exercise");

describe('fizzBuzz', () => {
    it('should throw if input is not a number.', () => {
        const args = [null, undefined, 'a', '', {}, false];
        args.forEach(a => {
            expect(() => { lib.fizzBuzz(a) }).toThrow()
        });
    });

    it('should return Fizzbuzz if input is divisible by 3 and 5.', () => {
        const result = lib.fizzBuzz(15);
        expect(result).toBe("FizzBuzz");

    });

    it('should return Fizz if input is only divisible by 3.', () => {
        const result = lib.fizzBuzz(3);
        expect(result).toBe("Fizz");
    });

    it('should return Buzz if input is only divisible by 5.', () => {
        const result = lib.fizzBuzz(5);
        expect(result).toBe("Buzz");
    });

    it('should return input if it is not divisible by 3 or 5.', () => {
        const result = lib.fizzBuzz(1);
        expect(result).toBe(1);
    });
});