const fs = require('fs');

const lengths = [25_000, 100_000, 250_000, 1_000_000, 1_700_000, 2_500_000];
for (const length of lengths) {
    const values = Array.from(Array(length).keys())
        .map((idx) => 10_000 + (idx % 90_000));


    const formatted = new Intl.NumberFormat('en-US').format(length).replace(/,/g, '-');
    fs.writeFileSync(`${formatted}-json-integers.json`, JSON.stringify({values}, undefined, 2));
    fs.writeFileSync(`${formatted}-compact-json-integers.json`, JSON.stringify({values}, undefined, 0));
}
