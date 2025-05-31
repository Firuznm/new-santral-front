import { Helmet } from "react-helmet-async";

export default function HelmetAsync({title,metaDescription,metaKeywords,img,url}) {
  return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={metaDescription} />
			<meta name="keywords" content={metaKeywords} />
			<meta property="og:title" content={title} />
			<meta property="og:image" content={img} />
			<meta property="og:url" content={url} />
			<link rel="canonical" href={url} />
		</Helmet>
  );
}
