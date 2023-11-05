import { Container } from "@coconut-xr/koestlich";
import { Disc3, LayoutGrid, Music, PlayCircle, Radio, Search } from "@coconut-xr/lucide-koestlich";
import { Suspense, useState } from "react";
import { Glass } from "../ui/Glass";
import { IconButton } from "../ui/IconButton";

const tabs = [
  <PlayCircle height={16} width={16} color="white" depth={0} />,
  <LayoutGrid height={16} width={16} color="white" depth={0} />,
  <Music height={16} width={16} color="white" depth={0} />,
  <Radio height={16} width={16} color="white" depth={0} />,
  <Disc3 height={16} width={16} color="white" depth={0} />,
  <Search height={16} width={16} color="white" depth={0} />,
];

export function Tabs() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <Container
      flexDirection="column"
      justifyContent="center"
      positionType="absolute"
      positionTop={0}
      positionBottom={0}
      positionLeft={-80}
    >
      <Glass padding={5} borderRadius={28} gapRow={4} flexDirection="column">
        {tabs.map((tab, index) => (
          <IconButton
            size="small"
            key={index}
            active={selectedTab === tab}
            onClick={() => setSelectedTab(tab)}
          >
            <Suspense>{tab}</Suspense>
          </IconButton>
        ))}
      </Glass>
    </Container>
  );
}
