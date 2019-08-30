let questions = $('i.icon.fa').closest('div.formulation');
let all;

questions.each(function (i, v) {
    let line = i + ": ";
    let vals = [];

    let qtext = $(v).find('div.qtext');

    if (qtext.length) {
        line += qtext.text();

        let answerBlock = $(v).find('div.ablock div.answer');
        let answers = $(answerBlock).find('> div');

        answers.each(function (i2, v2) {
            let input = $(v2).find('input');
            let label = $(v2).find('label');
            let itype = input.prop('type');
            let valCheck = $(v2).find('i.icon.fa');
            let prefix = "";

            if (valCheck.length) {
                if (valCheck[0].classList.contains('text-success')) {
                    prefix = "(Correct) ";
                } else {
                    prefix = "(Incorrect) ";
                }
            } else {
                prefix = "(Correct) ";
            }

            if (itype === 'checkbox') {
                let checked = input.is(':checked');
                if (checked) {
                    vals.push(prefix + "Checked: " + label.text());
                } else {
                    vals.push(prefix + "Unchecked: " + label.text());
                }

            } else if (itype === 'radio') {
                if (!input.is(':checked')) {
                    return;
                }
                vals.push(prefix + "Checked: " + label.text());
            }
        });


    } else {
        let text = $(v).find('p').contents();
        let num = 1;

        text.each(function (i2, v2) {
            if (v2.nodeType === 3 || v2.classList.contains('nolink')) {
                if (v2.nodeValue !== null) {
                    line += v2.nodeValue;
                }

                $(v2).find('span.mi').each(function (i3, v3) {
                    line += v3.innerText;
                });

            } else {
                let val = $(v2).find('input').val();

                line += "(" + num + ") ";

                let valLen = val.length !== 0 ? val.length : 5;
                line += '_'.repeat(valLen);

                let valCheck = $(v2).find('i.icon.fa');

                if (valCheck[0].classList.contains('text-success')) {
                    vals.push("(" + num + ": Correct) " + val);
                } else {
                    vals.push("(" + num + ": Incorrect) " + val);
                }

                num++;
            }
        });

    }

    console.log(line);

    all += line + "\n";

    vals.forEach(function(v2) {
        console.log("\t" + v2);

        all += "\t" + v2 + "\n";
    });

    all += "\n";
});

console.log(all);
