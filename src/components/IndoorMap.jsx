import React, {Suspense, useMemo, useRef} from 'react';
import {useFrame, useLoader} from "@react-three/fiber";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import Button from "./Button";
import {Pathfinding} from "three-pathfinding";
import * as THREE from "three";
import PathLine from "./PathLine";
import NormalLine from "./NormalLine";


const IndoorMap = () => {
    const d = 35;
    const agentHeight = 1.0;
    const agentRadius = 0.25;
    const ZONE = 'level1b';

    const navMeshGeometryRef = useRef({
        navMeshGeometry: null
    });

    const navPathRef = useRef({
        navPath: null
    });


    const onClick = () => {
        console.log("On Button clicked");
        console.log("Nave mesh value ", navMeshGeometryRef.current.navMeshGeometry);
        const navMeshGeometry = navMeshGeometryRef.current.navMeshGeometry;
        const pathfinding = new Pathfinding();
        pathfinding.setZoneData(ZONE, Pathfinding.createZone(navMeshGeometry));

        let target = {"x": 0, "y": 1, "z": 0};
        const agentpos = {"x": -3.038174055847791, "y": 5, "z": -4.375253161572642};
        const groupID = pathfinding.getGroup(ZONE, agentpos);
        const closest = pathfinding.getClosestNode(agentpos, ZONE, groupID);
        const navpath = pathfinding.findPath(closest.centroid, target, ZONE, groupID);
        console.log("NAV path", navpath);
        navPathRef.current.navPath = navpath;
    }


    const BaseModel = () => {
        const gltf = useLoader(GLTFLoader, "./demo-level.glb");
        return (<>
            <primitive object={gltf.scene} scale={0.4}/>
        </>);
    };

    const NavMeshModel = () => {
        const {scene} = useLoader(GLTFLoader, "./demo-level-navmesh.glb");

        useMemo(() => scene.traverse(node => {
            if (!navMeshGeometryRef.current.navMeshGeometry && node.isObject3D && node.children && node.children.length > 0) {
                console.log("Geometry assign started")
                navMeshGeometryRef.current.navMeshGeometry = node.children[0].geometry;
                console.log("Geometry assigned")
            }

        }), [scene])
        return (<>
            <primitive object={scene} scale={0.4}/>
        </>);
    };


    return (

        <Suspense fallback={null}>
            <ambientLight intensity={0.5} color={"white"}/>
            <directionalLight color="white" intensity={0.8} position={[20, 30, 0]} castShadow={true} shadow={{
                mapSize: {
                    width: 4096, height: 4096
                }, camera: {
                    left: -d, right: d, top: d, bottom: -d
                }
            }}/>

            <BaseModel/>
            <NavMeshModel/>
            <PathLine/>


            {/*<NormalLine2 start={[0,0,0]} end={[1,1,0]} />*/}
            {/*<NormalLine2 start={[1,1,0]} end={[2,0,0]} />*/}
            <Button onClick={onClick}/>
            <group position={[0, 1, 0]}>
                <mesh position={[0, agentHeight / 2, 0]}>
                    <cylinderGeometry args={[agentRadius, agentRadius, agentHeight]}/>
                    <meshPhongMaterial attach="material" color={"green"}/>
                </mesh>
            </group>
            <PathLine/>
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