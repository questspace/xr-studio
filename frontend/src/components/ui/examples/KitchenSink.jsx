import { RootContainer } from "@coconut-xr/koestlich";
import * as THREE from "three";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { SlidersExample } from "./Sliders";
import { ButtonsExample } from "./Buttons";
import { InputFieldsExample } from "./InputFields";
import { useInputSources } from "@coconut-xr/natuerlich/react";
import { useRef } from "react";
import { isXIntersection } from "@coconut-xr/xinteraction";
import { Grabbable } from "@coconut-xr/natuerlich/defaults";
import { MusicPlayer } from "../../music-player/MusicPlayer";
import { TestLLM } from "./TestLLM";
import { RotatingBox } from "./RotatingBox";
import { AIComponent } from "../../AIComponent";

export function KitchenSink() {
  const inputSources = useInputSources();
  const ref = useRef(null);
  const downState = useRef();

  const logError = (error, info) => {
    // Do something with the error, e.g. log to an external API
    console.log(error);
    console.log(info);
  };

  return (
    <>
      {/* <Grabbable>
        <MusicPlayer />
      </Grabbable> */}
      <TestLLM />
      <ErrorBoundary fallback={<group />} onError={logError}>
        <AIComponent />
      </ErrorBoundary>
      {/* <RotatingBox /> */}
      <Grabbable>
        <RootContainer
          position={[-1.5, 1.5, -0]}
          rotation={[0, Math.PI / 6, 0]}
          pixelSize={0.001}
          anchorX="center"
          anchorY="center"
          precision={0.01}
        >
          <Suspense>
            <InputFieldsExample />
          </Suspense>
        </RootContainer>
      </Grabbable>
      <Grabbable>
        <RootContainer
          position={[-0.5, 2, -0]}
          rotation={[0, Math.PI / 6, 0]}
          pixelSize={0.001}
          anchorX="center"
          anchorY="center"
          precision={0.01}
        >
          <Suspense>
            <SlidersExample />
          </Suspense>
        </RootContainer>
      </Grabbable>
      <Grabbable>
        <RootContainer
          position={[0.5, 2, -0]}
          rotation={[0, -Math.PI / 6, 0]}
          pixelSize={0.001}
          anchorX="center"
          anchorY="center"
          precision={0.01}
        >
          <Suspense>
            <ButtonsExample />
          </Suspense>
        </RootContainer>
      </Grabbable>
    </>
  );
}
