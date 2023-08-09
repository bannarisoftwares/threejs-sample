import React from 'react';
import {useFrame} from "@react-three/fiber";

import {useLoader} from "@react-three/fiber";
import {Environment, OrbitControls} from "@react-three/drei";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Suspense} from "react";

const Model = () => {
    const gltf = useLoader(GLTFLoader, "./demo-level.glb");
    return (
        <>
            <primitive object={gltf.scene} scale={0.4}/>
        </>
    );
};
const IndoorMap = () => {
    return (
        <Suspense fallback={null}>
            <Model/>
            <OrbitControls/>
            <Environment preset="sunset" background/>
        </Suspense>
    );
};

export default IndoorMap;