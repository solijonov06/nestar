/**TASK ZQ:

Shunday function yozing, u parametridagi array ichida 2 marta qaytarilgan sonlarni alohida araryda qaytarsin.
MASALAN: findDuplicates([1,2,3,4,5,4,3,4]) return [3, 4] */

function findDuplicates(arr: number[]): number[] {
  return arr.filter((item, index) => arr.indexOf(item) !== index)
            .filter((item, index, self) => self.indexOf(item) === index);
}

// Test
console.log(findDuplicates([1, 2, 3, 4, 5, 4, 3, 4])); // [3, 4]
console.log(findDuplicates([10, 20, 30, 20, 40, 10, 50])); // [10, 20]






/**TASK-ZP:

Shunday function yozing, u parametridagi s
tring ichidagi raqam va sonlarni sonini sanasin.
MASALAN: countNumberAndLetters(“string152%\¥”) return {number:3, letter:6} */

// function countNumberAndLetters(input: string): { number: number; letter: number } {
//   // \p{N} = any kind of numeric character, \p{L} = any kind of letter
//   // requires ES2018+ / Unicode property escapes support
//   const numberMatches = input.match(/\p{N}/gu);
//   const letterMatches = input.match(/\p{L}/gu);

//   return {
//     number: numberMatches ? numberMatches.length : 0,
//     letter: letterMatches ? letterMatches.length : 0,
//   };
// }

// // Example
// console.log(countNumberAndLetters("string152%\\¥")); // { number: 3, letter: 6 }




/**TASK-ZO: Shunday function yozing, u parametrdagi string ichidagi
 *  qavslar miqdori balansda ekanligini aniqlasin. Ya'ni ochish("(") va yopish(")") 
 * qavslar soni bir xil bolishi kerak. 
 * MASALAN: areParenthesesBalanced("string()ichida(qavslar)soni()balansda") return true. */

// export function areParenthesesBalanced(s: string): boolean {
//   let depth = 0;
//   for (let i = 0; i < s.length; i++) {
//     if (s[i] === '(') depth++;
//     else if (s[i] === ')') {
//       depth--;
//       if (depth < 0) return false;
//     }
//   }
//   return depth === 0;
// }



/*TASK ZM: Shunday function yozing, va bu function parametr sifatida raqamlarni qabul qilsin. Bu function qabul qilingan raqamlarni orqasiga o'girib qaytarsin MASALAN: reverseInteger(123456789); return 987654321
; Yuqoridagi misolda, function kiritilgan raq
amlarni orqasiga o'girib (reverse) qilib qaytarmoqda.*/

/**TASK ZN:

Shunday function yozing, uni array va number parametri bo'lsin.
Function'ning vazifasi ikkinchi parametr'da berilgan raqam, birinchi
array parametr'ning indeksi bo'yicha hisoblanib, shu indeksgacha bo'lgan
raqamlarni indeksdan tashqarida bo'lgan raqamlar bilan o'rnini
almashtirib qaytarsin.

MASALAN: rotateArray([1, 2, 3, 4, 5, 6], 3); return [5, 6, 1, 2, 3, 4]; */

// function rotateArray<T>(arr: T[], index: number): T[] {
//   if (index < 0 || index >= arr.length) {
//     throw new Error("Index out of range");
//   }

//   // Split the array into two parts
//   const left = arr.slice(0, index + 1);  // up to the given index
//   const right = arr.slice(index + 1);    // after the given index

//   // Swap their positions
//   return [...right, ...left];
// }

// // Example usage:
// console.log(rotateArray([1, 2, 3, 4, 5, 6], 3)); 
// // Output: [5, 6, 1, 2, 3, 4]



// function reverseInteger(num: number): number {
//   // 1. Raqamni stringga o‘tkazamiz
//   const str = num.toString();

//   // 2. Stringni teskari qilib qo‘shamiz
//   const reversedStr = str.split("").reverse().join("");

//   // 3. Yana son (number) ga o‘tkazamiz
//   return parseInt(reversedStr, 10);
// }

// // Test
// console.log(reverseInteger(123456789)); // 987654321
// console.log(reverseInteger(1000));      // 1
// console.log(reverseInteger(9870));      // 789



/**TASK-ZL:

Shunday function yozing, u parametrda berilgan stringni kebab casega otkazib qaytarsin. Bosh harflarni kichik harflarga ham otkazsin.
MASALAN: stringToKebab(“I love Kebab”) return “i-love-kebab” */

// function stringToKebab(str: string): string {
//   return str
//     .trim() // boshidagi va oxiridagi bo‘sh joylarni olib tashlaydi
//     .toLowerCase() // hamma harflarni kichik qiladi
//     .replace(/[^a-z0-9\s]/g, "") // harflar va raqamdan tashqari belgilarni olib tashlaydi
//     .replace(/\s+/g, "-"); // bo‘sh joylarni "-" ga almashtiradi
// }

// // Test
// console.log(stringToKebab("I love Kebab"));       // i-love-kebab
// console.log(stringToKebab("Hello   World!!!"));   // hello-world
// console.log(stringToKebab("  TypeScript Fun "));  // typescript-fun
