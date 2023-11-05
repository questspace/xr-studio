import { Suspense, useState } from "react";
import * as THREE from "three";
import {
  ImmersiveSessionOrigin,
  NonImmersiveCamera,
  SessionSupportedGuard,
  useEnterXR,
  useHeighestAvailableFrameRate,
  useNativeFramebufferScaling,
} from "@coconut-xr/natuerlich/react";
import { Controllers, Grabbable, Hands, XRCanvas } from "@coconut-xr/natuerlich/defaults";
import { Fonts } from "@coconut-xr/apfel-kruemel";
import { RootContainer } from "@coconut-xr/koestlich";
import { inputCanvasProps } from "@coconut-xr/input";
import { Box, OrbitControls, PerspectiveCamera, Preload, Text } from "@react-three/drei";
import "./App.css";
import { SlidersExample } from "./components/ui/examples/Sliders";
import { KitchenSink } from "./components/ui/examples/KitchenSink";
import { Plot } from "./components/math-grapher/Plot";

function App() {
  const sessionOptions = {
    requiredFeatures: ["local-floor"],
    optionalFeatures: ["hand-tracking"],
  };

  const enterAR = useEnterXR("immersive-ar", sessionOptions);
  const enterVR = useEnterXR("immersive-vr", sessionOptions);

  const frameBufferScaling = useNativeFramebufferScaling();
  const heighestAvailableFramerate = useHeighestAvailableFrameRate();
  return (
    <>
      <div className="mx-auto mt-5 flex flex-col flex-wrap items-center md:flex-row md:w-2/3 sm:w-full">
        {/* jumbo */}
        <div className="flex w-full flex-col items-start justify-center text-center md:w-2/5 md:text-left">
          <h1 className="my-4 text-5xl font-bold leading-tight">QuestSpace XR Studio</h1>
          <p className="mb-8 text-2xl leading-normal">A playground for XR research in WebXR.</p>
        </div>
      </div>

      <div className="container md:w-2/3 sm:w-full mx-auto mt-10">
        <div className="w-full">
          <h2 className="mb-3 text-3xl font-bold leading-none text-gray-800">
            Events are propagated
          </h2>
          <p className="mb-8 text-gray-600">
            Drag, scroll, pinch, and rotate the canvas to explore the 3D scene.
          </p>
        </div>
        <SessionSupportedGuard mode="immersive-ar">
          <button
            className="xr-button mt-10 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={enterAR}
          >
            AR
          </button>
        </SessionSupportedGuard>
        <SessionSupportedGuard mode="immersive-vr">
          <button
            className="xr-button mt-10 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={enterVR}
          >
            VR
          </button>
        </SessionSupportedGuard>
        <div className="my-0 w-full py-6 md:mb-40" style={{ width: "100%", height: "800px" }}>
          <XRCanvas
            dpr={window.devicePixelRatio}
            gl={{ localClippingEnabled: true }}
            frameBufferScaling={frameBufferScaling}
            frameRate={heighestAvailableFramerate}
            style={{ inset: 0 }}
          >
            <directionalLight position={[-2, 2, 2]} intensity={1.6} />
            <NonImmersiveCamera position={[0, 1.5, 0]} />
            <ImmersiveSessionOrigin>
              <Hands />
              <Controllers />
            </ImmersiveSessionOrigin>
            <color attach="background" args={["lightblue"]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[20, 30, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} color="blue" />
            <OrbitControls />
            {/* UI stuff */}
            <Fonts>
              <KitchenSink />
            </Fonts>

            <Text
              fontSize={0.09}
              position={[2, 2, 1]}
              rotation={[0, -Math.PI / 2, 0]}
              color="black"
            >
              {`e^(x+y^2) - 1.02`}
            </Text>

            <Plot
              equation="e^(x+y^2) - 1.02"
              order={32}
              showZeroPlanes={false}
              showBoundingBox={false}
              bounds={[-0.3, 0.3, -0.3, 0.3, -0.3, 0.3]}
              color={new THREE.Color("#04f")}
              position={[-1, 1, -1.4]}
              rotation={[0, Math.PI * 2, 0]}
            />

            <Text
              fontSize={0.09}
              position={[1, 1.7, -1.4]}
              rotation={[0, -Math.PI / 6, 0]}
              color="black"
            >
              {`0.5*e^-((x^2+y^2)*10)`}
            </Text>
            <Plot
              equation="0.5*e^-((x^2+y^2)*10)"
              order={32}
              showZeroPlanes={true}
              showBoundingBox={true}
              bounds={[-0.5, 0.5, 0, 0.5, -0.5, 0.5]}
              color={new THREE.Color("#f40")}
              position={[1, 1, -1.4]}
              rotation={[0, Math.PI / 2, 0]}
            />

            <Preload all />
          </XRCanvas>
        </div>
      </div>
    </>
  );
}

export default App;
