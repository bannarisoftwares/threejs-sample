import React from 'react';
import {useFrame} from "@react-three/fiber";

import {useLoader} from "@react-three/fiber";
import {Environment, OrbitControls} from "@react-three/drei";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Suspense} from "react";
import {PerspectiveCamera} from '@react-three/drei'
import Button from "./Button";

const Model = () => {
    const gltf = useLoader(GLTFLoader, "./demo-level.glb");
    return (<>
        <primitive object={gltf.scene} scale={0.4}/>
    </>);
};
const IndoorMap = () => {
    const d = 35;
    const agentHeight = 1.0;
    const agentRadius = 0.25;
    const onClick = () => {
        console.log("On Button clicked");
    }
    return (
        <Suspense fallback={null}>
            <ambientLight intensity={0.5} color={"white"}/>
            <directionalLight color="white" intensity={0.8} position={[20, 30, 0]} castShadow={true} shadow={{
                mapSize: {
                    width: 4096, height: 4096
                },
                camera: {
                    left: -d,
                    right: d,
                    top: d,
                    bottom: -d
                }
            }}/>

            <Model/>
            <Button onClick={onClick}/>
            <group position={[0, 1, 0]}>
                <mesh position={[0, agentHeight / 2, 0]}>
                    <cylinderGeometry args={[agentRadius, agentRadius, agentHeight]}/>
                    <meshPhongMaterial attach="material" color={"green"}/>
                </mesh>
            </group>
            <OrbitControls enablePan={true}
                           enableDamping={true}
                           minDistance={5}
                           maxDistance={60}
                           maxPolarAngle={Math.PI / 2 - 0.05}
                           minPolarAngle={Math.PI / 4}/>
            {/*<Environment preset="sunset" background/>*/}
            <PerspectiveCamera fov={45} aspect={window.innerWidth / window.innerHeight} near={0.1} far={1000}
                               position={[10, 10, 33]}/>
        </Suspense>);
};

export default IndoorMap;