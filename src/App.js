'use client';
import { useRef, useState } from 'react';
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { config, useSpring, animated } from '@react-spring/three';
import { OrbitControls, Text } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';

const Box = props => {
  const ref = useRef();
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  useFrame(() => (ref.current.rotation.x += 0.01));

  const { scale } = useSpring({
    scale: clicked ? 2 : 1,
    config: config.wobbly,
  });

  return (
    <animated.mesh
      {...props}
      ref={ref}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={scale}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'blue' : 'hotpink'} />
    </animated.mesh>
  );
};

const Sphere = props => {
  const ref = useRef();
  const [clicked, setClicked] = useState(false);

  useFrame(() => (ref.current.rotation.x += 0.01));

  const { scale } = useSpring({
    scale: clicked ? 2 : 1,
    config: config.wobbly,
  });

  return (
    <animated.mesh
      {...props}
      ref={ref}
      onClick={() => setClicked(!clicked)}
      scale={scale}
    >
      {/* <circleBufferGeometry args={[1, 1, 1]}/> */}
      <meshStandardMaterial color={clicked ? 'blue' : 'hotpink'} />
    </animated.mesh>
  );
};

const Texts = () => {
  const ref = useRef();
  const [clicked, setClicked] = useState(false);
  // const [hovered, setHovered] = useState(false);

  const { scale } = useSpring({
    scale: clicked ? 2 : 1,
    config: config.wobbly,
  });

  // useFrame(() => (ref.current.rotation.x += 0.01));
  return (
    <animated.mesh
      ref={ref}
      onClick={() => setClicked(!clicked)}
      // onPointerOver={() => setHovered(true)}
      // onPointerOut={() => setHovered(false)}
      scale={scale}
    >
      <Text position={[1, 1, 1]} font="/public/Roboto-Black.ttf">
        Profile
      </Text>
    </animated.mesh>
  );
};

const Rig = ({ v = new Vector3() }) => {
  return useFrame(state => {
    state.camera.position.lerp(
      v.set(state.mouse.x / 2, state.mouse.y / 2, 10),
      0.05
    );
  });
};

function App() {
  return (
    <>
      <div id="canvas-container">
        <Canvas
          // camera={{
          //   fov: 45,
          //   near: 0.1,
          //   far: 1000,
          //   position: [0, 0, 5],
          // }}
        >
          <Rig />
          <Box position={[-2, 0, 0]} />
          <Box position={[2, 0, 0]} />
          <Sphere />
          <Texts />
          <ambientLight intensity={0.5} />
          {/* <directionalLight position={[1, 1, 1]} intensity={0.8} /> */}
          {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-1, -1, -1]} /> */}
          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
}

export default App;
