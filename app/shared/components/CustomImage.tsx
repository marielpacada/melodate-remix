type CustomImageProps = {
  src: string;
  alt: string;
};

export default function CustomImage(props: CustomImageProps) {
  return <img className="fit-image" src={props.src} alt={props.alt}></img>;
}
