type ArtistCardImageProps = {
  src: string;
  alt: string;
};

export default function ArtistCardImage(props: ArtistCardImageProps) {
  return <img className="fit-image" src={props.src} alt={props.alt}></img>;
}
