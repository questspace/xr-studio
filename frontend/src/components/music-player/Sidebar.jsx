import { Container, Text } from "@coconut-xr/koestlich";
import { MoreHorizontal } from "@coconut-xr/lucide-koestlich";
import { Suspense } from "react";
import { Glass } from "../ui/Glass";
import { Playlists } from "./Playlists";
import { SidebarMenu } from "./SidebarMenu";

export function Sidebar() {
  return (
    <Glass
      borderRadiusTopLeft={32}
      borderRadiusBottomLeft={32}
      borderRight={0}
      backgroundColor="#666"
    >
      <Container width={340} flexDirection="column" alignItems="stretch" padding={8} gapRow={16}>
        <Container flexDirection="row" justifyContent="space-between">
          <Container paddingX={8} paddingY={8}>
            <Suspense>
              <Text fontSize={26} color="white" fontFamily="bold">
                Library
              </Text>
              <Text fontSize={14} color="white" opacity={0.6}>
                All Music
              </Text>
            </Suspense>
          </Container>
          <Container margin={8} width={48} height={48} alignItems="center" justifyContent="center">
            <Container
              height={40}
              width={40}
              borderRadius={20}
              backgroundColor="white"
              backgroundOpacity={0.1}
              justifyContent="center"
              alignItems="center"
            >
              <MoreHorizontal height={6} width={6} color="white" depth={0} />
            </Container>
          </Container>
        </Container>
        <SidebarMenu />
        <Playlists />
      </Container>
    </Glass>
  );
}
