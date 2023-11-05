import { Container } from "@coconut-xr/koestlich";
import {
  FastForward,
  List,
  MessageSquare,
  Pause,
  Play,
  Rewind,
  Volume2,
} from "@coconut-xr/lucide-koestlich";
import { B } from "@mobily/ts-belt";
import { useState } from "react";
import { Glass } from "../ui/Glass";
import { IconButton } from "../ui/IconButton";
import { CurrentSong } from "./CurrentSong.jsx";

export function Controls() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Container
      positionType="absolute"
      positionLeft={0}
      positionRight={0}
      positionBottom={-90}
      flexDirection="row"
      justifyContent="center"
    >
      <Glass borderRadius={32} padding={8} gapColumn={8} flexDirection="row">
        <IconButton>
          <Rewind height={16} width={16} color="white" depth={0} />
        </IconButton>
        <IconButton onClick={() => setIsPlaying(B.inverse)}>
          {isPlaying ? (
            <Play height={16} width={16} color="white" depth={0} />
          ) : (
            <Pause height={16} width={16} color="white" depth={0} />
          )}
        </IconButton>
        <IconButton>
          <FastForward height={16} width={16} color="white" depth={0} />
        </IconButton>
        <CurrentSong />
        <IconButton>
          <MessageSquare height={16} width={16} color="white" depth={0} />
        </IconButton>
        <IconButton>
          <List height={16} width={16} color="white" depth={0} />
        </IconButton>
        <IconButton>
          <Volume2 height={16} width={16} color="white" depth={0} />
        </IconButton>
      </Glass>
    </Container>
  );
}
