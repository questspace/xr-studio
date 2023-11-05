import { Container, Image, Text } from "@coconut-xr/koestlich";
import { Suspense, useState } from "react";

export function AlbumCard({ name, image, artist }) {
  const [hoverCount, setHoverCount] = useState(0);

  return (
    <Container
      padding={8}
      flexBasis={180}
      flexGrow={1}
      flexDirection="column"
      onPointerEnter={() => setHoverCount((current) => current + 1)}
      onPointerLeave={() => setHoverCount((current) => current - 1)}
      backgroundColor="white"
      backgroundOpacity={hoverCount > 0 ? 0.1 : 0}
      borderRadius={8}
    >
      <Suspense>
        <Image url={image} maxWidth="100%" borderRadius={8} />
        <Container marginTop={4}>
          <Text fontSize={16} color="white">
            {name}
          </Text>
          <Text fontSize={16} color="white" opacity={0.5}>
            {artist}
          </Text>
        </Container>
      </Suspense>
    </Container>
  );
}
