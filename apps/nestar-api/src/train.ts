/*TASK ZM: Shunday function yozing, va bu function parametr sifatida raqamlarni qabul qilsin. Bu function qabul qilingan raqamlarni orqasiga o'girib qaytarsin MASALAN: reverseInteger(123456789); return 987654321
; Yuqoridagi misolda, function kiritilgan raq
amlarni orqasiga o'girib (reverse) qilib qaytarmoqda.*/




function reverseInteger(num: number): number {
  // 1. Raqamni stringga o‘tkazamiz
  const str = num.toString();

  // 2. Stringni teskari qilib qo‘shamiz
  const reversedStr = str.split("").reverse().join("");

  // 3. Yana son (number) ga o‘tkazamiz
  return parseInt(reversedStr, 10);
}

// Test
console.log(reverseInteger(123456789)); // 987654321
console.log(reverseInteger(1000));      // 1
console.log(reverseInteger(9870));      // 789



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
