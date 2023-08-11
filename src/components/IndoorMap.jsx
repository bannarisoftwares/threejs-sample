import React, {useMemo, useRef, useState} from 'react';
import {extend, useFrame} from "@react-three/fiber";

import {useLoader} from "@react-three/fiber";
import {Environment, OrbitControls} from "@react-three/drei";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Suspense} from "react";
import {PerspectiveCamera} from '@react-three/drei'
import Button from "./Button";
import {Pathfinding, PathfindingHelper} from "three-pathfinding";
import {BufferAttribute} from "three";
import {MeshLineGeometry, MeshLineMaterial} from 'meshline';
import * as THREE from 'three';
import {useControls} from 'leva'

extend({MeshLineGeometry, MeshLineMaterial});


const IndoorMap = () => {
    const d = 35;
    const agentHeight = 1.0;
    const agentRadius = 0.25;
    const ZONE = 'level1b';

    const cNP = [
        {
            "x": 2.6,
            "y": 5.1,
            "z": -1.5
        },
        {
            "x": 2.8,
            "y": 5.1,
            "z": -1.3
        },
        {
            "x": 2.8,
            "y": 5.1,
            "z": 2.5
        },
        {
            "x": 2.6,
            "y": 5.1,
            "z": 2.7
        },
        {
            "x": -5.5,
            "y": 5.1,
            "z": 6
        },
        {
            "x": -5.7,
            "y": 5,
            "z": 6.4
        },
        {
            "x": -5.6,
            "y": 5,
            "z": 6.6
        },
        {
            "x": 6.4,
            "y": 1.1,
            "z": 6.5
        },
        {
            "x": 6.5,
            "y": 1.1,
            "z": 5.6
        },
        {
            "x": 6.5,
            "y": 1.1,
            "z": 3.1
        },
        {
            "x": 6.4,
            "y": 1.1,
            "z": 2.2
        },
        {
            "x": 0,
            "y": 1,
            "z": 0
        }
    ]

    const navMeshGeometryRef = useRef({
        navMeshGeometry: null
    });

    const navPathRef = useRef({
        navPath: null
    });

    const [navPath, setNavPath] = useState();

    function Lines({dash, count, colors, radius = 50, rand = THREE.MathUtils.randFloatSpread}) {
        const lines = useMemo(() => {
            return Array.from({length: count}, () => {
                const pos = new THREE.Vector3(rand(radius), rand(radius), rand(radius))
                console.log("POS---->",pos)
                const points = Array.from({length: 10}, () => pos.add(new THREE.Vector3(rand(radius), rand(radius), rand(radius))).clone())

                console.log('points', points)
                const curve = new THREE.CatmullRomCurve3(points).getPoints(300)
                return {
                    color: colors[parseInt(colors.length * Math.random())],
                    width: Math.max(radius / 100, (radius / 50) * Math.random()),
                    speed: Math.max(0.1, 1 * Math.random()),
                    curve: curve.flatMap((point) => point.toArray())
                }
            })
        }, [colors, count, radius])
        return lines.map((props, index) => <Fatline key={index} dash={dash} {...props} />)
    }

    function Fatline({curve, width, color, speed, dash}) {
        const ref = useRef()
        useFrame((state, delta) => (ref.current.material.dashOffset -= (delta * speed) / 10))
        return (
            <mesh ref={ref}>
                <meshLineGeometry points={curve}/>
                <meshLineMaterial transparent lineWidth={width} color={color} depthWrite={false} dashArray={0.25}
                                  dashRatio={dash} toneMapped={false}/>
            </mesh>
        )
    }


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
        setNavPath(navPathRef.current.navPath)
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


    function BufferPoints({count = 1000}) {
        const OFFSET = 0.2;
        const navPath = [
            {
                "x": 2.6,
                "y": 5.1,
                "z": -1.5
            },
            {
                "x": 2.8,
                "y": 5.1,
                "z": -1.3
            },
            {
                "x": 2.8,
                "y": 5.1,
                "z": 2.5
            },
            {
                "x": 2.6,
                "y": 5.1,
                "z": 2.7
            },
            {
                "x": -5.5,
                "y": 5.1,
                "z": 6
            },
            {
                "x": -5.7,
                "y": 5,
                "z": 6.4
            },
            {
                "x": -5.6,
                "y": 5,
                "z": 6.6
            },
            {
                "x": 6.4,
                "y": 1.1,
                "z": 6.5
            },
            {
                "x": 6.5,
                "y": 1.1,
                "z": 5.6
            },
            {
                "x": 6.5,
                "y": 1.1,
                "z": 3.1
            },
            {
                "x": 6.4,
                "y": 1.1,
                "z": 2.2
            },
            {
                "x": 0,
                "y": 1,
                "z": 0
            }
        ]

        const points = useMemo(() => {
            const p = new Array(count).fill(0).map((v) => (0.5 - Math.random()) * 7.5);
            return new BufferAttribute(new Float32Array(p), 3);
        }, [count]);

        console.log("POINTS...", points)

        return (
            <points>
                <bufferGeometry>
                    <bufferAttribute attach={"attributes-position"} {...points} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.1}
                    threshold={0.1}
                    color={0xff00ff}
                    sizeAttenuation={true}
                />
            </points>
        );
    }

    const {dash, count, radius} = useControls({
        dash: {value: 0.9, min: 0, max: 0.99, step: 0.01},
        count: {value: 50, min: 0, max: 200, step: 1},
        radius: {value: 50, min: 1, max: 100, step: 1}
    })
    return (<Suspense fallback={null}>
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
        {/*<BufferPoints/>*/}
        {/*<Line/>*/}
        <Lines dash={dash} count={count} radius={radius}
               colors={[[10, 0.5, 2], [1, 2, 10], '#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff']}/>
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