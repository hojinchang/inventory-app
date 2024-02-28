const userArgs = process.argv.slice(2);

const Brand = require("./models/brand");
const Cologne = require("./models/cologne");
const CologneInstance = require("./models/cologneInstance");
const ScentNote = require("./models/scentNotes");

const brands = [];
const colognes = [];
// const cologneinstances = [];
const scentNotes = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createScentNotes();
    await createBrand();
    await createCologne();
    await createCologneinstance();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function scentNoteCreate(idx, name) {
    const scentNote = new ScentNote({ name: name});
    await scentNote.save();
    scentNotes[idx] = scentNote;
    console.log(`Added scent note: ${name}`);
}

async function createScentNotes() {
    console.log("Adding scent notes");
    await Promise.all([
        scentNoteCreate(0, "Citrus"),
        scentNoteCreate(1, "Woody"),
        scentNoteCreate(2, "Floral"),
        scentNoteCreate(3, "Spicy"),
        scentNoteCreate(4, "Aquatic"),
        scentNoteCreate(5, "Fresh"),
        scentNoteCreate(6, "Oriental"),
        scentNoteCreate(7, "Fruity"),
        scentNoteCreate(8, "Herbal"),
        scentNoteCreate(9, "Musk"),
        scentNoteCreate(10, "Amber"),
        scentNoteCreate(11, "Leather"),
        scentNoteCreate(12, "Gourmand"),
        scentNoteCreate(13, "Iris"),
        scentNoteCreate(14, "Tobacco"),
        scentNoteCreate(15, "Vanilla"),
        scentNoteCreate(16, "Cocoa"),
        scentNoteCreate(17, "Cardamom"),
        scentNoteCreate(18, "Bergamot"),
        scentNoteCreate(19, "Tonka Bean"),
    ]);
}

async function brandCreate(idx, name, countryOfOrigin, yearEstablished) {
    const brandDetails = { 
        name: name, 
        countryOfOrigin: countryOfOrigin, 
        yearEstablished: yearEstablished 
    };

    const brand = new Brand(brandDetails);
    await brand.save();
    brands[idx] = brand;
    console.log(`Added brand: ${name}`);
}

async function createBrand() {
    console.log("Adding brands");
    await Promise.all([
        brandCreate(0, "Chanel", "France", "1909"),
        brandCreate(1, "Dior", "France", "1946"),
        brandCreate(2, "Tom Ford", "United States", "2005"),
        brandCreate(3, "Versace", "Italy", "1978"),
        brandCreate(4, "Yves Saint Laurent", "France", "1961"),
        brandCreate(5, "Giorgio Armani", "Italy", "1975"),
    ]);
}

async function cologneCreate(idx, name, brand, scentNotes, description) {
    const cologneDetails = {
        name: name,
        brand: brand,
        scentNotes: scentNotes,
        description: description
    };

    const cologne = new Cologne(cologneDetails);
    await cologne.save();
    colognes[idx] = cologne;
    console.log(`Added cologne: ${name}`);
}

async function createCologne() {
    console.log("Adding colognes");
    await Promise.all([
        cologneCreate(0,
            "Bleu de Chanel",
            brands[0],
            [scentNotes[0], scentNotes[1], scentNotes[10]],
            "A modern and versatile fragrance with a fresh and invigorating blend of citrus and woods, suitable for any occasion."
        ),
        cologneCreate(1,
            "Allure Homme Sport",
            brands[0],
            [scentNotes[0], scentNotes[3], scentNotes[1]],
            "A dynamic and energetic fragrance that combines citrus freshness with spicy and woody notes, ideal for the active and sporty man."
        ),
        cologneCreate(2,
            "Sauvage",
            brands[1],
            [scentNotes[5], scentNotes[3], scentNotes[10]],
            "A bold and magnetic fragrance with a fresh burst of citrus and spicy nuances, evoking a sense of wild and untamed allure."
        ),
        cologneCreate(3,
            "Dior Homme Intense",
            brands[1],
            [scentNotes[13], scentNotes[10], scentNotes[2]],
            "An elegant and sensual fragrance with a dominant iris note, offering a warm and alluring experience for the sophisticated man."
        ),
        cologneCreate(4,
            "Tobacco Vanille",
            brands[2],
            [scentNotes[14], scentNotes[15], scentNotes[16]],
            "A warm and indulgent fragrance that combines the rich sweetness of vanilla with the smoky and aromatic notes of tobacco, creating a luxurious and comforting scent."
        ),
        cologneCreate(5,
            "Eros",
            brands[3],
            [scentNotes[4], scentNotes[7], scentNotes[15]],
            "A sensual and seductive fragrance with a refreshing burst of mint, combined with sweet and creamy vanilla, making it a powerful and charismatic scent."
        ),
        cologneCreate(6,
            "La Nuit de L'Homme",
            brands[4],
            [scentNotes[17], scentNotes[18]],
            "An enigmatic and seductive fragrance with a blend of spicy cardamom, citrusy bergamot, and earthy vetiver, creating a captivating and mysterious aura."
        ),
        cologneCreate(7,
            "Y Eau de Parfum",
            brands[4],
            [scentNotes[5], scentNotes[18], scentNotes[1]],
            "A bold and woody fragrance that combines aromatic sage with fresh bergamot and warm cedarwood, representing the modern and confident man."
        ),
        cologneCreate(8,
            "Acqua di Gio",
            brands[5],
            [scentNotes[4], scentNotes[0], scentNotes[1]],
            "A fresh and aquatic fragrance inspired by the sea, featuring marine notes, citrus, and a subtle woody base, capturing the essence of a Mediterranean breeze."
        ),
        cologneCreate(9,
            "Armani Code",
            brands[5],
            [scentNotes[19], scentNotes[11], scentNotes[18]],
            "A sensual and sophisticated fragrance with a blend of tonka bean, leather, and bergamot, creating a warm and inviting aura suitable for evening wear."
        ),

    ]);
}

// Function to generate a random string of specified length
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

async function cologneinstanceCreate(cologne, batchNumber, price, size) {
    const cologneinstanceDetails = {
        cologne: cologne,
        batchNumber: batchNumber,
        price: price,
        size: size
    }

    const cologneinstance = new CologneInstance(cologneinstanceDetails);
    await cologneinstance.save();
    console.log(`Added cologne instance: ${batchNumber}`);
}

async function createCologneinstance() {
    console.log("Adding cologne instnaces");
    await Promise.all([
        cologneinstanceCreate(colognes[0], generateRandomString(6), 120, "100ml"),
        cologneinstanceCreate(colognes[0], generateRandomString(6), 85, "50ml"),
        cologneinstanceCreate(colognes[1], generateRandomString(6), 150, "75ml"),
        cologneinstanceCreate(colognes[2], generateRandomString(6), 110, "50ml"),
        cologneinstanceCreate(colognes[2], generateRandomString(6), 180, "100ml"),
        cologneinstanceCreate(colognes[3], generateRandomString(6), 95, "50ml"),
        cologneinstanceCreate(colognes[4], generateRandomString(6), 130, "75ml"),
        cologneinstanceCreate(colognes[5], generateRandomString(6), 200, "100ml"),
        cologneinstanceCreate(colognes[5], generateRandomString(6), 175, "75ml"),
        cologneinstanceCreate(colognes[6], generateRandomString(6), 85, "50ml"),
        cologneinstanceCreate(colognes[7], generateRandomString(6), 120, "75ml"),
        cologneinstanceCreate(colognes[8], generateRandomString(6), 150, "100ml"),
        cologneinstanceCreate(colognes[9], generateRandomString(6), 110, "50ml"),
        cologneinstanceCreate(colognes[9], generateRandomString(6), 180, "75ml"),
    ]);
}