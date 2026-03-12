// images
import blogImg1 from "../images/blog/jaskum-kartanegara-vid.mp4";
import blogImg2 from "../images/blog/jaskum-zora-vid.mp4";
import blogImg3 from "../images/blog/jaskum-baim-vid.mp4";
import blogImg4 from "../images/blog/jaskum-juliana-vid.mp4";
import blogImg5 from "../images/blog/jaskum-renny-vid.mp4";

import blogThumbnail1 from "../images/blog/thumbnail-kartanegara.png";
import blogThumbnail2 from "../images/blog/thumbnail-zora.png";
import blogThumbnail3 from "../images/blog/thumbnail-baim.png";
import blogThumbnail4 from "../images/blog/thumbnail-juliana.png";
import blogThumbnail5 from "../images/blog/thumbnail-renny.png";

import blogAvaterImg1 from "../images/blog/blog-avater/img-1.jpg";
import blogAvaterImg2 from "../images/blog/blog-avater/img-2.jpg";
import blogAvaterImg3 from "../images/blog/blog-avater/img-3.jpg";

import blogSingleImg1 from "../images/blog/img-4.jpg";
import blogSingleImg2 from "../images/blog/img-5.jpg";
import blogSingleImg3 from "../images/blog/img-6.jpg";
import blogSingleImg4 from "../images/blog/img-8.jpg";



const blogs = [
    {
        id: '1',
        title: 'Rumah Kartanegara',
        screens: blogImg1,
        thumbnail: blogThumbnail1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem beatae errodio.',
        author: 'Jaskum',
        authorTitle:'Cleaner Leader',
        authorImg:blogAvaterImg1,
        create_at: '14 AUG,22',
        blogSingleImg:blogSingleImg1, 
        comment:'5,975',
        blClass:'format-standard-image',
    },
    {
        id: '2',
        title: 'Zora Vidyanata',
        screens: blogImg2,
        thumbnail: blogThumbnail2,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem beatae errodio.',
        author: 'Konal Biry',
        authorTitle:'Cleaner Leader',
        authorImg:blogAvaterImg2,
        create_at: '16 AUG,22',
        blogSingleImg:blogSingleImg2, 
        comment:'7,275',
        blClass:'format-standard-image',
    },
    {
        id: '3',
        title: 'Baim Wong',
        screens: blogImg3,
        thumbnail: blogThumbnail3,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem beatae errodio.',
        author: 'Jaskum',
        authorTitle:'Cleaner Leader',
        authorImg:blogAvaterImg3,
        create_at: '18 AUG,22',
        blogSingleImg:blogSingleImg3,
        comment:'6,725',
        blClass:'format-standard-image',
    },
    {
        id: '4',
        title: 'Juliana Moechtar',
        screens: blogImg4,
        thumbnail: blogThumbnail4,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem beatae errodio.',
        author: 'Jaskum',
        authorTitle:'Cleaner Leader',
        authorImg:blogAvaterImg3,
        create_at: '18 AUG,22',
        blogSingleImg:blogSingleImg4,
        comment:'6,725',
        blClass:'format-video',
    },
    {
        id: '5',
        title: 'Renny Sutiyoso',
        screens: blogImg5,
        thumbnail: blogThumbnail5,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem beatae errodio.',
        author: 'Jaskum',
        authorTitle:'Cleaner Leader',
        authorImg:blogAvaterImg3,
        create_at: '18 AUG,22',
        blogSingleImg:blogSingleImg4,
        comment:'6,725',
        blClass:'format-video',
    },
];
export default blogs;