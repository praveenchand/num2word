if (!String.prototype.num2word) {
    String.prototype.num2word = function num2word() {
        "use strict";
        var numSystem = ["hunderd", "thousand", "lakh", "crore", "arab", "kharab", "neel", "padam", "shankh"],
            dataDefinition = {
                0: "",
                1: "one",
                2: "two",
                3: "three",
                4: "four",
                5: "five",
                6: "six",
                7: "seven",
                8: "eight",
                9: "nine",
                10: "ten",
                11: "eleven",
                12: "twelve",
                13: "thirteen",
                14: "fourteen",
                15: "fifteen",
                16: "sixteen",
                17: "seventeen",
                18: "eighteen",
                19: "ninteen",
                20: "twenty",
                30: "thirty",
                40: "fourty",
                50: "fixty",
                60: "sixty",
                70: "seventy",
                80: "eighty",
                90: "ninty"
            },
            number = this.toString(),
            length = number.length,
            pointer = 0,
            word = "",
            position = 3,
            numArray = number.split(""),
            group = [];
        numArray = numArray.reverse();

        if (isNaN(number)) {
            return console.error("use numbers");
        }


        //group array for holding the decimal placess, initializing it to empty strings
        for (var i = 0; i < length / 2 + 1; i++) {
            group[i] = "";
        }


        /* converting a number to tuplets 
        one,ten - tuplet
        hundered - tuplet
        thounsand - tuplet */

        for (var i = 0, j = 0; i < length; i++) {
            if (i < 2) {
                group[j] = numArray[i] + group[j];
                if (i == 0)
                    continue;
            } else if (i == 2) {
                group[j] = "0" + numArray[i];
            } else {
                group[j] = numArray[i] + group[j];
            }
            if (i % 2 == 0 || i == 1) {
                j++;
            }
        }

        //removing the empty spaces from the group array
        group = group.filter(function(e) {
            return e != ""
        })

        // iterating through the group array and converting that position tuplet to word

        var length = group.length;
        for (var i = 0; i < length; i++) {
            if (i > 0 && group[i] != "00") {
                word = numSystem[i - 1] + " " + word;
            }
            two2word(group[i]);
        }

        //converting a tuplet to a word
        function two2word(num) {
            var a, b;
            a = num[0]
            if (num.length == 2)
                b = num[1];
            else {
                word = dataDefinition[a] + " " + word;
                return;
            }
            if (b != 0 && a != 1) {
                word = dataDefinition[a * 10] + " " + dataDefinition[b] + " " + word;
            } else if (a == 1) {
                word = dataDefinition[a + b] + " " + word;
            }
        }
        console.log(word);
        return word;
    }
}

'100000'.num2word();
'10000000000'.num2word();