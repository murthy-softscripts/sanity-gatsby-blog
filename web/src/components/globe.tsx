import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import { TextureLoader, Color, DefaultLoadingManager } from 'three';
import baseMap from '../assets/img/earthBase.jpg';
import cloudsMap from '../assets/img/earthClouds.jpg';
import waterMap from '../assets/img/earthWater.jpg';
import './globe.scss';

const tilt = (23.4 * Math.PI) / 180;
function radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

function Clouds({ offset = 0.01, spinRate = 0.001, ...props }) {
  const cloudsTexture = useLoader(TextureLoader, cloudsMap);
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y += spinRate;
  });

  return (
    <mesh {...props} ref={mesh}>
      <sphereBufferGeometry attach="geometry" args={[1 + offset, 48, 48]} />
      <meshPhongMaterial
        attach="material"
        color="#aaa"
        alphaMap={cloudsTexture}
        transparent
        shininess={100}
      />
    </mesh>
  );
}

function Earth({ spinRate = 0.001, ...props }) {
  const baseTexture = useLoader(TextureLoader, baseMap);
  const waterTexture = useLoader(TextureLoader, waterMap);
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y += spinRate;
  });

  return (
    <mesh {...props} ref={mesh}>
      <sphereBufferGeometry attach="geometry" args={[1, 48, 48]} />
      <meshPhongMaterial
        attach="material"
        // color="blue"
        map={baseTexture}
        specularMap={waterTexture}
        shininess={10}
        specular={new Color('#0c1924')}
      />
    </mesh>
  );
}

function useDefaultLoadingManager() {
  const [finished, setFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    DefaultLoadingManager.onLoad = () => setFinished(true);
    DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) =>
      setProgress(itemsLoaded / itemsTotal);
  }, []);

  return { progress, finished };
}

export const Globe = ({ onReady }) => {
  const [canvasReady, setCanvasReady] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const loadingManager = useDefaultLoadingManager();

  useEffect(() => {
    if (loadingManager.finished && canvasReady) {
      setShow(true);
      onReady && onReady();
    }
  }, [loadingManager.finished, canvasReady]);

  return (
    <div className={`globe ${show ? 'show' : 'hidden'}`}>
      <Canvas
        colorManagement
        camera={{ fov: 32, position: [0, 0, 3.75] }}
        style={{ position: 'absolute' }}
        onCreated={() => setCanvasReady(true)}
      >
        <ambientLight intensity={0.1} />
        <group rotation={[0, 0, tilt]}>
          {/* <pointLight intensity={0.3} position={[-20, 0, 10]} /> */}
          <directionalLight
            castShadow={true}
            intensity={2.5}
            position={[50, 0, 35]}
          />
        </group>
        <group rotation={[0, radians(-90), 0]}>
          <Suspense fallback={null}>
            <Earth spinRate={0.002} />
            <Clouds spinRate={0.0022} />
          </Suspense>
        </group>
      </Canvas>
      <div className="overlay">
        Net Zero Emissions
        <br /> by 2050
      </div>
    </div>
  );
};
