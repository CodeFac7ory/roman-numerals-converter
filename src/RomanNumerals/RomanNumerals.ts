export default class RomanNumerals {

  static toRoman(number: number) {

    const romanNumMap: Map<string, number> = new Map<string, number>([
      ['M', 1000],
      ['CM', 900],
      ['D', 500],
      ['CD', 400],
      ['C', 100],
      ['XC', 90],
      ['L', 50],
      ['XL', 40],
      ['X', 10],
      ['IX', 9],
      ['V', 5],
      ['IV', 4],
      ['I', 1],
    ]);

    let roman = '';

    romanNumMap.forEach((value, key) => {
      const a = Math.floor(number / value);
      if (a >= 0) {
        for (let i = 0; i < a; i++) {
          roman += key;
        }
      }
      number = number % value;
    })
    return roman;
  }

  static fromRoman(input: string): string {
    const romanNumList = [
      'M',
      'CM',
      'D',
      'CD',
      'C',
      'XC',
      'L',
      'XL',
      'X',
      'IX',
      'V',
      'IV',
      'I'];
    const values = [
      1000,
      900,
      500,
      400,
      100,
      90,
      50,
      40,
      10,
      9,
      5,
      4,
      1
    ];

    let i = 0, result = 0;
    while (input.length > 0 && i < romanNumList.length) {
      const symbol = romanNumList[i];
      if (input.startsWith(symbol)) {
        result += values[i];

        input = input.substring(romanNumList[i].length);
      } else {
        i++;
      }
    }

    return result.toString();
  }
}
