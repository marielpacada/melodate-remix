type ArtistCardInfoProps = {
  name: string;
  followers: number;
  genre: string;
};

const genreHandler = (genreData: string) => {
  if (genreData.length === 0) {
    return "no listed genres :(";
  }
  var genreList = "";
  const genreArray = genreData.split(",");
  for (var genre of genreArray) {
    // Ensures genre list will only take up one paragraph line
    if (genreList.concat(" ", genre).length < 44) {
      genreList = genreList.concat(genre, ", ");
    } else break;
  }
  return genreList.slice(0, genreList.length - 2);
};

export default function ArtistCardInfo(props: ArtistCardInfoProps) {
  return (
    <>
      <div className="artist-name">{props.name}</div>
      <div className="artist-followers">
        {props.followers.toLocaleString()} followers
      </div>
      <div className="artist-genre">{genreHandler(props.genre)}</div>
    </>
  );
}
