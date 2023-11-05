import { Container, Image, Text, noAnimation } from "@coconut-xr/koestlich";
import { ChevronDown, ChevronUp, Grid, Plus } from "@coconut-xr/lucide-koestlich";
import { Suspense, useState } from "react";
import { SidebarItem } from "./SidebarItem";

const playlists = [
  { image: "images/8.jpg", name: "Love Songs" },
  { image: "images/3.jpg", name: "Mercury" },
];

export function Playlists() {
  const [hoverCount, setHoverCount] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Container flexDirection="column" gapRow={8} animation={noAnimation}>
      <Container
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        height={48}
        index={0}
        animation={noAnimation}
      >
        <Suspense>
          <Text color="white" fontSize={20} fontFamily="bold" paddingX={8}>
            Playlists
          </Text>
          <Container
            height={48}
            width={48}
            alignItems="center"
            justifyContent="center"
            backgroundColor="white"
            backgroundOpacity={hoverCount > 0 ? 0.1 : 0}
            borderRadius={24}
            onPointerEnter={() => setHoverCount((current) => current + 1)}
            onPointerLeave={() => setHoverCount((current) => current - 1)}
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? (
              <ChevronUp height={8} width={8} color="white" depth={0} />
            ) : (
              <ChevronDown height={8} width={8} color="white" depth={0} />
            )}
          </Container>
        </Suspense>
      </Container>
      <Container flexDirection="column" gapRow={8} index={1}>
        {isOpen && (
          <>
            <SidebarItem icon={<Grid height={16} width={16} color="white" depth={0} />}>
              All Playlists
            </SidebarItem>
            {playlists.map((playlist, index) => (
              <SidebarItem
                key={index}
                icon={<Image width="100%" height="100%" borderRadius={8} url={playlist.image} />}
              >
                {playlist.name}
              </SidebarItem>
            ))}
            <SidebarItem
              icon={
                <Container
                  height="100%"
                  width="100%"
                  borderRadius={8}
                  backgroundColor="#adadad"
                  backgroundOpacity={0.5}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Plus height={16} width={16} color="white" depth={0} />
                </Container>
              }
            >
              Add Playlist
            </SidebarItem>
          </>
        )}
      </Container>
    </Container>
  );
}
