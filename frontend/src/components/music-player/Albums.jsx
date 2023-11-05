import { Container, Text } from "@coconut-xr/koestlich";
import { Filter } from "@coconut-xr/lucide-koestlich";
import { Suspense } from "react";
import { Glass } from "../ui/Glass";
import { AlbumGrid } from "./AlbumGrid";
import { Search } from "./Search";

export function Albums() {
  return (
    <Glass
      flexGrow={1}
      flexShrink={1}
      borderRadiusTopRight={32}
      borderRadiusBottomRight={32}
      borderLeft={0}
    >
      <Container
        flexGrow={1}
        flexShrink={1}
        flexDirection="column"
        alignItems="stretch"
        paddingX={24}
        gapRow={16}
      >
        <Container flexDirection="row" justifyContent="space-between" paddingTop={8}>
          <Container paddingX={8} paddingY={8}>
            <Suspense>
              <Text fontSize={26} color="white" fontFamily="bold">
                Albums
              </Text>
              <Text fontSize={14} color="white" opacity={0.6}>
                254 Albums
              </Text>
            </Suspense>
          </Container>
          <Container margin={8} width={48} height={48} alignItems="center" justifyContent="center">
            <Container
              height={40}
              width={40}
              borderRadius={24}
              backgroundColor="white"
              backgroundOpacity={0.2}
              justifyContent="center"
              alignItems="center"
            >
              <Suspense>
                <Filter height={16} width={16} color="white" depth={0} />
              </Suspense>
            </Container>
          </Container>
        </Container>
        <Search />
        <AlbumGrid />
      </Container>
    </Glass>
  );
}
