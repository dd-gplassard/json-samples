const fs = require('fs');


const lengths = [25_000, 100_000, 250_000, 700_000,900_000,1_000_000, 1_700_000, 2_500_000];
for (const length of lengths) {
    const values = Array.from(Array(length).keys())
        .map((idx) => 10_000 + (idx % 90_000));

    const formatted = new Intl.NumberFormat('en-US').format(length).replace(/,/g, '-');
    fs.writeFileSync(`${formatted}-json-integers.json`, JSON.stringify({values}, undefined, 2));
    fs.writeFileSync(`${formatted}-compact-json-integers.json`, JSON.stringify({values}, undefined, 0));
    const doubleValues = values.map((value) => value + 0.003);
    fs.writeFileSync(`${formatted}-compact-json-doubles.json`, JSON.stringify({doubleValues}, undefined, 0));

    const hugeValues = values.map((value) => value + 1_708_563_600_000.0);
    fs.writeFileSync(`${formatted}-compact-json-huge.json`, JSON.stringify({hugeValues}, undefined, 0));

    const chunked = [];
    const chunkSize = 2;
    for (let i = 0; i < values.length; i += chunkSize) {
        const chunk = values.slice(i, i + chunkSize);
        chunked.push(chunk);
    }
    fs.writeFileSync(`${formatted}-compact-json-chunked.json`, JSON.stringify({chunked}, undefined, 0));
}


function nestedArray() {
    const array1 = [];
    for (const i of Array(10).keys()) {
        const array2 = [];
        for (const j of Array(10).keys()) {
            const array3 = [];
            for (const k of Array(100).keys()) {
                const array4 = [];
                for (const l of Array(10).keys()) {
                    const array5 = [];
                    for (const l of Array(30).keys()) {
                        array5.push(k);
                    }
                    array4.push(array5);
                }
                array3.push(array4);
            }
            array2.push(array3);
        }
        array1.push(array2);
    }
    return array1;
}

fs.writeFileSync(`nested-compact-json-chunked.json`, JSON.stringify({nested: nestedArray()}, undefined, 0));


function nestedKeys() {
    const root = {};
    let current = root;
    const letters = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz';
    for (const l of letters) {
        current[l] = {
            data: Array.from(Array(3000).keys())
                .map((idx) => 10_000 + (idx % 90_000))
        };
        current = current[l];
    }
    return root;
}

fs.writeFileSync(`nested-keys-compact-json.json`, JSON.stringify({nestedKeys: nestedKeys()}, undefined, 0));
