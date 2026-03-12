import simg from '../images/service/1.jpg'
import simg2 from '../images/service/2.jpg'
import simg3 from '../images/service/3.jpg'
import simg4 from '../images/service/4.jpg'
import simg5 from '../images/service/5.jpg'
import simg6 from '../images/service/6.jpg'
import simg7 from '../images/service/1.jpg'
import simg8 from '../images/service/7.jpg'
import simg9 from '../images/service/8.jpg'
import simg10 from '../images/service/9.jpg'
import simg11 from '../images/service/5.jpg'
import simg12 from '../images/service/10.jpg'
import simg13 from '../images/service/10.jpg'

// import sIcon1 from '../images/service/vakumtungau1.png'
import sIcon1 from '../images/service/vakumtungau1.mp4'
import sIcon2 from '../images/service/vakumtungau2.mp4'
import sIcon3 from '../images/service/vakumtungau3.mp4'
import sIcon4 from '../images/service/vakumtungau4.mp4'
import sIcon5 from '../images/service/vakumtungau5.mp4'
import sIcon6 from '../images/service/vakumtungau6.mp4'
import sIcon7 from '../images/service/vakumtungau7.mp4'
import sIcon8 from '../images/service/vakumtungau8.png'
import sIcon9 from '../images/service/vakumtungau9.png'
import sIcon10 from '../images/service/vakumtungau10.mp4'
// import sIcon10 from '../images/icon/5.svg'
import sIcon11 from '../images/service/vakumtungau11.png'
import sIcon12 from '../images/service/vakumtungau12.png'
import sIcon13 from '../images/service/vakumtungau13.mp4'


import sSingleimg1 from '../images/service-single/2.jpg'
import sSingleimg2 from '../images/service-single/3.jpg'


const phoneNumber = "6281280165611"; // nomor WA tanpa 0 di depan
const baseWA = "https://wa.me/" + phoneNumber + "?text=";

const encodeMessage = (title) => encodeURIComponent(`Halo admin, saya ingin pesan ${title}`);

const Services = [
    {
        Id: '1',
        sImg:simg,
        sIcon:sIcon1,
        sTitle: 'Vakum & Cuci Kasur',
        sHarga: 'Pesan Sekarang ➔',
        // description:'Menghilangkan tungau, debu, dan alergen dari kasur, bantal, dan sofa.',
        description: `• Vakum : Rp 150.000 - Rp 300.000<br/>
            • Cuci : Rp 240.000 - Rp 400.000`,
        ssImg1:sSingleimg1,
        ssImg2:sSingleimg2,
        link: baseWA + encodeMessage('Vakum / Cuci Kasur'),
    },
    {
        Id: '2',
        sImg:simg2,
        sIcon:sIcon2,
        sTitle: 'Vakum & Cuci Sofa',
        sHarga: 'Pesan Sekarang ➔',
        // description: 'Pembersihan mendalam mengangkat debu, noda, dan cuci gorden on-site.',
        description: `• Vakum : Rp 10.000 - Rp 25.000<br/>
                    • Cuci : Rp 25.000 - Rp 85.000`,
        ssImg1:sSingleimg1,
        ssImg2:sSingleimg2,
        link: baseWA + encodeMessage('Vakum / Cuci Sofa'),
    },
    {
        Id: '3',
        sImg:simg3,
        sIcon:sIcon3,
        sTitle: 'Vakum & Cuci Jok / Mobil',
        sHarga: 'Pesan Sekarang ➔',
        // description:'Perawatan menyeluruh untuk jok mobil berbahan kain maupun kulit.',
        description: `• Vakum : Rp 50.000 - Rp 100.000<br/>
            • Cuci : Mulai Rp 75.000`,
        ssImg1:sSingleimg1,
        ssImg2:sSingleimg2,
        link: baseWA + encodeMessage('Vakum / Cuci Jok Mobil'),
    },
        {
        Id: '4',
        sImg:simg4,
        sIcon:sIcon4,
        sTitle: 'Vakum & Cuci Karpet / Gorden',
        sHarga: 'Pesan Sekarang ➔',
        description: `• Karpet : Rp 25.000 - Rp 100.000<br/>
            • Gorden : Rp 15.000 - Rp 23.000`,
        ssImg1:sSingleimg1,
        ssImg2:sSingleimg2,
        link: baseWA + encodeMessage('Vakum & Cuci Karpet / Gorden'),
    },
        {
        Id: '5',
        sImg:simg5,
        sIcon:sIcon5,
        sTitle: 'Fogging Disinfektan',
        sHarga: 'Pesan Sekarang ➔',
        // description:'Fogging khusus untuk membasmi nyamuk penyebab demam berdarah.',
        description: `• Per Ruangan : Rp 350.000<br/>
            • Mobil : Mulai Rp 200.000`,
        ssImg1:sSingleimg1,
        ssImg2:sSingleimg2,
        link: baseWA + encodeMessage('Fogging Disinfektan'),
    },
    // {
    //     Id: '4',
    //     sImg:simg4,
    //     sIcon:sIcon4,
    //     sTitle: 'Deep Cleaning Rumah',
    //     sHarga: 'mulai 71K ➔',
    //     description:'Pembersihan total seluruh bagian rumah, cocok setelah renovasi.',
    //     ssImg1:sSingleimg1,
    //     ssImg2:sSingleimg2,
    //     link: baseWA + encodeMessage('Deep Cleaning Rumah'),
    // },
    // {
    //     Id: '5',
    //     sImg:simg5,
    //     sIcon:sIcon5,
    //     sTitle: 'Fogging Disinfektan',
    //     sHarga: 'mulai 71K ➔',
    //     description:'Sterilisasi ruangan dari bakteri dan virus menggunakan cairan disinfektan.',
    //     ssImg1:sSingleimg1,
    //     ssImg2:sSingleimg2,
    //     link: baseWA + encodeMessage('Fogging Disinfektan'),
    // },

    {
        Id: '6',
        sImg:simg6,
        sIcon:sIcon6,
        sTitle: 'Layanan Poles Marmer',
        sHarga: 'Pesan Sekarang ➔',
        description: `Mulai : Rp 90.000 - Rp 120.000/m`,
        ssImg1:sSingleimg1,
        ssImg2:sSingleimg2,
        link: baseWA + encodeMessage('Layanan Poles Marmer'),
    },
    {
        Id: '7',
        sImg: simg7,
        sIcon: sIcon7,
        sTitle: 'Poles Lampu Crystal',
        sHarga: 'Pesan Sekarang ➔',
        description: `Mulai : Rp 500.000 - Rp 3.000.000`,
        ssImg1: sSingleimg1,
        ssImg2: sSingleimg2,
        link: baseWA + encodeMessage('Poles Lampu Crystal'),
    },
    {
        Id: '10',
        sImg: simg10,
        sIcon: sIcon10,
        sTitle: 'Deep Cleaning Kamar Mandi',
        sHarga: 'Pesan Sekarang ➔',
        description: `Mulai : Rp 350.000`,
        ssImg1: sSingleimg1,
        ssImg2: sSingleimg2,
        link: baseWA + encodeMessage('Deep Cleaning'),
    },
        {
        Id: '13',
        sImg: simg13,
        sIcon: sIcon13,
        sTitle: 'Deep Cleaning After Renovasi',
        sHarga: 'Pesan Sekarang ➔',
        // description: `Mulai : Rp 500.000 - Rp 3.000.000`,
        ssImg1: sSingleimg1,
        ssImg2: sSingleimg2,
        link: baseWA + encodeMessage('Deep Cleaning'),
    },
    {
        Id: '11',
        sImg: simg11,
        sIcon: sIcon11,
        sTitle: 'Before & After',
        // sHarga: 'Pesan Sekarang ➔',
        // description: `Mulai : Rp 500.000 - Rp 3.000.000`,
        ssImg1: sSingleimg1,
        ssImg2: sSingleimg2,
        link: baseWA + encodeMessage('Deep Cleaning'),
    },
    {
        Id: '12',
        sImg: simg12,
        sIcon: sIcon12,
        sTitle: 'Before & After',
        // sHarga: 'Pesan Sekarang ➔',
        // description: `Mulai : Rp 500.000 - Rp 3.000.000`,
        ssImg1: sSingleimg1,
        ssImg2: sSingleimg2,
        link: baseWA + encodeMessage('Deep Cleaning'),
    },
    {
        Id: '8',
        sImg: simg8,
        sIcon: sIcon8,
        sTitle: 'Furniture / Mabel',
        sHarga: 'Pesan Sekarang ➔',
        description: `Mulai : Rp 1.800.000 - Rp 3.900.000`,
        ssImg1: sSingleimg1,
        ssImg2: sSingleimg2,
        link: baseWA + encodeMessage('Furniture / Mabel'),
    },
    {
        Id: '9',
        sImg: simg9,
        sIcon: sIcon9,
        sTitle: 'Roboclean P.O',
        sHarga: 'Pesan Sekarang ➔',
        description: `Rp 38.000.000`,
        ssImg1: sSingleimg1,
        ssImg2: sSingleimg2,
        link: baseWA + encodeMessage('P.O Roboclean'),
    },
]

export default Services;
