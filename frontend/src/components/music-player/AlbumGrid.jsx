import { Container, noAnimation } from "@coconut-xr/koestlich";
import { AlbumCard } from "./AlbumCard";

const albums = [
  {
    name: "Rifts of Frequency",
    image: "images/1.jpg",
    artist: "Nebular Harmony",
  },
  {
    name: "Ink of Infinity",
    image: "images/2.jpg",
    artist: "Quasar Quill",
  },
  {
    name: "Ocean's Solitude",
    image: "images/3.jpg",
    artist: "Melancholic Albatross",
  },
  {
    name: "Binary Dreams",
    image: "images/4.jpg",
    artist: "Circuit Spirit",
  },
  {
    name: "Photosynthetic Melodies",
    image: "images/5.jpg",
    artist: "Sonic Sunflowers",
  },
  {
    name: "Chronos Wanderlust",
    image: "images/6.jpg",
    artist: "Temporal Nomad",
  },
  {
    name: "Resonance Canopy",
    image: "images/7.jpg",
    artist: "Veridian Vibe",
  },
  {
    name: "Silhouettes in Sound",
    image: "images/8.jpg",
    artist: "Echo Ethereal",
  },
  {
    name: "Spectral Rides",
    image: "images/9.jpg",
    artist: "Phantom Carousel",
  },
  {
    name: "Glowscript Chronicles'",
    image: "images/10.jpg",
    artist: "Neon Parchment",
  },
  {
    name: "Orbiting Shadows",
    image: "images/11.jpg",
    artist: "Saturn's Silhouette",
  },
  {
    name: "Algorithmic Meadows",
    image: "images/12.jpg",
    artist: "Fractal Fawn",
  },
];

export function AlbumGrid() {
  return (
    <Container flexShrink={1} width="100%" overflow="scroll">
      <Container
        flexGrow={1}
        flexDirection="row"
        gapColumn={8}
        gapRow={8}
        flexWrap="wrap"
        width="100%"
        animation={noAnimation}
      >
        {albums.map((album, index) => (
          <AlbumCard key={index} {...album} />
        ))}
      </Container>
    </Container>
  );
}
