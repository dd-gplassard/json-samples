const fs = require('fs');

const lengths = [25_000, 100_000, 250_000, 1_000_000, 2_500_000];
for (const length of lengths) {
    const values = Array
        .from({length}, () => 1_000 + Math.floor(Math.random() * 8_998));

    const formatted = new Intl.NumberFormat('en-US').format(length).replace(/,/g, '-');
    fs.writeFileSync(`${formatted}-json-integers.json`, JSON.stringify({values}, undefined, 2));
}
