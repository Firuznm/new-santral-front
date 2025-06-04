import HelmetAsync from "../../components/HelmetAsync/HelmetAsync";
import style from "./About.module.scss"
import video from "../../assets/Images/Santral Elektrik - Mərkəzi filialı.mp4"

const shortInfo = [
	{
		id: 1,
		title: '111 +',
		description: 'Text 1 Biz yaranmışıq!',
	},
	{
		id: 2,
		title: '444 ',
		description: 'Text 2  quruculuq işlərinə  ',
	},
	{
		id: 3,
		title: 'Test 3',
		description:
			'Text 3  Biz iqtisadi inkişafa, quruculuq işlərinə kömək etmək üçün yaranmışıq!',
	},
	{
		id: 4,
		title: 'Yes',
		description: 'Text 4  quruculuq işlərinə kömək etmək ',
	},
	{
		id: 5,
		title: '2000',
		description: 'Text 5  iqtisadi inkişafa ',
	},
	{
		id: 6,
		title: 'Test 6',
		description:
			'Text 6  Biz iqtisadi inkişafa, quruculuq işlərinə kömək etmək üçün yaranmışıq!',
	},
];

export default function About() {
	return (
		<>
			<HelmetAsync title={'Haqqımızda'} />
			<div className={style.aboutPage}>
				<div className="container">
					<video
						className={style.aboutVideo}
						src={video}
						autoPlay
						muted
						loop
						playsInline
					></video>
					<h3 className={style.title}>Haqqımızda</h3>
					<p className={style.about}>
						2000-ci ildə yaradılan “Santral Elektrik” QSC şirkəti Azərbaycanda
						son illərdə gedən uğurlu iqtisadi inkişaf və siyasətdən
						bəhrələnərək müştərilərə müasir tələblərə cavab verən məhsul və
						xidmətlər təklif etməyə başlamışdır. Fəaliyyətinə kiçik satış
						nöqtəsi ilə başlayan Santral Elektrik şirkətinin hazırda Bakı
						şəhərində dörd müasir satış mərkəzi mövcuddur.
						<br />
						<br />
						Satış mərkəzlərində dünya şöhrətli istehsalçıların elektrik
						məhsulları, generatorlar, kompressorlar, qaynaq avadanlıqları,
						soyutma, isitmə və su təmizləmə sistemləri, təhlükəsizlik
						sistemləri, işçi geyimləri və əl alətləri, təkrarolunmaz və geniş
						rəng çalarlı kafelləri və seramika məhsulları, mebel və mebel
						aksesuarları, çilçıraq və spotlar yer alır. Həmçinin
						mağazalarımızda yerli şirkətlərin istehsal etdiyi məhsullar da
						sərgilənmişdir. Şirkətimiz məhsul çeşidlərini mütəmadi olaraq
						artırır və bir çox tanınmış istehsalçı şirkətlərin Azərbaycanda
						rəsmi distribyutoru hesab olunur.
						<br />
						<br />
						Santral Elektrik quraşdırılması tələb olunan məhsulların
						müştərinin ünvanına çatdıraraq quraşdırılmasını həyata keçirir və
						onlara 24 saat servis xidməti göstərir. Santral Elektrik ölkəmizdə
						gedən quruculuq işlərində də fəal iştirak edir. Şirkətimiz hər il
						Bakıda təşkil edilən müxtəlif sərgilərin iştirakçısıdır. Təklif
						etdiyimiz su təmizləmə sistemləri çirkli və kimyəvi tərkibli
						suların təmizlənməsində geniş istifadə olunur
					</p>
					<div className={style.areaAchievements}>
						<h5 className={style.achievements}>NAİLİYYƏTLƏRİMİZ</h5>
						<div className={style.shortInfo}>
							{shortInfo.map((data) => (
								<div key={data.id}>
									<h4 className={style.shortTitle}>{data.title}</h4>
									<p className={style.shortDescription}>
										{data.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
