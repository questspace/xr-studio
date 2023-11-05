import { Container, Text } from "@coconut-xr/koestlich";
import { Mic } from "@coconut-xr/lucide-koestlich";
import { makeBorderMaterial } from "@coconut-xr/xmaterials";
import { Suspense } from "react";
import { MeshPhongMaterial } from "three";

const material = makeBorderMaterial(MeshPhongMaterial, {
  specular: "#666",
  shininess: 66,
});

export function Search() {
  return (
    <Container paddingX={8}>
      <Container
        height={40}
        backgroundColor="#555"
        backgroundOpacity={0.5}
        borderRadius={8}
        border={3}
        borderOpacity={0.5}
        borderColor="#555"
        paddingX={16}
        flexDirection="row"
        alignItems="center"
        gapColumn={16}
        material={material}
        borderBend={-0.3}
      >
        <Suspense>
          <Mic height={12} width={12} color="white" depth={0} />
          <Text fontSize={14} color="white" opacity={0.6}>
            Search in Albums
          </Text>
        </Suspense>
      </Container>
    </Container>
  );
}
