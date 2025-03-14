import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

type Props = {
    initialImageUrl: string;
}

const indexPage: NextPage<Props> = ({ initialImageUrl }) => {
    const [imageUrl, setImageUrl] = useState(initialImageUrl);
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        const newImage = await fetchImage();
        setImageUrl(newImage.url);
        setLoading(false);
    };

    return (
        <div className={styles.page}>
          <button onClick={handleClick} className={styles.button}>
            他のにゃんこを見る
          </button>
          <div className={styles.frame}>
            {loading || <img src={imageUrl} className={styles.img} />}
          </div>
        </div>
      );
}
export default indexPage;

type Image = {
    url: string;
}

const fetchImage = async (): Promise<Image> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const image = await res.json();
    return image[0];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const image = await fetchImage();
    return {
        props: {
            initialImageUrl: image.url,
        },
    };
};

// const IndexPage: NextPage = () => {
//   const [imageUrl, setImageUrl] = useState("");
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     fetchImage().then((newImage) => {
//         setImageUrl(newImage.url);
//         setLoading(false);

//     })
//   }, []);
//   const handleClick = async () => {
//     setLoading(true);
//     const newImage = await fetchImage();
//     setImageUrl(newImage.url);
//     setLoading(false);
//   }
//   return (
//     <div>
//         <button onClick={handleClick}>ほかのにゃんこを見る</button>
//         <div>{loading || <img src={imageUrl} />}</div>;
//     </div>
//   )
// };
// export default IndexPage;


// type image = {
//     url:string
// }
// const fetchImage = async ():Promise<image> => {
//     const response = await fetch("https://api.thecatapi.com/v1/images/search");
//     const images = await response.json();
//     console.log(images);
//     return images[0];
// }
