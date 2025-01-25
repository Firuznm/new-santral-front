import PrImg1 from "../assets/Images/image 9 (1).png"
import PrImg2 from "../assets/Images/image 9 (2).png";
import PrImg3 from "../assets/Images/image 9 (3).png";
import categoryImg1 from "../assets/Images/catImg1.png"
import categoryImg2 from "../assets/Images/catImg2.png";
import categoryImg3 from "../assets/Images/catImg3.png";
import categoryImg4 from "../assets/Images/catImg4.png";
import banner1 from "../assets/Images/banner1.jfif"
import banner2 from "../assets/Images/baner2.jpg";
import banner3 from "../assets/Images/banner3.jfif";
import banner4 from "../assets/Images/banner4.jpg";
import banner5 from "../assets/Images/banner5.jfif";
import banner6 from "../assets/Images/banner6.jfif";
import img1 from "../assets/Images/Commax.jpg";
import img2 from "../assets/Images/Panasonic.jpg";
import img3 from "../assets/Images/Saltanat.jpg";
import img21 from "../assets/Images/cartTick.png";
import img31 from "../assets/Images/truckFast.png";
import img41 from "../assets/Images/convertCart.png";


export const OurAdvantagesData=[
    {
        id:1,
        img:"yoxdu",
        title:"Rahatlıqla alın",
        description:"xxx gün ərzində dəyişdirə və qaytara bilərsiniz"
    },
    {
        id:2,
        img:img21,
        title:"Qapıda rəsmiləşdirmə",
        description:"Nağd, hissə-hissə və ya qapıda ödəmə imkanı"
    },
{
    id:3,
    img:img31,
    title:"Mağazadan Pulsuz Çatdırılma",
    description:"30₼ və üstü sifarişlərdə  Bakı şəhəri ərazisinə ödənişsiz çatdırılma"
},
{
    id:4,
    img:img41,
    title:"Bonus kartla daha çox alış veriş",
    description:"Bonus karta yığılmış pullar ilə daha çox alış veriş etmək şansınız olacaq"
}
]

export const mainSliderData = {
    leftData: [
        {
            id: 1,
            image:banner2
    
        },
        {
            id: 2,
            video:"https://www.youtube.com/embed/kU0axitqhxM",
        },
        {
            id: 3,
            image:img1,
        },
    ],
    rightTop: [
            {
                id: 4,
                video:"https://www.youtube.com/embed/1VtQwz3RlMo"
        
            },
            {
                id: 5,
                video:"https://www.youtube.com/embed/kU0axitqhxM",
            },
            {
                id: 6,
                image:img2,
            },
        ], 
    bottomLeft: [
        {
            id: 7,
            image:img3
        },
        {
            id: 8,
            image:img2
        },
    ],
    bottomRight: [
        {
            id: 9,
            image:img1
        },
        {
            id: 10,
            image:img2
        }
    ]
}

export const categoryName = [
    {
        id: 1,
        title: "Mebel",
        img: categoryImg1,
    },
    {
        id: 2,
        title: "Divar kağızları",
        img: categoryImg2,
    },
    {
        id: 3,
        title: "Bağçılıq",
        img: categoryImg3,
    },
    {
        id: 4,
        title: "Mebel",
        img: categoryImg4,
    },
    {
        id: 5,
        title: "Seramika & Santexnik",
        img: categoryImg1,
    },
    {
        id: 6,
        title: "Elektrik malları",
        img: categoryImg2,
    },

    {
        id: 7,
        title: "İnşaat materialları",
        img: categoryImg3,
    },
    {
        id: 8,
        title: "İşıqlandırma",
        img: categoryImg4,
    },
    {
        id: 9,
        title: "İslilik,su,havalandırma",
        img: categoryImg1,
    },
    {
        id: 10,
        title: "İslilik,su,havalandırma ve Elektrik malları",
        img: categoryImg2,
    },
];

export const homeSeasonOffersDatas = [
    {
        id: 1,
        img: categoryImg1,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quam exerci",
        price: 777,
    },
    {
        id: 2,
        img: categoryImg2,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quam exerci",
        price: 457,
    },
    {
        id: 3,
        img: categoryImg3,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quam exerci",
        price: 189,
    },
    {
        id: 4,
        img: categoryImg4,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quam exerci",
        price: 4646,
    },
    {
        id: 5,
        img: categoryImg1,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quam exerci",
        price: 989,
    },
    {
        id: 6,
        img: categoryImg2,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quam exerci",
        price: 9844,
    },
];

export const bannerDatas = {
    topBanner: {
        topLeft: [
            {
                id: 1,
                route: "/",
                img: banner1,
                title: "Mebel",
                description: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus sint enim quod, quae itaque ex, rerum aut non pariatur id totam iste at molestiae nemo excepturi, tempore laudantium optio aperiam?",
            },
            {
                id: 2,
                route: "/",
                img: banner4,
                title: "Bag mebelleri",
                description: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus sint enim quod, quae itaque ex, rerum aut non pariatur id totam iste at molestiae nemo excepturi, tempore laudantium optio aperiam?",
            },
        ],
        rightTop: [
            {
                id: 1,
                route: "/",
                img: banner2,
                title: "Isiqlandirma",
                description: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus sint enim quod, quae itaque ex, rerum aut non pariatur id totam iste at molestiae nemo excepturi, tempore laudantium optio aperiam?",
            },
            {
                id: 2,
                route: "/",
                img: banner5,
                title: "Electrik mallari",
                description: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus sint enim quod, quae itaque ex, rerum aut non pariatur id totam iste at molestiae nemo excepturi, tempore laudantium optio aperiam?",
            },
        ],
        rightBottom: [
            {
                id: 1,
                route: "/",
                img: banner3,
                title: "Seramika & Santexnika",
                description: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus sint enim quod, quae itaque ex, rerum aut",
            },
            {
                id: 2,
                route: "/",
                img: banner6,
                title: "Electrik mallari",
                description: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus sint enim quod, quae itaque ex, rerum aut non pariatur id totam iste at molestiae nemo excepturi, tempore laudantium optio aperiam?",
            },
        ],
    },
    bottomBanner: {
        bottomRight: [
            {
                id: 1,
                route: "/",
                img: banner4,
                title: "insaat mallari",
                description: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus sint enim quod, quae itaque ex, rerum aut non pariatur id totam iste at molestiae nemo excepturi, tempore laudantium optio aperiam?",
            },
            {
                id: 2,
                route: "/",
                img: banner1,
                title: "Havalandirma sistemleri",
                description: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus sint enim quod, quae itaque ex, rerum aut non pariatur id totam iste at molestiae nemo excepturi, tempore laudantium optio aperiam?",
            },
        ],
        leftTop: [
            {
                id: 1,
                route: "/",
                img: banner5,
                title: "Kabel ve aksesuarlari",
                description: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus sint enim quod, quae itaque ex, rerum aut non pariatur id totam iste at molestiae nemo excepturi, tempore laudantium optio aperiam?",
            },
            {
                id: 2,
                route: "/",
                img: banner2,
                title: "Qizdiricilar",
                description: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus sint enim quod, quae itaque ex, rerum aut non pariatur id totam iste at molestiae nemo excepturi, tempore laudantium optio aperiam?",
            },
        ],
        leftBottom: [
            {
                id: 1,
                route: "/",
                img: banner6,
                title: "Tikinti avadabliqlari",
                description: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus sint enim quod, quae itaque ex, rerum aut",
            },
            {
                id: 2,
                route: "/",
                img: banner3,
                title: "Electrik mallari",
                description: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus sint enim quod, quae itaque ex, rerum aut non pariatur id totam iste at molestiae nemo excepturi, tempore laudantium optio aperiam?",
            },
        ],
    },
};

export const prDetailsDataTest=[
    {
        id:1,
        img:"https://cdn.santral.az/images/6fa6284c-ed39-11ec-ab0a-005056b06295.jpeg"
    },
    {
        id:2,
        img:"https://cdn.santral.az/images/d6b8fd79-eda9-11ee-a483-005056b06295.jpeg"
    },
    {
        id:3,
        img:"https://cdn.santral.az/images/3d9d82fa-9e70-11ee-9780-005056b06295.jpeg"
    },
    {
        id:4,
        img:"https://cdn.santral.az/images/3d9d82f8-9e70-11ee-9780-005056b06295.jpeg"
    },
    {
        id:5,
        img:"https://cdn.santral.az/images/dbbf6220-d535-11ee-a483-005056b06295.jpeg"
    },
    {
        id:6,
        img:"https://cdn.santral.az/images/ecfe5b38-e5fa-11e3-a868-000c29bb375f.jpeg"
    },
    {
        id:7,
        img:"https://cdn.santral.az/images/5689741e-f327-11ee-a483-005056b06295.jpeg"
    },
    // {
    //     id:8,
    //     img:"https://cdn.santral.az/images/3d9d82fa-9e70-11ee-9780-005056b06295.jpeg"
    // },
    // {
    //     id:9,
    //     img:"https://cdn.santral.az/images/3d9d82f8-9e70-11ee-9780-005056b06295.jpeg"
    // },
    // {
    //     id:10,
    //     img:"https://cdn.santral.az/images/dbbf6220-d535-11ee-a483-005056b06295.jpeg"
    // },
]
    
