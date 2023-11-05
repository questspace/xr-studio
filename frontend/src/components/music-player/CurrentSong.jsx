import { Container, Image, Text } from "@coconut-xr/koestlich";
import { MoreHorizontal } from "@coconut-xr/lucide-koestlich";
import { Suspense } from "react";

export function CurrentSong() {
  return (
    <Container
      width={300}
      height={48}
      borderRadius={10}
      backgroundColor="black"
      backgroundOpacity={0.2}
      flexDirection="row"
      gapColumn={8}
      padding={6}
    >
      <Suspense>
        <Image url="images/4.jpg" height="100%" borderRadius={4} />
        <Container flexDirection="column" justifyContent="center" flexGrow={1}>
          <Text fontFamily="bold" fontSize={14} color="white">
            Binary Dreams
          </Text>
          <Text fontSize={12} color="white" opacity={0.6}>
            Circuit Spirit
          </Text>
        </Container>
        <Container
          height="100%"
          aspectRatio={1}
          justifyContent="center"
          alignItems="center"
        >
          <MoreHorizontal height={4} width={4} color="white" depth={0} />
        </Container>
      </Suspense>
    </Container>
  );
}
